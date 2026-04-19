function About({ lang }) {
  const ref = React.useRef(null);
  const [v, setV] = React.useState(false);
  React.useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.2 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const t = window.I18N[lang || "es"].about;

  const section = {
    padding: "140px 32px",
    maxWidth: 1400, margin: "0 auto",
    borderTop: "1px solid var(--line)",
  };
  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: 32,
    opacity: v ? 1 : 0,
    transform: v ? "translateY(0)" : "translateY(30px)",
    transition: "opacity 1s ease, transform 1s cubic-bezier(.2,.8,.2,1)",
  };

  return (
    <section id="about" style={section} ref={ref} className="about-section">
      <div style={grid} className="about-grid">
        <div style={{ gridColumn: "span 3" }}>
          <div className="mono dim">{t.label}</div>
        </div>
        <div style={{ gridColumn: "span 9" }}>
          <p className="about-lede" style={{
            fontSize: "clamp(28px, 3.6vw, 52px)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            margin: "0 0 80px",
            fontWeight: 400,
            maxWidth: 900,
            textWrap: "pretty",
          }}>
            {t.lede_pre}
            <span className="serif" style={{ color: "var(--accent)" }}>{t.lede_accent}</span>
            {t.lede_mid}
            <span className="serif">{t.lede_serif}</span>
            {t.lede_post}
          </p>

          <div className="about-principles" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
            borderTop: "1px solid var(--line)",
            paddingTop: 24,
          }}>
            {t.principles.map((p) => (
              <div key={p.n}>
                <div className="mono dim" style={{ marginBottom: 14 }}>{p.n}</div>
                <div style={{ fontSize: 22, marginBottom: 10, letterSpacing: "-0.01em" }}>{p.t}</div>
                <div className="dim" style={{ fontSize: 14, lineHeight: 1.55 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.About = About;
