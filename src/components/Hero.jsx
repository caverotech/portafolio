import React from "react";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { DATOS } from "../data/portafolio";
import { TEMA, DISPLAY, MONO, TIPO, MOTION } from "../theme/theme";
import { useSecuenciaEntrada, useRatonSuave, movReducido } from "../hooks/useReveal";

/* ============================================================
   HERO — apertura cinematográfica
   ------------------------------------------------------------
   Narrativa de entrada, en este orden (≈1.4s en total):

     1. ATMÓSFERA  el retrato emerge de la oscuridad
     2. IDENTIDAD  coordenadas y disponibilidad
     3. NOMBRE     clip reveal por línea
     4. ROL        la frase que debe recordarse
     5. VALOR      propuesta en una línea
     6. ACCIÓN     CTA + indicador de scroll

   Composición: rejilla asimétrica de 12 columnas. El texto ocupa
   7 y arranca en la columna 1; el retrato ocupa de la 8 a la 12 y
   sangra por la derecha. Nada centrado.
   ============================================================ */

// Una línea del titular: máscara que descubre el texto de abajo a arriba
function LineaRevelada({ children, activo, retardo = 0, estilo = {} }) {
  return (
    <span className="block overflow-hidden" style={{ paddingBottom: "0.06em" }}>
      <span
        className="block"
        style={{
          ...estilo,
          transform: activo ? "translateY(0)" : "translateY(105%)",
          opacity: activo ? 1 : 0,
          transition: `transform ${MOTION.hero} ${MOTION.salida} ${retardo}ms, opacity 700ms ease ${retardo}ms`,
        }}
      >
        {children}
      </span>
    </span>
  );
}

