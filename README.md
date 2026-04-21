# Marvin Martinez — Portfolio

Portfolio personal de Marvin Martinez, diseñador gráfico y CEO de Boxes Media 360.

**Sitio en vivo:** https://marvin-portfolio-mm.netlify.app/portfolio.html
**GitHub:** https://github.com/calvin316byBoxesMedia360/marvin-portfolio

---

## Correr localmente

```bash
node server.js
```

- Admin panel: http://localhost:3001/admin.html
- Portfolio:   http://localhost:3001/portfolio.html

Desde otra PC o celular en la misma WiFi: `http://192.168.1.67:3001/admin.html`

---

## Editar contenido (flujo normal)

1. `node server.js`
2. Abrir http://localhost:3001/admin.html
3. Seleccionar proyecto → editar nombre/cliente/año/tag → subir imagen
4. Pestaña **Preview** para verificar en Desktop / Mobile 390px
5. Pestaña **Deploy** → botón DEPLOY → sitio actualizado en ~30s

---

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | HTML + React 18 (CDN) + Babel standalone |
| Fuentes | Inter Tight, JetBrains Mono, Instrument Serif |
| Admin | Node.js + Express + Multer (local only) |
| Datos | `data/projects.json` → genera `src/data.jsx` |
| Deploy | Netlify (cuenta SkyBox) |
| Repo | GitHub (calvin316byBoxesMedia360) |

No hay bundler. No hay build step. El frontend carga JSX directamente en el browser vía Babel CDN.

---

## Estructura

```
marvin_porfolio/
├── portfolio.html        ← entrada del sitio
├── admin.html            ← editor local (no se despliega públicamente)
├── server.js             ← API local (Express, puerto 3001)
├── data/
│   └── projects.json     ← fuente de verdad de proyectos
├── src/
│   ├── i18n.jsx          ← traducciones ES/EN
│   ├── data.jsx          ← AUTO-GENERADO — no editar a mano
│   ├── App.jsx           ← root component
│   ├── Nav.jsx           ← navegación + toggles tema/idioma
│   ├── Hero.jsx          ← sección hero
│   ├── IndexLayout.jsx   ← layout de trabajo (default)
│   ├── GridLayout.jsx    ← layout alternativo grid
│   ├── StackLayout.jsx   ← layout alternativo stack
│   ├── About.jsx         ← sección about
│   ├── Footer.jsx        ← footer + contacto
│   ├── Tweaks.jsx        ← panel de tweaks (activado desde preview.html)
│   └── Placeholder.jsx   ← componente placeholder para proyectos sin imagen
├── assets/               ← imágenes de muestra
├── uploads/              ← fotos de proyectos reales
├── netlify.toml          ← config de Netlify
└── package.json          ← deps: express, multer
```

---

## Editar texto / traducciones

Todo el texto del sitio está en `src/i18n.jsx`. Estructura:

```js
I18N.es.hero.bio     // párrafo bio en español
I18N.en.hero.bio     // párrafo bio en inglés
I18N.es.footer.response  // "Respuesta en 24-48h · PT"
```

---

## Editar proyectos a mano (sin admin)

Editar `data/projects.json` y luego reinicar el servidor — o simplemente usar el admin panel.

**No editar `src/data.jsx` a mano** — es regenerado automáticamente por server.js.

---

## Deploy manual desde terminal

```bash
netlify deploy --prod --dir=.
```
