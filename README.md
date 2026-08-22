# Valeria Maximiliana — Mi pequeña princesa 💗

Un sitio web emotivo, interactivo y en constante crecimiento, dedicado a
**Valeria Maximiliana Carrasco** (nacida el 29 de junio de 2024). Cuenta su
historia desde el día que nació hasta hoy, y está pensado para seguir
agregando capítulos año tras año.

No usa backend, ni base de datos, ni frameworks pesados: solo HTML5, CSS3 y
JavaScript vanilla, además de una pequeña librería de QR cargada por CDN.

---

## 1. Ejecutar el sitio localmente

No necesitas instalar nada. Simplemente:

1. Descarga o clona esta carpeta completa (`valeria/`).
2. Haz doble clic en `index.html` (o ábrelo con tu navegador favorito).

Si algunas fotografías no cargan al abrir el archivo directamente por temas
de seguridad del navegador, puedes levantar un servidor local muy simple:

```bash
# Con Python instalado, dentro de la carpeta valeria/
python3 -m http.server 8080
```

Y abre `http://localhost:8080` en tu navegador.

---

## 2. Publicar en GitHub Pages

1. Sube esta carpeta a un repositorio de GitHub (por ejemplo `valeria`).
2. Entra a **Settings → Pages**.
3. En "Build and deployment" selecciona **Deploy from a branch**.
4. Elige la rama **main** y la carpeta **/(root)**.
5. Guarda. GitHub te dará una URL similar a:

```
https://usuario.github.io/valeria/
```

Con esa URL puedes generar un código QR desde `qr-generador.html` para
compartir el sitio fácilmente (por ejemplo, en una invitación impresa).

---

## 3. Estructura del proyecto

```
valeria/
│
├── index.html                 → Página principal (toda la historia)
├── qr-generador.html          → Generador de códigos QR
├── README.md
│
├── css/
│   ├── styles.css             → Estilos generales, colores, layout
│   ├── animations.css         → Animaciones y keyframes
│   └── responsive.css         → Ajustes por tamaño de pantalla
│
├── js/
│   ├── config.js              → Nombre, fecha de nacimiento y textos base
│   ├── app.js                 → Orquestador: intro, música, scroll, nav
│   ├── counter.js             → Contador de vida (edad en tiempo real)
│   ├── timeline.js            → Línea de tiempo por años/capítulos
│   ├── gallery.js             → Galería de fotos + modal
│   ├── particles.js           → Fondo de estrellas/partículas
│   └── surprises.js           → Carta, "¿sabes cuánto te quiero?", secretos
│
└── assets/
    ├── fotos/
    │   ├── nacimiento/        → Fotos del nacimiento
    │   ├── 2024/               → Fotos del año 2024
    │   ├── 2025/               → Fotos del año 2025 (agregar cuando existan)
    │   └── 2026/               → Fotos del año 2026
    │
    ├── music/                 → Música de fondo (mp3)
    └── icons/                 → Íconos adicionales, si se necesitan
```

---

## 4. Cómo agregar o cambiar fotografías

1. Coloca la fotografía dentro de la carpeta del año correspondiente, por
   ejemplo `assets/fotos/2025/primeros-pasos.jpg`.
2. Abre `js/gallery.js` y agrega un nuevo objeto dentro del arreglo del año
   correspondiente en `GALLERY_DATA`, siguiendo el mismo formato:

```javascript
{
    "src": "assets/fotos/2025/primeros-pasos.jpg",
    "caption": "Sus primeros pasos"
}
```

3. Si quieres que la fotografía aparezca también en la línea de tiempo,
   ábrela en `js/timeline.js` y agrega la ruta en el campo `photo` del
   evento correspondiente.

Se recomienda usar fotografías en formato `.jpg` con un ancho máximo de
1600px para que el sitio cargue rápido, especialmente en celulares.

---

## 5. Cómo agregar un nuevo año (por ejemplo, 2027)

Todo se controla desde `js/timeline.js`:

1. Crea la carpeta `assets/fotos/2027/` y coloca ahí las fotos nuevas.
2. En `js/timeline.js`, agrega un nuevo objeto al arreglo `TIMELINE_DATA`:

```javascript
{
    year: "2027",
    caption: "Un nuevo capítulo de aventuras",
    locked: false,
    events: [
        { icon: "🎨", date: "2027", title: "Un nuevo momento", text: "Descríbelo aquí.", photo: "assets/fotos/2027/foto.jpg" }
    ]
}
```

3. Quita el año `2027` del arreglo `FUTURE_YEARS` (en el mismo archivo) para
   que deje de mostrarse como "capítulo bloqueado" 🔒.
4. Si quieres que la galería también tenga una pestaña para ese año, agrega
   `{ key: "2027", label: "2027" }` al arreglo `TABS` en `js/gallery.js`, y
   crea `"2027": []` (o con fotos) dentro de `GALLERY_DATA`.

---

## 6. Música de fondo

1. Coloca un archivo de audio (por ejemplo `cancion-para-valeria.mp3`) dentro
   de `assets/music/`.
2. Si usas otro nombre de archivo, actualiza la ruta en `js/config.js`
   (`rutaMusica`) y en la etiqueta `<source>` dentro de `index.html`.

La música nunca se reproduce automáticamente si el navegador lo bloquea: el
usuario siempre tiene el control total mediante el botón 🎵.

---

## 7. Editar los textos principales

Los textos más importantes (la historia del nacimiento, la carta de papá,
etc.) están directamente en `index.html`, buscables por sus comentarios,
por ejemplo:

```html
<!-- Texto fácilmente editable -->
```

Los datos base (nombre completo, fecha de nacimiento, autor) se controlan
desde un solo lugar: `js/config.js`.

---

## 8. Accesibilidad y rendimiento

- Las imágenes no críticas usan `loading="lazy"`.
- Las animaciones respetan `prefers-reduced-motion`.
- La navegación es utilizable con teclado (tabulador + Enter/Espacio).
- Los botones importantes tienen `aria-label`.

---

Hecho con todo el amor de papá, para Valeria Maximiliana. 💗
Esta historia continuará…
