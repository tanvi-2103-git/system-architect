import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Send } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder
    alert("Thank you for your message!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Let's Connect
          </h2>
          <p className="text-text-secondary">
            Have a project in mind or want to collaborate? Reach out.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="glass-card p-8 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-text-tertiary uppercase tracking-wider mb-2">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-text-tertiary focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="Your name"
                required
                maxLength={100}
              />
            </div>
            <div>
              <label className="block text-xs text-text-tertiary uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-text-tertiary focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="you@email.com"
                required
                maxLength={255}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-text-tertiary uppercase tracking-wider mb-2">
              Message
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-text-tertiary focus:outline-none focus:border-primary/50 transition-colors resize-none"
              placeholder="Tell me about your project..."
              required
              maxLength={1000}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm text-primary-foreground transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
            style={{ background: "var(--gradient-primary)" }}
          >
            Send Message
            <Send className="w-4 h-4" />
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center justify-center gap-6 mt-12"
        >
          <a
            href="https://github.com/tanvi-2103-git"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <span className="w-1 h-1 rounded-full bg-border" />
          <a
            href="https://www.linkedin.com/in/tanvi-dudam-42475821b/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-foreground transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
