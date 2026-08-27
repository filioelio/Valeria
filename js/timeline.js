/**
 * timeline.js — Construye la línea de tiempo de Valeria a partir de un
 * arreglo de datos. Agregar un nuevo año (2027, 2028...) es tan simple
 * como añadir un nuevo objeto a TIMELINE_DATA: el resto del sitio no
 * necesita rediseñarse.
 */
(function () {
    "use strict";

    const TIMELINE_DATA = [
        {
            year: "2024",
            caption: "Llegaste a nuestras vidas",
            locked: false,
            events: [
                {
                    icon: "👶",
                    date: "29 de junio de 2024",
                    title: "Nacimiento",
                    text: "El día más importante de mi vida. Llegaste pequeñita a llenarlo todo.",
                    photo: "assets/fotos/nacimiento/bebe_recien_nacida_manta_floral_2.jpg"
                },
                {
                    icon: "🌙",
                    date: "Julio 2024",
                    title: "Primer mes",
                    text: "Cada noche aprendiendo a cuidarte, cada mañana un motivo nuevo para sonreír.",
                    photo: "assets/fotos/nacimiento/bebe_manta_lunares_rosa.jpg"
                },
                {
                    icon: "😊",
                    date: "2024",
                    title: "Primeras sonrisas",
                    text: "Tus primeras sonrisas se convirtieron en la razón de mis días.",
                    photo: "assets/fotos/nacimiento/bebe_recien_nacida_gorro_blanco_1.jpg"
                },
                {
                    icon: "🧸",
                    date: "2024",
                    title: "Primeros juegos",
                    text: "Descubriendo el mundo entre sonajeros, colores y risas.",
                    photo: "assets/fotos/nacimiento/bebe_recien_nacida_boca_abierta.jpg"
                },
                {
                    icon: "🎄",
                    date: "Diciembre 2024",
                    title: "Primera Navidad",
                    text: "Tu primera Navidad, envuelta en luces, mantas calientitas y mucho amor.",
                    photo: "assets/fotos/2024/papa_cargando_calle_navidad.jpg"
                }
            ]
        },
        {
            year: "2025",
            caption: "Nuestro primer año de aventuras",
            locked: false,
            events: [
                {
                    icon: "🚼",
                    date: "2025",
                    title: "Primeros pasos",
                    text: "Paso a paso empezaste a caminar hacia el mundo... y hacia mí.",
                    photo: "assets/fotos/2024/bebe_andador_rosa.jpg"
                },
                {
                    icon: "🗣️",
                    date: "2025",
                    title: "Primeras palabras",
                    text: "\"Papá\" se convirtió en la palabra más hermosa que he escuchado.",
                    photo: "assets/fotos/2024/papa_bebe_gorro_tejido.jpg"
                },
                {
                    icon: "🎈",
                    date: "2025",
                    title: "Juegos y risas",
                    text: "Cada juego contigo se volvió mi momento favorito del día.",
                    photo: "assets/fotos/2024/bebe_hamaca_sonajero_jirafa.jpg"
                },
                {
                    icon: "🚶‍♀️",
                    date: "2025",
                    title: "Paseos",
                    text: "Explorando calles, parques y rincones nuevos, siempre de la mano.",
                    photo: "assets/fotos/2024/hombre_sendero_arbolado.jpg"
                },
                {
                    icon: "🔍",
                    date: "2025",
                    title: "Descubrimientos",
                    text: "Cada día una pregunta nueva, cada pregunta una aventura nueva.",
                    photo: "assets/fotos/2024/valeria_reja_amarilla.jpg"
                },
                {
                    icon: "🎂",
                    date: "29 de junio de 2025",
                    title: "Primer cumpleaños",
                    text: "365 días de amor cumplidos. Ver el detalle en la sección de tu primer añito.",
                    photo: "assets/fotos/2024/bebe_bautizo_velo_rosa.jpg"
                }
            ]
        },
        {
            year: "2026",
            caption: "Mi pequeña exploradora",
            locked: false,
            events: [
                {
                    icon: "🏔️",
                    date: "2026",
                    title: "Nuevas aventuras",
                    text: "Juntos frente al Cañón de Apurímac: tan pequeña frente a un paisaje tan grande.",
                    photo: "assets/fotos/2026/papa_valeria_canon_colca_1.jpg"
                },
                {
                    icon: "💬",
                    date: "2026",
                    title: "Nuevas palabras",
                    text: "Tu vocabulario crece cada semana y con él, mis ganas de escucharte contar el mundo.",
                    photo: "assets/fotos/2026/valeria_pasto_jugando.jpg"
                },
                {
                    icon: "🪨",
                    date: "2026",
                    title: "Juegos entre rocas",
                    text: "Explorando el bosque de piedras como una pequeña exploradora curiosa.",
                    photo: "assets/fotos/2026/valeria_bosque_piedras_1.jpg"
                },
                {
                    icon: "🌄",
                    date: "2026",
                    title: "Paseos por el campo",
                    text: "Campos verdes, montañas y tu risa como música de fondo.",
                    photo: "assets/fotos/2026/papa_valeria_campo_verde_1.jpg"
                },
                {
                    icon: "👑",
                    date: "29 de junio de 2026",
                    title: "Segundo cumpleaños",
                    text: "Dos años de aventuras juntos. Ver el detalle en la sección de tus 2 añitos.",
                    photo: "assets/fotos/2026/valeria_sombrero_flor_mirador_1.jpg"
                },
                {
                    icon: "📸",
                    date: "Hoy",
                    title: "Recuerdos actuales",
                    text: "Así te ves hoy: curiosa, alegre y llena de vida.",
                    photo: "assets/fotos/2026/selfie_papa_valeria_calle.jpg"
                }
            ]
        }
    ];

    /** Años futuros mostrados como capítulos bloqueados (se agregan solos). */
    const FUTURE_YEARS = [2027, 2028, 2029, 2030];

    function crearElemento(tag, className, html) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (html !== undefined) el.innerHTML = html;
        return el;
    }

    function renderEvento(evento, index) {
        const li = crearElemento("li", "timeline-event reveal");
        li.style.transitionDelay = (index % 4) * 0.08 + "s";

        const card = crearElemento("div", "memory-card");

        if (evento.photo) {
            const img = document.createElement("img");
            img.src = evento.photo;
            img.alt = evento.title + " — " + window.CONFIG.nombreCorto;
            img.className = "memory-photo";
            img.loading = "lazy";
            img.tabIndex = 0;
            img.setAttribute("role", "button");
            img.dataset.lightbox = evento.photo;
            img.dataset.caption = evento.title;
            card.appendChild(img);
        } else {
            const placeholder = crearElemento(
                "div",
                "memory-photo",
                '<span aria-hidden="true" style="display:flex;align-items:center;justify-content:center;height:100%;font-size:1.6rem;background:var(--gradient-warm);border-radius:var(--radius-sm);">' +
                evento.icon +
                "</span>"
            );
            // REEMPLAZAR POR FOTO REAL cuando esté disponible.
            card.appendChild(placeholder);
        }

        const textWrap = crearElemento(
            "div",
            "memory-text",
            `<span class="memory-icon" aria-hidden="true">${evento.icon}</span>
             <span class="memory-date">${evento.date}</span>
             <h4>${evento.title}</h4>
             <p>${evento.text}</p>`
        );
        card.appendChild(textWrap);
        li.appendChild(card);
        return li;
    }

    function renderAnio(anioData) {
        const section = crearElemento("div", "timeline-year");
        section.id = "year-" + anioData.year;

        const header = crearElemento(
            "div",
            "timeline-year-header",
            `<span class="year">${anioData.year}</span><p class="year-caption">${anioData.caption}</p>`
        );
        section.appendChild(header);

        const track = crearElemento("ul", "timeline-track");
        anioData.events.forEach((evento, i) => track.appendChild(renderEvento(evento, i)));
        section.appendChild(track);

        return section;
    }

    function renderFuturo(container) {
        const wrap = crearElemento("div", "future-years");
        FUTURE_YEARS.forEach((year) => {
            const lock = crearElemento(
                "div",
                "chapter-lock",
                `<span class="lock-icon" aria-hidden="true">🔒</span><strong>${year}</strong><br><span>Próximo capítulo</span>`
            );
            wrap.appendChild(lock);
        });
        container.appendChild(wrap);
    }

    function renderTimeline() {
        const container = document.getElementById("timeline-container");
        if (!container) return;

        TIMELINE_DATA.forEach((anioData) => container.appendChild(renderAnio(anioData)));

        const futureContainer = document.getElementById("future-chapters");
        if (futureContainer) renderFuturo(futureContainer);

        // Notificar a app.js que hay nuevos elementos ".reveal" para observar.
        document.dispatchEvent(new CustomEvent("valeria:contentReady"));
    }

    window.ValeriaTimeline = { renderTimeline, TIMELINE_DATA };
})();
