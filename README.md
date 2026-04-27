# 🪐 Guía de Planet Crafter / Planet Crafter Guide

<p align="center">
  <strong>Guía no oficial bilingüe para Planet Crafter</strong><br>
  <em>Fan-made bilingual guide</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Game-Planet%20Crafter-6c5ce7?style=for-the-badge&logo=steam" alt="Planet Crafter">
  <img src="https://img.shields.io/badge/Developer-Miju%20Games-00cec9?style=for-the-badge" alt="Miju Games">
  <img src="https://img.shields.io/badge/Languages-ES%20%7C%20EN-00b894?style=for-the-badge" alt="Bilingual">
  <img src="https://img.shields.io/badge/Status-Online-success?style=for-the-badge" alt="Online">
</p>

<p align="center">
  <a href="https://mozzvader.github.io/PlanetCrafterGuide/es.html">🇪🇸 Versión en Español</a>
  &nbsp;•&nbsp;
  <a href="https://mozzvader.github.io/PlanetCrafterGuide/en.html">🇬🇧 English Version</a>
  &nbsp;•&nbsp;
  <a href="https://mozzvader.github.io/PlanetCrafterGuide/tracker.html">📊 Tracker</a>
</p>

---

## 📖 Sobre / About

Sitio web estático con una guía completa para **Planet Crafter**, el juego de supervivencia y terraformación espacial desarrollado por **Miju Games**. Incluye guía de inicio, información sobre etapas de terraformación, recursos, máquinas, consejos avanzados, y un tracker de progreso con persistencia local.

---

## ✨ Características / Features

- 🌍 **Guía bilingüe** — Versiones completas en español e inglés con selector de idioma
- 🚀 **8 etapas de inicio paso a paso** — Desde el Día 0 hasta el mid-game con recetas y tips reales
- 📈 **15 etapas de terraformación** — Con valores exactos de T.I. para cada milestone
- 💎 **13 recursos detallados** — Filtreables por rareza con descripciones y ubicaciones
- 🏭 **Máquinas organizadas por categoría** — Acordeón interactivo con detalles de cada una
- 🏆 **27 cofres dorados** — Con coordenadas exactas, bioma y descripción
- 📊 **Tracker de progreso** — Marca etapas y cofres completados, con barra de progreso, export/import y resumen estadístico
- 🔗 **Links útiles** — Wiki oficial y dos mapas interactivos de la comunidad
- 🎨 **Tema espacial oscuro** — Starfield animado, glassmorphism, efectos neon
- 📱 **Responsive** — Funciona en desktop, tablet y mobile
- ⚡ **Cero dependencias** — HTML, CSS y JavaScript vanilla puro. Sin frameworks, sin build tools
- 💾 **Persistencia local** — Preferencias de idioma y progreso del tracker guardados en localStorage

---

## 🛠️ Tecnologías / Tech Stack

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica |
| CSS3 | Grid, Flexbox, Custom Properties, Animaciones, Glassmorphism |
| JavaScript (Vanilla) | Canvas API (starfield), Intersection Observer, localStorage |
| GitHub Pages | Hosting estático |

---

## 📂 Estructura del Proyecto / Project Structure

```
PlanetCrafterGuide/
├── index.html          # Selector de idioma / Language picker
├── es.html             # Guía en español / Spanish guide
├── en.html             # Guía en inglés / English guide
├── tracker.html        # Tracker de progreso / Progress tracker
├── assets/
│   ├── style.css       # Estilos globales / Global styles
│   ├── script.js       # Interacciones de la guía / Guide interactions
│   └── tracker.js      # Lógica del tracker / Tracker logic
├── .nojekyll           # Habilita GitHub Pages con archivos que empiezan con punto
└── README.md           # Este archivo / This file
```

---

## 📄 Secciones de la Guía / Guide Sections

| # | Sección | Descripción |
|---|---------|-------------|
| 1 | Introducción | Contexto del juego y el objetivo del jugador |
| 2 | Primeros Pasos | Guía de inicio en 8 etapas (Día 0 a Mid-Game) |
| 3 | Índices de Terraformación | O2, Temperatura, Presión y Biomasa con tabs interactivos |
| 4 | Etapas de Terraformación | Las 15 etapas con valores exactos de T.I. |
| 5 | Recursos | 13 materiales filtreables por rareza |
| 6 | Máquinas | Organizadas por categoría en acordeón interactivo |
| 7 | Consejos Avanzados | 8 tips basados en mecánicas reales del juego |
| 8 | Cofres Dorados | 27 cofres con coordenadas, bioma y descripción |
| 9 | Links Útiles | Wiki oficial y mapas interactivos |

---

## 🚀 Cómo usar / How to Use

### Ver la guía en línea / View the guide online

Visita la página en GitHub Pages:

👉 **[mozzvader.github.io/PlanetCrafterGuide](https://mozzvader.github.io/PlanetCrafterGuide)**

### Ejecutar localmente / Run locally

```bash
# Clonar el repositorio
git clone https://github.com/MozzVader/PlanetCrafterGuide.git
cd PlanetCrafterGuide

# Abrir con un servidor local (opcional pero recomendado)
python3 -m http.server 8000
# O usar Live Server en VS Code

# Abrir en el navegador
# http://localhost:8000
```

---

## 📊 Tracker

La página de **Tracker** permite marcar tu progreso en el juego:

- ✅ Marcar las 15 etapas de terraformación completadas
- ✅ Marcar los 27 cofres dorados encontrados (con coordenadas y bioma como referencia)
- 📈 Ingresar tu T.I. actual para ver el progreso hacia la próxima etapa
- 💾 Exportar/Importar tu progreso (formato JSON)
- 🌐 Cambiar idioma ES/EN con un botón
- 🔄 Resetear todo el progreso

El progreso se guarda automáticamente en **localStorage** del navegador.

---

## 📝 Notas / Notes

- Esta es una guía **no oficial** creada por fans, para fans.
- Planet Crafter es un juego desarrollado por [Miju Games](https://store.steampowered.com/app/1284190/The_Planet_Crafter/).
- La información de la guía se basa en datos verificados por jugadores experimentados.
- Las coordenadas y datos de los cofres dorados fueron proporcionados por la comunidad.
- El sitio no usa cookies, no rastrea usuarios y no requiere conexión a internet para funcionar (una vez cargado).

---

## 🤝 Contribuciones / Contributing

¿Encontraste un error? ¿Querés sumar contenido?

1. Hacé un **Fork** del repositorio
2. Creá una rama con tu cambio (`git checkout -b fix/algo`)
3. Hacé commit (`git commit -m 'Corrijo algo'`)
4. Push a la rama (`git push origin fix/algo`)
5. Abrí un **Pull Request**

---

## 📜 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia [MIT](LICENSE).

---

## 🎮 Créditos

- **Planet Crafter** desarrollado por [Miju Games](https://store.steampowered.com/app/1284190/The_Planet_Crafter/)
- **Guía creada por** [MozzVader](https://github.com/MozzVader)
- **Sitio web diseñado con** ❤️ por fans, para fans
