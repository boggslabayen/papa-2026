export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <a className="brand-mark brand-mark-light" href="/">
          <span className="brand-initials">RGL</span>
          <span className="brand-name">Robert Labayen</span>
        </a>
        <p>Ideas for people who want their work to mean more.</p>
      </div>

      <div className="footer-links">
        <a href="/about">About</a>
        <a href="/talks">Talks & Workshops</a>
        <a href="/journal">Journal</a>
        <a href="/contact">Book Robert</a>
      </div>

      <div className="footer-meta">
        <span>Creative leadership / Speaking / Art</span>
        <span>Philippines and beyond</span>
      </div>
    </footer>
  );
}
