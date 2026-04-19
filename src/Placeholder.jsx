// Striped placeholder for projects without a real image yet
function Placeholder({ label = "drop project image", ratio = "4 / 3", n }) {
  const stripeStyle = {
    aspectRatio: ratio,
    width: "100%",
    display: "grid",
    placeItems: "center",
    position: "relative",
    backgroundImage: `repeating-linear-gradient(
      -45deg,
      var(--line) 0,
      var(--line) 1px,
      transparent 1px,
      transparent 10px
    )`,
    border: "1px solid var(--line)",
    overflow: "hidden",
  };
  const inner = {
    fontFamily: "JetBrains Mono, monospace",
    fontSize: 10,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--dim)",
    background: "var(--bg)",
    padding: "6px 10px",
    border: "1px solid var(--line)",
  };
  return (
    <div style={stripeStyle}>
      {n && (
        <div style={{ position: "absolute", top: 10, left: 12, ...inner, border: 0, padding: 0, background: "transparent" }}>
          P.{n}
        </div>
      )}
      <div style={inner}>{label}</div>
    </div>
  );
}

// Safe image that falls back to placeholder on error / when src is null
function Cover({ src, alt, n, ratio }) {
  const [err, setErr] = React.useState(false);
  if (!src || err) return <Placeholder n={n} ratio={ratio} label={`drop ${alt.toLowerCase()}`} />;
  return (
    <div style={{ aspectRatio: ratio, width: "100%", overflow: "hidden", background: "var(--line)" }}>
      <img
        src={src}
        alt={alt}
        onError={() => setErr(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

window.Placeholder = Placeholder;
window.Cover = Cover;
