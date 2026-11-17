import { motion } from "framer-motion";
import Reveal from "./Reveal.jsx";
import { skills } from "../data.js";

const ticker = ["React.js", "React Native", "Node.js", "Express.js", "MongoDB", "MySQL", "Redux", "AWS", "Firebase", "JWT", "REST APIs", "Git", "JavaScript", "PHP"];

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <Reveal>
          <div className="section-badge">
            <span className="section-badge-line" />
            Skills
          </div>
        </Reveal>
        <Reveal as="h2">My tech stack</Reveal>
      </div>

      {/* Infinite marquee */}
      <div className="marquee" aria-hidden="true">
        <div className="track">
          {[...ticker, ...ticker].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      <div className="wrap skillgrid">
        {Object.entries(skills).map(([group, items], gi) => (
          <motion.div
            key={group}
            className="card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: gi * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
          >
            <h3>{group}</h3>
            <ul className="tags">
              {items.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, scale: 0.65 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 + i * 0.04, type: "spring", stiffness: 280, damping: 18 }}
                  whileHover={{ scale: 1.12, y: -2 }}
                >
                  {s}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
