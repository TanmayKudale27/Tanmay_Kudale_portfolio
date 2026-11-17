import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import Message from "./models/Message.js";
import Project from "./models/Project.js";

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || true }));
app.use(express.json({ limit: "20kb" }));

// ─── Nodemailer transporter ───────────────────────────────────────────────────
let transporter = null;
if (process.env.MAIL_USER && process.env.MAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  transporter.verify((err) => {
    if (err) console.warn("⚠️  Email transporter error:", err.message);
    else console.log("✅ Email transporter ready");
  });
} else {
  console.warn("⚠️  MAIL_USER / MAIL_PASS not set — emails will not be sent.");
}

async function sendNotificationEmail({ name, email, message }) {
  if (!transporter) return;
  const to = process.env.MAIL_TO || process.env.MAIL_USER;
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      to,
      replyTo: email,
      subject: `📩 New message from ${name} — Portfolio`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0A0C1E;color:#F2F3FF;padding:32px;border-radius:16px">
          <h2 style="color:#7C8BFF;margin:0 0 24px">New contact form message</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="color:#A5AACE;padding:8px 0;width:100px">Name</td><td style="padding:8px 0;font-weight:700">${name}</td></tr>
            <tr><td style="color:#A5AACE;padding:8px 0">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#3DD6AA">${email}</a></td></tr>
          </table>
          <div style="background:rgba(255,255,255,.06);border-radius:12px;padding:20px;margin-top:20px;line-height:1.65">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <p style="color:#A5AACE;font-size:13px;margin-top:24px">Reply directly to this email to respond to ${name}.</p>
        </div>`,
      text: `New message from ${name} (${email}):\n\n${message}`,
    });
    console.log(`📧 Notification email sent to ${to}`);
  } catch (err) {
    console.error("Email send error:", err.message);
  }
}

// ─── Rate limit ───────────────────────────────────────────────────────────────
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 3_600_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const dbReady = () => mongoose.connection.readyState === 1;

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => res.json({ ok: true, db: dbReady() }));

app.get("/api/projects", async (_req, res) => {
  if (!dbReady()) return res.status(503).json({ error: "Database not connected" });
  res.json(await Project.find().sort({ order: 1 }).lean());
});

app.post("/api/contact", async (req, res) => {
  if (limited(req.ip)) return res.status(429).json({ error: "Too many messages. Try again later." });
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: "All fields are required." });
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: "Enter a valid email." });

  // Save to MongoDB (optional — works even if DB is offline)
  if (dbReady()) {
    try { await Message.create({ name, email, message }); }
    catch (e) { console.error("MongoDB save error:", e.message); }
  }

  // Send notification email regardless of DB state
  await sendNotificationEmail({ name, email, message });

  res.status(201).json({ ok: true });
});

// ─── Serve React in production ────────────────────────────────────────────────
const dist = path.join(__dirname, "../client/dist");
app.use(express.static(dist));
app.get(/^(?!\/api).*/, (_req, res, next) =>
  res.sendFile(path.join(dist, "index.html"), (err) => err && next())
);

// ─── Seed ─────────────────────────────────────────────────────────────────────
async function seed() {
  if (await Project.countDocuments()) return;
  await Project.create({
    title: "Quadzy: college social media app",
    description:
      "A mobile social network for college students with a live feed, profiles and notifications. I lead the frontend, from component architecture to media uploads and performance.",
    features: [
      "Live feed updates and Firebase push notifications",
      "Direct media uploads to AWS S3 with progress tracking",
      "Redux and Context API state, with retry logic on failures",
      "40% smaller bundle through code splitting and lazy loading",
    ],
    tech: ["React Native", "Expo", "Redux", "Node.js", "Express.js", "MongoDB", "AWS S3", "Firebase"],
    order: 1,
  });
}

app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => { console.log("✅ MongoDB connected"); return seed(); })
    .catch((e) => console.error("MongoDB connection failed:", e.message));
} else {
  console.warn("⚠️  MONGO_URI missing: contact form still sends email, but messages won't be saved.");
}
