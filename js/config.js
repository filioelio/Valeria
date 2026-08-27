/**
 * CONFIG — Datos centrales del sitio "Valeria Maximiliana".
 * Cambia estos valores para actualizar textos y fecha en todo el sitio.
 */
const CONFIG = {
    nombre: "Valeria Maximiliana Carrasco Pinares",
    nombreCorto: "Valeria",
    fechaNacimiento: "2024-06-29", // AAAA-MM-DD
    autor: "Papá",
    fraseNacimiento: "El 29 de junio de 2024, mi mundo cambió para siempre.",
    rutaFotoNacimiento: "assets/fotos/nacimiento/bebe_recien_nacida_cama_1.jpg",
    rutaFotoHoy: "assets/fotos/2026/selfie_papa_valeria_calle.jpg",
    rutaMusica: "assets/music/cancion-para-valeria.mp3"
};

// Se expone globalmente para que el resto de módulos (counter.js, timeline.js,
// gallery.js, surprises.js, app.js) puedan usarlo sin depender de imports/módulos.
window.CONFIG = CONFIG;
