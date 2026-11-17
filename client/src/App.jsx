import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import { profile } from "./data.js";

const stack = ["MongoDB", "Express", "React", "Node.js"];

function AnimatedFooterLogo({ name }) {
  return (
    <a className="footer-logo" href="#top" aria-label={name}>
      <span className="footer-logo-letters">
        {name.split("").map((ch, i) => (
          <motion.span
            key={i}
            className="footer-logo-letter"
            whileHover={{ y: -3, color: "var(--accent2)" }}
            transition={{ type: "spring", stiffness: 400, damping: 15, delay: i * 0.03 }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </span>
      <span className="footer-logo-dot">.</span>
    </a>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress */}
      <motion.div className="progress" style={{ scaleX }} />

      {/* Background orbs */}
      <div className="blob b1" aria-hidden="true" />
      <div className="blob b2" aria-hidden="true" />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* ── Footer ── */}
      <motion.footer
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="wrap">
          <div className="footer-inner">
            {/* Logo */}
            <AnimatedFooterLogo name={profile.name} />

            {/* Copyright */}
            <p className="footer-copy">
              © {new Date().getFullYear()} {profile.name}<br />
              <span style={{ fontSize: "12px" }}>Crafted with ❤️ in Pune, India</span>
            </p>

            {/* Stack badges */}
            <div className="footer-tech">
              {stack.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.1, borderColor: "var(--accent2)", color: "var(--accent2)" }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Nav links row */}
          <div className="footer-links">
            {["about", "skills", "experience", "projects", "contact"].map((id) => (
              <motion.a
                key={id}
                href={`#${id}`}
                whileHover={{ color: "var(--accent2)", y: -2 }}
                transition={{ duration: 0.2 }}
                style={{ textTransform: "capitalize" }}
              >
                {id}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.footer>

      {/* ── Scroll to top ── */}
      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#top"
            className="scroll-top"
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            ↑
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
