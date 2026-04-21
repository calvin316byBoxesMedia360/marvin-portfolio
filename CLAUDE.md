# CLAUDE.md — Instrucciones para el agente

Este archivo le dice a Claude Code cómo trabajar en este proyecto.

---

## Contexto del proyecto

Portfolio de **Marvin Martinez** — diseñador gráfico, CEO de Boxes Media 360.
Sitio estático (HTML + React CDN) con admin panel local en Node.js.

- **Live:** https://marvin-portfolio-mm.netlify.app/portfolio.html
- **Admin:** `node server.js` → http://localhost:3001/admin.html
- **Repo:** https://github.com/calvin316byBoxesMedia360/marvin-portfolio

---

## Reglas de trabajo

### Idioma
Comunicar siempre en **español**. El código y los archivos pueden estar en inglés.

### Iniciativa
Marvin dijo "toma la iniciativa". Para cambios pequeños y reversibles: ejecutar sin preguntar. Para cambios estructurales grandes: presentar plan primero.

### Estética
El sitio tiene una estética **editorial minimalista** deliberada. No agregar elementos que la debiliten. Cualquier nuevo contenido visual debe mantener coherencia: limpio, sistemático, no documentación de taller cruda.

---

## Arquitectura — lo que NO cambiar sin buena razón

- **Sin bundler intencionalmente.** React carga vía CDN + Babel. No migrar a Vite/webpack sin discutir.
- **`src/data.jsx` es AUTO-GENERADO** por `server.js` desde `data/projects.json`. No editarlo a mano.
- **Admin local only.** `admin.html` y `server.js` no están pensados para ser públicos. No deployar el admin sin protección de contraseña.
- **Multilenguaje en `src/i18n.jsx`.** Todo el texto del sitio vive ahí. No hardcodear strings en los componentes.

---

## Flujo de datos

```
Admin panel (browser)
  → POST /api/projects (server.js)
    → escribe data/projects.json
    → regenera src/data.jsx
      → portfolio.html carga src/data.jsx al abrir
```

---

## Deploy

El botón Deploy en el admin hace:
1. `git add src/data.jsx data/projects.json uploads/`
2. `git commit -m "[mensaje]"`
3. `git push origin main`
4. `netlify deploy --prod --dir=.`

---

## Pendientes conocidos (al 2026-04-21)

- Implementar Camino C: reorganizar 12 proyectos en 6 "casos" temáticos con las fotos de uploads/
- Añadir i18n a GridLayout y StackLayout (actualmente solo IndexLayout tiene traducciones de sección)
- Admin desde móvil: ngrok o Railway con contraseña
- Conectar GitHub webhook con Netlify para auto-deploy sin usar CLI

---

## Archivos de referencia rápida

| Archivo | Propósito |
|---|---|
| `src/i18n.jsx` | Todas las traducciones ES/EN |
| `data/projects.json` | Datos de proyectos (editar aquí) |
| `src/App.jsx` | Estado global: theme, lang, layout |
| `server.js` | API local: /api/projects, /api/upload, /api/deploy |
| `netlify.toml` | Config de Netlify |
