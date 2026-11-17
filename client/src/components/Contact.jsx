import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal.jsx";
import { profile } from "../data.js";

const socialIcons = { GitHub: "🐙", LinkedIn: "💼", Instagram: "📸" };

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setStatus({ type: "", text: "" });
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || "Something went wrong.");
      setStatus({ type: "ok", text: "✅ Message sent! I'll reply to your email soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ type: "err", text: `❌ ${err.message} You can also email me directly.` });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="contact">
      <div className="wrap">
        <Reveal>
          <div className="section-badge">
            <span className="section-badge-line" />
            Contact
          </div>
        </Reveal>
        <Reveal as="h2">Let's work together</Reveal>

        <div className="cgrid">
          {/* ── Left: contact info ── */}
          <Reveal>
            <p className="contact-info-label">📬 Reach me at</p>
            <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>

            <ul className="clist">
              <li>
                <span className="clist-icon">📞</span>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
              </li>
              <li>
                <span className="clist-icon">📍</span>
                {profile.location}
              </li>
              <li>
                <span className="clist-icon">🌐</span>
                English · Hindi · Marathi
              </li>
              <li>
                <span className="clist-icon">⏰</span>
                IST (UTC +5:30) · Mon–Sat
              </li>
            </ul>

            <p className="contact-info-label" style={{ marginTop: "24px" }}>🔗 Find me online</p>
            <div className="social">
              {Object.entries(profile.links)
                .filter(([, u]) => u)
                .map(([n, u]) => (
                  <motion.a
                    key={n}
                    href={u}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, borderColor: "var(--accent2)", background: "rgba(61,214,170,.1)" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {socialIcons[n] || "🔗"} {n}
                  </motion.a>
                ))}
            </div>
          </Reveal>

          {/* ── Right: form ── */}
          <Reveal delay={0.1}>
            <form className="cf" onSubmit={submit} noValidate>
              <label>
                Your name
                <input
                  value={form.name}
                  onChange={set("name")}
                  required
                  maxLength={80}
                  autoComplete="name"
                  placeholder="Tanmay Kudale"
                />
              </label>
              <label>
                Your email
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </label>
              <label>
                Message
                <textarea
                  value={form.message}
                  onChange={set("message")}
                  required
                  maxLength={2000}
                  placeholder="Hi Tanmay, I'd love to work with you on..."
                />
              </label>

              <motion.button
                className="btn primary"
                type="submit"
                disabled={busy}
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                style={{ justifyContent: "center" }}
              >
                {busy ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{ display: "inline-block" }}
                    >⟳</motion.span>
                    &nbsp;Sending…
                  </>
                ) : "✉️ Send message"}
              </motion.button>

              <AnimatePresence mode="wait">
                {status.text && (
                  <motion.p
                    key={status.text}
                    className={`status ${status.type}`}
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    {status.text}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
