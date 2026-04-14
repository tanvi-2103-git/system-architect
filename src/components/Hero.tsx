import { motion } from "framer-motion";
import { Github, Linkedin, ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-30 animate-pulse-glow"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-text-tertiary mb-6">
            Full Stack Developer
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
            <span className="text-foreground">Tanvi</span>
            <br />
            <span className="gradient-text">Dudam</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl font-light text-text-secondary max-w-2xl mx-auto mb-4"
        >
          Engineering scalable systems. Building reliable products.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-base text-text-tertiary max-w-xl mx-auto mb-10"
        >
          Full Stack Developer specializing in backend systems, APIs, and high-performance applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg font-medium text-sm text-primary-foreground transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
            style={{ background: "var(--gradient-primary)" }}
          >
            View Work
          </a>
          <a
            href="#"
            className="px-6 py-3 rounded-lg font-medium text-sm border border-border text-text-secondary hover:text-foreground hover:border-primary/30 transition-all duration-300"
          >
            Download Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center justify-center gap-5"
        >
          <a
            href="https://github.com/tanvi-2103-git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-tertiary hover:text-foreground transition-colors duration-300"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/tanvi-dudam-42475821b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-tertiary hover:text-foreground transition-colors duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="w-4 h-4 text-text-tertiary animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
