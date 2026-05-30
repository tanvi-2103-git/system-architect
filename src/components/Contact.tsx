import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail, Download, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  const validate = (f: FormState): Errors => {
    const e: Errors = {};
    if (!f.name.trim()) e.name = "Please enter your name";
    else if (f.name.trim().length < 2) e.name = "Name is too short";
    if (!f.email.trim()) e.email = "Please enter your email";
    else if (!EMAIL_RE.test(f.email.trim())) e.email = "Enter a valid email address";
    if (!f.subject.trim()) e.subject = "Please enter a subject";
    if (!f.message.trim()) e.message = "Please enter a message";
    else if (f.message.trim().length < 10) e.message = "Message should be at least 10 characters";
    return e;
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eMap = validate(form);
    if (Object.keys(eMap).length) {
      setErrors(eMap);
      return;
    }
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          website: form.website,
        },
      });
      if (error || (data && (data as any).error)) {
        throw new Error((data as any)?.error || error?.message || "Send failed");
      }
      toast.success("Message sent successfully. I'll get back to you soon.");
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      console.error("Contact send error:", err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const inputBase =
    "w-full bg-secondary/50 border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-all";

  const actions = [
    {
      icon: Mail,
      label: "Email Me",
      sub: "tanvidudam0@gmail.com",
      href: "mailto:tanvidudam0@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      sub: "Let's connect",
      href: "https://www.linkedin.com/in/tanvi-dudam-42475821b/",
    },
    {
      icon: Github,
      label: "GitHub",
      sub: "@tanvi-2103-git",
      href: "https://github.com/tanvi-2103-git",
    },
    {
      icon: Download,
      label: "Download Resume",
      sub: "PDF · 1 page",
      href: "/resume.pdf",
      download: true,
    },
  ];

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
            Let's Build Something
          </h2>
          <p className="text-text-secondary">
            Have a project in mind or want to collaborate? Send me a note.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          onSubmit={handleSubmit}
          noValidate
          className="glass-card p-8 space-y-6"
        >
          {/* Honeypot — hidden from real users */}
          <div className="hidden" aria-hidden="true">
            <label>
              Website
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
              />
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-text-tertiary uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={`${inputBase} ${errors.name ? "border-destructive/60" : "border-border/50"}`}
                placeholder="Your name"
                maxLength={100}
                disabled={sending}
              />
              {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs text-text-tertiary uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={`${inputBase} ${errors.email ? "border-destructive/60" : "border-border/50"}`}
                placeholder="you@email.com"
                maxLength={255}
                disabled={sending}
              />
              {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs text-text-tertiary uppercase tracking-wider mb-2">
              Subject
            </label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => update("subject", e.target.value)}
              className={`${inputBase} ${errors.subject ? "border-destructive/60" : "border-border/50"}`}
              placeholder="What's this about?"
              maxLength={200}
              disabled={sending}
            />
            {errors.subject && <p className="mt-1.5 text-xs text-destructive">{errors.subject}</p>}
          </div>

          <div>
            <label className="block text-xs text-text-tertiary uppercase tracking-wider mb-2">
              Message
            </label>
            <textarea
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              rows={5}
              className={`${inputBase} resize-none ${errors.message ? "border-destructive/60" : "border-border/50"}`}
              placeholder="Tell me about your project..."
              maxLength={5000}
              disabled={sending}
            />
            {errors.message && (
              <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm text-primary-foreground transition-all duration-300 hover:opacity-90 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ background: "var(--gradient-primary)" }}
          >
            {sending ? (
              <>
                Sending
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              <>
                Send Message
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10"
        >
          {actions.map(({ icon: Icon, label, sub, href, download }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              download={download}
              className="group glass-card p-4 flex flex-col gap-2 hover:border-primary/40 hover:-translate-y-0.5 transition-all"
            >
              <Icon className="w-4 h-4 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-text-tertiary truncate">{sub}</p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
