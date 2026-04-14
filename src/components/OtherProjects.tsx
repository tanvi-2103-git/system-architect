import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "NSE Live Tracker",
    description: "Real-time stock market tracker with live data visualization for NSE-listed companies.",
    link: "https://nse-live-tracker.vercel.app/",
  },
  {
    title: "Apex Helmets",
    description: "E-commerce storefront with product catalog, filtering, and responsive design.",
    link: "https://apexhelmets.vercel.app",
  },
  {
    title: "Pokémon Explorer Pro",
    description: "Feature-rich Pokémon data explorer with search, filters, and detailed views.",
    link: "https://pokemon-explorer-pro.vercel.app/",
  },
];

const OtherProjects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-xl font-semibold text-foreground mb-10 tracking-tight">
            Other Projects
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="glass-card p-6 glow-border group hover:bg-surface-elevated/60 transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <ExternalLink className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors shrink-0 mt-0.5" />
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {project.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherProjects;
