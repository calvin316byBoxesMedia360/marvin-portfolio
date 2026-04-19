function Footer({ lang }) {
  const year = new Date().getFullYear();
  const t = window.I18N[lang || "es"].footer;

  const wrap = {
    padding: "120px 32px 40px",
    borderTop: "1px solid var(--line)",
    maxWidth: 1400, margin: "0 auto",
  };
  const big = {
    fontSize: "clamp(56px, 11vw, 180px)",
    lineHeight: 0.92,
    letterSpacing: "-0.04em",
    fontWeight: 400,
    margin: 0,
  };
  const bottom = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 24,
    marginTop: 80,
    paddingTop: 24,
    borderTop: "1px solid var(--line)",
  };

  const Link = ({ href, children }) => (
    <a href={href} className="mono" style={{ color: "var(--fg)", display: "inline-flex", alignItems: "center", gap: 6 }}
       onMouseOver={(e) => e.currentTarget.style.color = "var(--accent)"}
       onMouseOut={(e) => e.currentTarget.style.color = "var(--fg)"}>
      {children} <span aria-hidden>↗</span>
    </a>
  );

  return (
    <footer id="contact" style={wrap} className="footer-root">
      <div className="mono dim" style={{ marginBottom: 48 }}>{t.label}</div>
      <h2 style={big} className="footer-big">
        {t.line1}<br />
        <span className="serif" style={{ color: "var(--accent)" }}>{t.accent}</span>{t.line2}
      </h2>

      <div className="footer-cta-row" style={{ display: "flex", gap: 24, marginTop: 40, alignItems: "center", flexWrap: "wrap" }}>
        <a href="mailto:marvin@boxesmedia360.com" className="footer-cta" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "16px 22px", border: "1px solid var(--fg)",
          background: "var(--fg)", color: "var(--bg)",
          fontFamily: "JetBrains Mono, monospace", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase",
        }}>
          marvin@boxesmedia360.com <span aria-hidden>→</span>
        </a>
        <span className="mono dim">{t.response}</span>
      </div>

      <div style={bottom} className="footer-bottom">
        <div>
          <div className="mono dim" style={{ marginBottom: 8 }}>{t.elsewhere}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Link href="https://boxesmedia360.com">boxesmedia360.com</Link>
            <Link href="#">instagram</Link>
            <Link href="#">linkedin</Link>
            <Link href="#">behance</Link>
          </div>
        </div>
        <div>
          <div className="mono dim" style={{ marginBottom: 8 }}>{t.services}</div>
          <div className="mono" style={{ lineHeight: 2 }}>
            {t.svc.map((s, i) => <React.Fragment key={i}>{s}<br /></React.Fragment>)}
          </div>
        </div>
        <div>
          <div className="mono dim" style={{ marginBottom: 8 }}>{t.idx_label}</div>
          <div className="mono" style={{ lineHeight: 2 }}>
            <a href="#top">{t.top}</a><br />
            <a href="#work">{t.work}</a><br />
            <a href="#about">{t.about}</a><br />
            <a href="#contact">{t.contact}</a>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="mono dim" style={{ marginBottom: 8 }}>{t.colophon}</div>
          <div className="mono" style={{ lineHeight: 2 }}>
            © {year} Marvin Martinez<br />
            {t.rights}<br />
            {t.typeset}
          </div>
        </div>
      </div>

      <div className="mono dim" style={{ marginTop: 60, display: "flex", justifyContent: "space-between" }}>
        <span>v.1.0 — {year}</span>
        <span><span className="blink">▮</span> ready</span>
      </div>
    </footer>
  );
}

window.Footer = Footer;
