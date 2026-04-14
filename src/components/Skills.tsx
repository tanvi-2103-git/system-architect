import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "Angular", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "NestJS", "Express"],
  },
  {
    title: "Data",
    skills: ["MongoDB", "PostgreSQL", "SQL Optimization"],
  },
  {
    title: "Systems & Tools",
    skills: ["JWT", "RBAC", "REST APIs", "Cloudinary", "Multer", "Joi", "Bcrypt", "Nodemailer"],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Expertise</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16 tracking-tight">
            Core Skills
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="glass-card p-6 glow-border group hover:bg-surface-elevated/60 transition-all duration-500"
            >
              <h3 className="text-sm font-semibold text-foreground mb-4 tracking-wide">
                {group.title}
              </h3>
              <div className="space-y-2">
                {group.skills.map((skill) => (
                  <p
                    key={skill}
                    className="text-sm text-text-secondary group-hover:text-text-secondary/90 transition-colors"
                  >
                    {skill}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
