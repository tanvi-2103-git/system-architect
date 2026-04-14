const Footer = () => (
  <footer className="py-8 px-6 border-t border-border/30">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <p className="text-xs text-text-tertiary">
        © {new Date().getFullYear()} Tanvi Dudam
      </p>
      <p className="text-xs text-text-tertiary">
        Built with intention.
      </p>
    </div>
  </footer>
);

export default Footer;
