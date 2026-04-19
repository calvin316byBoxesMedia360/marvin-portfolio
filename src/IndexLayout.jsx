function IndexLayout({ projects, showNumbers, lang }) {
  const [hovered, setHovered] = React.useState(null);
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
  const wrapRef = React.useRef(null);

  const t = window.I18N[lang || "es"].work;

  const onMove = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const sectionStyle = {
    padding: "120px 32px 80px",
    maxWidth: 1400, margin: "0 auto", position: "relative",
  };

  const headerRow = {
    display: "grid",
    gridTemplateColumns: showNumbers ? "60px 1fr 260px 160px 80px" : "1fr 260px 160px 80px",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: "1px solid var(--line)",
  };

  const rowStyle = (active, any) => ({
    display: "grid",
    gridTemplateColumns: showNumbers ? "60px 1fr 260px 160px 80px" : "1fr 260px 160px 80px",
    alignItems: "center",
    padding: "26px 0",
    borderBottom: "1px solid var(--line)",
    cursor: "pointer",
    transition: "opacity .25s ease, padding .25s ease, color .25s ease",
    opacity: any && !active ? 0.35 : 1,
    paddingLeft: active ? 20 : 0,
    color: active ? "var(--accent)" : "var(--fg)",
  });

  return (
    <section id="work" style={sectionStyle} ref={wrapRef} onMouseMove={onMove} className="index-section">
      <div className="section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40 }}>
        <div>
          <div className="mono dim" style={{ marginBottom: 8 }}>{t.label}</div>
          <h2 className="section-title" style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 0.95, letterSpacing: "-0.03em", margin: 0, fontWeight: 400 }}>
            {t.title} <span className="serif dim">{t.title_serif}</span>
          </h2>
        </div>
        <div className="mono dim">{String(projects.length).padStart(2, "0")} {t.entries}</div>
      </div>

      <div className="index-header-row" style={{ ...headerRow, color: "var(--dim)", fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" }}>
        {showNumbers && <div>{t.col_num}</div>}
        <div>{t.col_project}</div>
        <div className="index-col-client">{t.col_client}</div>
        <div className="index-col-tag">{t.col_cat}</div>
        <div style={{ textAlign: "right" }}>{t.col_year}</div>
      </div>

      <div>
        {projects.map((p) => {
          const active = hovered === p.n;
          const any = hovered !== null;
          return (
            <a
              key={p.n}
              href={`#p-${p.n}`}
              className="index-row"
              style={rowStyle(active, any)}
              onMouseEnter={() => setHovered(p.n)}
              onMouseLeave={() => setHovered(null)}
            >
              {showNumbers && <div className="mono">P.{p.n}</div>}
              <div className="index-row-title" style={{ fontSize: "clamp(22px, 2.2vw, 32px)", letterSpacing: "-0.01em", fontWeight: 400 }}>
                {p.title}
              </div>
              <div className="mono dim index-col-client">{p.client}</div>
              <div className="mono index-col-tag">{p.tag}</div>
              <div className="mono" style={{ textAlign: "right" }}>{p.year}</div>
            </a>
          );
        })}
      </div>

      {hovered && (() => {
        const p = projects.find((x) => x.n === hovered);
        if (!p) return null;
        return (
          <div
            className="index-hover-preview"
            style={{
              position: "fixed",
              left: mouse.x + (wrapRef.current?.getBoundingClientRect().left || 0) + 40,
              top: mouse.y + (wrapRef.current?.getBoundingClientRect().top || 0) - 140,
              width: 340,
              pointerEvents: "none",
              zIndex: 40,
              transition: "opacity .15s ease",
            }}
          >
            <Cover src={p.cover} alt={p.title} n={p.n} ratio="4 / 3" />
            <div className="mono" style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
              <span>P.{p.n}</span>
              <span className="dim">{p.tag}</span>
            </div>
          </div>
        );
      })()}
    </section>
  );
}

window.IndexLayout = IndexLayout;
