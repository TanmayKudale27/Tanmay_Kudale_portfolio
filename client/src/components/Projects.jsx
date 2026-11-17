import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal.jsx";
import { fallbackProjects } from "../data.js";

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => Array.isArray(d) && d.length && setProjects(d))
      .catch(() => {}); // keep built-in data when API is offline
  }, []);

  return (
    <section id="projects">
      <div className="wrap">
        <Reveal>
          <div className="section-badge">
            <span className="section-badge-line" />
            Projects
          </div>
        </Reveal>
        <Reveal as="h2">Things I've built</Reveal>
        <div className="projects">
          {projects.map((p, i) => (
            <motion.article
              key={p._id}
              className="card project"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              <h3>{p.title}</h3>
              <p className="muted" style={{ marginTop: "10px" }}>{p.description}</p>
              {p.features?.length > 0 && (
                <ul className="feat">
                  {p.features.map((f) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                    >
                      {f}
                    </motion.li>
                  ))}
                </ul>
              )}
              {p.tech?.length > 0 && (
                <div className="tech-tags">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              )}
              {p.link && (
                <motion.a
                  className="btn primary"
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: "22px", display: "inline-flex" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  🔗 View project
                </motion.a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
