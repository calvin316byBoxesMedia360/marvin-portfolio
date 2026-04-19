function Hero({ lang }) {
  const [time, setTime] = React.useState("");
  React.useEffect(() => {
    const tick = () => {
      const d = new Date();
      const opts = { timeZone: "America/Los_Angeles", hour: "2-digit", minute: "2-digit", hour12: false };
      setTime(d.toLocaleTimeString("en-US", opts) + " PT");
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const t = window.I18N[lang].hero;

  const heroStyle = {
    minHeight: "100vh",
    padding: "120px 32px 80px",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    alignContent: "space-between",
    maxWidth: 1400, margin: "0 auto",
  };

  const topMeta = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 24,
    paddingBottom: 24,
    borderBottom: "1px solid var(--line)",
  };

  const titleStyle = {
    fontSize: "clamp(56px, 11vw, 180px)",
    lineHeight: 0.92,
    letterSpacing: "-0.04em",
    fontWeight: 400,
    margin: "80px 0 40px",
    fontFeatureSettings: '"ss01", "cv11"',
  };

  const bottomRow = {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: 24,
    paddingTop: 24,
    borderTop: "1px solid var(--line)",
    alignItems: "end",
  };

  return (
    <header style={heroStyle} id="top" className="hero-root">
      <div style={topMeta} className="hero-meta">
        <div>
          <div className="mono dim">{t.idx}</div>
        </div>
        <div>
          <div className="mono dim">{t.based}</div>
          <div className="mono">{t.loc_val}</div>
        </div>
        <div>
          <div className="mono dim">{t.status}</div>
          <div className="mono"><span className="accent">●</span> {t.available}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="mono dim">{t.local}</div>
          <div className="mono">{time}</div>
        </div>
      </div>

      <div>
        <h1 style={titleStyle} className="hero-title">
          {t.t1}<br />
          {t.t2a}<span className="serif" style={{ color: "var(--accent)" }}>{t.t2b}</span>,<br />
          {t.t3}<br />
          {t.t4a}<span className="serif">{t.t4b}</span>.
        </h1>
      </div>

      <div style={bottomRow} className="hero-bottom">
        <div style={{ gridColumn: "span 5" }}>
          <p style={{ fontSize: 17, lineHeight: 1.5, maxWidth: 520, margin: 0 }}>
            {t.bio}
          </p>
        </div>
        <div style={{ gridColumn: "span 3" }}>
          <div className="mono dim" style={{ marginBottom: 6 }}>{t.disc_label}</div>
          <div className="mono">{t.disc}</div>
        </div>
        <div style={{ gridColumn: "span 4", textAlign: "right" }}>
          <a href="#work" className="mono hero-cta" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "12px 18px", border: "1px solid var(--fg)",
            background: "var(--fg)", color: "var(--bg)",
          }}>
            {t.cta}
            <span aria-hidden>↓</span>
          </a>
        </div>
      </div>
    </header>
  );
}

window.Hero = Hero;
