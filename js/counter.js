/**
 * counter.js — Contador de vida de Valeria.
 * Calcula en tiempo real (sin valores fijos) cuánto tiempo ha vivido
 * desde CONFIG.fechaNacimiento hasta el momento actual del dispositivo.
 */
(function () {
    "use strict";

    const MS_POR_SEGUNDO = 1000;
    const MS_POR_MINUTO = MS_POR_SEGUNDO * 60;
    const MS_POR_HORA = MS_POR_MINUTO * 60;
    const MS_POR_DIA = MS_POR_HORA * 24;

    function getBirthDate() {
        return new Date(window.CONFIG.fechaNacimiento + "T00:00:00");
    }

    /** Diferencia en años, meses y días completos (calendario real, no aproximado). */
    function diferenciaCalendario(desde, hasta) {
        let anios = hasta.getFullYear() - desde.getFullYear();
        let meses = hasta.getMonth() - desde.getMonth();
        let dias = hasta.getDate() - desde.getDate();

        if (dias < 0) {
            meses -= 1;
            const diasMesAnterior = new Date(hasta.getFullYear(), hasta.getMonth(), 0).getDate();
            dias += diasMesAnterior;
        }
        if (meses < 0) {
            anios -= 1;
            meses += 12;
        }
        return { anios, meses, dias };
    }

    function actualizarContador() {
        const nacimiento = getBirthDate();
        const ahora = new Date();
        const diffMs = Math.max(0, ahora - nacimiento);

        const { anios, meses, dias } = diferenciaCalendario(nacimiento, ahora);

        const diasVida = Math.floor(diffMs / MS_POR_DIA);
        const horasVida = Math.floor(diffMs / MS_POR_HORA);
        const nochesVida = diasVida; // una noche por cada día vivido, de forma aproximada
        const vueltasAlSol = (diffMs / (MS_POR_DIA * 365.25)).toFixed(2);

        setText("counter-anios", anios);
        setText("counter-meses", meses);
        setText("counter-dias", dias);

        setText("card-dias-vida", diasVida.toLocaleString("es-PE"));
        setText("card-noches", nochesVida.toLocaleString("es-PE"));
        setText("card-horas", horasVida.toLocaleString("es-PE"));
        setText("card-vueltas-sol", vueltasAlSol);

        // Segunda instancia del contador, en la sección "Hoy".
        setText("counter-anios-2", anios);
        setText("counter-meses-2", meses);
        setText("counter-dias-2", dias);
    }

    function setText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    function iniciarContador() {
        actualizarContador();
        // Se actualiza cada minuto: suficiente para que "horas de vida" y
        // "vueltas al sol" avancen mientras el usuario permanece en la página,
        // sin generar trabajo innecesario para el dispositivo.
        setInterval(actualizarContador, 60 * 1000);
    }

    window.ValeriaCounter = { iniciarContador, actualizarContador };
})();
