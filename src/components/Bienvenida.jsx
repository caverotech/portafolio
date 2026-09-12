import React, { useState, useEffect, useRef } from "react";
import { TEMA, DISPLAY, MONO } from "../theme/theme";
import { movReducido } from "../hooks/useReveal";

/* ============================================================
   BIENVENIDA — apertura cinematográfica del portafolio
   ------------------------------------------------------------
   Arranca sola, a pantalla completa. No hay tarjeta ni botón que
   pulsar: el visitante llega y la secuencia ya está ocurriendo,
   como el arranque de una película.

   Secuencia (≈4.2s, saltable en cualquier momento):

     0. TELÓN      el negro se abre y aparece la retícula
     1. MARCA      el monograma se dibuja trazo a trazo
     2. LUGAR      coordenadas y año, al margen
     3. NOMBRE     clip reveal por línea, a tamaño de cartel
     4. ROL        la línea que debe recordarse
     5. CAPACIDADES  se escriben una a una en el pie
     6. SALIDA     el telón sube y entrega el portafolio

   El sonido es opcional y secundario: los navegadores bloquean el
   audio sin interacción, así que la intro funciona en silencio y
   sólo suena si el visitante ya había interactuado con la página.
   Nunca se le pide un clic para "desbloquear" nada.
   ============================================================ */

const t = TEMA;

/* Mini-motor de sonido (Web Audio API). Si el navegador lo bloquea
   por falta de interacción previa, falla en silencio: la intro sigue
   funcionando igual. Nunca condiciona la experiencia visual. */
function crearAudio() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    const ctx = new Ctx();
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    const nota = (freq, retardo = 0, dur = 1.8, vol = 0.05) => {
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

    const tic = (freq = 660, dur = 0.05, vol = 0.022) => nota(freq, 0, dur, vol);

    // Sol mayor con 9ª, en arpegio lento
    const acorde = () => {
      [196, 392, 493.88, 587.33, 880].forEach((f, i) => {
        nota(f, i * 0.16, i === 0 ? 3.0 : 2.4, i === 0 ? 0.04 : 0.042);
      });
    };

    return { tic, acorde };
  } catch {
    return null;
  }
}

/* Una línea del titular: máscara que la descubre de abajo a arriba */
function LineaCartel({ children, activo, retardo = 0, estilo = {} }) {
  return (
    <span className="block overflow-hidden" style={{ paddingBottom: "0.08em" }}>
      <span
        className="block"
        style={{
          ...estilo,
          transform: activo ? "translateY(0)" : "translateY(110%)",
          opacity: activo ? 1 : 0,
          transition: `transform 1100ms cubic-bezier(0.22,0.61,0.36,1) ${retardo}ms, opacity 700ms ease ${retardo}ms`,
        }}
      >
        {children}
      </span>
    </span>
  );
}

