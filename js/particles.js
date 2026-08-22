/**
 * particles.js — Fondo dinámico y suave (estrellas para la intro,
 * y un fondo muy sutil de estrellas/brillos/corazones para el resto
 * del sitio). Usa <canvas> y respeta prefers-reduced-motion, además
 * de reducir automáticamente la cantidad de partículas en pantallas
 * pequeñas o equipos de baja capacidad.
 */
(function () {
    "use strict";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function particleCountFor(width) {
        if (reduceMotion) return 0;
        if (width < 480) return 26;
        if (width < 900) return 45;
        return 70;
    }

    /** Estrellas de la pantalla de introducción (más densas y brillantes). */
    function initIntroStars(container) {
        if (!container) return;
        const count = reduceMotion ? 20 : 60;
        const frag = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const star = document.createElement("span");
            star.className = "star";
            const size = Math.random() * 2.4 + 1;
            star.style.width = size + "px";
            star.style.height = size + "px";
            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";
            star.style.animationDelay = (Math.random() * 3.5) + "s";
            frag.appendChild(star);
        }
        container.appendChild(frag);
    }

    /** Fondo global muy discreto: pequeños puntos de luz que flotan despacio. */
    function initBackgroundParticles(canvas) {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let width, height, particles;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        function createParticles() {
            const count = particleCountFor(width);
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: Math.random() * 1.6 + 0.4,
                    speed: Math.random() * 0.12 + 0.03,
                    drift: (Math.random() - 0.5) * 0.08,
                    opacity: Math.random() * 0.35 + 0.08
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.fillStyle = `rgba(232, 180, 200, ${p.opacity})`;
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();

                p.y -= p.speed;
                p.x += p.drift;
                if (p.y < -5) {
                    p.y = height + 5;
                    p.x = Math.random() * width;
                }
            });
            if (!reduceMotion) requestAnimationFrame(draw);
        }

        resize();
        createParticles();
        draw();

        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                resize();
                createParticles();
            }, 250);
        });
    }

    window.ValeriaParticles = { initIntroStars, initBackgroundParticles };
})();
