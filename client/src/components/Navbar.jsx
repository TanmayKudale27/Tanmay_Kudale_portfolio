import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../data.js";

const items = ["about", "skills", "experience", "projects", "contact"];

// Split name into individually-animated letters
function AnimatedLogo({ name, className, dotClass, letterClass, lettersClass }) {
  const letters = name.split("");
  return (
    <a className={className} href="#top" aria-label={name}>
      <span className={lettersClass}>
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            className={letterClass}
            whileHover={{ y: -4, color: "var(--accent2)" }}
            transition={{ type: "spring", stiffness: 400, damping: 15, delay: i * 0.03 }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </span>
      <span className={dotClass}>.</span>
    </a>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    items.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  // close mobile nav when route changes
  useEffect(() => { setOpen(false); }, [active]);

  return (
    <header className="nav" style={scrolled ? { borderBottomColor: "rgba(255,255,255,.14)" } : {}}>
      <div className="wrap navin">
        {/* ── Logo ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedLogo
            name={profile.name}
            className="logo"
            lettersClass="logo-letters"
            letterClass="logo-letter"
            dotClass="logo-dot"
          />
        </motion.div>

        {/* ── Burger ── */}
        <button
          className="burger"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <span className="burger-icon">
            <motion.span animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} />
            <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} />
            <motion.span animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} />
          </span>
          {open ? "Close" : "Menu"}
        </button>

        {/* ── Desktop nav ── */}
        <motion.nav
          className={open ? "open" : ""}
          aria-label="Main"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {items.map((id, i) => (
            <motion.a
              key={id}
              href={`#${id}`}
              className={active === id ? "on" : ""}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              whileHover={{ y: -2 }}
            >
              {id}
            </motion.a>
          ))}
        </motion.nav>
      </div>
    </header>
  );
}
