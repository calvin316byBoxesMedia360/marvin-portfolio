// Silent grid — 3 columns, image-first, with small meta below.
function GridLayout({ projects }) {
  const sectionStyle = {
    padding: "120px 32px 80px",
    maxWidth: 1400, margin: "0 auto",
  };
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "48px 24px",
    marginTop: 48,
  };
  // varied aspect ratios to create rhythm
  const ratios = ["4 / 5", "1 / 1", "4 / 3", "3 / 4", "1 / 1", "4 / 3", "4 / 5", "4 / 3", "1 / 1", "4 / 5", "3 / 4", "1 / 1"];

  return (
    <section id="work" style={sectionStyle} className="grid-section">
      <div className="section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
        <div>
          <div className="mono dim" style={{ marginBottom: 8 }}>§ 01 — Selected work</div>
          <h2 className="section-title" style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 0.95, letterSpacing: "-0.03em", margin: 0, fontWeight: 400 }}>
            Work <span className="serif dim">in grid</span>
          </h2>
        </div>
        <div className="mono dim">{String(projects.length).padStart(2, "0")} pieces</div>
      </div>

      <div style={gridStyle} className="grid-list">
        {projects.map((p, i) => (
          <a key={p.n} href={`#p-${p.n}`} className="grid-card"
             style={{ display: "block", color: "inherit" }}>
            <div style={{ overflow: "hidden" }}>
              <div className="grid-img" style={{ transition: "transform .6s cubic-bezier(.2,.8,.2,1)" }}>
                <Cover src={p.cover} alt={p.title} n={p.n} ratio={ratios[i % ratios.length]} />
              </div>
            </div>
            <div className="mono" style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
              <span>P.{p.n} — {p.tag}</span>
              <span className="dim">{p.year}</span>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        .grid-card:hover .grid-img { transform: scale(1.03); }
      `}</style>
    </section>
  );
}

window.GridLayout = GridLayout;
