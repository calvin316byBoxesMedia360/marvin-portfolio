const express = require("express");
const multer  = require("multer");
const path    = require("path");
const fs      = require("fs");
const { execSync } = require("child_process");

const app  = express();
const ROOT = __dirname;
const PORT = 3001;

app.use(express.static(ROOT));
app.use(express.json());

// ── Image uploads ──────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(ROOT, "uploads")),
  filename:    (req, file, cb) => {
    const ext  = path.extname(file.originalname).toLowerCase();
    const name = `proj_${Date.now()}${ext}`;
    cb(null, name);
  },
});
const upload = multer({ storage, limits: { fileSize: 25 * 1024 * 1024 } });

// ── Helpers ─────────────────────────────────────────────────────
function readProjects() {
  return JSON.parse(fs.readFileSync(path.join(ROOT, "data", "projects.json"), "utf8"));
}

function saveProjects(projects) {
  fs.writeFileSync(
    path.join(ROOT, "data", "projects.json"),
    JSON.stringify(projects, null, 2)
  );
  regenerateDataJsx(projects);
}

function regenerateDataJsx(projects) {
  const lines = projects.map((p) => {
    const cover = p.cover ? JSON.stringify(p.cover) : "null";
    const real  = p.real  ? ", real: true" : "";
    return `  { n: ${JSON.stringify(p.n)}, title: ${JSON.stringify(p.title)}, client: ${JSON.stringify(p.client)}, year: ${JSON.stringify(p.year)}, tag: ${JSON.stringify(p.tag)}, cover: ${cover}${real} }`;
  });

  const jsx =
`const PROJECTS = [
${lines.join(",\n")},
];

const NAV = [
  { label: "Index",   href: "#work" },
  { label: "About",   href: "#about" },
  { label: "Contact", href: "#contact" },
];

window.PROJECTS = PROJECTS;
window.NAV = NAV;
`;
  fs.writeFileSync(path.join(ROOT, "src", "data.jsx"), jsx);
}

// ── API ─────────────────────────────────────────────────────────
app.get("/api/projects", (req, res) => {
  res.json(readProjects());
});

app.post("/api/projects", (req, res) => {
  try {
    saveProjects(req.body);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, error: "No file received" });
  res.json({ ok: true, path: "uploads/" + req.file.filename });
});

app.delete("/api/upload/:filename", (req, res) => {
  const filePath = path.join(ROOT, "uploads", path.basename(req.params.filename));
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  res.json({ ok: true });
});

app.get("/api/uploads", (req, res) => {
  const dir   = path.join(ROOT, "uploads");
  const exts  = /\.(jpg|jpeg|png|gif|webp)$/i;
  const files = fs.readdirSync(dir).filter((f) => exts.test(f));
  res.json(files.map((f) => ({ name: f, path: "uploads/" + f })));
});

app.post("/api/deploy", (req, res) => {
  try {
    const msg = (req.body.message || "content: update portfolio").replace(/"/g, "'");
    execSync("git add src/data.jsx data/projects.json uploads/", { cwd: ROOT, stdio: "pipe" });
    execSync(`git commit -m "${msg}" --allow-empty`,             { cwd: ROOT, stdio: "pipe" });
    execSync("git push origin main",                             { cwd: ROOT, stdio: "pipe" });
    res.json({ ok: true, message: "Deploy enviado. Netlify actualizará en ~30s." });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.stderr?.toString() || e.message });
  }
});

app.listen(PORT, () => {
  console.log("");
  console.log("  ● Admin panel →  http://localhost:" + PORT + "/admin.html");
  console.log("  ● Portfolio   →  http://localhost:" + PORT + "/portfolio.html");
  console.log("");
});
