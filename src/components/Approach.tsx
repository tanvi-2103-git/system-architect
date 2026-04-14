import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const focuses = [
  {
    title: "Scalable Backend Systems",
    description: "Designing APIs and services that handle growing traffic and data without degradation.",
  },
  {
    title: "Clean API Design",
    description: "RESTful contracts with proper status codes, validation, and consistent response patterns.",
  },
  {
    title: "Real-World Data Complexity",
    description: "Handling messy data, edge cases, and performance bottlenecks in production environments.",
  },
  {
    title: "Maintainable Architecture",
    description: "Code that's easy to extend, test, and reason about — built for teams, not just for demos.",
  },
];

const Approach = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="approach" className="py-32 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Engineering</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            What I Focus On
          </h2>
          <p className="text-text-secondary mb-16 max-w-2xl">
            Beyond writing code — building systems with intention.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {focuses.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="glass-card p-6 glow-border group hover:bg-surface-elevated/60 transition-all duration-500"
            >
              <div className="w-8 h-0.5 bg-primary/40 mb-5 group-hover:w-12 transition-all duration-500" />
              <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;
