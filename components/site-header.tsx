const navItems = [
  { href: "/about", label: "About" },
  { href: "/talks", label: "Talks" },
  { href: "/journal", label: "Journal" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand-mark" href="/" aria-label="RGL home">
        <span className="brand-initials">RGL</span>
        <span className="brand-name">Robert Labayen</span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="button button-small header-cta" href="/contact">
        Book Robert
      </a>

      <details className="mobile-menu">
        <summary>Menu</summary>
        <nav aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
          <a href="/contact">Book Robert</a>
        </nav>
      </details>
    </header>
  );
}
