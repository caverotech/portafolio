import React, { useState, useEffect, useRef } from "react";
import { TEMA, DISPLAY, SANS, MONO, TIPO } from "../theme/theme";
import { movReducido } from "../hooks/useReveal";
import { DATOS } from "../data/portafolio";

/* ============================================================
   BIENVENIDA / INTRO DEL PORTAFOLIO
   ------------------------------------------------------------
   Portada editorial que aparece ANTES del portafolio. Dos pasos:

     1. Tarjeta de presentación con el rol y un botón "Entrar".
        (el clic es obligatorio: los navegadores bloquean el audio
        automático, y aquí desbloqueamos el acorde de entrada)
     2. Secuencia de inicialización de capacidades y revelado
        del nombre.

   Tono: corporativo claro. Nada de auroras, aros giratorios ni
   brillos que barren; el movimiento es corto y confirma progreso.

   Uso en App.jsx:
     {mostrarIntro && <Bienvenida onTerminar={() => setMostrarIntro(false)} />}
   ============================================================ */

const t = TEMA;

/* ------------------------------------------------------------
   Mini-motor de sonido (Web Audio API). Genera tonos sintéticos
   sutiles sin archivos. Debe crearse tras un clic del usuario.
   ------------------------------------------------------------ */
function crearAudio() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    // Tic discreto para cada capacidad que se registra.
    const beep = (freq = 660, dur = 0.06, vol = 0.035, tipo = "sine") => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = tipo;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + dur);
    };

    // Nota cálida con filtro y cola larga (sensación de reverb).
    const nota = (freq, retardo = 0, dur = 1.8, vol = 0.06) => {
      const inicio = ctx.currentTime + retardo;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filtro = ctx.createBiquadFilter();
      osc.type = "sine";
      osc.frequency.value = freq;
      filtro.type = "lowpass";
      filtro.frequency.value = 2400;
      gain.gain.setValueAtTime(0, inicio);
      gain.gain.linearRampToValueAtTime(vol, inicio + 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, inicio + dur);
      osc.connect(filtro).connect(gain).connect(ctx.destination);
      osc.start(inicio);
      osc.stop(inicio + dur);
    };

    // Acorde de entrada: Sol mayor con 9ª (G–B–D–A) en arpegio suave.
    const acorde = () => {
      const acordeHz = [196, 392, 493.88, 587.33, 880]; // G2, G4, B4, D5, A5
      acordeHz.forEach((f, i) => {
        const grave = i === 0;
        nota(f, i * 0.14, grave ? 2.6 : 2.0, grave ? 0.045 : 0.05);
      });
    };

    return { beep, acorde };
  } catch {
    return { beep: () => {}, acorde: () => {} };
  }
}