export default function Hero({ t = TEMA, irASeccion }) {
  const paso = useSecuenciaEntrada(6, 135, 180);
  const raton = useRatonSuave(0.06);
  const quieto = movReducido();

  // El indicador de scroll cumple su funcion una sola vez: en cuanto el
  // visitante se desplaza deja de tener sentido pedirle que se desplace.
  const [arriba, setArriba] = React.useState(true);
  React.useEffect(() => {
    const alScroll = () => setArriba(window.scrollY < 90);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  return (
    <section
      id="inicio"
      className="relative flex flex-col justify-center"
      style={{ minHeight: "100svh", paddingTop: "5.5rem", paddingBottom: "2rem" }}
    >
      <div className="relative w-full max-w-[1500px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-y-10 lg:gap-x-10 items-center">

          {/* ---------------- TEXTO: columnas 1–7 ---------------- */}
          <div className="lg:col-span-7 relative" style={{ zIndex: 2 }}>

            {/* 2 · IDENTIDAD — microdetalles de encuadre */}
            <div
              className="flex items-center gap-4 mb-8 md:mb-10"
              style={{
                opacity: paso >= 1 ? 1 : 0,
                transform: paso >= 1 ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 600ms ease, transform 600ms ${MOTION.salida}`,
              }}
            >
              <span className="flex items-center gap-2">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: t.ok }} />
                  <span className="relative inline-flex rounded-full w-1.5 h-1.5" style={{ background: t.ok }} />
                </span>
                <span style={{ fontFamily: MONO, fontSize: TIPO.etiqueta, letterSpacing: "0.16em", color: t.muted, textTransform: "uppercase" }}>
                  Disponible
                </span>
              </span>
              <span className="h-px w-8 md:w-14" style={{ background: t.border }} />
              <span style={{ fontFamily: MONO, fontSize: TIPO.etiqueta, letterSpacing: "0.16em", color: t.faint, textTransform: "uppercase" }}>
                14°04′S 75°44′W
              </span>
            </div>

            {/* 3 · NOMBRE — clip reveal línea por línea */}
            <h1
              className="mb-7"
              style={{
                fontFamily: DISPLAY,
                fontSize: TIPO.hero,
                lineHeight: 0.85,
                fontWeight: 500,
                letterSpacing: "-0.045em",
                color: t.text,
              }}
            >
              <LineaRevelada activo={paso >= 2} retardo={0}>Alexys</LineaRevelada>
              <LineaRevelada activo={paso >= 2} retardo={90}>
                <span style={{ color: t.accent }}>Cavero</span>
              </LineaRevelada>
            </h1>

            {/* 4 · ROL — la línea que el visitante debe recordar */}
            <div
              className="mb-7 flex items-baseline gap-4"
              style={{
                opacity: paso >= 3 ? 1 : 0,
                transform: paso >= 3 ? "translateY(0)" : "translateY(10px)",
                transition: `opacity 700ms ease 60ms, transform 700ms ${MOTION.salida} 60ms`,
              }}
            >
              <span className="h-px w-10 shrink-0 mt-3 hidden sm:block" style={{ background: t.accent }} />
              <p
                style={{
                  fontFamily: DISPLAY,
                  fontSize: "clamp(1.15rem, 2.3vw, 1.75rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  color: t.text,
                  lineHeight: 1.2,
                }}
              >
                Ingeniero de IA
                <span style={{ color: t.faint }}> & </span>
                Automatización
              </p>
            </div>

            {/* 5 · PROPUESTA DE VALOR */}
            <p
              className="mb-10 leading-relaxed"
              style={{
                color: t.muted,
                fontSize: TIPO.guia,
                maxWidth: "46ch",
                opacity: paso >= 4 ? 1 : 0,
                transform: paso >= 4 ? "translateY(0)" : "translateY(10px)",
                transition: `opacity 700ms ease, transform 700ms ${MOTION.salida}`,
              }}
            >
              Construyo agentes de IA y flujos automatizados que reemplazan
              trabajo manual — y la interfaz que los vuelve usables.
            </p>

            {/* 6 · ACCIÓN */}
            <div
              className="flex flex-wrap items-center gap-3"
              style={{
                opacity: paso >= 5 ? 1 : 0,
                transform: paso >= 5 ? "translateY(0)" : "translateY(10px)",
                transition: `opacity 700ms ease, transform 700ms ${MOTION.salida}`,
              }}
            >
              <button
                type="button"
                onClick={() => irASeccion("proyectos")}
                data-cursor="VER"
                className="btn-primario inline-flex items-center gap-2.5 px-5 py-3"
                style={{ background: t.accent, color: "#14100A", fontWeight: 600, fontSize: "0.9rem" }}
              >
                Ver mis sistemas
                <ArrowRight size={15} strokeWidth={2.2} className="flecha-btn" />
              </button>

              <a
                href={DATOS.cvUrl}
                download
                data-cursor="PDF"
                className="btn-secundario inline-flex items-center gap-2.5 px-5 py-3"
                style={{ border: `1px solid ${t.border}`, color: t.text, fontWeight: 500, fontSize: "0.9rem" }}
              >
                <Download size={15} strokeWidth={2} />
                Descargar CV
              </a>

              <div className="flex items-center gap-1.5 sm:ml-2">
                {[
                  { Icono: Github, href: DATOS.github, label: "GitHub" },
                  { Icono: Linkedin, href: DATOS.linkedin, label: "LinkedIn" },
                  { Icono: Mail, href: `mailto:${DATOS.email}`, label: "Email" },
                ].map(({ Icono, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    data-cursor=""
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="icono-social w-10 h-10 flex items-center justify-center"
                    style={{ border: `1px solid ${t.borderSoft}`, color: t.muted }}
                  >
                    <Icono size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ---------------- RETRATO: columnas 8–12, sangra a la derecha ----------------
              Emerge de la oscuridad: el degradado lo funde con el fondo por
              tres lados. Paralaje mínimo con el puntero. */}
          <div className="lg:col-span-5 relative retrato-col">
            <div
              className="retrato-caja absolute lg:top-1/2 lg:-right-4 lg:-translate-y-1/2"
              style={{
                opacity: paso >= 1 ? 1 : 0,
                ["--par-x"]: `${quieto ? 0 : raton.x * -12}px`,
                ["--par-y"]: `${quieto ? 0 : raton.y * -8}px`,
                transition: `opacity ${MOTION.hero} ease`,
              }}
            >
              <div className="relative" style={{ aspectRatio: "4 / 5" }}>
                <img
                  src={DATOS.fotos.perfil}
                  alt={`Retrato de ${DATOS.nombre}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    objectPosition: "50% 14%",
                    // A color. Solo un ajuste fino para que se asiente
                    // sobre el fondo grafito, sin desaturar la piel.
                    filter: "contrast(1.04) saturate(1.02) brightness(0.97)",
                    maskImage: "var(--mask-retrato)",
                    WebkitMaskImage: "var(--mask-retrato)",
                  }}
                />
                {/* Fundido lateral: entrega el lado izquierdo al titular */}
                <div className="hidden lg:block absolute inset-0" style={{ background: `linear-gradient(90deg, ${t.bg} 0%, rgba(10,11,13,0.55) 24%, transparent 56%)` }} />
                {/* Fundidos verticales, solapados y largos */}
                <div className="absolute inset-x-0 bottom-0" style={{ height: "42%", background: `linear-gradient(transparent, rgba(10,11,13,0.55) 60%, rgba(10,11,13,0.92))` }} />
                <div className="hidden lg:block absolute inset-x-0 top-0" style={{ height: "30%", background: `linear-gradient(${t.bg}, transparent)` }} />
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- PIE: indicador de scroll + ficha ---------------- */}
        <div
          className="mt-14 lg:mt-20 flex items-end justify-between gap-6"
          style={{
            opacity: paso >= 6 ? 1 : 0,
            transition: "opacity 800ms ease",
          }}
        >
          <button
            type="button"
            onClick={() => irASeccion("sobre-mi")}
            className="grupo-scroll flex items-center gap-3"
            style={{
              color: t.faint,
              opacity: arriba ? 1 : 0,
              transform: arriba ? "translateY(0)" : "translateY(8px)",
              pointerEvents: arriba ? "auto" : "none",
              transition: "opacity 420ms ease, transform 420ms ease",
            }}
            aria-hidden={!arriba}
            tabIndex={arriba ? 0 : -1}
            aria-label="Ir a Sobre mí"
          >
            <span className="riel-scroll relative block overflow-hidden" style={{ width: 1, height: 42, background: t.border }}>
              <span className="haz-scroll absolute inset-x-0 top-0" style={{ height: 14, background: t.accent }} />
            </span>
            <span style={{ fontFamily: MONO, fontSize: TIPO.etiqueta, letterSpacing: "0.16em", textTransform: "uppercase" }}>
              Desplázate
            </span>
          </button>

          {/* Marcas de experiencia: hechos, sin adornos */}
          <p
            className="hidden md:block text-right"
            style={{ fontFamily: MONO, fontSize: TIPO.etiqueta, color: t.faint, letterSpacing: "0.1em", lineHeight: 1.9 }}
          >
            {DATOS.experiencia.join("  ·  ")}
          </p>
        </div>
      </div>
    </section>
  );
}
