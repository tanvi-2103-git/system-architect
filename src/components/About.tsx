import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">About</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 tracking-tight">
            Building systems that scale.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid md:grid-cols-2 gap-12"
        >
          <div className="space-y-5">
            <p className="text-text-secondary leading-relaxed">
              I'm a Full Stack Developer with 2+ years of experience building production-grade systems. My focus lies in <span className="text-foreground font-medium">backend engineering</span>, <span className="text-foreground font-medium">system design</span>, and architecting solutions that handle real-world complexity.
            </p>
            <p className="text-text-secondary leading-relaxed">
              I think in terms of data flows, API contracts, and system boundaries — not just pixels. Every line of code I write is informed by a deep understanding of scalability, reliability, and maintainability.
            </p>
          </div>
          <div className="space-y-5">
            <p className="text-text-secondary leading-relaxed">
              From designing multi-tenant SaaS architectures to engineering bulk data processing pipelines handling millions of records, I bring a systems-first approach to every project.
            </p>
            <p className="text-text-secondary leading-relaxed">
              My stack spans the MERN and MEAN ecosystems, with a strong emphasis on Node.js, NestJS, PostgreSQL, and MongoDB. I care deeply about clean architecture, type safety, and developer experience.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
