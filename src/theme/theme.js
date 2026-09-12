/* ============================================================
   SISTEMA DE DISEÑO — DARK CINEMATIC
   ------------------------------------------------------------
   Fuente única de verdad: color, espaciado, tipografía, radios,
   sombras, motion, breakpoints y capas (z-index).

   DIRECCIÓN DE ARTE
   Base oscura grafito → la tipografía manda → el cobre marca
   identidad → el cian marca tecnología. En ese orden y en esa
   proporción: el color es acento, nunca relleno.

   REGLA DE USO DEL COLOR (respetarla mantiene la elegancia)
     · cobre  = identidad, foco, acción principal. Poco y preciso.
     · cian   = señal técnica: stack, estados, datos, IA.
     · nunca los dos juntos en el mismo elemento.
   ============================================================ */

/* ---------- COLOR ---------- */
export const TEMA = {
  // Base: tres profundidades de grafito. La luz entra por arriba.
  bg: "#0A0B0D",          // lienzo (casi negro, ligeramente cálido)
  bgAlt: "#0E1013",       // franja alterna para separar secciones
  surface: "#14171C",     // superficie elevada (modales, filas activas)
  surface2: "#1A1E24",    // superficie un paso más clara
  border: "#262B33",      // borde visible
  borderSoft: "#191D23",  // borde sutil (líneas de tabla)

  // Texto: off-white y grises fríos, nunca blanco puro (#FFF vibra en oscuro)
  text: "#EDEFF2",        // principal
  muted: "#9AA3B0",       // secundario
  faint: "#5F6773",       // terciario, etiquetas

  // Cobre — IDENTIDAD
  accent: "#E8983E",
  accentText: "#F0AC5E",                   // legible como texto sobre oscuro
  accentSoft: "rgba(232,152,62,0.10)",
  accentBorder: "rgba(232,152,62,0.28)",

  // Cian — TECNOLOGÍA
  accent2: "#22D3EE",
  accent2Text: "#5FDFF5",
  accent2Soft: "rgba(34,211,238,0.09)",
  accent2Border: "rgba(34,211,238,0.26)",

  ok: "#34D399",          // estados positivos ("disponible")

  // Compatibilidad con componentes que aún usan estas claves
  card: "#14171C",
  cardHover: "#1A1E24",

  /* Sombras: en oscuro la profundidad viene del negro y de un
     borde superior de luz, no de sombras difusas grises. */
  shadowSoft: "0 1px 2px rgba(0,0,0,0.40)",
  shadowMd: "0 8px 24px -6px rgba(0,0,0,0.55)",
  shadowLg: "0 24px 60px -12px rgba(0,0,0,0.70)",
};

/* ---------- TIPOGRAFÍA ----------
   Dos familias, no más: Geist para todo el texto (display y cuerpo;
   su rango de pesos da la jerarquía) y Geist Mono para la ficha
   técnica. Contemporánea, de origen técnico, sin aire académico. */
export const DISPLAY = '"Geist", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
export const SANS = '"Geist", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
export const MONO = '"Geist Mono", ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace';

/* Escala tipográfica (rem). Salto grande entre display y cuerpo:
   la jerarquía editorial nace de ese contraste, no de decoración. */
export const TIPO = {
  etiqueta: "0.6875rem",  // 11px · mono, uppercase, tracking amplio
  menor: "0.8125rem",     // 13px · metadatos
  cuerpo: "1rem",         // 16px · base
  guia: "1.125rem",       // 18px · párrafo guía
  h3: "1.25rem",          // 20px
  h2: "clamp(2rem, 4.5vw, 3.5rem)",
  h1: "clamp(2.6rem, 8vw, 7rem)",
  hero: "clamp(3rem, 11vw, 10.5rem)",
};

/* ---------- ESPACIADO ---------- */
export const ESPACIO = {
  xs: "0.5rem", sm: "0.75rem", md: "1rem", lg: "1.5rem",
  xl: "2rem", "2xl": "3rem", "3xl": "4.5rem", "4xl": "7rem", "5xl": "10rem",
};

/* ---------- RADIOS ----------
   Contenidos: casi rectos. El lenguaje es editorial, no burbuja. */
export const RADIO = { sm: "4px", md: "6px", lg: "10px", pill: "999px" };

/* ---------- MOTION ----------
   Cuatro niveles según la escala de lo que se mueve. Un solo easing
   de salida para todo (coherencia), y uno suave para lo ambiental.
   Sin rebotes: el material se frena, no salta. */
export const MOTION = {
  micro: "140ms",     // hover, presión, cambio de color
  ui: "320ms",        // botones, filas, aparición de elementos
  seccion: "700ms",   // entrada de secciones al scrollear
  hero: "1100ms",     // narrativa de apertura
  salida: "cubic-bezier(0.22, 0.61, 0.36, 1)",   // principal
  suave: "cubic-bezier(0.4, 0, 0.2, 1)",         // ambiental
};

/* ---------- BREAKPOINTS ---------- */
export const BP = { sm: "480px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px" };

/* ---------- CAPAS ----------
   Registro explícito para que ningún z-index se invente sobre la marcha. */
export const CAPA = {
  fondo: 0, luz: 1, contenido: 2, nav: 50, progreso: 60,
  volverArriba: 65, modal: 90, cursor: 100, intro: 200,
};
