/**
 * app.js — Orquestador principal del sitio "Valeria Maximiliana".
 * Se encarga de: la introducción cinematográfica, la música de fondo,
 * las animaciones de scroll (IntersectionObserver), la navegación de
 * progreso, el botón "volver arriba" y las polaroids.
 */
(function () {
    "use strict";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.addEventListener("DOMContentLoaded", () => {
        aplicarConfiguracionBasica();
        window.ValeriaParticles.initIntroStars(document.getElementById("intro-stars"));
        window.ValeriaParticles.initBackgroundParticles(document.getElementById("bg-particles"));

        iniciarIntro();
        window.ValeriaCounter.iniciarContador();
        window.ValeriaTimeline.renderTimeline();
        window.ValeriaGallery.initGallery();

        window.ValeriaSurprises.initSecretMessages();
        window.ValeriaSurprises.initLetter();
        window.ValeriaSurprises.initLoveQuestion();
        window.ValeriaSurprises.initHeartTriggers();
        window.ValeriaSurprises.initBirthdayEffects();
        window.ValeriaSurprises.initFootprints();

        initMusicControl();
        initScrollReveal();
        initProgressNav();
        initBackToTop();
        initPolaroids();
    });

    /** Aplica nombre/fecha desde CONFIG a los textos marcados en el HTML. */
    function aplicarConfiguracionBasica() {
        const cfg = window.CONFIG;
        document.title = cfg.nombreCorto + " Maximiliana — Mi pequeña princesa";

        document.querySelectorAll("[data-config='nombre']").forEach((el) => (el.textContent = cfg.nombre));
        document.querySelectorAll("[data-config='nombreCorto']").forEach((el) => (el.textContent = cfg.nombreCorto));
        document.querySelectorAll("[data-config='autor']").forEach((el) => (el.textContent = cfg.autor));
    }

    /* ============================================================
       INTRO CINEMATOGRÁFICA
       ============================================================ */
    function iniciarIntro() {
        const intro = document.getElementById("intro");
        if (!intro) return;

        const linea1 = document.getElementById("intro-line-1");
        const linea2 = document.getElementById("intro-line-2");
        const fecha = document.getElementById("intro-date");
        const nombreBlock = document.getElementById("intro-name-block");
        const cta = document.getElementById("intro-cta");
        const startBtn = document.getElementById("start-journey-btn");

        const tiempos = reduceMotion
            ? { l1: 100, l2: 100, fecha: 100, nombre: 100, cta: 100 }
            : { l1: 900, l2: 2600, fecha: 4300, nombre: 6400, cta: 7600 };

        setTimeout(() => linea1 && linea1.classList.add("is-visible"), tiempos.l1);
        setTimeout(() => linea2 && linea2.classList.add("is-visible"), tiempos.l2);
        setTimeout(() => fecha && fecha.classList.add("is-visible"), tiempos.fecha);
        setTimeout(() => nombreBlock && nombreBlock.classList.add("is-visible"), tiempos.nombre);
        setTimeout(() => cta && cta.classList.add("is-visible"), tiempos.cta);

        function cerrarIntro() {
            intro.classList.add("intro--hidden");
            document.body.style.overflow = "";
            document.getElementById("main-content")?.removeAttribute("aria-hidden");
            intentarReproducirMusica();
        }

        if (startBtn) {
            startBtn.addEventListener("click", cerrarIntro);
        }

        document.body.style.overflow = "hidden";
        setTimeout(() => {
            document.body.style.overflow = "";
        }, tiempos.cta + 200);
    }

    /* ============================================================
       MÚSICA DE FONDO
       ============================================================ */
    let musicaIntentada = false;

    function initMusicControl() {
        const audio = document.getElementById("bg-music");
        const btn = document.getElementById("music-toggle-btn");
        if (!audio || !btn) return;

        audio.volume = 0.28;

        btn.addEventListener("click", () => {
            if (audio.paused) {
                audio.play().then(() => actualizarBotonMusica(true)).catch(() => {
                    // El archivo de música todavía no existe o el navegador lo bloqueó.
                    actualizarBotonMusica(false);
                });
            } else {
                audio.pause();
                actualizarBotonMusica(false);
            }
        });

        audio.addEventListener("play", () => actualizarBotonMusica(true));
        audio.addEventListener("pause", () => actualizarBotonMusica(false));
    }

    function actualizarBotonMusica(reproduciendo) {
        const btn = document.getElementById("music-toggle-btn");
        if (!btn) return;
        btn.dataset.playing = reproduciendo ? "true" : "false";
        btn.setAttribute("aria-pressed", reproduciendo ? "true" : "false");
        btn.setAttribute("aria-label", reproduciendo ? "Pausar música" : "Reproducir música");
    }

    /** Intenta reproducir al comenzar la historia; si el navegador lo bloquea
     * (autoplay policy), simplemente se deja el botón disponible para que el
     * usuario decida manualmente — nunca se fuerza el audio. */
    function intentarReproducirMusica() {
        if (musicaIntentada) return;
        musicaIntentada = true;
        const audio = document.getElementById("bg-music");
        if (!audio) return;
        audio.volume = 0.28;
        const promesa = audio.play();
        if (promesa && promesa.catch) {
            promesa.then(() => actualizarBotonMusica(true)).catch(() => actualizarBotonMusica(false));
        }
    }

    /* ============================================================
       SCROLL REVEAL (IntersectionObserver)
       ============================================================ */
    function initScrollReveal() {
        const observer = crearRevealObserver();

        function observarTodo() {
            document.querySelectorAll(".reveal:not(.is-observed)").forEach((el) => {
                el.classList.add("is-observed");
                observer.observe(el);
            });
        }

        observarTodo();
        // La línea de tiempo y la galería insertan contenido dinámicamente.
        document.addEventListener("valeria:contentReady", observarTodo);
    }

    function crearRevealObserver() {
        if (reduceMotion) {
            // Sin animaciones intensas: se muestra todo de inmediato.
            return {
                observe(el) {
                    el.classList.add("is-visible");
                }
            };
        }
        return new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );
    }

    /* ============================================================
       NAVEGACIÓN DE PROGRESO (puntos laterales)
       ============================================================ */
    function initProgressNav() {
        const nav = document.getElementById("progress-nav");
        if (!nav) return;

        const chapters = Array.from(document.querySelectorAll("[data-chapter]"));
        if (!chapters.length) return;

        chapters.forEach((chapter, i) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "dot";
            dot.setAttribute("aria-label", chapter.dataset.chapter || "Capítulo " + (i + 1));
            dot.addEventListener("click", () => {
                chapter.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
            });
            nav.appendChild(dot);
        });

        const dots = Array.from(nav.querySelectorAll(".dot"));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = chapters.indexOf(entry.target);
                    if (index === -1) return;
                    if (entry.isIntersecting) {
                        dots.forEach((d) => d.classList.remove("is-active"));
                        dots[index].classList.add("is-active");
                    }
                });
            },
            { threshold: 0.4 }
        );

        chapters.forEach((chapter) => observer.observe(chapter));
    }

    /* ============================================================
       VOLVER ARRIBA
       ============================================================ */
    function initBackToTop() {
        const btn = document.getElementById("back-to-top");
        if (!btn) return;

        window.addEventListener(
            "scroll",
            throttle(() => {
                if (window.scrollY > window.innerHeight * 1.2) {
                    btn.classList.add("is-visible");
                } else {
                    btn.classList.remove("is-visible");
                }
            }, 200)
        );

        btn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        });
    }

    function throttle(fn, wait) {
        let last = 0;
        return function (...args) {
            const now = Date.now();
            if (now - last >= wait) {
                last = now;
                fn.apply(this, args);
            }
        };
    }

    /* ============================================================
       POLAROIDS — animación al entrar en pantalla
       ============================================================ */
    function initPolaroids() {
        const polaroids = document.querySelectorAll(".polaroid");
        if (!polaroids.length) return;

        if (reduceMotion) {
            polaroids.forEach((p) => p.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );
        polaroids.forEach((p) => observer.observe(p));
    }
})();
