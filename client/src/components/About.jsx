import { motion } from "framer-motion";
import Reveal from "./Reveal.jsx";
import { about, services } from "../data.js";

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <Reveal>
          <div className="section-badge">
            <span className="section-badge-line" />
            About me
          </div>
        </Reveal>
        <Reveal as="h2">The developer behind the work</Reveal>
        <div className="aboutgrid">
          <Reveal><p className="big">{about[0]}</p></Reveal>
          <Reveal delay={0.1}>{about.slice(1).map((t) => <p key={t} className="muted">{t}</p>)}</Reveal>
        </div>

        <Reveal as="h3" className="sub">What I can build for you</Reveal>
        <div className="services">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className="card"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, rotate: -0.5, borderColor: "rgba(124,139,255,.5)" }}
            >
              <div className="ic">{s.icon}</div>
              <h3>{s.title}</h3>
              <p className="muted">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
