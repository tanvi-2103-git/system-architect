import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ProjectDetail {
  label: string;
  content: string;
}

interface FeaturedProject {
  tag: string;
  title: string;
  description: string;
  highlights: string[];
  details: ProjectDetail[];
}

const projects: FeaturedProject[] = [
  {
    tag: "SaaS Platform",
    title: "Multi-Tenant SaaS Platform for Tiffin Management",
    description:
      "A scalable full-stack system designed to support multiple organizations with role-based access control and real-time ordering workflows.",
    highlights: [
      "Multi-tenant architecture",
      "JWT-based RBAC system",
      "Real-time ordering + cart system",
      "REST API design using Node.js/NestJS",
      "MongoDB schema optimization",
      "Integration: Cloudinary, Joi, Multer, Bcrypt, Nodemailer",
    ],
    details: [
      {
        label: "Problem",
        content:
          "Tiffin service operators lacked a centralized system to manage multiple outlets, track orders, and handle role-based workflows efficiently.",
      },
      {
        label: "Solution",
        content:
          "Built a multi-tenant SaaS platform with organization-level data isolation, role-based dashboards, and real-time order management.",
      },
      {
        label: "Architecture Thinking",
        content:
          "Designed around tenant isolation at the database level, JWT-based auth with hierarchical RBAC, and event-driven ordering pipeline.",
      },
      {
        label: "Impact",
        content:
          "Enabled seamless multi-outlet management with sub-second API responses and zero data leakage between tenants.",
      },
    ],
  },
  {
    tag: "Data Engineering",
    title: "Large-Scale Data Processing Engine (5M+ Records)",
    description:
      "Engineered a backend system to efficiently process massive Excel datasets with optimized memory and performance.",
    highlights: [
      "Streaming-based processing",
      "Batch inserts with PostgreSQL",
      "Transaction safety + retry logic",
      "Logging and monitoring system",
      "Performance optimization under heavy load",
    ],
    details: [
      {
        label: "System Design",
        content:
          "Architected a streaming pipeline that processes Excel files in chunks, avoiding memory overflows while maintaining data integrity.",
      },
      {
        label: "Performance Optimization",
        content:
          "Reduced processing time by 85% through batch inserts, connection pooling, and strategic indexing on PostgreSQL tables.",
      },
      {
        label: "Scalability Approach",
        content:
          "Built with horizontal scalability in mind — stateless workers, queue-based job distribution, and configurable batch sizes.",
      },
    ],
  },
];

const FeaturedProjectCard = ({ project, index }: { project: FeaturedProject; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="relative"
    >
      <div className="glass-card p-8 md:p-12 space-y-8">
        {/* Tag */}
        <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
          {project.tag}
        </span>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary leading-relaxed max-w-3xl">
          {project.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2">
          {project.highlights.map((h) => (
            <span
              key={h}
              className="text-xs px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground border border-border/50"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Details grid */}
        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border/30">
          {project.details.map((d) => (
            <div key={d.label} className="space-y-2">
              <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">
                {d.label}
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {d.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProjects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Featured Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16 tracking-tight">
            Case Studies
          </h2>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, i) => (
            <FeaturedProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