export default function Bienvenida({ onTerminar }) {
  // Lo que se "inicializa" es el perfil profesional: cada línea es una
  // capacidad real, así la intro comunica el posicionamiento.
  const capacidades = [
    "Agentes de IA",
    "Integración de LLMs",
    "Automatización de procesos",
    "Bases de conocimiento (RAG)",
    "Interfaces en React",
  ];

  const [arrancado, setArrancado] = useState(false); // ¿ya pulsó "Entrar"?
  const [visibles, setVisibles] = useState(0);       // capacidades registradas
  const [fase, setFase] = useState("carga");         // carga → revelar → salir
  const audio = useRef(null);

  const iniciar = () => {
    audio.current = crearAudio();
    setArrancado(true);
  };

  useEffect(() => {
    if (!arrancado) return;
    if (movReducido()) { onTerminar(); return; }

    const timers = [];
    const paso = 260;    // ritmo de registro (ms por capacidad)
    const inicio = 260;  // pausa antes de la primera

    capacidades.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setVisibles(i + 1);
        audio.current?.beep(540 + i * 55, 0.05, 0.03, "sine");
      }, inicio + i * paso));
    });

    const finCarga = inicio + capacidades.length * paso + 260;
    timers.push(setTimeout(() => { setFase("revelar"); audio.current?.acorde(); }, finCarga));
    timers.push(setTimeout(() => setFase("salir"), finCarga + 1400));
    timers.push(setTimeout(onTerminar, finCarga + 2000));

    return () => timers.forEach(clearTimeout);
  }, [arrancado]);

  const progreso = Math.round((visibles / capacidades.length) * 100);

  // -----------------------------------------------------------
  // PASO 1 — tarjeta de presentación con botón "Entrar"
  // -----------------------------------------------------------
  if (!arrancado) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center px-5 entrada-fade"
        style={{ background: t.bg, zIndex: 200 }}
      >
        <EstilosBienvenida />

        {/* Retícula técnica de fondo: estructura, sin color */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${t.borderSoft} 1px, transparent 1px), linear-gradient(90deg, ${t.borderSoft} 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 75% 70% at 50% 45%, #000, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 50% 45%, #000, transparent 80%)",
          }}
        />

        <div
          className="tarjeta-intro relative w-full max-w-md rounded-2xl px-8 pt-9 pb-8"
          style={{ background: t.surface, border: `1px solid ${t.border}`, boxShadow: t.shadowLg }}
        >
          {/* Encabezado: dominio y disponibilidad */}
          <div className="flex items-center justify-between gap-3 pb-7" style={{ borderBottom: `1px solid ${t.borderSoft}` }}>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", color: t.faint }}>CAVEROTECH.COM</span>
            <span className="flex items-center gap-1.5">
              <span className="punto-online w-1.5 h-1.5 rounded-full" style={{ background: t.ok }} />
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", color: t.muted }}>DISPONIBLE</span>
            </span>
          </div>

          {/* Monograma AC: cuadrado sobrio, coherente con el favicon */}
          <div
            className="mt-7 mb-6 rounded-xl flex items-center justify-center"
            style={{ width: 56, height: 56, background: t.accent }}
          >
            <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: "1.35rem", letterSpacing: "-0.03em", color: "#14100A" }}>
              AC
            </span>
          </div>

          {/* Nombre y rol */}
          <h2
            className="mb-3"
            style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(2rem, 6vw, 2.7rem)", color: t.text, letterSpacing: "-0.035em", lineHeight: 1.02 }}
          >
            {DATOS.nombre}
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 16, fontWeight: 600, color: t.text, letterSpacing: "-0.01em" }}>
            {DATOS.titulo}
          </p>
          <p className="mt-2" style={{ fontSize: 14, color: t.muted, lineHeight: 1.6 }}>
            Agentes, LLMs y procesos automatizados que entran en producción.
          </p>

          {/* Botón principal */}
          <button
            type="button"
            onClick={iniciar}
            className="boton-entrar mt-8 inline-flex items-center justify-center gap-2.5 w-full px-7 py-3.5 rounded-lg"
            style={{ background: t.accent, color: "#14100A", fontFamily: SANS, fontWeight: 600, fontSize: 15 }}
          >
            Entrar al portafolio
            <span aria-hidden style={{ fontSize: 16, lineHeight: 1 }}>→</span>
          </button>

          {/* Pie con metadatos */}
          <div className="flex items-center justify-between gap-4 mt-6" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", color: t.faint }}>
            <span>{DATOS.ubicacion.toUpperCase()}</span>
            <span>PORTAFOLIO 2026</span>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------
  // PASO 2 — registro de capacidades y revelado del nombre
  // -----------------------------------------------------------
  return (
    <div
      className="fixed inset-0 flex items-center justify-center px-6"
      style={{ background: t.bg, zIndex: 200, transition: "opacity 0.7s ease", opacity: fase === "salir" ? 0 : 1 }}
    >
      <EstilosBienvenida />

      {fase === "carga" ? (
        <div className="w-full max-w-md">
          <p style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.2em", color: t.faint, textTransform: "uppercase" }}>
            Perfil profesional
          </p>

          {/* Lista de capacidades que se registran una a una */}
          <div className="mt-6 space-y-0">
            {capacidades.map((c, i) => {
              const activa = i < visibles;
              return (
                <div
                  key={c}
                  className={activa ? "linea-cap flex items-center gap-3 py-3" : "flex items-center gap-3 py-3"}
                  style={{
                    borderBottom: `1px solid ${t.borderSoft}`,
                    opacity: activa ? 1 : 0.25,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <span
                    className="flex items-center justify-center rounded-full shrink-0"
                    style={{
                      width: 16, height: 16,
                      background: activa ? t.accent : "transparent",
                      border: activa ? "none" : `1px solid ${t.border}`,
                      color: "#14100A", fontSize: 10, lineHeight: 1,
                    }}
                  >
                    {activa ? "✓" : ""}
                  </span>
                  <span style={{ fontFamily: SANS, fontSize: 15, color: activa ? t.text : t.faint, fontWeight: 500 }}>
                    {c}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progreso */}
          <div className="mt-7 flex items-center gap-3">
            <div className="flex-1 h-0.5 rounded-full overflow-hidden" style={{ background: t.borderSoft }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${progreso}%`, background: t.accent, transition: "width 0.35s cubic-bezier(0.22,0.61,0.36,1)" }}
              />
            </div>
            <span style={{ fontFamily: MONO, fontSize: 10.5, color: t.faint, minWidth: 34, textAlign: "right" }}>{progreso}%</span>
          </div>
        </div>
      ) : (
        // Revelado del nombre
        <div className="text-center revelar-nombre">
          <h1
            style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(2.4rem, 8vw, 4.8rem)", letterSpacing: "-0.04em", color: t.text, lineHeight: 1 }}
          >
            {DATOS.nombre}
          </h1>
          <p className="mt-4" style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.26em", color: t.muted, textTransform: "uppercase" }}>
            Ingeniero de IA &amp; Automatización
          </p>
        </div>
      )}
    </div>
  );
}

/* Animaciones de la intro. Mismas reglas que el sitio:
   una sola curva, duraciones cortas, desplazamientos pequeños. */
function EstilosBienvenida() {
  return (
    <style>{`
      .entrada-fade { animation: entradaFade 0.5s cubic-bezier(0.22,0.61,0.36,1) both; }
      @keyframes entradaFade { from { opacity: 0; } to { opacity: 1; } }

      .tarjeta-intro { animation: subirTarjeta 0.55s cubic-bezier(0.22,0.61,0.36,1) both; }
      @keyframes subirTarjeta {
        from { opacity: 0; transform: translateY(12px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      .linea-cap { animation: aparecerLinea 0.3s cubic-bezier(0.22,0.61,0.36,1) both; }
      @keyframes aparecerLinea {
        from { opacity: 0; transform: translateX(-6px); }
        to   { opacity: 1; transform: translateX(0); }
      }

      .revelar-nombre { animation: revelarNombre 1.1s cubic-bezier(0.22,0.61,0.36,1) both; }
      @keyframes revelarNombre {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      .punto-online { animation: pulsoPunto 2s ease-in-out infinite; }
      @keyframes pulsoPunto { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }

      .boton-entrar {
        transition: transform 160ms cubic-bezier(0.22,0.61,0.36,1),
                    box-shadow 240ms cubic-bezier(0.22,0.61,0.36,1);
      }
      .boton-entrar:hover { transform: translateY(-1px); box-shadow: 0 6px 20px -4px rgba(232,152,62,0.45); filter: brightness(1.05); }
      .boton-entrar:active { transform: translateY(0); }

      @media (prefers-reduced-motion: reduce) {
        .entrada-fade, .tarjeta-intro, .linea-cap, .revelar-nombre,
        .punto-online, .boton-entrar { animation: none !important; transition: none !important; }
      }
    `}</style>
  );
}
