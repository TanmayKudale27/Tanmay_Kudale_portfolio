import { motion } from "framer-motion";
import Reveal from "./Reveal.jsx";
import { experience, education } from "../data.js";

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <Reveal>
          <div className="section-badge">
            <span className="section-badge-line" />
            Experience
          </div>
        </Reveal>
        <Reveal as="h2">Work & Education</Reveal>

        <div className="timeline">
          <motion.span
            className="tline"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          {experience.map((j) => (
            <Reveal key={j.role} className="job">
              <h3>{j.role}</h3>
              <p className="when">🏢 {j.company} · {j.when}</p>
              <ul>
                {j.points.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    {p}
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal as="h3" className="sub">🎓 Education & Training</Reveal>
        <div className="edu">
          {education.map((e, i) => (
            <motion.div
              key={e.title}
              className="card"
              whileHover={{ y: -6 }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3>{e.title}</h3>
              <p className="when">{e.meta}</p>
              <p className="muted">{e.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
