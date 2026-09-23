import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TEMA, CAPA } from "../theme/theme";
import { movReducido, punteroFino, useRatonSuave } from "../hooks/useReveal";

/* ============================================================
   ATMÓSFERA — sistema de fondo en capas
   ------------------------------------------------------------
   Da profundidad sin decorar. De atrás hacia delante:

     1. Base       — grafito plano
     2. Luz cenital— un solo foco cálido arriba (no dos auroras)
     3. Retícula   — plano técnico, se desvanece hacia abajo
     4. Grano      — rompe el degradado, evita el banding
     5. Viñeta     — cierra los bordes, enfoca el centro

   Nada se mueve por sí solo: sólo la luz reacciona al puntero,
   y muy poco. Es atmósfera, no animación.
   ============================================================ */

// Grano en SVG embebido (sin petición de red)
const GRANO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E";

export default function Atmosfera({ t = TEMA }) {
  const raton = useRatonSuave(0.05);

  return (
    <div
      aria-hidden
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: CAPA.fondo }}
    >
      {/* 2 — Luz cenital cálida: la escena tiene una sola fuente.
             Se desplaza apenas con el puntero (máx. ~18px). */}
      <div
        className="absolute"
        style={{
          top: "-38vh",
          left: "50%",
          width: "130vw",
          height: "95vh",
          transform: `translate3d(calc(-50% + ${raton.x * 18}px), ${raton.y * 10}px, 0)`,
          background: `radial-gradient(ellipse 50% 50% at 50% 50%, rgba(232,152,62,0.11), rgba(232,152,62,0.04) 45%, transparent 72%)`,
          filter: "blur(40px)",
        }}
      />

      {/* Señal técnica fría, muy contenida, abajo a la derecha:
          justifica el cian en el sistema sin teñir la página. */}
      <div
        className="absolute"
        style={{
          bottom: "-30vh",
          right: "-12vw",
          width: "70vw",
          height: "70vh",
          background: `radial-gradient(ellipse 50% 50% at 50% 50%, rgba(34,211,238,0.05), transparent 70%)`,
          filter: "blur(50px)",
        }}
      />

      {/* 3 — Retícula de plano técnico */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${t.borderSoft} 1px, transparent 1px), linear-gradient(90deg, ${t.borderSoft} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(180deg, #000 0%, rgba(0,0,0,0.5) 45%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(180deg, #000 0%, rgba(0,0,0,0.5) 45%, transparent 85%)",
          opacity: 0.7,
        }}
      />

      {/* 4 — Grano */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `url("${GRANO}")`, opacity: 0.035, mixBlendMode: "overlay" }}
      />

      {/* 5 — Viñeta */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 90% 75% at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
      />
    </div>
  );
}

/* Portal propio para el cursor.

   El cursor tiene que vivir fuera de `.app-entra`: ese contenedor
   anima `opacity` con fill-mode `both`, y una opacidad animada crea
   un contexto de apilamiento que no desaparece al acabar la
   animación. Dentro de él, el z-index del cursor sólo compite con
   sus hermanos, nunca con los modales, que se montan en <body>.
   Resultado del bug: se ocultaba el cursor nativo y el propio
   quedaba pintado DEBAJO del visor de fotos. Sin puntero visible.

   Colgándolo de <body> queda hermano del modal, y ahí su z-index
   sí cuenta. */
function PortalCursor({ children }) {
  const [nodo] = useState(() => {
    if (typeof document === "undefined") return null;
    const d = document.createElement("div");
    d.setAttribute("data-portal", "cursor");
    return d;
  });

  useEffect(() => {
    if (!nodo) return;
    document.body.appendChild(nodo);
    return () => { if (nodo.parentNode) nodo.parentNode.removeChild(nodo); };
  }, [nodo]);

  if (!nodo) return null;
  return createPortal(children, nodo);
}

/* ------------------------------------------------------------
   CURSOR — punto + aura, con estado contextual.
   Sólo con mouse real: en táctil no se monta nada.
   Escribe en el DOM desde rAF (sin re-render de React por frame).
   ------------------------------------------------------------ */
export function Cursor({ t = TEMA }) {
  const punto = useRef(null);
  const aura = useRef(null);
  const etiqueta = useRef(null);

  useEffect(() => {
    if (movReducido() || !punteroFino()) return;

    const destino = { x: innerWidth / 2, y: innerHeight / 2 };
    const suave = { x: destino.x, y: destino.y };
    let raf;
    let activo = false;

    const alMover = (e) => {
      destino.x = e.clientX;
      destino.y = e.clientY;

      // Estado contextual: lo decide el propio elemento con data-cursor
      const el = e.target instanceof Element ? e.target.closest("[data-cursor]") : null;
      const texto = el?.getAttribute("data-cursor") || "";
      if (!!texto !== activo) {
        activo = !!texto;
        if (aura.current) {
          aura.current.style.width = activo ? "56px" : "30px";
          aura.current.style.height = activo ? "56px" : "30px";
          aura.current.style.borderColor = activo ? t.accent : t.border;
          aura.current.style.background = activo ? t.accentSoft : "transparent";
        }
        if (punto.current) punto.current.style.opacity = activo ? "0" : "1";
      }
      if (etiqueta.current && etiqueta.current.textContent !== texto) {
        etiqueta.current.textContent = texto;
        etiqueta.current.style.opacity = texto ? "1" : "0";
      }
    };

    const bucle = () => {
      suave.x += (destino.x - suave.x) * 0.22;
      suave.y += (destino.y - suave.y) * 0.22;
      if (punto.current) punto.current.style.transform = `translate3d(${destino.x}px, ${destino.y}px, 0) translate(-50%, -50%)`;
      if (aura.current) aura.current.style.transform = `translate3d(${suave.x}px, ${suave.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(bucle);
    };

    window.addEventListener("mousemove", alMover, { passive: true });
    raf = requestAnimationFrame(bucle);
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", alMover);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "";
    };
  }, [t]);

  // En táctil no renderiza nada
  if (typeof window !== "undefined" && (!punteroFino() || movReducido())) return null;

  return (
    <PortalCursor>
    <div aria-hidden className="hidden md:block">
      <div
        ref={punto}
        className="fixed top-0 left-0 rounded-full"
        style={{ zIndex: CAPA.cursor, width: 5, height: 5, background: t.text, pointerEvents: "none" }}
      />
      <div
        ref={aura}
        className="fixed top-0 left-0 rounded-full flex items-center justify-center"
        style={{
          zIndex: CAPA.cursor,
          width: 30,
          height: 30,
          border: `1px solid ${t.border}`,
          pointerEvents: "none",
          transition: "width 240ms cubic-bezier(0.22,0.61,0.36,1), height 240ms cubic-bezier(0.22,0.61,0.36,1), border-color 240ms, background-color 240ms",
        }}
      >
        <span
          ref={etiqueta}
          style={{
            fontFamily: '"Geist Mono", ui-monospace, monospace',
            fontSize: 8.5,
            letterSpacing: "0.14em",
            color: t.accentText,
            opacity: 0,
            transition: "opacity 180ms",
            whiteSpace: "nowrap",
          }}
        />
      </div>
    </div>
    </PortalCursor>
  );
}
