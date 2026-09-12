import React, { useState, useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Github, Linkedin, Mail, Download, ArrowRight, ArrowLeft,
  Menu, X, MapPin, Layers, Database, Wrench,
  Sparkles, ExternalLink, FolderGit2, ArrowUp,
  Code2, Server, Settings2, BrainCircuit,
  BarChart3, BookOpen, MessageSquare, Bot, Workflow,
  Mic, Heart,
} from "lucide-react";

// Datos del portafolio y tema, separados en sus propios archivos para mantener todo ordenado
import { DATOS, CATEGORIAS } from "./data/portafolio";
import { TEMA, DISPLAY, SANS, MONO, TIPO, CAPA } from "./theme/theme";
import { useReveal, movReducido } from "./hooks/useReveal";
import Bienvenida from "./components/Bienvenida";
import Atmosfera, { Cursor } from "./components/Atmosfera";
import Hero from "./components/Hero";
import EstilosGlobales from "./components/EstilosGlobales";

// Iconos Lucide para marcas sin logo en Simple Icons (clave -> componente)
const LUCIDE_TECH = { powerbi: BarChart3, gpt: MessageSquare, notebooklm: BookOpen, perplexity: Bot, n8n: Workflow };


/* ============================================================
   COMPONENTES Y UTILIDADES
   (hooks reutilizables están en src/hooks/useReveal.js)
   ============================================================ */

function Reveal({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Contador animado: "12+" → cuenta de 0 a 12 y conserva el sufijo
function Contador({ valor, visible }) {
  const m = String(valor).match(/^(\d+)(.*)$/);
  const fin = m ? parseInt(m[1], 10) : 0;
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    if (movReducido() || !m) { setN(fin); return; }
    let raf; const t0 = performance.now(); const dur = 1400;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      setN(Math.round(fin * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, fin]);
  if (!m) return <>{valor}</>;
  return <>{n}{m[2]}</>;
}

/* Foto con degradado de respaldo: si la imagen no carga,
   se muestra el degradado del proyecto en su lugar.
   `tinte` aplica un velo de marca (cobre/cian) para que las fotos
   se vean premium y coherentes con el tema oscuro, no "de stock". */
function Foto({ src, alt = "", gradiente = ["#14171C", "#1A1E24"], className = "", style = {}, tinte = true, children }) {
  const [falla, setFalla] = useState(false);
  return (
    <div
      className={`relative overflow-hidden zoomable ${className}`}
      style={{ background: `linear-gradient(135deg, ${gradiente[0]}, ${gradiente[1]})`, ...style }}
    >
      {!falla && src && (
        <img
          src={src} alt={alt} loading="lazy"
          onError={() => setFalla(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: tinte ? "saturate(0.95) contrast(1.03)" : undefined }}
        />
      )}
      {/* Velo muy leve para asentar la imagen sobre el fondo claro */}
      {tinte && !falla && src && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(160deg, transparent 45%, rgba(10,11,13,0.75))" }}
        />
      )}
      {children}
    </div>
  );
}

/* Logo real de cada tecnología (Simple Icons CDN).
   Si el logo no existe o no carga, muestra una insignia con la inicial. */
function IconoTech({ t, slug, color, nombre, tam = 22, lucide: IconoLucide }) {
  const [falla, setFalla] = useState(false);
  const caja = tam + 14;
  // Icono Lucide directo (para marcas sin logo en Simple Icons: GPT, Power BI, NotebookLM…)
  if (IconoLucide) {
    return (
      <span
        className="flex items-center justify-center rounded-lg shrink-0"
        style={{ width: caja, height: caja, background: t.surface2, border: `1px solid ${t.borderSoft}`, color: t.accent2Text }}
        aria-hidden
      >
        <IconoLucide size={tam} />
      </span>
    );
  }
  if (!slug || falla) {
    return (
      <span
        className="flex items-center justify-center rounded-lg font-bold shrink-0"
        style={{
          width: caja, height: caja, fontFamily: MONO, fontSize: tam * 0.5,
          color: t.accentText, background: t.accentSoft, border: `1px solid ${t.borderSoft}`,
        }}
        aria-hidden
      >
        {nombre.charAt(0)}
      </span>
    );
  }
  return (
    <span
      className="flex items-center justify-center rounded-lg shrink-0"
      style={{ width: caja, height: caja, background: t.surface2, border: `1px solid ${t.borderSoft}` }}
    >
      <img
        src={`https://cdn.simpleicons.org/${slug}/${color}`}
        width={tam} height={tam} alt={nombre} loading="lazy"
        onError={() => setFalla(true)}
      />
    </span>
  );
}

/* ============================================================
   ATMÓSFERA GLOBAL — retícula de fondo y luz de cursor
   ============================================================ */

/* Fondo global corporativo: una retícula tenue y un velo suave.
   Sin auroras de color, sin canvas animado, sin grano: en un tema claro
   el vacío se resuelve con estructura y aire, no con luces de color. */

// Barra de progreso de lectura (parte superior)
function BarraProgreso({ t }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => {
      const h = document.documentElement;
      setP(h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1));
    };
    window.addEventListener("scroll", f, { passive: true });
    f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div
      className="fixed top-0 left-0 h-0.5"
      style={{ zIndex: 70, width: `${p * 100}%`, background: t.accent, transition: "width 0.1s linear" }}
    />
  );
}