export default function Bienvenida({ onTerminar }) {
  // Las capacidades se escriben en el pie mientras el nombre está en pantalla
  const capacidades = [
    "Agentes de IA",
    "Orquestación con n8n",
    "MCP y Skills",
    "Automatización de procesos",
    "Interfaces en React",
  ];

  const [paso, setPaso] = useState(0);          // avance de la secuencia
  const [capsVisibles, setCapsVisibles] = useState(0);
  const [saliendo, setSaliendo] = useState(false);
  const audio = useRef(null);
  const cerrado = useRef(false);

  // Cierre único: lo usan tanto el final natural como el salto manual
  const cerrar = React.useCallback(() => {
    if (cerrado.current) return;
    cerrado.current = true;
    setSaliendo(true);
    setTimeout(onTerminar, 620);
  }, [onTerminar]);

  useEffect(() => {
    if (movReducido()) { onTerminar(); return; }

    // El audio se intenta de inmediato. Si el navegador lo bloquea,
    // crearAudio devuelve null o el contexto queda suspendido: la
    // intro continúa igual, sólo que muda.
    audio.current = crearAudio();

    const timers = [];
    const en = (ms, fn) => timers.push(setTimeout(fn, ms));

    en(120, () => setPaso(1));                       // telón + retícula
    en(420, () => { setPaso(2); audio.current?.tic(520); });  // marca
    en(760, () => setPaso(3));                       // coordenadas
    en(1000, () => { setPaso(4); audio.current?.acorde(); }); // nombre
    en(1750, () => setPaso(5));                      // rol

    // Capacidades, una a una
    capacidades.forEach((_, i) => {
      en(2150 + i * 190, () => {
        setCapsVisibles(i + 1);
        audio.current?.tic(560 + i * 60);
      });
    });

    en(3900, () => setPaso(6));
    en(4250, cerrar);

    return () => timers.forEach(clearTimeout);
  }, [cerrar, onTerminar]);

  // Saltar: con clic, con Escape o con cualquier tecla
  useEffect(() => {
    const alPulsar = () => cerrar();
    window.addEventListener("keydown", alPulsar);
    return () => window.removeEventListener("keydown", alPulsar);
  }, [cerrar]);

  return (
    <div
      className="bienvenida fixed inset-0 overflow-hidden"
      style={{
        background: t.bg,
        zIndex: 200,
        opacity: saliendo ? 0 : 1,
        transition: "opacity 600ms cubic-bezier(0.22,0.61,0.36,1)",
      }}
      onClick={cerrar}
      role="presentation"
    >
      <EstilosBienvenida />

      {/* ---------- ATMÓSFERA ---------- */}
      {/* Retícula técnica: aparece con el telón */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${t.borderSoft} 1px, transparent 1px), linear-gradient(90deg, ${t.borderSoft} 1px, transparent 1px)`,
          backgroundSize: "76px 76px",
          maskImage: "radial-gradient(ellipse 80% 75% at 50% 45%, #000, transparent 82%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 75% at 50% 45%, #000, transparent 82%)",
          opacity: paso >= 1 ? 1 : 0,
          transform: paso >= 1 ? "scale(1)" : "scale(1.06)",
          transition: "opacity 1400ms ease, transform 2400ms cubic-bezier(0.22,0.61,0.36,1)",
        }}
      />

      {/* Luz cenital cálida: da volumen a la escena */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "-30%", left: "50%", width: "120vmax", height: "110vmax",
          transform: "translateX(-50%)",
          background: `radial-gradient(ellipse 42% 48% at 50% 34%, rgba(232,152,62,0.13), transparent 66%)`,
          opacity: paso >= 1 ? 1 : 0,
          transition: "opacity 2000ms ease",
        }}
      />

      {/* Telón: dos hojas que se retiran arriba y abajo */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 telon-sup"
        style={{
          height: "50%", background: t.bg, zIndex: 4,
          transform: paso >= 1 ? "translateY(-101%)" : "translateY(0)",
          transition: "transform 1200ms cubic-bezier(0.76,0,0.24,1)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "50%", background: t.bg, zIndex: 4,
          transform: paso >= 1 ? "translateY(101%)" : "translateY(0)",
          transition: "transform 1200ms cubic-bezier(0.76,0,0.24,1)",
        }}
      />

      {/* ---------- CONTENIDO ---------- */}
      <div className="relative h-full w-full max-w-[1500px] mx-auto px-6 md:px-10 lg:px-14 flex flex-col" style={{ zIndex: 2 }}>

        {/* Cabecera: marca y coordenadas */}
        <div className="flex items-start justify-between gap-6 pt-8 md:pt-10">
          {/* Monograma que se dibuja */}
          <div
            className="flex items-center gap-3"
            style={{
              opacity: paso >= 2 ? 1 : 0,
              transform: paso >= 2 ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity 700ms ease, transform 700ms cubic-bezier(0.22,0.61,0.36,1)",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 64 64" aria-hidden>
              <g fill="none" stroke={t.text} strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round">
                <path className={paso >= 2 ? "trazo trazo-1" : ""} d="M14 45 L23.5 20 L33 45" style={{ strokeDasharray: 62, strokeDashoffset: paso >= 2 ? 0 : 62 }} />
                <path className={paso >= 2 ? "trazo trazo-2" : ""} d="M18.2 36.5 H28.8" style={{ strokeDasharray: 11, strokeDashoffset: paso >= 2 ? 0 : 11 }} />
                <path className={paso >= 2 ? "trazo trazo-3" : ""} d="M53 26.5 A11.5 11.5 0 1 0 53 38.5" style={{ strokeDasharray: 58, strokeDashoffset: paso >= 2 ? 0 : 58 }} />
              </g>
              <circle
                cx="23.5" cy="20" r="3.6" fill={t.accent}
                style={{
                  opacity: paso >= 3 ? 1 : 0,
                  transformOrigin: "23.5px 20px",
                  transform: paso >= 3 ? "scale(1)" : "scale(0)",
                  transition: "opacity 400ms ease 260ms, transform 500ms cubic-bezier(0.34,1.56,0.64,1) 260ms",
                }}
              />
            </svg>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em", color: t.faint }}>
              CAVEROTECH.COM
            </span>
          </div>

          {/* Coordenadas y año */}
          <div
            className="text-right"
            style={{
              opacity: paso >= 3 ? 1 : 0,
              transform: paso >= 3 ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity 700ms ease, transform 700ms cubic-bezier(0.22,0.61,0.36,1)",
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", color: t.faint }}>
              14°04′S 75°44′W
            </div>
            <div className="mt-1" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", color: t.faint }}>
              PORTAFOLIO 2026
            </div>
          </div>
        </div>

        {/* Nombre a tamaño de cartel */}
        <div className="flex-1 flex flex-col justify-center py-8">
          <h1
            style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(3rem, 13vw, 11rem)",
              fontWeight: 500,
              lineHeight: 0.84,
              letterSpacing: "-0.05em",
              color: t.text,
            }}
          >
            <LineaCartel activo={paso >= 4} retardo={0}>Alexys</LineaCartel>
            <LineaCartel activo={paso >= 4} retardo={110}>
              <span style={{ color: t.accent }}>Cavero</span>
            </LineaCartel>
          </h1>

          {/* Rol */}
          <div
            className="mt-7 flex items-center gap-4"
            style={{
              opacity: paso >= 5 ? 1 : 0,
              transform: paso >= 5 ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 800ms ease, transform 800ms cubic-bezier(0.22,0.61,0.36,1)",
            }}
          >
            <span className="h-px shrink-0" style={{ width: 44, background: t.accent }} />
            <span
              style={{
                fontFamily: MONO,
                fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                letterSpacing: "0.24em",
                color: t.muted,
                textTransform: "uppercase",
              }}
            >
              Ingeniero de IA &amp; Automatización
            </span>
          </div>
        </div>

        {/* Pie: capacidades que se escriben + indicador de salto */}
        <div className="pb-8 md:pb-10">
          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-5"
            style={{ borderTop: `1px solid ${t.borderSoft}` }}
          >
            {capacidades.map((c, i) => (
              <span
                key={c}
                className="inline-flex items-center gap-2"
                style={{
                  opacity: i < capsVisibles ? 1 : 0,
                  transform: i < capsVisibles ? "translateY(0)" : "translateY(6px)",
                  transition: "opacity 420ms ease, transform 420ms cubic-bezier(0.22,0.61,0.36,1)",
                }}
              >
                <span
                  aria-hidden
                  style={{ width: 3, height: 3, borderRadius: "50%", background: t.accent }}
                />
                <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", color: t.muted, textTransform: "uppercase" }}>
                  {c}
                </span>
              </span>
            ))}
          </div>

          {/* Salto: presente pero discreto. La intro termina sola. */}
          <div
            className="mt-5 flex items-center justify-between gap-4"
            style={{
              opacity: paso >= 5 ? 1 : 0,
              transition: "opacity 700ms ease",
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.16em", color: t.faint, textTransform: "uppercase" }}>
              Pulsa para entrar
            </span>
            {/* Barra de avance de la propia intro */}
            <span className="relative overflow-hidden" style={{ width: 96, height: 1, background: t.borderSoft }}>
              <span
                className="absolute inset-y-0 left-0"
                style={{
                  background: t.accent,
                  width: paso >= 6 ? "100%" : `${Math.min((capsVisibles / capacidades.length) * 100, 100)}%`,
                  transition: "width 420ms cubic-bezier(0.22,0.61,0.36,1)",
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Animaciones de la intro. Una sola curva, duraciones cortas. */
function EstilosBienvenida() {
  return (
    <style>{`
      .bienvenida { cursor: pointer; }

      /* El monograma se dibuja trazo a trazo */
      .trazo { transition: stroke-dashoffset 900ms cubic-bezier(0.22,0.61,0.36,1); }
      .trazo-2 { transition-delay: 260ms; }
      .trazo-3 { transition-delay: 140ms; }

      @media (prefers-reduced-motion: reduce) {
        .bienvenida *, .trazo { animation: none !important; transition: none !important; }
      }
    `}</style>
  );
}
