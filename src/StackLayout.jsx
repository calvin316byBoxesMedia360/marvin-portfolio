// Full-bleed vertical stack — one project per viewport.
function StackLayout({ projects }) {
  const wrap = {
    padding: "120px 0 0",
  };

  return (
    <section id="work" style={wrap}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px 48px" }}>
        <div className="mono dim" style={{ marginBottom: 8 }}>§ 01 — Selected work</div>
        <h2 className="section-title" style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 0.95, letterSpacing: "-0.03em", margin: 0, fontWeight: 400 }}>
          One <span className="serif dim">at a time</span>
        </h2>
      </div>

      {projects.map((p, i) => (
        <StackRow key={p.n} p={p} i={i} />
      ))}
    </section>
  );
}

function StackRow({ p, i }) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const reversed = i % 2 === 1;
  const rowStyle = {
    padding: "80px 32px",
    borderTop: "1px solid var(--line)",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 48,
    alignItems: "center",
    maxWidth: 1400, margin: "0 auto",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(40px)",
    transition: "opacity .9s ease, transform .9s cubic-bezier(.2,.8,.2,1)",
  };
  const imgCol = { order: reversed ? 2 : 1 };
  const textCol = { order: reversed ? 1 : 2 };

  return (
    <div ref={ref} style={rowStyle} className="stack-row">
      <div style={imgCol}>
        <Cover src={p.cover} alt={p.title} n={p.n} ratio="4 / 3" />
      </div>
      <div style={textCol}>
        <div className="mono dim" style={{ marginBottom: 24 }}>P.{p.n} / {p.tag}</div>
        <h3 className="stack-title" style={{ fontSize: "clamp(32px, 4.5vw, 64px)", lineHeight: 1, letterSpacing: "-0.03em", margin: "0 0 32px", fontWeight: 400 }}>
          {p.title}
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", rowGap: 10, columnGap: 24, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          <div className="dim">Client</div><div>{p.client}</div>
          <div className="dim">Year</div><div>{p.year}</div>
          <div className="dim">Scope</div><div>{p.tag}</div>
        </div>
      </div>
    </div>
  );
}

window.StackLayout = StackLayout;
