/**
 * surprises.js — Todos los pequeños (y grandes) momentos sorpresa:
 * mensajes escondidos, la carta de papá, el botón "¿Sabes cuánto te
 * quiero?", confeti/globos de cumpleaños y los corazones flotantes
 * que aparecen al tocar elementos especiales.
 */
(function () {
    "use strict";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const SECRET_MESSAGES = [
        "Eres mi orgullo.",
        "Siempre tendrás a papá.",
        "Tu sonrisa alegra mis días.",
        "Nunca dejes de soñar.",
        "Siempre estaré orgulloso de ti.",
        "Eres una de las razones más hermosas de mi vida.",
        "Contigo aprendí lo que es amar sin límites.",
        "Cada día contigo es un regalo.",
        "Eres mi pequeña princesa, hoy y siempre.",
        "No hay distancia que borre lo mucho que te quiero."
    ];

    /* ---------- Mensajes escondidos ---------- */
    function initSecretMessages() {
        const field = document.getElementById("secret-field");
        if (!field) return;

        SECRET_MESSAGES.forEach((msg, i) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "secret-star";
            btn.textContent = "✨";
            btn.setAttribute("aria-label", "Descubrir un mensaje secreto");
            btn.dataset.message = msg;
            btn.addEventListener("click", (e) => {
                showSecretMessage(msg);
                spawnHeartsAt(e.clientX, e.clientY, 4);
            });
            field.appendChild(btn);
        });

        const popup = document.createElement("div");
        popup.className = "secret-message-popup";
        popup.id = "secret-message-popup";
        popup.setAttribute("role", "status");
        document.body.appendChild(popup);

        popup.addEventListener("click", () => popup.classList.remove("is-open"));
    }

    function showSecretMessage(text) {
        const popup = document.getElementById("secret-message-popup");
        if (!popup) return;
        popup.textContent = "“" + text + "”";
        popup.classList.add("is-open");
        clearTimeout(popup._timer);
        popup._timer = setTimeout(() => popup.classList.remove("is-open"), 3200);
    }

    /* ---------- Carta de papá ---------- */
    function initLetter() {
        const envelope = document.getElementById("envelope");
        const letter = document.getElementById("letter-paper");
        const openBtn = document.getElementById("open-letter-btn");
        if (!envelope || !letter) return;

        function open() {
            letter.classList.add("is-open");
            letter.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        }

        envelope.addEventListener("click", open);
        envelope.addEventListener("keyup", (e) => {
            if (e.key === "Enter" || e.key === " ") open();
        });
        if (openBtn) openBtn.addEventListener("click", open);
    }

    /* ---------- ¿Sabes cuánto te quiero? ---------- */
    function initLoveQuestion() {
        const btn = document.getElementById("love-question-btn");
        const overlay = document.getElementById("love-overlay");
        const closeBtn = document.getElementById("love-close-btn");
        if (!btn || !overlay) return;

        btn.addEventListener("click", () => {
            btn.classList.add("is-beating");
            spawnHeartsBurst();

            setTimeout(() => {
                overlay.classList.add("is-active");
            }, reduceMotion ? 0 : 650);

            setTimeout(() => btn.classList.remove("is-beating"), 1100);
        });

        function close() {
            overlay.classList.remove("is-active");
        }

        if (closeBtn) closeBtn.addEventListener("click", close);
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) close();
        });
    }

    function spawnHeartsBurst() {
        if (reduceMotion) return;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        spawnHeartsAt(centerX, centerY, 16);
    }

    /* ---------- Corazones flotantes reutilizables ---------- */
    function spawnHeartsAt(x, y, count) {
        if (reduceMotion) count = Math.min(count, 2);
        for (let i = 0; i < count; i++) {
            const heart = document.createElement("span");
            heart.className = "floating-heart";
            heart.textContent = Math.random() > 0.5 ? "💗" : "💕";
            heart.style.left = x + (Math.random() * 80 - 40) + "px";
            heart.style.top = y + (Math.random() * 40 - 20) + "px";
            heart.setAttribute("aria-hidden", "true");
            document.body.appendChild(heart);
            heart.addEventListener("animationend", () => heart.remove());
            // Salvaguarda por si "animationend" no dispara (reduce-motion, etc.)
            setTimeout(() => heart.remove(), 2200);
        }
    }

    function initHeartTriggers() {
        document.querySelectorAll("[data-heart-trigger]").forEach((el) => {
            el.addEventListener("click", (e) => spawnHeartsAt(e.clientX, e.clientY, 6));
        });
    }

    /* ---------- Confeti y globos de cumpleaños ---------- */
    const CONFETTI_COLORS = ["#e8b4c8", "#c9b6e4", "#e3c68a", "#f9dfe8", "#a68fce"];

    function launchConfetti(layerId, amount) {
        if (reduceMotion) return;
        const layer = document.getElementById(layerId);
        if (!layer) return;
        for (let i = 0; i < amount; i++) {
            const piece = document.createElement("span");
            piece.className = "confetti-piece";
            piece.style.left = Math.random() * 100 + "%";
            piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
            piece.style.animationDelay = Math.random() * 1.5 + "s";
            layer.appendChild(piece);
            setTimeout(() => piece.remove(), 4500);
        }
    }

    function launchBalloons(layerId, amount) {
        if (reduceMotion) return;
        const layer = document.getElementById(layerId);
        if (!layer) return;
        const emojis = ["🎈", "🎈", "🎈"];
        for (let i = 0; i < amount; i++) {
            const piece = document.createElement("span");
            piece.className = "balloon-piece";
            piece.textContent = emojis[i % emojis.length];
            piece.style.left = 10 + Math.random() * 80 + "%";
            piece.style.animationDelay = Math.random() * 2 + "s";
            layer.appendChild(piece);
            setTimeout(() => piece.remove(), 7000);
        }
    }

    function initBirthdayEffects() {
        const firstSection = document.getElementById("birthday-first");
        const secondSection = document.getElementById("birthday-second");

        const options = { threshold: 0.4 };
        const seen = new Set();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !seen.has(entry.target.id)) {
                    seen.add(entry.target.id);
                    if (entry.target.id === "birthday-first") {
                        launchConfetti("confetti-layer-1", 26);
                        launchBalloons("balloon-layer-1", 6);
                    } else if (entry.target.id === "birthday-second") {
                        launchConfetti("confetti-layer-2", 26);
                        launchSparkles("sparkle-layer-2", 14);
                    }
                }
            });
        }, options);

        if (firstSection) observer.observe(firstSection);
        if (secondSection) observer.observe(secondSection);
    }

    function launchSparkles(layerId, amount) {
        if (reduceMotion) return;
        const layer = document.getElementById(layerId);
        if (!layer) return;
        for (let i = 0; i < amount; i++) {
            const piece = document.createElement("span");
            piece.className = "sparkle-piece";
            piece.textContent = "✨";
            piece.style.left = Math.random() * 100 + "%";
            piece.style.top = Math.random() * 100 + "%";
            piece.style.animationDelay = Math.random() * 2 + "s";
            layer.appendChild(piece);
        }
    }

    /* ---------- Primeros pasos: huellas al hacer scroll ---------- */
    function initFootprints() {
        const track = document.getElementById("footprint-track");
        if (!track) return;

        const total = 7;
        const footprints = [];
        for (let i = 0; i < total; i++) {
            const fp = document.createElement("span");
            fp.className = "footprint";
            fp.textContent = i % 2 === 0 ? "👣" : "👣";
            fp.style.left = (8 + i * 12) + "%";
            fp.style.transform = i % 2 === 0 ? "translateY(0) rotate(-8deg)" : "translateY(14px) rotate(8deg)";
            track.appendChild(fp);
            footprints.push(fp);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    footprints.forEach((fp, i) => {
                        setTimeout(() => fp.classList.add("is-visible"), i * 220);
                    });
                    observer.disconnect();
                });
            },
            { threshold: 0.5 }
        );
        observer.observe(track);
    }

    window.ValeriaSurprises = {
        initSecretMessages,
        initLetter,
        initLoveQuestion,
        initHeartTriggers,
        initBirthdayEffects,
        initFootprints,
        spawnHeartsAt
    };
})();
