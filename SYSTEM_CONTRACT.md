# System Contract — Portfolio Marvin Martinez
*Documento vivo. Última actualización: 2026-04-21*

Este documento define el propósito, las decisiones de diseño, los principios técnicos y el acuerdo de trabajo para este proyecto. Es la referencia cuando hay dudas sobre si algo "encaja" o no.

---

## 1. Propósito del portfolio

No es un portafolio de freelancer. Es la presentación pública del CEO-diseñador-constructor de una agencia (Boxes Media 360) que opera con su propio stack.

**El portfolio debe comunicar:**
- Pensamiento de sistemas aplicado a problemas visuales reales
- Capacidad de construcción práctica (del concepto al archivo final)
- Identidad distintiva: disciplinado, editorial, con opinión

**El portfolio NO es:**
- Un catálogo de servicios
- Un álbum de trabajos de taller sin estructura
- Un sitio genérico de diseñador freelancer

---

## 2. Principios de diseño (no negociables)

| Principio | Definición |
|---|---|
| **Editorial** | Todo se presenta como publicación, no como vitrina |
| **Sistemático** | Los trabajos son casos, no proyectos sueltos |
| **Funcional** | La estética sirve al propósito, no al revés |
| **Minimalista** | Solo lo necesario. Cada elemento justificado |

---

## 3. Sistema visual

```
Tipografía:   Inter Tight (cuerpo) · JetBrains Mono (etiquetas) · Instrument Serif (acento)
Temas:        Oscuro (default) / Claro — toggle siempre visible en Nav
Acento:       Mint oklch(0.86 0.09 162) / Amber / White — configurable
Grilla:       Máx 1400px, padding 32px desktop / 20px móvil
```

---

## 4. Estructura de contenido

### Layouts disponibles
- **Index** (default): lista editorial con hover preview
- **Grid**: grilla de miniaturas
- **Stack**: proyectos apilados en detalle

### Proyectos — Camino C (pendiente de implementar)
Los 12 slots deben reorganizarse en **casos temáticos**, no proyectos sueltos:

| # | Caso | Contenido |
|---|---|---|
| 01 | COEX Oro | 1 imagen hero |
| 02 | Character Series | 6 camisetas Bob Esponja como sistema |
| 03 | #Tribe Caps | Gorras como sistema de variantes |
| 04 | Pharma Packaging | MOXOF + Oftafilm |
| 05 | Broadcast Brand | Femenina 102.5 |
| 06 | Print & Production | Montaje de documentación |

---

## 5. Idiomas

El sitio es bilingüe **ES / EN** con toggle en la navegación.
- ES: idioma primario / default
- EN: traducción completa disponible
- Todas las strings en `src/i18n.jsx`

---

## 6. Arquitectura técnica (decisiones tomadas)

| Decisión | Razón |
|---|---|
| Sin bundler (React CDN) | Simplicidad. Sin build step que romper. Iterable en segundos. |
| Admin local (no cloud) | Seguridad. El admin tiene acceso de escritura al filesystem. |
| data.json → data.jsx | Compatibilidad con el sistema existente sin refactoring. |
| Netlify como hosting | Gratis en free tier, deploy inmediato, dominio incluido. |

---

## 7. Flujo de trabajo establecido

```
Editar contenido:   node server.js → admin.html
Verificar:          Pestaña Preview (desktop/mobile)
Publicar:           Pestaña Deploy → botón DEPLOY
Resultado:          Sitio actualizado en ~30 segundos
```

---

## 8. Accesos

| Recurso | URL / Dato |
|---|---|
| Sitio en vivo | https://marvin-portfolio-mm.netlify.app/portfolio.html |
| Admin Netlify | https://app.netlify.com/projects/marvin-portfolio-mm |
| Repo GitHub | https://github.com/calvin316byBoxesMedia360/marvin-portfolio |
| Email en el sitio | marvin@boxesmedia360.com |
| Cuenta Netlify | skynetnewsbyboxesmedia360@gmail.com (equipo SkyBox) |

---

## 9. Pendientes priorizados

1. **Implementar Camino C** — reorganizar contenido en 6 casos con fotos de uploads/
2. **Admin remoto** — ngrok o servidor con contraseña para editar desde móvil fuera de casa
3. **i18n en GridLayout y StackLayout** — completar multilenguaje en todos los layouts
4. **Conectar social links** — Instagram, LinkedIn, Behance (actualmente `href="#"`)
5. **Dominio custom** — conectar dominio propio a Netlify cuando esté listo

---

## 10. Lo que NO hacer

- No agregar proyectos como fotos crudas de taller sin tratamiento editorial
- No romper el sistema de i18n hardcodeando texto en los componentes
- No editar `src/data.jsx` a mano (es auto-generado)
- No deployar el admin sin protección de contraseña
- No migrar a bundler sin discutirlo (cambio estructural grande)
