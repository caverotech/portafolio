import React from "react";
import { TEMA, DISPLAY, SANS, MONO, MOTION } from "../theme/theme";

/* ============================================================
   ESTILOS GLOBALES
   ------------------------------------------------------------
   Reglas base, sistema de motion e interacción. Los valores
   vienen de theme.js: aquí no se inventan colores ni tiempos.

   JERARQUÍA DE MOTION
     --t-micro    140ms  hover, presión
     --t-ui       320ms  botones, filas
     --t-seccion  700ms  entradas al scrollear
     --t-hero    1100ms  narrativa de apertura
   Un solo easing de salida. Sin rebotes.
   ============================================================ */

export default function EstilosGlobales({ t = TEMA }) {
  return (
    <style>{`
      :root {
        --t-micro: ${MOTION.micro};
        --t-ui: ${MOTION.ui};
        --t-seccion: ${MOTION.seccion};
        --t-hero: ${MOTION.hero};
        --ease: ${MOTION.salida};
        --ease-suave: ${MOTION.suave};
      }

      /* ---------- BASE ---------- */
      html { scroll-behavior: smooth; }
      body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        overflow-x: hidden;
        background: ${t.bg};
        color: ${t.text};
        font-family: ${SANS};
      }

      /* Tipografía: display en pesos medios, cuerpo legible */
      h1, h2, h3, h4 { font-family: ${DISPLAY}; font-weight: 500; letter-spacing: -0.02em; }
      h1, h2 { text-wrap: balance; }
      p { text-wrap: pretty; line-height: 1.65; }
      p, li { overflow-wrap: break-word; }

      /* ---------- AFORDANCIA ---------- */
      button:not(:disabled), [role="button"], a, summary { cursor: pointer; }
      button:disabled { cursor: not-allowed; }

      ::selection { background: ${t.accent}; color: #14100A; }

      a:focus-visible, button:focus-visible {
        outline: 2px solid ${t.accent};
        outline-offset: 3px;
        border-radius: 2px;
      }

      /* ---------- ENTRADAS ---------- */
      .app-entra { animation: appEntra var(--t-hero) var(--ease) both; }
      @keyframes appEntra { from { opacity: 0; } to { opacity: 1; } }

      @keyframes subirEntrada {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      .seccion-entra { animation: subirEntrada var(--t-ui) var(--ease) both; }
      .menu-movil { animation: subirEntrada 180ms var(--ease) both; }
      .menu-item { animation: subirEntrada 260ms var(--ease) both; }
      .modal-entrada { animation: modalEntra var(--t-ui) var(--ease) both; }
      @keyframes modalEntra {
        from { opacity: 0; transform: scale(0.985) translateY(8px); }
        to   { opacity: 1; transform: scale(1) translateY(0); }
      }

      /* ---------- BOTONES ----------
         El primario se aclara y eleva 1px. Sin barridos de brillo. */
      .btn-primario, .btn-secundario {
        position: relative;
        transition: transform var(--t-micro) var(--ease),
                    background-color var(--t-ui) var(--ease),
                    border-color var(--t-ui) var(--ease),
                    color var(--t-ui) var(--ease),
                    box-shadow var(--t-ui) var(--ease);
      }
      .btn-primario:hover { transform: translateY(-1px); box-shadow: 0 6px 22px -6px rgba(232,152,62,0.5); filter: brightness(1.06); }
      .btn-primario:active, .btn-secundario:active { transform: translateY(0); }
      .btn-secundario:hover { border-color: ${t.accentBorder} !important; color: ${t.accentText} !important; background: ${t.accentSoft}; }

      /* La flecha avanza: señal de dirección, no decoración */
      .flecha-btn { transition: transform var(--t-ui) var(--ease); }
      .btn-primario:hover .flecha-btn { transform: translateX(3px); }

      .icono-social {
        transition: transform var(--t-micro) var(--ease), border-color var(--t-ui) var(--ease),
                    color var(--t-ui) var(--ease), background-color var(--t-ui) var(--ease);
      }
      .icono-social:hover { transform: translateY(-2px); border-color: ${t.accentBorder} !important; color: ${t.accentText} !important; background: ${t.accentSoft}; }
      .icono-social:active { transform: translateY(0); }

      /* ---------- RETRATO DEL HERO ----------
         Móvil: capa de fondo atenuada, detrás del texto (el texto manda).
         Escritorio: pieza editorial a la derecha, con paralaje del puntero. */
      /* Mascara del retrato. En movil casi no recorta (la foto es un
         bloque propio); en desktop se disuelve en la escena. */
      .retrato-caja {
        --mask-retrato: radial-gradient(ellipse 82% 88% at 50% 42%, #000 62%, rgba(0,0,0,0.75) 84%, transparent 100%);
      }
      @media (min-width: 1024px) {
        .retrato-caja {
          --mask-retrato: radial-gradient(ellipse 70% 80% at 50% 40%, #000 30%, rgba(0,0,0,0.5) 62%, transparent 88%);
        }
      }

      /* Movil: el retrato NO va detras del texto. Ocupa su propio
         bloque encima del titular, en flujo normal y a color. */
      .retrato-col { position: static; order: -1; }
      .retrato-caja {
        position: relative;
        top: auto; right: auto; left: auto;
        transform: none;
        opacity: 1;
        width: min(72vw, 17rem) !important;
        margin: 0 auto;
      }
      @media (min-width: 1024px) {
        .retrato-col { position: relative; order: 0; }
        .retrato-caja {
          position: absolute;
          top: 50%;
          right: -1rem;
          width: min(86vw, 30rem) !important;
          margin: 0;
          transform: translate3d(var(--par-x, 0), calc(-50% + var(--par-y, 0px)), 0);
        }
      }

      /* ---------- INDICADOR DE SCROLL DEL HERO ---------- */
      .haz-scroll { animation: hazBaja 2.1s var(--ease-suave) infinite; }
      @keyframes hazBaja {
        0%   { transform: translateY(-100%); opacity: 0; }
        35%  { opacity: 1; }
        100% { transform: translateY(300%); opacity: 0; }
      }
      .grupo-scroll { transition: color var(--t-ui) var(--ease); }
      .grupo-scroll:hover { color: ${t.accentText}; }

      /* Entrada escalonada de filas. Usa animación CSS (no JS): el estado
         final lo garantiza animation-fill-mode, así que el contenido nunca queda
         invisible aunque el observer no llegue a disparar. */
      .fila-entra { animation: subirEntrada var(--t-seccion) var(--ease) both; }

      /* ---------- FILAS DE TABLA ----------
         Estructura editorial: el hover tiñe apenas la fila y desplaza
         el contenido 4px. Nada de elevación ni sombras. */
      .fila-tabla, .fila-proyecto, .fila-canal {
        transition: background-color var(--t-ui) var(--ease);
      }
      .fila-tabla:hover, .fila-canal:hover { background: rgba(255,255,255,0.022); }
      .fila-proyecto:hover { background: rgba(232,152,62,0.035); }

      .cuerpo-fila { transition: transform var(--t-ui) var(--ease); }
      .fila-proyecto:hover .cuerpo-fila { transform: translateX(5px); }

      /* El titulo del proyecto se subraya al pasar el mouse */
      .titulo-proyecto { position: relative; display: inline-block; }
      .titulo-proyecto::after {
        content: ""; position: absolute; left: 0; right: 0; bottom: 0.02em; height: 1px;
        background: ${t.accent};
        transform: scaleX(0); transform-origin: left;
        transition: transform var(--t-seccion) var(--ease);
      }
      .fila-proyecto:hover .titulo-proyecto::after { transform: scaleX(1); }

      .flecha-cta { transition: transform var(--t-ui) var(--ease); }
      .fila-proyecto:hover .flecha-cta,
      .fila-canal:hover .flecha-cta { transform: translateX(5px); }

      /* Miniatura: a color siempre, escala ligeramente al pasar el cursor */
      .mini-proyecto img {
        transition: filter var(--t-seccion) var(--ease), transform var(--t-seccion) var(--ease);
      }
      .fila-proyecto:hover .mini-proyecto img { transform: scale(1.04); }

      /* ---------- ENTRADA AL DETALLE DE PROYECTO ----------
         Al abrir un proyecto la pagina entra con un fundido y la
         portada hace un zoom lento: la transicion sostiene la
         sensacion de "entrar" en el caso, no de saltar a otra pagina. */
      .detalle-entra { animation: detalleEntra 620ms var(--ease) both; }
      @keyframes detalleEntra {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .portada-detalle img { animation: portadaZoom 2600ms var(--ease-suave) both; }
      @keyframes portadaZoom {
        from { transform: scale(1.07); }
        to   { transform: scale(1); }
      }

      /* ---------- TARJETAS DE "EN PROCESO" ---------- */
      .tarjeta-proceso {
        transition: border-color var(--t-ui) var(--ease),
                    transform var(--t-ui) var(--ease),
                    background var(--t-ui) var(--ease);
      }
      .tarjeta-proceso:hover {
        border-color: ${t.border};
        background: ${t.cardHover};
        transform: translateY(-3px);
      }

      /* ---------- VISOR DE ALBUM DE MOMENTOS ---------- */
      .visor-album { animation: aparecerVelo var(--t-ui) ease both; }
      .visor-album-caja { animation: subirVisor var(--t-ui) var(--ease) both; }
      .foto-album { animation: aparecerVelo 420ms ease both; }
      .mini-album { transition: opacity var(--t-ui) var(--ease), border-color var(--t-ui) var(--ease); }
      .mini-album:hover { opacity: 1 !important; }

      /* ---------- ARBOL DE CLAUDE: SKILLS Y MCP ---------- */
      .rama-claude { transition: opacity var(--t-ui) var(--ease); }
      .rama-claude:hover { opacity: 0.82; }
      .tarjeta-skill {
        transition: border-color var(--t-ui) var(--ease), transform var(--t-ui) var(--ease);
      }
      .tarjeta-skill:hover { border-color: ${t.border}; transform: translateY(-2px); }
      .tarjeta-mcp {
        transition: border-color var(--t-ui) var(--ease), background var(--t-ui) var(--ease);
      }
      .tarjeta-mcp:hover { border-color: ${t.border}; background: ${t.cardHover}; }

      /* ---------- SOBRE MI: pasos del metodo ----------
         El nodo del paso se tine de cobre y crece al entrar en pantalla. */
      .paso-metodo .nodo-paso { transition: transform var(--t-ui) var(--ease); }
      .paso-metodo:hover .nodo-paso { transform: translateY(-3px) scale(1.5); }
      .banda-capacidad { transition: background-color var(--t-ui) var(--ease); }
      .banda-capacidad:hover { background: rgba(255,255,255,0.018); }

      .filtro-texto { transition: color var(--t-ui) var(--ease), border-color var(--t-ui) var(--ease); }
      .filtro-texto:hover { color: ${t.text} !important; }

      /* ---------- NAV ---------- */
      .nav-link { position: relative; transition: color var(--t-ui) var(--ease); }
      .nav-link::after {
        content: ""; position: absolute; left: 10px; right: 10px; bottom: 3px; height: 1px;
        background: ${t.accent};
        transform: scaleX(0); transform-origin: left;
        transition: transform var(--t-ui) var(--ease);
      }
      .nav-link:hover::after { transform: scaleX(1); }

      /* ---------- TARJETAS Y MEDIOS (secciones aún no refactorizadas) ---------- */
      .tarjeta-suave { transition: transform var(--t-ui) var(--ease), border-color var(--t-ui) var(--ease), background-color var(--t-ui) var(--ease); }
      .tarjeta-suave:hover { transform: translateY(-2px); border-color: ${t.border} !important; background: ${t.surface2} !important; }
      .canal-contacto { transition: transform var(--t-ui) var(--ease), border-color var(--t-ui) var(--ease); }
      .canal-contacto:hover { transform: translateY(-2px); border-color: ${t.accentBorder} !important; }
      .flecha-carrusel { transition: border-color var(--t-ui) var(--ease), color var(--t-ui) var(--ease), background-color var(--t-ui) var(--ease); }
      .flecha-carrusel:hover { border-color: ${t.accentBorder} !important; color: ${t.accentText} !important; background: ${t.accentSoft} !important; }
      .tarjeta-certificado { transition: transform var(--t-ui) var(--ease), border-color var(--t-ui) var(--ease); }
      .tarjeta-certificado:hover { transform: translateY(-2px); border-color: ${t.accent2Border} !important; }
      .momento-polaroid { transition: transform var(--t-ui) var(--ease), box-shadow var(--t-ui) var(--ease); transform-origin: center; }
      .momento-polaroid:hover { transform: rotate(0deg) scale(1.02) !important; box-shadow: ${t.shadowLg}; z-index: 5; }
      .zoomable img { transition: transform var(--t-seccion) var(--ease); }
      .group:hover .zoomable img, .zoomable:hover img { transform: scale(1.04); }
      .enlace-social { transition: transform var(--t-micro) var(--ease), border-color var(--t-ui) var(--ease), color var(--t-ui) var(--ease), background-color var(--t-ui) var(--ease); }
      .enlace-social:hover { transform: translateY(-2px); border-color: ${t.accentBorder} !important; color: ${t.accentText} !important; background: ${t.accentSoft} !important; }
      .enlace-social-inv { transition: transform var(--t-micro) var(--ease), border-color var(--t-ui) var(--ease), color var(--t-ui) var(--ease); }
      .enlace-social-inv:hover { transform: translateY(-2px); border-color: ${t.accentBorder} !important; color: ${t.accentText} !important; }
      .boton-base { transition: transform var(--t-micro) var(--ease), background-color var(--t-ui) var(--ease), border-color var(--t-ui) var(--ease), color var(--t-ui) var(--ease); }
      .boton-base:hover { transform: translateY(-1px); }
      .boton-base:active { transform: translateY(0); }
      .boton-sec:hover { border-color: ${t.accentBorder} !important; color: ${t.accentText} !important; background: ${t.accentSoft} !important; }

      /* ---------- ELEMENTOS VIVOS ---------- */
      @keyframes latido { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
      .punto-vivo { animation: latido 2.2s var(--ease-suave) infinite; }
      @keyframes flotarAvatar { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
      .avatar-saluda { animation: flotarAvatar 5s var(--ease-suave) infinite; }

      /* ---------- FICHAS DE CERTIFICADO ---------- */
      .ficha-cert {
        transition: border-color var(--t-ui) var(--ease),
                    transform var(--t-ui) var(--ease),
                    background var(--t-ui) var(--ease);
      }
      .ficha-cert:hover {
        border-color: ${t.accentBorder};
        background: ${t.cardHover};
        transform: translateY(-3px);
      }
      .lienzo-cert { transition: transform var(--t-seccion) var(--ease), filter var(--t-ui) var(--ease); }
      .ficha-cert:hover .lienzo-cert { transform: scale(1.035); }
      /* La lupa solo aparece cuando hay intencion de mirar */
      .lupa-cert { opacity: 0; transition: opacity var(--t-ui) var(--ease); }
      .ficha-cert:hover .lupa-cert, .ficha-cert:focus-visible .lupa-cert { opacity: 1; }
      .flecha-cert svg { transition: transform var(--t-ui) var(--ease); }
      .ficha-cert:hover .flecha-cert svg { transform: translateX(3px); }

      /* ---------- VISOR DE CERTIFICADO ---------- */
      .visor-cert { animation: aparecerVelo var(--t-ui) ease both; }
      .visor-cert-caja { animation: subirVisor var(--t-ui) var(--ease) both; }
      @keyframes aparecerVelo { from { opacity: 0; } to { opacity: 1; } }
      @keyframes subirVisor {
        from { opacity: 0; transform: translateY(14px) scale(0.985); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }

      .sin-scroll { scrollbar-width: none; -ms-overflow-style: none; }
      .sin-scroll::-webkit-scrollbar { display: none; }

      /* ---------- SCROLLBAR ---------- */
      @media (pointer: fine) {
        *::-webkit-scrollbar { width: 10px; height: 10px; }
        *::-webkit-scrollbar-track { background: ${t.bg}; }
        *::-webkit-scrollbar-thumb { background: ${t.surface2}; border: 3px solid ${t.bg}; border-radius: 99px; }
        *::-webkit-scrollbar-thumb:hover { background: ${t.border}; }
      }

      /* ---------- TÁCTIL ----------
         Sin hover obligatorio y con objetivo mínimo de 44px. */
      @media (hover: none) and (pointer: coarse) {
        .fila-proyecto:hover .cuerpo-fila { transform: none; }
        .fila-proyecto:active { background: rgba(232,152,62,0.06); }
        .nav-link, .filtro-texto { min-height: 44px; display: inline-flex; align-items: center; }
      }

      /* ---------- ACCESIBILIDAD ---------- */
      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
  );
}
