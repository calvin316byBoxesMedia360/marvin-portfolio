function App() {
  const [state, setState] = React.useState(window.__TWEAKS);
  const [lang, setLang] = React.useState(() => localStorage.getItem("mm_lang") || "es");

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);
    document.documentElement.setAttribute("data-accent", state.accent);
  }, [state.theme, state.accent]);

  React.useEffect(() => {
    const update = () => {
      const w = document.body.getBoundingClientRect().width || window.innerWidth;
      document.body.classList.toggle("is-narrow", w <= 820);
      document.body.classList.toggle("is-very-narrow", w <= 480);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    window.addEventListener("resize", update);
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, []);

  const toggleTheme = () => setState(s => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }));
  const toggleLang  = () => setLang(l => { const n = l === "es" ? "en" : "es"; localStorage.setItem("mm_lang", n); return n; });

  let WorkLayout;
  if (state.layout === "grid") WorkLayout = window.GridLayout;
  else if (state.layout === "stack") WorkLayout = window.StackLayout;
  else WorkLayout = window.IndexLayout;

  return (
    <>
      <window.Nav theme={state.theme} onToggleTheme={toggleTheme} lang={lang} onToggleLang={toggleLang} />
      <window.Hero lang={lang} />
      <WorkLayout projects={window.PROJECTS} showNumbers={state.showNumbers} lang={lang} />
      <window.About lang={lang} />
      <window.Footer lang={lang} />
      <window.Tweaks state={state} setState={setState} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