// Botón flotante para volver arriba
function VolverArriba({ t }) {
  const [ver, setVer] = useState(false);
  useEffect(() => {
    const f = () => setVer(window.scrollY > 600);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <button
      type="button"
      aria-label="Volver arriba"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
      style={{
        zIndex: 60, background: t.accent, color: "#14100A",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        opacity: ver ? 1 : 0, pointerEvents: ver ? "auto" : "none",
        transform: ver ? "translateY(0)" : "translateY(16px)",
      }}
    >
      <ArrowUp size={18} />
    </button>
  );
}

// Marquesina infinita de tecnologías, ahora con logos reales
function Marquesina({ t }) {
  const items = DATOS.tecnologias.flatMap((c) => c.items);
  const doble = [...items, ...items];
  const mascara = "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)";
  return (
    <Reveal>
      <div
        className="marquesina relative overflow-hidden py-4 mb-10 rounded-2xl"
        style={{ border: `1px solid ${t.borderSoft}`, background: t.card, maskImage: mascara, WebkitMaskImage: mascara }}
      >
        <div className="pista flex items-center gap-3 w-max" style={{ animation: movReducido() ? "none" : "marquesina 45s linear infinite" }}>
          {doble.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2.5 shrink-0 px-4 py-2 rounded-xl"
              style={{ background: t.surface, border: `1px solid ${t.borderSoft}` }}
            >
              <IconoTech t={t} slug={item.slug} color={item.color} nombre={item.nombre} lucide={LUCIDE_TECH[item.lucide]} tam={16} />
              <span style={{ fontFamily: MONO, fontSize: 12.5, color: t.text, fontWeight: 500, whiteSpace: "nowrap" }}>{item.nombre}</span>
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// Etiqueta monoespaciada estilo "ficha técnica" — firma visual del sitio
function Eyebrow({ t, children, color }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.18em", color: color || t.accentText, textTransform: "uppercase" }}>
        {children}
      </span>
      <span className="flex-1 h-px" style={{ background: t.borderSoft, maxWidth: 64 }} />
    </div>
  );
}

/* Separador sutil entre secciones: línea con degradado central que se desvanece */
function SepSeccion({ t }) {
  return (
    <div
      aria-hidden
      className="absolute top-0 inset-x-0 h-px pointer-events-none"
      style={{
        background: `linear-gradient(90deg, transparent, ${t.borderSoft} 20%, ${t.border} 50%, ${t.borderSoft} 80%, transparent)`,
        maxWidth: "72rem", marginLeft: "auto", marginRight: "auto",
      }}
    />
  );
}

/* Cabecera de sección numerada — firma visual unificada.
   num: "01" · eyebrow: texto monoespaciado · titulo: H2 grande · acento cobre|cian */
function CabeceraSeccion({ t, num, eyebrow, titulo, descripcion, acento = "cobre", children }) {
  const col = t.accentText;
  return (
    <div className="mb-10 md:mb-12">
      <Reveal>
        <div className="flex items-center gap-3 mb-5">
          <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 500, color: col, letterSpacing: "0.08em" }}>{num}</span>
          <span className="h-px w-7" style={{ background: col, opacity: 0.5 }} />
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.2em", color: t.faint, textTransform: "uppercase" }}>{eyebrow}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2
            className="max-w-2xl"
            style={{ color: t.text, fontFamily: DISPLAY, fontSize: "clamp(2rem, 4vw, 3.1rem)", lineHeight: 1.05, fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            {titulo}
          </h2>
          {children}
        </div>
        {descripcion && (
          <p className="max-w-xl leading-relaxed mt-4" style={{ color: t.muted, fontSize: "1.02rem" }}>
            {descripcion}
          </p>
        )}
      </Reveal>
    </div>
  );
}

function Chip({ t, children }) {
  return (
    <span
      className="inline-block px-2.5 py-1 rounded-md"
      style={{ fontFamily: MONO, fontSize: 11, color: t.muted, background: t.surface2, border: `1px solid ${t.borderSoft}` }}
    >
      {children}
    </span>
  );
}

function Boton({ t, primario, icono: Icono, children, href, onClick, descarga }) {
  const base = "boton-base inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm";
  const clase = primario ? base : base + " boton-sec";
  const estilo = primario
    ? { background: t.accent, color: "#14100A", boxShadow: "0 4px 18px -4px rgba(232,152,62,0.45)" }
    : { background: t.surface, color: t.text, border: `1px solid ${t.border}` };
  const props = { className: clase, style: estilo, onClick };
  if (href !== undefined) {
    return (
      <a href={href} {...props} {...(descarga ? { download: true } : {})} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {Icono && <Icono size={16} strokeWidth={2} />}
        {children}
      </a>
    );
  }
  return (
    <button type="button" {...props}>
      {Icono && <Icono size={16} strokeWidth={2} />}
      {children}
    </button>
  );
}

/* ============================================================
   NAVEGACIÓN
   ============================================================ */

const SECCIONES = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "tecnologias", label: "Tecnologías" },
  { id: "certificados", label: "Certificados" },
  { id: "proyectos", label: "Proyectos" },
  { id: "galeria", label: "Momentos" },
  { id: "contacto", label: "Contacto" },
];

/* Navegación. `oscuro` invierte los colores para las secciones a sangre
   (Proyectos, Contacto), donde un nav claro sería ilegible. */
function Nav({ t, irASeccion, enDetalle, volver, seccionActiva, oscuro }) {
  const [abierto, setAbierto] = useState(false);
  const [conFondo, setConFondo] = useState(false);

  useEffect(() => {
    const onScroll = () => setConFondo(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Al abrir el menú móvil bloqueamos el scroll del fondo
  useEffect(() => {
    if (!abierto) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previo; };
  }, [abierto]);

  const click = (id) => { setAbierto(false); enDetalle ? volver(id) : irASeccion(id); };

  // Paleta activa según el fondo de la sección
  const c = oscuro
    ? { texto: t.text, suave: t.muted, tenue: t.faint, borde: t.border, bordeSuave: t.borderSoft, acento: t.accent, fondo: "rgba(14,15,18,0.85)", logoBg: t.text, logoFg: t.bg }
    : { texto: t.text, suave: t.muted, tenue: t.faint, borde: t.border, bordeSuave: t.borderSoft, acento: t.accentText, fondo: "rgba(10,11,13,0.82)", logoBg: t.text, logoFg: t.bg };

  return (
    <header
      className="fixed top-0 left-0 right-0"
      style={{
        zIndex: 50,
        background: conFondo || abierto ? c.fondo : "transparent",
        backdropFilter: conFondo || abierto ? "blur(14px)" : "none",
        borderBottom: `1px solid ${conFondo || abierto ? c.bordeSuave : "transparent"}`,
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <nav className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 h-16 flex items-center justify-between">
        <button type="button" onClick={() => click("inicio")} className="flex items-center gap-2.5" style={{ color: c.texto }}>
          <span
            className="w-7 h-7 rounded-md flex items-center justify-center text-sm"
            style={{ background: c.logoBg, color: c.logoFg, fontFamily: SANS, fontWeight: 600, letterSpacing: "-0.03em" }}
          >
            AC
          </span>
          <span className="font-semibold text-sm tracking-tight hidden sm:block">{DATOS.nombre}</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {SECCIONES.map((s) => {
            const activa = !enDetalle && seccionActiva === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => click(s.id)}
                className="nav-link px-3 py-2 rounded-md text-sm transition-colors duration-200"
                style={{ color: activa ? c.texto : c.suave, fontWeight: activa ? 600 : 400 }}
                onMouseEnter={(e) => { if (!activa) e.currentTarget.style.color = c.texto; }}
                onMouseLeave={(e) => { if (!activa) e.currentTarget.style.color = c.suave; }}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setAbierto(!abierto)}
          aria-label="Menú"
          aria-expanded={abierto}
          className="flex md:hidden w-9 h-9 rounded-lg items-center justify-center"
          style={{ border: `1px solid ${c.borde}`, color: c.texto }}
        >
          {abierto ? <X size={17} /> : <Menu size={17} />}
        </button>
      </nav>

      {abierto && (
        <div
          className="md:hidden px-6 pt-2 pb-6 flex flex-col gap-1 menu-movil"
          style={{ borderTop: `1px solid ${c.bordeSuave}`, background: c.fondo }}
        >
          {SECCIONES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => click(s.id)}
              className="menu-item flex items-center justify-between text-left px-3.5 py-3.5 rounded-lg text-base font-medium"
              style={{ color: c.texto, animationDelay: `${i * 35}ms` }}
            >
              {s.label}
              <ArrowRight size={16} style={{ color: c.tenue }} />
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ============================================================
   HERO — declaración editorial a pantalla completa
   ============================================================ */

/* ============================================================
   SOBRE MÍ
   ============================================================ */

function SobreMi({ t }) {
  return (
    <section id="sobre-mi" className="relative py-20 md:py-28 px-5 md:px-8">
      <SepSeccion t={t} />
      <div className="max-w-5xl mx-auto">
        <CabeceraSeccion
          t={t}
          num="01"
          eyebrow="Sobre mí"
          titulo="Automatizo lo que hoy alguien hace a mano"
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-stretch">
          {/* Panel "cómo trabajo": contenido propio en lugar de una foto de stock.
              Comunica el método, que es lo que un empleador quiere saber. */}
          <Reveal delay={80} className="lg:col-span-2 flex">
            <div
              className="relative w-full rounded-2xl p-6 flex flex-col"
              style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, boxShadow: t.shadowSoft }}
            >
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", color: t.faint, textTransform: "uppercase" }}>
                Cómo trabajo
              </span>

              <ol className="mt-5 flex-1 flex flex-col justify-around space-y-0">
                {[
                  { n: "01", t: "Entender el proceso", d: "Qué se hace hoy a mano, cuántas horas cuesta y dónde se rompe." },
                  { n: "02", t: "Decidir si la IA aplica", d: "A veces la respuesta es un script, no un modelo. Lo digo con franqueza." },
                  { n: "03", t: "Construir el flujo", d: "Agente o automatización, con límites claros y control humano donde importa." },
                  { n: "04", t: "Dejarlo usable", d: "Interfaz simple para quien no es técnico, y medición de lo que ahorró." },
                ].map((paso, i, arr) => (
                  <li
                    key={paso.n}
                    className="flex gap-3.5 py-3.5"
                    style={{ borderBottom: i < arr.length - 1 ? `1px solid ${t.borderSoft}` : "none" }}
                  >
                    <span
                      className="shrink-0"
                      style={{ fontFamily: MONO, fontSize: 11, color: t.accentText, fontWeight: 500, paddingTop: 2 }}
                    >
                      {paso.n}
                    </span>
                    <span className="min-w-0">
                      <span className="block" style={{ fontSize: 14, fontWeight: 600, color: t.text, letterSpacing: "-0.01em" }}>
                        {paso.t}
                      </span>
                      <span className="block mt-1" style={{ fontSize: 13, color: t.muted, lineHeight: 1.55 }}>
                        {paso.d}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              {/* Cierre: la marca bajo la que entrega el trabajo */}
              <div className="mt-5 pt-4 flex items-center justify-between gap-3" style={{ borderTop: `1px solid ${t.borderSoft}` }}>
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", color: t.faint, textTransform: "uppercase" }}>
                  Conecta Systems
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="punto-vivo w-1.5 h-1.5 rounded-full" style={{ background: t.ok }} />
                  <span style={{ fontFamily: MONO, fontSize: 10, color: t.muted, letterSpacing: "0.08em" }}>EN PRODUCCIÓN</span>
                </span>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-3 flex flex-col">
            <Reveal delay={120}>
              <p className="leading-relaxed mb-4" style={{ color: t.muted, fontSize: "1.05rem" }}>
                {DATOS.sobreMi.intro}
              </p>
              {DATOS.sobreMi.motivacion && (
                <p className="leading-relaxed mb-6" style={{ color: t.muted, fontSize: "1.05rem" }}>
                  {DATOS.sobreMi.motivacion}
                </p>
              )}
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-4 flex-1">
              {/* Capacidades como filas numeradas, no tarjetas: misma
                  gramática visual que las tablas de Stack y Proyectos. */}
              {DATOS.sobreMi.puntos.map((p, i) => (
                <Reveal key={p.titulo} delay={160 + i * 70}>
                  <div className="flex gap-4 py-5" style={{ borderTop: `1px solid ${t.borderSoft}` }}>
                    <span
                      className="shrink-0"
                      style={{ fontFamily: MONO, fontSize: "var(--t-etiqueta)", color: t.accentText, letterSpacing: "0.06em", paddingTop: 3 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 style={{ color: t.text, fontSize: "0.94rem" }}>{p.titulo}</h3>
                      <p className="mt-1.5" style={{ color: t.muted, fontSize: "var(--t-menor)" }}>{p.texto}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Lema / mentalidad — cita destacada */}
        {DATOS.sobreMi.lema && (
          <Reveal delay={120}>
            {/* Cita destacada (pull quote): recurso editorial clásico.
                Sin caja ni glow — sólo una regla superior, tipografía grande
                y la atribución en mono. Coherente con las tablas. */}
            <figure className="mt-16 md:mt-20 pt-9" style={{ borderTop: `1px solid ${t.border}` }}>
              <blockquote
                className="max-w-[46rem]"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 400,
                  fontSize: "clamp(1.7rem, 4vw, 2.9rem)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.025em",
                  color: t.text,
                }}
              >
                Planifica como <span style={{ fontStyle: "italic", color: t.accentText }}>Monje</span>,
                ejecuta como <span style={{ fontStyle: "italic", color: t.accentText }}>Ninja</span>.
              </blockquote>
              <figcaption className="mt-6 flex items-start gap-4 max-w-[42rem]">
                <span className="h-px w-10 shrink-0 mt-3" style={{ background: t.border }} />
                <span style={{ color: t.muted, fontSize: "var(--t-menor)" }}>
                  {DATOS.sobreMi.lemaTexto}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   TECNOLOGÍAS — logos reales con nombre y propósito
   ============================================================ */

const ICONOS_CAT = { monitor: Code2, layers: Server, database: Database, wrench: Settings2, sparkles: BrainCircuit, settings: Workflow };

/* Fila de categoría — estructura de tabla editorial, no tarjeta.
   Cerrada: número, nombre y los logos alineados a la derecha.
   Abierta: el detalle de cada tecnología en dos columnas.
   Sin borde de caja ni sombra: solo una línea fina que separa filas. */
function TarjetaCategoria({ t, cat, abierta, onToggle, delay }) {
  const Icono = ICONOS_CAT[cat.icono] || Layers;
  const num = String(cat.orden || 1).padStart(2, "0");
  return (
    <Reveal delay={delay}>
      <div style={{ borderTop: `1px solid ${abierta ? t.border : t.borderSoft}` }}>
        {/* Fila clicable */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={abierta}
          className="fila-tabla w-full text-left py-6 md:py-7 flex items-baseline gap-5 md:gap-8"
        >
          {/* Número de índice */}
          <span
            className="shrink-0"
            style={{ fontFamily: MONO, fontSize: 11.5, color: abierta ? t.accentText : t.faint, letterSpacing: "0.06em", transition: "color 240ms" }}
          >
            {num}
          </span>

          {/* Nombre y propósito */}
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2.5">
              <Icono size={15} strokeWidth={1.8} style={{ color: abierta ? t.accentText : t.faint, transition: "color 240ms" }} />
              <span
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 400,
                  fontSize: "clamp(1.35rem, 2.6vw, 2rem)",
                  letterSpacing: "-0.02em",
                  color: t.text,
                  lineHeight: 1.1,
                }}
              >
                {cat.categoria}
              </span>
              <span style={{ fontFamily: MONO, fontSize: 10.5, color: t.faint }}>
                {String(cat.items.length).padStart(2, "0")}
              </span>
            </span>
            <span className="block mt-1.5" style={{ fontSize: 14, color: t.muted }}>
              {cat.descripcion}
            </span>
          </span>

          {/* Logos (se ocultan al abrir) */}
          <span
            className={`hidden md:flex items-center gap-1.5 shrink-0 transition-opacity duration-200 ${abierta ? "opacity-0" : "opacity-100"}`}
          >
            {cat.items.slice(0, 5).map((item) => (
              <IconoTech key={item.nombre} t={t} slug={item.slug} color={item.color} nombre={item.nombre} lucide={LUCIDE_TECH[item.lucide]} tam={14} />
            ))}
          </span>

          {/* Indicador +/− : más sobrio que una flecha en círculo */}
          <span
            className="shrink-0 relative"
            style={{ width: 14, height: 14, color: t.muted }}
            aria-hidden
          >
            <span className="absolute" style={{ top: 6.5, left: 0, width: 14, height: 1, background: "currentColor" }} />
            <span
              className="absolute"
              style={{
                top: 0, left: 6.5, width: 1, height: 14, background: "currentColor",
                transform: abierta ? "scaleY(0)" : "scaleY(1)",
                transition: "transform 240ms cubic-bezier(0.22,0.61,0.36,1)",
              }}
            />
          </span>
        </button>

        {/* Detalle expandible */}
        <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: abierta ? "1fr" : "0fr" }}>
          <div className="overflow-hidden">
            <div className="pb-8 pl-0 md:pl-[3.9rem] grid sm:grid-cols-2 gap-x-10 gap-y-5">
              {cat.items.map((item) => (
                <div key={item.nombre} className="flex items-start gap-3">
                  <IconoTech t={t} slug={item.slug} color={item.color} nombre={item.nombre} lucide={LUCIDE_TECH[item.lucide]} tam={18} />
                  <div className="min-w-0">
                    <div className="font-semibold text-sm" style={{ color: t.text }}>{item.nombre}</div>
                    <div className="text-sm leading-snug mt-0.5" style={{ color: t.muted }}>{item.detalle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}


function Tecnologias({ t }) {
  // Primera categoría abierta por defecto, el resto cerradas
  const [abierta, setAbierta] = useState(0);
  return (
    <section id="tecnologias" className="relative py-20 md:py-28 px-5 md:px-8">
      <SepSeccion t={t} />
      <div className="max-w-5xl mx-auto">
        <CabeceraSeccion
          t={t}
          num="02"
          eyebrow="Stack tecnológico"
          titulo="El stack con el que llevo IA a producción"
          descripcion="Cada tecnología de esta lista está en uso real en mis proyectos. No es una colección de logos: es el stack con el que diseño, integro y sostengo sistemas de IA."
        />

        <Marquesina t={t} />

        {/* Tabla de categorías: filas separadas por línea, sin tarjetas.
            La última línea cierra la tabla por abajo. */}
        <div style={{ borderBottom: `1px solid ${t.borderSoft}` }}>
          {DATOS.tecnologias.map((cat, i) => (
            <TarjetaCategoria
              key={cat.categoria}
              t={t}
              cat={{ ...cat, orden: i + 1 }}
              abierta={abierta === i}
              onToggle={() => setAbierta(abierta === i ? -1 : i)}
              delay={i * 50}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CERTIFICADOS — SECCIÓN EN CONSTRUCCIÓN (temporal)
   La sección sigue visible y en la navegación, pero muestra un
   estado "En construcción" mientras se suben los certificados
   reales. El carrusel original (con DATOS.certificados y su modal)
   está en el historial de git, listo para reactivar.
   ============================================================ */

// Para reactivar: cuando los certificados estén listos, recupera el
// carrusel original desde el historial de git (commit anterior a
// "Certificados en construcción") y reemplaza este componente.
function Certificados({ t }) {
  return (
    <section id="certificados" className="relative py-20 md:py-28 px-5 md:px-8">
      <SepSeccion t={t} />
      <div className="max-w-5xl mx-auto">
        <CabeceraSeccion
          t={t}
          num="03"
          eyebrow="Certificados"
          titulo="Formación que respalda la práctica"
        />

        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              background: `linear-gradient(160deg, ${t.surface} 0%, ${t.bg} 100%)`,
              border: `1px solid ${t.borderSoft}`,
              boxShadow: t.shadowMd,
            }}
          >
            {/* Resplandores de marca (cobre + cian) */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 -left-20 w-96 h-96 rounded-full opacity-40 blur-3xl"
              style={{ background: `radial-gradient(circle, ${t.accentSoft}, transparent 70%)` }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -right-16 w-96 h-96 rounded-full opacity-30 blur-3xl"
              style={{ background: `radial-gradient(circle, ${t.accent2Soft}, transparent 70%)` }}
            />
            {/* Cuadrícula técnica muy sutil de fondo */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  `linear-gradient(${t.text} 1px, transparent 1px), linear-gradient(90deg, ${t.text} 1px, transparent 1px)`,
                backgroundSize: "38px 38px",
              }}
            />

            <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
              {/* Columna izquierda: mensaje */}
              <div className="text-center md:text-left order-2 md:order-1">
                <span
                  className="estado-vivo inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5"
                  style={{
                    fontFamily: MONO,
                    fontSize: 10.5,
                    letterSpacing: "0.16em",
                    color: t.accentText,
                    background: t.accentSoft,
                    border: `1px solid ${t.border}`,
                  }}
                >
                  <span
                    className="punto-vivo w-1.5 h-1.5 rounded-full"
                    style={{ background: t.accent }}
                  />
                  EN CONSTRUCCIÓN
                </span>

                <h3
                  className="text-2xl md:text-[2rem] leading-tight font-bold mb-3"
                  style={{ fontFamily: DISPLAY, color: t.text }}
                >
                  Estoy preparando esta sección
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed mb-7 mx-auto md:mx-0 max-w-md"
                  style={{ color: t.muted }}
                >
                  Pronto verás aquí mis certificados y formación verificada.
                  Los estoy organizando para mostrarlos como se merecen.
                </p>

                {/* Chips de lo que viene (da contenido, no se ve vacío) */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {["Frontend", "React", "IA aplicada", "Automatización", "Datos"].map((tema) => (
                    <span
                      key={tema}
                      className="px-3 py-1.5 rounded-lg text-xs"
                      style={{
                        fontFamily: MONO,
                        color: t.muted,
                        background: t.surface2,
                        border: `1px solid ${t.borderSoft}`,
                      }}
                    >
                      {tema}
                    </span>
                  ))}
                </div>

                {/* Barra de progreso decorativa */}
                <div
                  className="mt-8 h-1.5 w-full max-w-xs mx-auto md:mx-0 rounded-full overflow-hidden"
                  style={{ background: t.borderSoft }}
                >
                  <div
                    className="barra-construccion h-full rounded-full"
                    style={{ background: t.accent }}
                  />
                </div>
              </div>

              {/* Columna derecha: ilustración de constructor (CSS ligero, sin lag) */}
              <div className="order-1 md:order-2 flex justify-center">
                <div className="relative" style={{ width: 240, height: 220 }}>
                  {/* Halo detrás */}
                  <div
                    aria-hidden
                    className="absolute inset-0 m-auto w-48 h-48 rounded-full opacity-50 blur-2xl"
                    style={{ background: `radial-gradient(circle, ${t.accent2Soft}, transparent 70%)` }}
                  />

                  {/* Señal de obra balanceándose (cobre, rayada) */}
                  <div
                    className="senal-mece absolute left-1/2 -translate-x-1/2 z-10"
                    style={{ top: 0 }}
                  >
                    {/* Cuerda de la que cuelga */}
                    <div className="mx-auto w-px h-6" style={{ background: t.border }} />
                    <div
                      className="px-3 py-2 rounded-lg text-center"
                      style={{
                        background: t.accent,
                        color: "#14100A",
                        fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                        boxShadow: t.shadowMd,
                        backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.15) 0 8px, transparent 8px 16px)",
                      }}
                    >
                      EN OBRA
                    </div>
                  </div>

                  {/* Casco de constructor */}
                  <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 36 }}>
                    <div className="relative" style={{ width: 96, height: 60 }}>
                      {/* Cúpula del casco */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 bottom-3"
                        style={{
                          width: 72, height: 40,
                          borderTopLeftRadius: 40, borderTopRightRadius: 40,
                          background: `linear-gradient(160deg, ${t.accentText}, ${t.accent})`,
                          boxShadow: t.shadowMd,
                        }}
                      />
                      {/* Cresta central del casco */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 bottom-3"
                        style={{ width: 10, height: 38, borderRadius: 6, background: "rgba(0,0,0,0.18)" }}
                      />
                      {/* Ala / visera */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 bottom-1.5"
                        style={{ width: 96, height: 12, borderRadius: 8, background: t.accent, boxShadow: t.shadowSoft }}
                      />
                    </div>
                  </div>

                  {/* Llave inglesa que se mece (cian) */}
                  <div className="llave-mece absolute" style={{ bottom: 30, right: 22 }}>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: t.surface, border: `1px solid ${t.border}`, boxShadow: t.shadowSoft }}
                    >
                      <Wrench size={22} style={{ color: t.accent2Text }} />
                    </div>
                  </div>

                  {/* Conos de obra en la base */}
                  <div className="absolute left-1/2 -translate-x-1/2 flex gap-3" style={{ bottom: 0 }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div
                          style={{
                            width: 0, height: 0,
                            borderLeft: "9px solid transparent",
                            borderRight: "9px solid transparent",
                            borderBottom: `20px solid ${t.accent}`,
                          }}
                        />
                        <div className="w-6 h-1.5 rounded-sm -mt-px" style={{ background: t.accentText }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   PROYECTOS — filtros por pestaña y rejilla de 2 columnas:
   agrega proyectos al array y el diseño escala solo.
   ============================================================ */

// Color de acento por categoría de proyecto
const COLOR_CAT = {
  implementado: "ok",     // verde — ya en uso real
  negocio: "accent",      // azul — solución de negocio
  personal: "accent2",    // grafito — exploración personal
};

function EtiquetaCategoria({ t, categoria, codigo }) {
  const claveColor = COLOR_CAT[categoria] || "accent";
  const color = t[claveColor];
  const cat = CATEGORIAS.find((c) => c.id === categoria);
  const corto = categoria === "implementado" ? "CLIENTE REAL"
    : categoria === "negocio" ? "PARA TERCEROS" : "PERSONAL";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
      style={{ background: "rgba(7,9,13,0.6)", backdropFilter: "blur(6px)", border: `1px solid ${color}44` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.14em", color: "rgba(255,255,255,0.92)" }}>{corto}</span>
    </span>
  );
}

// Miniatura del proyecto presentada como una "ventana de navegador":
// barra superior con semáforo + URL falsa, y debajo la captura.
// Esto hace que cada proyecto se lea como un producto real desplegado.
//   alta = versión grande para la portada de la página individual.
function MiniaturaProyecto({ t, p, alta = false }) {
  // URL de muestra para la barra del navegador (decorativa)
  const urlFalsa = `caverotech.com/${p.id}`;
  return (
    <div className={alta ? "" : "px-4 pt-4"}>
      <div
        className="relative overflow-hidden"
        style={
          alta
            ? {}
            : { borderRadius: 12, border: `1px solid ${t.borderSoft}`, boxShadow: t.shadowMd }
        }
      >
        {/* Barra del navegador */}
        <div
          className="flex items-center gap-2 px-3"
          style={{ height: alta ? 38 : 32, background: t.surface2, borderBottom: `1px solid ${t.borderSoft}` }}
        >
          {/* Semáforo */}
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
          </span>
          {/* Barra de dirección */}
          <span
            className="ml-2 flex-1 truncate rounded-md px-2.5 py-1"
            style={{ fontFamily: MONO, fontSize: 10, color: t.faint, background: t.bg, border: `1px solid ${t.borderSoft}` }}
          >
            {urlFalsa}
          </span>
        </div>

        {/* Captura del proyecto */}
        <Foto src={p.imagen} alt={p.nombre} gradiente={p.gradiente} tinte={false} className={alta ? "h-56 md:h-80" : "h-40 md:h-44"}>
          {/* Velo de marca del proyecto */}
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(155deg, ${p.gradiente[0]}CC 0%, ${p.gradiente[1]}55 55%, rgba(7,9,13,0.45) 100%)` }}
          />
          {/* Rejilla técnica sutil */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage: "radial-gradient(120% 100% at 0% 0%, #000, transparent 70%)",
              WebkitMaskImage: "radial-gradient(120% 100% at 0% 0%, #000, transparent 70%)",
            }}
          />
          {/* Etiqueta de categoría, abajo a la izquierda */}
          <div className="absolute bottom-2.5 left-2.5">
            <EtiquetaCategoria t={t} categoria={p.categoria} codigo={p.codigo} />
          </div>
        </Foto>
      </div>
    </div>
  );
}

/* Fila de proyecto — tabla editorial sobre fondo oscuro.
   El contenido manda: número, nombre, problema resuelto y stack.
   La imagen aparece sólo como miniatura a la derecha, sin dominar. */
function FilaProyecto({ t, p, abrir, delay, indice }) {
  return (
    <button
      type="button"
      onClick={() => abrir(p.id)}
      data-cursor="ABRIR"
      className="fila-proyecto fila-entra w-full text-left py-7 md:py-9 flex items-start gap-5 md:gap-9"
      style={{
        borderTop: `1px solid ${t.borderSoft}`,
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Índice */}
      <span
        className="shrink-0 pt-1"
        style={{ fontFamily: MONO, fontSize: 11.5, color: t.faint, letterSpacing: "0.06em" }}
      >
        {String(indice).padStart(2, "0")}
      </span>

      {/* Cuerpo */}
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span
            className="titulo-proyecto"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: "clamp(1.5rem, 3.4vw, 2.6rem)",
              letterSpacing: "-0.025em",
              color: t.text,
              lineHeight: 1.05,
            }}
          >
            {p.nombre}
          </span>
          <span
            className="px-2 py-0.5 rounded-full shrink-0"
            style={{
              fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.12em",
              color: t.muted, border: `1px solid ${t.border}`, textTransform: "uppercase",
            }}
          >
            {p.categoria === "implementado" ? "Cliente real" : p.categoria === "negocio" ? "Para terceros" : "Personal"}
          </span>
        </span>

        <span className="block mt-3 leading-relaxed" style={{ color: t.muted, fontSize: "clamp(0.94rem, 1.2vw, 1.05rem)", maxWidth: "62ch" }}>
          {p.corto}
        </span>

        {/* Stack en texto, sin chips */}
        <span className="block mt-4" style={{ fontFamily: MONO, fontSize: 11, color: t.faint, letterSpacing: "0.04em" }}>
          {p.stack.join("  ·  ")}
        </span>

        <span
          className="cta-proyecto inline-flex items-center gap-2 mt-5"
          style={{ fontSize: 13.5, fontWeight: 600, color: t.accent }}
        >
          Ver caso completo
          <span aria-hidden className="flecha-cta" style={{ display: "inline-block" }}>→</span>
        </span>
      </span>

      {/* Miniatura: contenida, en escala de grises hasta el hover */}
      <span
        className="mini-proyecto hidden md:block shrink-0 overflow-hidden rounded-lg"
        style={{ width: 190, height: 124, background: t.surface, border: `1px solid ${t.borderSoft}` }}
      >
        <img
          src={p.imagen}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ filter: "grayscale(1) contrast(1.04)", transition: "filter 300ms, transform 400ms cubic-bezier(0.22,0.61,0.36,1)" }}
        />
      </span>
    </button>
  );
}

function Proyectos({ t, abrir }) {
  const [filtro, setFiltro] = useState("todos");
  const pestanas = [
    { id: "todos", label: "Todos", n: DATOS.proyectos.length },
    ...CATEGORIAS.map((c) => ({
      id: c.id,
      label: c.titulo,
      n: DATOS.proyectos.filter((p) => p.categoria === c.id).length,
    })),
  ];
  const lista = (filtro === "todos" ? DATOS.proyectos : DATOS.proyectos.filter((p) => p.categoria === filtro))
    .slice()
    .sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99));
  const nota = CATEGORIAS.find((c) => c.id === filtro)?.nota;

  return (
    <section
      id="proyectos"
      className="relative"
      style={{ background: t.bg, color: t.text }}
    >
      {/* Retícula tenue sobre el oscuro: misma estructura, invertida */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${t.borderSoft} 1px, transparent 1px), linear-gradient(90deg, ${t.borderSoft} 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
          opacity: 0.5,
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
        {/* Cabecera propia (en inverso) */}
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span style={{ fontFamily: MONO, fontSize: 11.5, color: t.accent, letterSpacing: "0.08em" }}>04</span>
            <span className="h-px w-7" style={{ background: t.accent, opacity: 0.5 }} />
            <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.2em", color: t.faint, textTransform: "uppercase" }}>
              Proyectos
            </span>
          </div>
          <h2
            style={{
              fontFamily: DISPLAY, fontWeight: 400,
              fontSize: "clamp(2.1rem, 5.5vw, 4.2rem)",
              lineHeight: 1.02, letterSpacing: "-0.03em",
              color: t.text, maxWidth: "22ch",
            }}
          >
            Sistemas que resuelven un problema concreto
          </h2>
          <p className="mt-6 leading-relaxed" style={{ color: t.muted, fontSize: "1.02rem", maxWidth: "58ch" }}>
            Cada caso incluye el problema de negocio, la solución, la arquitectura y las
            decisiones técnicas detrás — incluida la capa de IA y automatización.
          </p>
        </Reveal>

        {/* Filtros: texto subrayado, no botones tipo pastilla */}
        <Reveal delay={60}>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-12 mb-2">
            {pestanas.map((tab) => {
              const activa = filtro === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFiltro(tab.id)}
                  className="filtro-texto pb-1.5"
                  style={{
                    fontSize: 14,
                    fontWeight: activa ? 600 : 400,
                    color: activa ? t.text : t.faint,
                    borderBottom: `1.5px solid ${activa ? t.accent : "transparent"}`,
                    transition: "color 240ms, border-color 240ms",
                  }}
                >
                  {tab.label}
                  <span className="ml-1.5" style={{ fontFamily: MONO, fontSize: 10.5, opacity: 0.7 }}>{tab.n}</span>
                </button>
              );
            })}
          </div>
          <p className="text-sm mb-4" style={{ color: t.faint, minHeight: 20 }}>
            {nota || "Todo mi trabajo: clientes reales, proyectos aplicados y personales."}
          </p>
        </Reveal>

        {/* Tabla de proyectos */}
        <div key={filtro} style={{ borderBottom: `1px solid ${t.borderSoft}` }}>
          {lista.map((p, i) => (
            <FilaProyecto
              key={p.id}
              t={t}
              p={p}
              abrir={abrir}
              indice={i + 1}
              delay={Math.min(i, 6) * 60}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PÁGINA INDIVIDUAL DE PROYECTO
   ============================================================ */

const GRUPOS_STACK = [
  ["frontend", "Frontend"],
  ["backend", "Backend"],
  ["baseDatos", "Base de datos"],
  ["herramientas", "Herramientas"],
  ["ia", "Inteligencia Artificial"],
];

function SeccionDetalle({ t, etiqueta, titulo, children }) {
  return (
    <Reveal className="mb-10">
      <Eyebrow t={t}>{etiqueta}</Eyebrow>
      {titulo && <h2 className="text-xl font-bold tracking-tight mb-3" style={{ color: t.text }}>{titulo}</h2>}
      {children}
    </Reveal>
  );
}

// Página de "historia" — para iniciativas no técnicas (ej. Kidsapiens).
// Layout distinto: narrativa + experiencias + aprendizajes, sin stack técnico.
function PaginaHistoria({ t, proyecto: p, volver }) {
  const d = p.detalle;
  return (
    <main className="pt-24 pb-20 px-5 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <button
            type="button"
            onClick={() => volver("proyectos")}
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-transform duration-200 hover:-translate-x-1"
            style={{ color: t.muted }}
          >
            <ArrowLeft size={15} /> Volver a proyectos
          </button>
        </Reveal>

        <Reveal delay={60}>
          <div className="rounded-2xl overflow-hidden mb-8 relative" style={{ border: `1px solid ${t.borderSoft}`, boxShadow: t.shadowLg }}>
            <MiniaturaProyecto t={t} p={p} alta />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: t.accent2Soft, border: `1px solid ${t.accent2Soft}` }}>
            <Sparkles size={13} style={{ color: t.accent2Text }} />
            <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", color: t.accent2Text }}>DIVULGACIÓN · 2023</span>
          </div>
          <h1 className="mb-4" style={{ color: t.text, fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            {p.nombre}
          </h1>
          <p className="leading-relaxed mb-12" style={{ color: t.muted, fontSize: "1.1rem" }}>{d.resumen}</p>
        </Reveal>

        {/* La historia */}
        <SeccionDetalle t={t} etiqueta="La historia" titulo="Cómo empezó">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.historia}</p>
        </SeccionDetalle>

        {/* Experiencias / sedes — línea de tiempo */}
        {d.experiencias?.length > 0 && (
          <SeccionDetalle t={t} etiqueta="Dónde lo llevé" titulo="Taller, charlas y exposiciones">
            <div className="space-y-3">
              {d.experiencias.map((e, i) => (
                <div key={i} className="tarjeta-suave flex gap-4 p-5 rounded-2xl" style={{ background: t.card, border: `1px solid ${t.borderSoft}` }}>
                  <span
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: i % 2 ? t.accent2Soft : t.accentSoft, color: i % 2 ? t.accent2Text : t.accentText, fontFamily: MONO, fontWeight: 600, fontSize: 13 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm" style={{ color: t.text }}>{e.lugar}</h3>
                    <p style={{ fontFamily: MONO, fontSize: 11, color: t.accentText }} className="mb-1">{e.rol}</p>
                    <p className="text-sm leading-snug" style={{ color: t.muted }}>{e.detalle}</p>
                  </div>
                </div>
              ))}
            </div>
          </SeccionDetalle>
        )}

        {/* Aprendizajes */}
        {d.aprendizajes?.length > 0 && (
          <SeccionDetalle t={t} etiqueta="Qué me dejó" titulo="Lo que aprendí de todo esto">
            <div className="grid sm:grid-cols-3 gap-4">
              {d.aprendizajes.map((a, i) => (
                <div key={i} className="tarjeta-suave p-5 rounded-2xl h-full" style={{ background: t.card, border: `1px solid ${t.borderSoft}` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: t.accentSoft, color: t.accentText }}>
                    <Sparkles size={15} />
                  </div>
                  <h3 className="font-semibold text-sm mb-1.5" style={{ color: t.text }}>{a.titulo}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: t.muted }}>{a.texto}</p>
                </div>
              ))}
            </div>
          </SeccionDetalle>
        )}

        <SeccionDetalle t={t} etiqueta="Resultado" titulo="El impacto que tuvo">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.impacto}</p>
        </SeccionDetalle>

        <Reveal>
          <div className="flex flex-wrap gap-3 pt-2">
            <Boton t={t} primario icono={ArrowLeft} onClick={() => volver("proyectos")}>Más proyectos</Boton>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

function PaginaProyecto({ t, proyecto: p, volver }) {
  const d = p.detalle;
  if (p.tipo === "historia") return <PaginaHistoria t={t} proyecto={p} volver={volver} />;
  return (
    <main className="pt-24 pb-20 px-5 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <button
            type="button"
            onClick={() => volver("proyectos")}
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-transform duration-200 hover:-translate-x-1"
            style={{ color: t.muted }}
          >
            <ArrowLeft size={15} /> Volver a proyectos
          </button>
        </Reveal>

        <Reveal delay={60}>
          <div className="rounded-xl overflow-hidden mb-8" style={{ border: `1px solid ${t.borderSoft}`, boxShadow: "0 20px 50px rgba(0,0,0,0.35)" }}>
            <MiniaturaProyecto t={t} p={p} alta />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mb-3" style={{ color: t.text, fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            {p.nombre}
          </h1>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {p.stack.map((s) => <Chip key={s} t={t}>{s}</Chip>)}
          </div>
          <div className="flex flex-wrap gap-3 mb-12">
            <Boton t={t} primario icono={ExternalLink} href={d.demo}>Ver demo</Boton>
            <Boton t={t} icono={FolderGit2} href={d.repo}>Código en GitHub</Boton>
          </div>
        </Reveal>

        <SeccionDetalle t={t} etiqueta="Resumen ejecutivo">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.resumen}</p>
        </SeccionDetalle>

        <SeccionDetalle t={t} etiqueta="Problema" titulo="¿Qué necesidad existía?">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.problemaLargo}</p>
        </SeccionDetalle>

        <SeccionDetalle t={t} etiqueta="Solución" titulo="¿Cómo se resolvió?">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.solucion}</p>
        </SeccionDetalle>

        <SeccionDetalle t={t} etiqueta="Arquitectura" titulo="Enfoque técnico">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.arquitectura}</p>
        </SeccionDetalle>

        <SeccionDetalle t={t} etiqueta="Stack tecnológico">
          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${t.borderSoft}` }}>
            {GRUPOS_STACK.map(([clave, titulo], i) =>
              d.stackDetalle[clave]?.length ? (
                <div
                  key={clave}
                  className="p-4 md:p-5 grid md:grid-cols-3 gap-1 md:gap-4"
                  style={{ background: i % 2 ? t.surface2 : t.surface, borderTop: i ? `1px solid ${t.borderSoft}` : "none" }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: t.accentText }} className="uppercase pt-0.5">
                    {titulo}
                  </span>
                  <ul className="space-y-1.5 md:col-span-2">
                    {d.stackDetalle[clave].map((item) => (
                      <li key={item} className="text-sm leading-snug" style={{ color: t.muted }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null
            )}
          </div>
        </SeccionDetalle>

        <SeccionDetalle t={t} etiqueta="Decisiones técnicas" titulo="Criterio detrás del código">
          <div className="space-y-4">
            {d.decisiones.map((dec) => (
              <div key={dec.titulo} className="tarjeta-suave p-5 rounded-2xl" style={{ background: t.card, border: `1px solid ${t.borderSoft}` }}>
                <h3 className="font-semibold text-sm mb-1.5" style={{ color: t.text }}>{dec.titulo}</h3>
                <p className="text-sm leading-relaxed" style={{ color: t.muted }}>{dec.texto}</p>
              </div>
            ))}
          </div>
        </SeccionDetalle>

        <SeccionDetalle t={t} etiqueta="Resultado" titulo="Impacto del proyecto">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.impacto}</p>
        </SeccionDetalle>

        <Reveal>
          <div className="flex flex-wrap gap-3 pt-2">
            <Boton t={t} primario icono={ExternalLink} href={d.demo}>Ver demo</Boton>
            <Boton t={t} icono={FolderGit2} href={d.repo}>Código en GitHub</Boton>
            <Boton t={t} icono={ArrowLeft} onClick={() => volver("proyectos")}>Más proyectos</Boton>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

/* ============================================================
   MOMENTOS — muro tipo polaroid: lo profesional + lo humano.
   Cada momento muestra su foto (si la hay) o un placeholder
   elegante con un ícono según su `tipo`, más título y fecha.
   ============================================================ */

// Ícono y color por categoría de momento (para el placeholder sin foto)
const ICONO_MOMENTO = {
  trabajo:      { Icono: Layers,   color: "accentText" },
  formacion:    { Icono: BookOpen, color: "accent2Text" },
  ensenanza:    { Icono: Mic,      color: "accentText" },
  voluntariado: { Icono: Heart,    color: "accent2Text" },
  personal:     { Icono: Sparkles, color: "accentText" },
};

// Una polaroid clavada en el muro. Si tiene foto la muestra;
// si no, un placeholder con el ícono de su categoría.
function MomentoPolaroid({ t, m, idx, onAbrir }) {
  const alturas = { alto: "h-64 sm:h-72", medio: "h-52 sm:h-60", bajo: "h-40 sm:h-48" };
  const rot = (idx * 41) % 5 - 2.5;                 // rotación estable -2.5° a 2.5°
  const tieneFoto = Boolean(m.foto);
  const info = ICONO_MOMENTO[m.categoria] || ICONO_MOMENTO.personal;
  const colorIcono = t[info.color];

  return (
    <div className="mb-5" style={{ breakInside: "avoid" }}>
      <button
        type="button"
        onClick={() => tieneFoto && onAbrir(m)}
        className="momento-polaroid group relative w-full block text-left rounded-xl"
        style={{
          background: "#F4F1EA", padding: "10px 10px 14px",
          boxShadow: t.shadowMd, transform: `rotate(${rot}deg)`,
          border: "1px solid rgba(0,0,0,0.08)", cursor: tieneFoto ? "pointer" : "default",
        }}
      >
        {/* Chincheta */}
        <span
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 rounded-full z-10"
          style={{ background: idx % 2 ? t.accent2 : t.accent, boxShadow: "0 2px 5px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(0,0,0,0.3)" }}
        />

        {/* Foto o placeholder */}
        <div className={`relative rounded-md overflow-hidden ${alturas[m.alto] || alturas.medio}`}>
          {tieneFoto ? (
            <Foto src={m.foto} alt={m.titulo} tinte={false} className="w-full h-full">
              <span
                className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(7,9,13,0.55)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", backdropFilter: "blur(4px)" }}
              >
                <ArrowUp size={14} className="rotate-45" />
              </span>
            </Foto>
          ) : (
            // Placeholder elegante (sin foto aún)
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-3"
              style={{ background: `linear-gradient(160deg, ${t.surface2}, ${t.surface})` }}
            >
              <span
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: `${colorIcono}1A`, border: `1px solid ${colorIcono}33`, color: colorIcono }}
              >
                <info.Icono size={20} />
              </span>
              <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.14em", color: t.faint }}>
                PRÓXIMAMENTE
              </span>
            </div>
          )}
        </div>

        {/* Leyenda tipo nota manuscrita */}
        <div className="px-1.5 pt-2.5">
          <h3 className="font-semibold text-sm leading-tight" style={{ color: "#1A1A1A" }}>{m.titulo}</h3>
          <p style={{ fontFamily: MONO, fontSize: 10.5, color: "#6B6B6B", marginTop: 2 }}>
            {m.lugar} · {m.fecha}
          </p>
        </div>
      </button>
    </div>
  );
}

// Cuántos momentos se ven a la vez (el resto va en otras páginas)
const MOMENTOS_POR_PAGINA = 9;

function Galeria({ t }) {
  const [activa, setActiva] = useState(null);
  const [filtro, setFiltro] = useState("todos");
  const [pagina, setPagina] = useState(1);

  // Cerrar el visor con Escape y bloquear el scroll del fondo
  useEffect(() => {
    if (!activa) return;
    const onKey = (e) => { if (e.key === "Escape") setActiva(null); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [activa]);

  // Al cambiar de filtro, volver siempre a la página 1
  const cambiarFiltro = (id) => { setFiltro(id); setPagina(1); };

  if (!DATOS.galeria?.length) return null;

  // Pestañas de filtro: "Todos" + cada categoría con su conteo
  const cats = DATOS.categoriasMomentos || [];
  const pestanas = [
    { id: "todos", label: "Todos", n: DATOS.galeria.length },
    ...cats.map((c) => ({
      id: c.id,
      label: c.label,
      n: DATOS.galeria.filter((m) => m.categoria === c.id).length,
    })),
  ].filter((tab) => tab.id === "todos" || tab.n > 0); // oculta categorías vacías

  // Momentos del filtro actual
  const filtrados = filtro === "todos"
    ? DATOS.galeria
    : DATOS.galeria.filter((m) => m.categoria === filtro);

  // Paginación: máximo 9 por página
  const totalPaginas = Math.ceil(filtrados.length / MOMENTOS_POR_PAGINA);
  const paginaSegura = Math.min(pagina, totalPaginas) || 1;
  const inicio = (paginaSegura - 1) * MOMENTOS_POR_PAGINA;
  const lista = filtrados.slice(inicio, inicio + MOMENTOS_POR_PAGINA);

  return (
    <section id="galeria" className="relative py-20 md:py-28 px-5 md:px-8">
      <SepSeccion t={t} />
      <div className="max-w-5xl mx-auto">
        <CabeceraSeccion
          t={t}
          num="05"
          eyebrow="Mi panel"
          titulo="El muro de mis momentos"
          descripcion="Como programador y como persona: trabajo, formación, enseñanza, voluntariado y los momentos detrás del código. Este muro sigue creciendo."
        />

        {/* Pestañas de filtro por categoría */}
        <Reveal delay={60}>
          <div className="flex flex-wrap gap-2 mb-7">
            {pestanas.map((tab) => {
              const activaTab = filtro === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => cambiarFiltro(tab.id)}
                  className="boton-base px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    background: activaTab ? t.accent : t.surface,
                    color: activaTab ? "#14100A" : t.muted,
                    border: `1px solid ${activaTab ? t.accent : t.border}`,
                  }}
                >
                  {tab.label}
                  <span className="ml-1.5" style={{ fontFamily: MONO, fontSize: 11, opacity: 0.75 }}>{tab.n}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Muro/pared de momentos: textura sutil + polaroids clavadas */}
        <Reveal>
          <div
            className="relative rounded-3xl p-5 sm:p-8"
            style={{
              border: `1px solid ${t.borderSoft}`,
              background: `
                radial-gradient(circle at 20% 10%, rgba(232,152,62,0.05), transparent 45%),
                radial-gradient(circle at 85% 90%, rgba(34,211,238,0.035), transparent 45%),
                ${t.surface}`,
              boxShadow: "none",
            }}
          >
            {/* Textura de puntos del corcho/muro */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(${t.border} 1px, transparent 1px)`,
                backgroundSize: "18px 18px",
              }}
            />
            <div key={`${filtro}-${paginaSegura}`} className="relative [column-count:1] sm:[column-count:2] lg:[column-count:3]" style={{ columnGap: "1.25rem" }}>
              {lista.map((m, i) => (
                <MomentoPolaroid key={`${filtro}-${inicio + i}`} t={t} m={m} idx={inicio + i} onAbrir={setActiva} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Paginación: aparece solo si hay más de una página (más de 9 momentos) */}
        {totalPaginas > 1 && (
          <div className="flex items-center justify-center gap-2 mt-7">
            {/* Anterior */}
            <button
              type="button" aria-label="Página anterior"
              onClick={() => setPagina((p) => Math.max(1, p - 1))}
              disabled={paginaSegura === 1}
              className="boton-base w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ border: `1px solid ${t.border}`, color: t.text, background: t.surface, opacity: paginaSegura === 1 ? 0.4 : 1, cursor: paginaSegura === 1 ? "default" : "pointer" }}
            >
              <ArrowLeft size={15} />
            </button>

            {/* Números de página */}
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => {
              const activaPag = n === paginaSegura;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPagina(n)}
                  className="boton-base w-10 h-10 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{
                    fontFamily: MONO,
                    background: activaPag ? t.accent : t.surface,
                    color: activaPag ? "#14100A" : t.muted,
                    border: `1px solid ${activaPag ? t.accent : t.border}`,
                  }}
                >
                  {n}
                </button>
              );
            })}

            {/* Siguiente */}
            <button
              type="button" aria-label="Página siguiente"
              onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
              disabled={paginaSegura === totalPaginas}
              className="boton-base w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ border: `1px solid ${t.border}`, color: t.text, background: t.surface, opacity: paginaSegura === totalPaginas ? 0.4 : 1, cursor: paginaSegura === totalPaginas ? "default" : "pointer" }}
            >
              <ArrowRight size={15} />
            </button>
          </div>
        )}

        <p className="text-center mt-5" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", color: t.faint }}>
          {String(filtrados.length).padStart(2, "0")} MOMENTOS
          {totalPaginas > 1 ? ` · PÁGINA ${paginaSegura} DE ${totalPaginas}` : " · ESTE MURO SIGUE CRECIENDO"}
        </p>
      </div>

      {/* Visor de foto (lightbox) — solo para momentos con foto */}
      {activa && (
        <div
          className="fixed inset-0 flex items-center justify-center p-5"
          style={{ zIndex: 90, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)" }}
          onClick={() => setActiva(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden modal-entrada"
            style={{ border: `1px solid ${t.border}`, boxShadow: t.shadowLg }}
            onClick={(e) => e.stopPropagation()}
          >
            <Foto src={activa.foto} alt={activa.titulo} tinte={false} className="max-h-[78vh] w-full" style={{ minHeight: 300 }}>
              <button
                type="button" aria-label="Cerrar" onClick={() => setActiva(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(7,9,13,0.65)", border: `1px solid ${t.border}`, color: "#fff" }}
              >
                <X size={16} />
              </button>
              <div className="absolute inset-x-0 bottom-0 p-5" style={{ background: "linear-gradient(transparent, rgba(7,9,13,0.92))" }}>
                <h3 className="font-bold text-lg" style={{ color: "#fff" }}>{activa.titulo}</h3>
                <p style={{ fontFamily: MONO, fontSize: 12, color: "rgba(255,255,255,0.82)" }}>{activa.lugar} · {activa.fecha}</p>
              </div>
            </Foto>
          </div>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   CONTACTO Y FOOTER
   ============================================================ */

function Contacto({ t }) {
  const canales = [
    { icono: Mail, etiqueta: "Email", valor: DATOS.email, href: `mailto:${DATOS.email}` },
    { icono: Github, etiqueta: "GitHub", valor: "Ver repositorios", href: DATOS.github },
    { icono: Linkedin, etiqueta: "LinkedIn", valor: "Perfil profesional", href: DATOS.linkedin },
  ];
  return (
    <section
      id="contacto"
      className="relative flex items-center"
      style={{ background: t.bg, color: t.text, minHeight: "calc(100svh - 8.5rem)" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${t.borderSoft} 1px, transparent 1px), linear-gradient(90deg, ${t.borderSoft} 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
          opacity: 0.5,
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          {/* Izquierda: la pregunta, a tamaño de cartel */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span style={{ fontFamily: MONO, fontSize: 11.5, color: t.accent, letterSpacing: "0.08em" }}>06</span>
                <span className="h-px w-7" style={{ background: t.accent, opacity: 0.5 }} />
                <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.2em", color: t.faint, textTransform: "uppercase" }}>
                  Contacto
                </span>
              </div>
              <h2
                style={{
                  fontFamily: DISPLAY, fontWeight: 400,
                  fontSize: "clamp(2.2rem, 6vw, 4.6rem)",
                  lineHeight: 1, letterSpacing: "-0.03em",
                  color: t.text, maxWidth: "20ch",
                }}
              >
                ¿Tienes un proceso que debería estar{" "}
                <span style={{ fontStyle: "italic", color: t.accent }}>automatizado</span>?
              </h2>
              <p className="mt-7 leading-relaxed" style={{ color: t.muted, fontSize: "1.02rem", maxWidth: "52ch" }}>
                Estoy abierto a oportunidades como Ingeniero de IA y Automatización,
                presenciales o remotas. Cuéntame qué necesitas resolver y te digo con
                franqueza si la IA es la respuesta.
              </p>
              <div className="mt-9">
                <a
                  href={`mailto:${DATOS.email}`}
                  className="boton-base inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-sm"
                  style={{ background: t.text, color: t.bg }}
                >
                  <Mail size={16} strokeWidth={2} />
                  Escríbeme ahora
                </a>
              </div>
            </Reveal>
          </div>

          {/* Derecha: canales como tabla, y el robot como firma discreta */}
          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <div style={{ borderTop: `1px solid ${t.border}` }}>
                {canales.map((c) => (
                  <a
                    key={c.etiqueta}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="fila-canal flex items-center gap-4 py-4"
                    style={{ borderBottom: `1px solid ${t.borderSoft}` }}
                  >
                    <c.icono size={16} style={{ color: t.faint, flexShrink: 0 }} />
                    <span className="min-w-0 flex-1">
                      <span className="block" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", color: t.faint, textTransform: "uppercase" }}>
                        {c.etiqueta}
                      </span>
                      <span className="block mt-0.5" style={{ fontSize: 14.5, color: t.text, fontWeight: 500 }}>
                        {c.valor}
                      </span>
                    </span>
                    <span aria-hidden className="flecha-cta" style={{ color: t.faint }}>→</span>
                  </a>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <span style={{ fontFamily: MONO, fontSize: 10.5, color: t.faint, letterSpacing: "0.1em" }}>
                  {DATOS.ubicacion.toUpperCase()}
                </span>
                <div className="avatar-saluda" style={{ width: 130, height: 98, opacity: 0.9 }}>
                  <DotLottieReact
                    src="/robot.lottie"
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}


function Footer({ t }) {
  const redes = [
    { Icono: Github, href: DATOS.github, label: "GitHub" },
    { Icono: Linkedin, href: DATOS.linkedin, label: "LinkedIn" },
    { Icono: Mail, href: `mailto:${DATOS.email}`, label: "Email" },
  ];
  // Cierra en oscuro, continuando la sección de Contacto sin corte de color.
  return (
    <footer
      className="relative"
      style={{ background: t.bg, color: t.text, borderTop: `1px solid ${t.borderSoft}` }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-9 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="text-sm" style={{ color: t.muted }}>
            © {new Date().getFullYear()} {DATOS.nombre}
          </span>
          <span className="inline-flex items-center gap-1.5" style={{ fontFamily: MONO, fontSize: 11, color: t.faint }}>
            <MapPin size={12} /> {DATOS.ubicacion} · IA aplicada con criterio
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          {redes.map(({ Icono, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="enlace-social-inv w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ border: `1px solid ${t.border}`, color: t.muted }}
            >
              <Icono size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   APP
   ============================================================ */

export default function App() {
  const t = TEMA;
  // ¿Mostrar la pantalla de bienvenida antes del portafolio?
  // (mientras elegimos cuál de las 3 intros usar, está en modo selector)
  const [mostrarIntro, setMostrarIntro] = useState(true);
  // vista: { pagina: 'seccion', id } | { pagina: 'proyecto', id }
  const [vista, setVista] = useState({ pagina: "seccion", id: "inicio" });

  // Navegar a una sección = mostrar SOLO esa sección (estilo app), y subir arriba
  const irASeccion = (id) => {
    setVista({ pagina: "seccion", id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const abrirProyecto = (id) => {
    setVista({ pagina: "proyecto", id });
    window.scrollTo({ top: 0 });
  };

  const volver = (seccion) => {
    irASeccion(seccion || "proyectos");
  };

  const proyectoActivo = vista.pagina === "proyecto" ? DATOS.proyectos.find((p) => p.id === vista.id) : null;
  const seccionActiva = vista.pagina === "seccion" ? vista.id : null;

  // Todo el sitio es oscuro: el nav ya no necesita invertirse.

  // Mapa de secciones → componente. "inicio" muestra Hero + Sobre mí (portada).
  const render = {
    inicio: (
      <>
        <Hero t={t} irASeccion={irASeccion} />
      </>
    ),
    "sobre-mi": <SobreMi t={t} />,
    tecnologias: <Tecnologias t={t} />,
    certificados: <Certificados t={t} />,
    proyectos: <Proyectos t={t} abrir={abrirProyecto} />,
    galeria: <Galeria t={t} />,
    contacto: <Contacto t={t} />,
  };

  // Mientras dure la bienvenida, mostramos solo la intro.
  if (mostrarIntro) {
    return <Bienvenida onTerminar={() => setMostrarIntro(false)} />;
  }

  return (
    <div className="app-entra" style={{ background: t.bg, color: t.text, fontFamily: SANS, minHeight: "100vh" }}>
      <EstilosGlobales t={t} />

      <Atmosfera t={t} />
      <Cursor t={t} />
      <BarraProgreso t={t} />

      <Nav
        t={t}
        irASeccion={irASeccion}
        enDetalle={vista.pagina === "proyecto"}
        volver={volver}
        seccionActiva={seccionActiva}
      />

      <div className="relative" style={{ zIndex: 2, minHeight: "70vh" }}>
        {proyectoActivo ? (
          <PaginaProyecto t={t} proyecto={proyectoActivo} volver={volver} />
        ) : (
          <main key={seccionActiva} className="seccion-entra">
            {render[seccionActiva] || render.inicio}
          </main>
        )}
        <Footer t={t} />
      </div>

      <VolverArriba t={t} />
    </div>
  );
}
