function Nav({ theme, onToggleTheme, lang, onToggleLang }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t = window.I18N[lang].nav;
  const navItems = [
    { label: t[0], href: "#work" },
    { label: t[1], href: "#about" },
    { label: t[2], href: "#contact" },
  ];

  const styleNav = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
    padding: "18px 32px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    background: scrolled ? "color-mix(in oklab, var(--bg) 85%, transparent)" : "transparent",
    backdropFilter: scrolled ? "blur(10px)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
    borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
    transition: "background .3s ease, border-color .3s ease",
  };

  const btnStyle = {
    background: "none", border: "none", cursor: "pointer", padding: 0,
    fontFamily: "JetBrains Mono, monospace", fontSize: 11,
    letterSpacing: "0.08em", textTransform: "uppercase",
    color: "var(--dim)",
    transition: "color .15s ease",
  };

  return (
    <nav style={styleNav} className="nav-root">
      <a href="#top" className="mono" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 8, height: 8, background: "var(--accent)", borderRadius: "50%" }} />
        <span className="nav-logo-full">MARVIN MARTINEZ</span>
        <span className="nav-logo-short">M.M.</span>
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="nav-links">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className="mono" style={{ color: "var(--dim)" }}
             onMouseOver={(e) => e.currentTarget.style.color = "var(--fg)"}
             onMouseOut={(e) => e.currentTarget.style.color = "var(--dim)"}>
            {item.label}
          </a>
        ))}

        <span className="mono" style={{ color: "var(--line)", userSelect: "none" }}>·</span>

        <button
          style={btnStyle}
          onClick={onToggleTheme}
          onMouseOver={(e) => e.currentTarget.style.color = "var(--fg)"}
          onMouseOut={(e) => e.currentTarget.style.color = "var(--dim)"}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☽" : "○"}
        </button>

        <button
          style={btnStyle}
          onClick={onToggleLang}
          onMouseOver={(e) => e.currentTarget.style.color = "var(--fg)"}
          onMouseOut={(e) => e.currentTarget.style.color = "var(--dim)"}
          aria-label="Toggle language"
        >
          {lang === "es" ? "EN" : "ES"}
        </button>
      </div>
    </nav>
  );
}

window.Nav = Nav;
