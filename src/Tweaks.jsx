// Tweaks panel — toggled on/off by the host toolbar.
function Tweaks({ state, setState }) {
  const [on, setOn] = React.useState(false);

  React.useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === "__activate_edit_mode") setOn(true);
      if (e.data?.type === "__deactivate_edit_mode") setOn(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  const update = (patch) => {
    const next = { ...state, ...patch };
    setState(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*");
  };

  const Seg = ({ k, options }) => (
    <div className="opts">
      {options.map((o) => (
        <button key={o.v}
          className={state[k] === o.v ? "active" : ""}
          onClick={() => update({ [k]: o.v })}>{o.l}</button>
      ))}
    </div>
  );

  return (
    <div className={`tweaks ${on ? "on" : ""}`}>
      <h4>
        <span>Tweaks</span>
        <span className="dim">v.1</span>
      </h4>

      <div className="row">
        <label>Layout</label>
        <Seg k="layout" options={[
          { v: "index", l: "Index" },
          { v: "grid",  l: "Grid" },
          { v: "stack", l: "Stack" },
        ]}/>
      </div>

      <div className="row">
        <label>Theme</label>
        <Seg k="theme" options={[
          { v: "dark",  l: "Dark" },
          { v: "light", l: "Light" },
        ]}/>
      </div>

      <div className="row">
        <label>Accent</label>
        <div className="opts">
          {[
            { v: "mint",  c: "oklch(0.86 0.09 162)" },
            { v: "amber", c: "oklch(0.82 0.14 70)" },
            { v: "white", c: "var(--fg)" },
          ].map((s) => (
            <button key={s.v}
              className={"swatch " + (state.accent === s.v ? "active" : "")}
              style={{ background: s.c }}
              onClick={() => update({ accent: s.v })}
              aria-label={s.v} />
          ))}
        </div>
      </div>

      <div className="row">
        <label>Numbers</label>
        <Seg k="showNumbers" options={[
          { v: true,  l: "On" },
          { v: false, l: "Off" },
        ]}/>
      </div>
    </div>
  );
}

window.Tweaks = Tweaks;
