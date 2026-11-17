import { useEffect, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { useRef } from "react";
import { profile } from "../data.js";

function useTyping(words) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setText(words[0]);
    let i = 0, j = 0, del = false, t;
    const tick = () => {
      const w = words[i];
      j += del ? -1 : 1;
      setText(w.slice(0, j));
      let d = del ? 40 : 80;
      if (!del && j === w.length) { del = true; d = 1600; }
      else if (del && j === 0) { del = false; i = (i + 1) % words.length; d = 320; }
      t = setTimeout(tick, d);
    };
    tick();
    return () => clearTimeout(t);
  }, [words]);
  return text;
}

function Counter({ n, s }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const c = animate(0, n, { duration: 1.8, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [seen, n]);
  return <b ref={ref}>{v}{s}</b>;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.11 } } };
const item = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };

export default function Hero() {
  const role = useTyping(profile.roles);
  return (
    <section id="top" className="hero">
      <div className="wrap herogrid">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Available badge */}
          <motion.div variants={item} className="hero-badge">
            <span className="hero-badge-dot" />
            Available for new projects
          </motion.div>

          <motion.p variants={item} className="hi">Hi, I'm {profile.name} 👋</motion.p>
          <motion.p variants={item} className="role">{role || "\u00A0"}<i className="caret" /></motion.p>

          <motion.h1 variants={item}>
            {profile.headline.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="gradient-text">{profile.headline.split(" ").slice(-1)}</span>
          </motion.h1>

          <motion.p variants={item} className="lead">{profile.intro}</motion.p>

          <motion.div variants={item} className="btns">
            <a className="btn primary" href="#projects">🚀 See my work</a>
            <a className="btn" href="#contact">✉️ Get in touch</a>
            <a className="btn ghost" href={profile.resume} download>⬇️ Resume</a>
          </motion.div>

          <motion.div variants={item} className="facts">
            {profile.stats.map((x) => (
              <div key={x.label} className="fact-item">
                <Counter n={x.n} s={x.s} />
                <span>{x.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Phone mockup */}
        <motion.div
          className="phonewrap"
          initial={{ opacity: 0, scale: 0.82, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="phone-glow" />
          <motion.div
            className="phone"
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            role="img"
            aria-label="Illustration of the Quadzy college feed on a phone"
          >
            <div className="screen">
              <div className="top">Quadzy <span>●</span></div>
              <div className="post"><div className="who"><i className="av" />Campus feed</div>Live updates from your college, as they happen.<div className="img" /></div>
              <div className="post"><div className="who"><i className="av m" />Notifications</div>Push alerts powered by Firebase.</div>
              <div className="post"><div className="who"><i className="av s" />Uploads</div>Photos go straight to AWS S3.</div>
              <div className="tabbar"><i /><i /><i /><i /></div>
            </div>
          </motion.div>
          <motion.span className="chip c1" animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}>React Native</motion.span>
          <motion.span className="chip c2" animate={{ y: [0, -12, 0] }} transition={{ duration: 4.5, repeat: Infinity }}>Node.js</motion.span>
          <motion.span className="chip c3" animate={{ y: [0, 8, 0] }} transition={{ duration: 3.8, repeat: Infinity }}>MongoDB</motion.span>
        </motion.div>
      </div>
    </section>
  );
}
