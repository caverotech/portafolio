import React, { useState, useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Github, Linkedin, Mail, Download, ArrowRight, ArrowLeft,
  Menu, X, MapPin, Layers, Database, Wrench,
  Sparkles, ExternalLink, FolderGit2, ArrowUp,
  Code2, Server, Settings2, BrainCircuit,
  BarChart3, BookOpen, MessageSquare, Bot, Workflow, Camera, Images, Hammer, Lightbulb, Check,
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

/* Logos de marca como SVG inline.

   Van embebidos y no por CDN a propósito: son las marcas centrales de
   mi trabajo y no pueden depender de que un servicio externo responda.
   Las que no existen en Simple Icons (Higgsfield, NotebookLM, Power BI)
   se dibujan aquí con su forma e identidad propias. */
const LOGOS_SVG = {
  // OpenAI / GPT — nudo hexagonal oficial
  openai: ({ size = 22, color = "#FFFFFF" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden focusable="false">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  // Anthropic / Claude — isotipo oficial
  claude: ({ size = 22, color = "#D97757" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden focusable="false">
      <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
    </svg>
  ),
  // n8n — isotipo oficial
  n8n: ({ size = 22, color = "#EA4B71" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden focusable="false">
      <path d="M21.4737 6.3158c-1.1954 0-2.2019.8082-2.5017 1.9079h-2.9772c-1.2432 0-2.2937.9153-2.4708 2.1458l-.1263.8768c-.0886.6152-.6138 1.0729-1.2354 1.0729h-.4041c-.3-1.0997-1.3063-1.9079-2.5018-1.9079-1.1954 0-2.2018.8082-2.5017 1.9079H4.1075c-.3-1.0997-1.3063-1.9079-2.5017-1.9079C.7189 10.4113 0 11.1302 0 12.0171c0 .8868.7189 1.6058 1.6058 1.6058 1.1954 0 2.2018-.8083 2.5017-1.9079h2.6472c.2999 1.0996 1.3063 1.9079 2.5017 1.9079 1.1955 0 2.2018-.8083 2.5018-1.9079h.4041c1.2432 0 2.2937-.9153 2.4708-2.1458l.1263-.8768c.0886-.6152.6138-1.0729 1.2354-1.0729h2.9772c.2998 1.0997 1.3063 1.9079 2.5017 1.9079C22.3605 9.5273 23.0794 8.8084 23.0794 7.9216c0-.8869-.7189-1.6058-1.6057-1.6058Z" />
    </svg>
  ),
  // Higgsfield — dibujado aquí: no existe en Simple Icons.
  // Un campo de partículas convergiendo a un núcleo: la idea de
  // "campo" del nombre, legible a 16px.
  higgsfield: ({ size = 22, color = "#22D3EE" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      <g stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round">
        <ellipse cx="12" cy="12" rx="10" ry="4.6" />
        <ellipse cx="12" cy="12" rx="10" ry="4.6" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.6" transform="rotate(120 12 12)" />
      </g>
      <circle cx="12" cy="12" r="3" fill={color} />
    </svg>
  ),
  // Perplexity — isotipo oficial
  perplexity: ({ size = 22, color = "#1FB8CD" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden focusable="false">
      <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904.6104v6.4792H1.6023v10.4342h2.8882V24l6.9318-6.3982v6.2805h1.1554v-6.2374L19.4728 24v-6.4861h2.9249V7.0896zm-4.4485-4.5333v4.5333h-5.3987l5.3987-4.5333zM6.4851 3.1651l5.0674 4.2935H6.4851V3.1651zm-3.7291 5.0674H11.0464l-7.1633 6.8081-.3216.3057-.0055-7.1138zm2.8882 12.7045v-4.5333h5.3987l-5.3987 4.5333zm3.7291-5.0674l-5.0674-4.2935h5.0674v4.2935zm3.7291 0v-4.2935h5.0674l-5.0674 4.2935zm4.5837 5.0674l-5.3987-4.5333h5.3987v4.5333zm2.9249-5.6363h-.0055l-.3216-.3057-7.1633-6.8081h8.2932l-.0055 7.1138z" />
    </svg>
  ),
  // NotebookLM — dibujado aquí: no existe en Simple Icons.
  // Cuaderno con anillas y una chispa: documento + modelo.
  googlenotebooklm: ({ size = 22, color = "#4285F4" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      <rect x="4.5" y="3" width="15" height="18" rx="2.2" fill="none" stroke={color} strokeWidth="1.6" />
      <path d="M8.5 3v18" stroke={color} strokeWidth="1.4" opacity="0.55" />
      <path d="M11.6 8.2h5M11.6 11.4h5M11.6 14.6h3" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M17.4 16.2l.62 1.52 1.52.62-1.52.62-.62 1.52-.62-1.52-1.52-.62 1.52-.62z" fill={color} />
    </svg>
  ),
  // Power BI — dibujado aquí: el logo oficial no está en Simple Icons.
  // Tres barras crecientes, la lectura inmediata de "BI".
  powerbi: ({ size = 22, color = "#F2C811" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      <rect x="3.2" y="13.4" width="4.4" height="7.4" rx="1.1" fill={color} opacity="0.55" />
      <rect x="9.8" y="8.6" width="4.4" height="12.2" rx="1.1" fill={color} opacity="0.8" />
      <rect x="16.4" y="3.2" width="4.4" height="17.6" rx="1.1" fill={color} />
    </svg>
  ),
  // Meta — isotipo oficial
  meta: ({ size = 22, color = "#0467DF" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden focusable="false">
      <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.848-2.122.848-3.583 0-2.558-.694-5.315-2.087-7.376-1.26-1.856-2.923-2.956-4.816-2.956-1.023 0-2.02.377-2.988 1.024-.596.398-1.14.898-1.63 1.452-.293-.331-.593-.633-.902-.904-1.28-1.122-2.68-1.719-4.123-1.719zm10.161 2.858c1.201 0 2.228.666 3.05 1.87 1.025 1.502 1.626 3.81 1.626 6.106 0 .79-.088 1.415-.253 1.887-.164.47-.404.79-.716.955a1.47 1.47 0 0 1-.69.15c-.51 0-.972-.16-1.494-.702-.4-.416-.883-1.078-1.55-2.146l-1.68-2.802c-.21-.354-.428-.72-.65-1.096.36-.55.706-1.03 1.043-1.436.727-.877 1.397-1.34 2.14-1.34l-.926-1.446zm-10.16.05c.72 0 1.463.32 2.25 1.01.4.35.81.78 1.226 1.28-.55.815-1.116 1.75-1.71 2.79l-.755 1.337c-1.3 2.3-1.66 2.87-2.22 3.615-.89 1.18-1.42 1.42-2.03 1.42-.79 0-1.31-.34-1.63-.87-.24-.4-.38-.93-.38-1.6 0-2.06.58-4.41 1.6-6.02.86-1.35 1.9-1.96 2.83-1.96l.85-.002z" />
    </svg>
  ),
};

/* Logo de marca: SVG local si existe; si no, Simple Icons por CDN;
   si tampoco, una insignia con la inicial. Nunca queda un hueco. */
function LogoMarca({ marca, size = 22, color }) {
  const Svg = LOGOS_SVG[marca];
  if (!Svg) return null;
  return <Svg size={size} color={color} />;
}

/* Logo real de cada tecnología (Simple Icons CDN).
   Si el logo no existe o no carga, muestra una insignia con la inicial. */
function IconoTech({ t, slug, color, nombre, tam = 22, lucide: IconoLucide }) {
  const [falla, setFalla] = useState(false);
  const caja = tam + 14;

  // Logo local embebido: es la via fiable para las marcas centrales
  // (GPT, Claude, n8n). No depende de que responda un CDN externo.
  if (LOGOS_SVG[slug]) {
    return (
      <span
        className="flex items-center justify-center rounded-lg shrink-0"
        style={{ width: caja, height: caja, background: t.surface2, border: `1px solid ${t.borderSoft}` }}
      >
        <LogoMarca marca={slug} size={tam} color={color ? `#${color}` : undefined} />
      </span>
    );
  }

  // Icono Lucide directo (para marcas sin logo propio: Power BI, NotebookLM…)
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
  { id: "en-proceso", label: "En proceso" },
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

/* ============================================================
   SOBRE MÍ — apertura en manifiesto, no en rejilla.

   Orden de lectura:
     1. LEMA      la frase que define cómo trabajo, al frente
     2. RELATO    quién soy, en dos párrafos a ancho de lectura
     3. MÉTODO    los cuatro pasos como una línea de tiempo horizontal
     4. CAPACIDADES  en qué trabajo, como banda de texto continuo

   Nada de cuadrículas de dos por dos: el contenido avanza en
   bandas horizontales, que es como se lee una página, no una hoja
   de cálculo.
   ============================================================ */
function SobreMi({ t }) {
  const { intro, motivacion, lema, lemaTexto, puntos } = DATOS.sobreMi;

  return (
    <section id="sobre-mi" className="relative py-20 md:py-28">
      <SepSeccion t={t} />
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <CabeceraSeccion
          t={t}
          num="01"
          eyebrow="Sobre mí"
          titulo="Automatizo lo que hoy alguien hace a mano"
        />

        {/* ---------- RELATO CON EL LEMA INTERCALADO ----------
            El lema no abre ni cierra: vive dentro del relato, entre lo
            que hago y por que lo hago. Es una nota al margen, no un
            titular; su peso tipografico es menor que el de la seccion. */}
        <Reveal delay={60}>
          <div className="pt-10" style={{ borderTop: `1px solid ${t.border}` }}>
            <div className="grid md:grid-cols-2 gap-x-14 gap-y-8">
              <p className="leading-relaxed" style={{ color: t.text, fontSize: "1.08rem", textWrap: "pretty" }}>
                {intro}
              </p>

              <div className="flex flex-col gap-8">
                {/* El lema, al margen del relato */}
                {lema && (
                  <figure
                    className="pl-5"
                    style={{ borderLeft: `2px solid ${t.accent}` }}
                  >
                    <blockquote
                      style={{
                        fontFamily: DISPLAY,
                        fontWeight: 400,
                        fontSize: "clamp(1.15rem, 2.1vw, 1.5rem)",
                        lineHeight: 1.25,
                        letterSpacing: "-0.02em",
                        color: t.text,
                        textWrap: "balance",
                      }}
                    >
                      Planifica como <span style={{ fontStyle: "italic", color: t.accentText }}>Monje</span>,
                      ejecuta como <span style={{ fontStyle: "italic", color: t.accentText }}>Ninja</span>.
                    </blockquote>
                    {lemaTexto && (
                      <figcaption
                        className="mt-2.5 leading-relaxed"
                        style={{ color: t.muted, fontSize: "0.95rem", textWrap: "pretty" }}
                      >
                        {lemaTexto}
                      </figcaption>
                    )}
                  </figure>
                )}

                {motivacion && (
                  <p className="leading-relaxed" style={{ color: t.muted, fontSize: "1.08rem", textWrap: "pretty" }}>
                    {motivacion}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="pb-14 md:pb-16" />

        {/* ---------- 3 · MÉTODO: línea de tiempo horizontal ----------
            Los cuatro pasos avanzan de izquierda a derecha sobre una
            misma regla, como un proceso. En móvil se apilan, pero la
            regla pasa a ser vertical: sigue leyéndose como secuencia. */}
        <div className="metodo-banda pt-12 md:pt-14" style={{ borderTop: `1px solid ${t.border}` }}>
          <Reveal>
            <div className="flex items-baseline gap-4 mb-9">
              <span
                style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.2em", color: t.accentText, textTransform: "uppercase" }}
              >
                Cómo trabajo
              </span>
              <span className="h-px flex-1" style={{ background: t.borderSoft }} />
              <span className="inline-flex items-center gap-1.5 shrink-0">
                <span className="punto-vivo w-1.5 h-1.5 rounded-full" style={{ background: t.ok }} />
                <span style={{ fontFamily: MONO, fontSize: 10, color: t.faint, letterSpacing: "0.12em" }}>
                  CONECTA SYSTEMS
                </span>
              </span>
            </div>
          </Reveal>

          <ol className="grid md:grid-cols-4 gap-x-8 gap-y-9">
            {[
              { n: "01", t: "Escuchar el problema", d: "Me siento con quien hace el trabajo hoy: qué hace a mano, cuánto le toma y dónde se le complica." },
              { n: "02", t: "Elegir la herramienta correcta", d: "No todo necesita inteligencia artificial. Si se resuelve con algo más simple, te lo digo y lo hacemos así." },
              { n: "03", t: "Construir el flujo", d: "Agente o automatización, con límites claros y una persona decidiendo donde de verdad importa." },
              { n: "04", t: "Entregarlo funcionando", d: "Una interfaz que se entienda sin manual, y números que muestren el tiempo que se ganó." },
            ].map((paso, i) => (
              <Reveal key={paso.n} delay={i * 80}>
                <li className="paso-metodo relative pt-7">
                  {/* Regla superior con el nodo del paso */}
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 right-0"
                    style={{ height: 1, background: t.borderSoft }}
                  />
                  <span
                    aria-hidden
                    className="nodo-paso absolute top-0 left-0"
                    style={{
                      width: 7, height: 7, borderRadius: "50%",
                      background: t.accent, transform: "translateY(-3px)",
                    }}
                  />
                  <span
                    className="block mb-2.5"
                    style={{ fontFamily: MONO, fontSize: 11, color: t.accentText, letterSpacing: "0.1em" }}
                  >
                    {paso.n}
                  </span>
                  <h3
                    className="mb-2"
                    style={{ fontFamily: DISPLAY, color: t.text, fontSize: "1.15rem", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.2, textWrap: "balance" }}
                  >
                    {paso.t}
                  </h3>
                  <p className="leading-relaxed" style={{ color: t.muted, fontSize: 14, textWrap: "pretty" }}>
                    {paso.d}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* ---------- 4 · CAPACIDADES: bandas a ancho completo ----------
            Cada capacidad es una fila que ocupa todo el ancho: título
            grande a la izquierda, explicación a la derecha. Es la misma
            gramática que Proyectos y Stack, no una rejilla de tarjetas. */}
        <div className="mt-16 md:mt-24">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-2">
              <span
                style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.2em", color: t.accent2Text, textTransform: "uppercase" }}
              >
                En qué trabajo
              </span>
              <span className="h-px flex-1" style={{ background: t.borderSoft }} />
            </div>
          </Reveal>

          <div style={{ borderBottom: `1px solid ${t.borderSoft}` }}>
            {puntos.map((p, i) => (
              <Reveal key={p.titulo} delay={i * 70}>
                <div
                  className="banda-capacidad grid md:grid-cols-[1fr_1.35fr] gap-3 md:gap-12 py-7 md:py-9"
                  style={{ borderTop: `1px solid ${t.borderSoft}` }}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="shrink-0"
                      style={{ fontFamily: MONO, fontSize: 11, color: t.faint, letterSpacing: "0.06em" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      style={{
                        fontFamily: DISPLAY,
                        color: t.text,
                        fontSize: "clamp(1.25rem, 2.6vw, 1.9rem)",
                        fontWeight: 400,
                        letterSpacing: "-0.025em",
                        lineHeight: 1.1,
                        textWrap: "balance",
                      }}
                    >
                      {p.titulo}
                    </h3>
                  </div>
                  <p
                    className="leading-relaxed md:pt-1"
                    style={{ color: t.muted, fontSize: "1rem", maxWidth: "62ch", textWrap: "pretty" }}
                  >
                    {p.texto}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TECNOLOGÍAS — logos reales con nombre y propósito
   ============================================================ */

const ICONOS_CAT = { monitor: Code2, layers: Server, database: Database, wrench: Settings2, sparkles: BrainCircuit, settings: Workflow, bot: Bot };

/* Rama del árbol de Claude — Skills o MCP.
   Cada rama tiene su propia forma de mostrar los hijos: Skills usa
   tarjetas anchas con explicación larga (son tres y cada una merece
   espacio); MCP usa una rejilla de logos (son muchos y lo que importa
   es reconocerlos de un vistazo). */
function RamaClaude({ t, rama, abierta, onToggle, ultima }) {
  return (
    <div className="relative">
      {/* Tronco vertical del árbol */}
      <span
        aria-hidden
        className="absolute left-0 top-0"
        style={{ width: 1, height: ultima ? 24 : "100%", background: t.border }}
      />
      {/* Codo hacia el nombre de la rama */}
      <span
        aria-hidden
        className="absolute"
        style={{ left: 0, top: 24, width: 20, height: 1, background: t.border }}
      />

      <div className="pl-7">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={abierta}
          className="rama-claude w-full text-left py-4 flex items-baseline gap-3"
        >
          <span
            className="shrink-0"
            style={{
              fontFamily: MONO, fontSize: 13.5, fontWeight: 600,
              color: abierta ? t.accentText : t.text,
              letterSpacing: "0.04em", transition: "color 240ms",
            }}
          >
            {rama.nombre}
          </span>
          <span className="shrink-0" style={{ fontFamily: MONO, fontSize: 10, color: t.faint }}>
            {String(rama.hijos.length).padStart(2, "0")}
          </span>
          <span className="h-px flex-1" style={{ background: t.borderSoft }} />
          <span className="shrink-0 relative" style={{ width: 11, height: 11, color: t.muted }} aria-hidden>
            <span className="absolute" style={{ top: 5, left: 0, width: 11, height: 1, background: "currentColor" }} />
            <span
              className="absolute"
              style={{
                top: 0, left: 5, width: 1, height: 11, background: "currentColor",
                transform: abierta ? "scaleY(0)" : "scaleY(1)",
                transition: "transform 240ms cubic-bezier(0.22,0.61,0.36,1)",
              }}
            />
          </span>
        </button>

        <p
          className="pb-4 leading-relaxed"
          style={{ color: t.muted, fontSize: 14, maxWidth: "66ch", textWrap: "pretty" }}
        >
          {rama.resumen}
        </p>

        <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: abierta ? "1fr" : "0fr" }}>
          <div className="overflow-hidden">
            {rama.clave === "skills" ? (
              /* ---- SKILLS: tres tarjetas con espacio para explicarse ---- */
              <div className="pb-6 grid md:grid-cols-3 gap-3.5">
                {rama.hijos.map((h, i) => (
                  <div
                    key={h.nombre}
                    className="tarjeta-skill p-5 flex flex-col"
                    style={{
                      background: t.surface,
                      border: `1px solid ${t.borderSoft}`,
                      borderRadius: 12,
                      borderTop: `2px solid ${t.accent}`,
                    }}
                  >
                    <span
                      className="mb-3"
                      style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", color: t.accentText }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4
                      className="mb-2.5"
                      style={{
                        fontFamily: DISPLAY, color: t.text, fontSize: "1.1rem",
                        fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.2,
                        textWrap: "balance",
                      }}
                    >
                      {h.nombre}
                    </h4>
                    <p
                      className="leading-relaxed"
                      style={{ color: t.muted, fontSize: 13.5, textWrap: "pretty" }}
                    >
                      {h.detalle}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              /* ---- MCP: rejilla de conexiones con su logo ----
                 Lo que importa es reconocer las aplicaciones de un
                 vistazo, así que el logo va primero y grande. */
              <div className="pb-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {rama.hijos.map((h) => (
                    <div
                      key={h.nombre}
                      className="tarjeta-mcp p-4 flex items-start gap-3.5"
                      style={{
                        background: h.destacado ? t.accentSoft : t.surface,
                        border: `1px solid ${h.destacado ? t.accentBorder : t.borderSoft}`,
                        borderRadius: 12,
                      }}
                    >
                      <span className="shrink-0 mt-0.5">
                        <IconoTech t={t} slug={h.slug} color={h.color} nombre={h.nombre} tam={20} />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span
                            style={{
                              fontSize: 14, fontWeight: 600,
                              color: h.destacado ? t.accentText : t.text,
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {h.nombre}
                          </span>
                          {h.destacado && (
                            <span
                              style={{
                                fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.16em",
                                color: t.accentText, textTransform: "uppercase",
                              }}
                            >
                              Principal
                            </span>
                          )}
                        </div>
                        <div className="mt-1 leading-snug" style={{ color: t.muted, fontSize: 13 }}>
                          {h.detalle}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Nota de cierre: el protocolo es abierto */}
                {rama.nota && (
                  <p
                    className="mt-4 pl-4 leading-relaxed"
                    style={{
                      borderLeft: `2px solid ${t.accent2Border}`,
                      color: t.muted, fontSize: 13.5, maxWidth: "70ch", textWrap: "pretty",
                    }}
                  >
                    {rama.nota}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Árbol completo: Claude arriba como raíz, sus ramas debajo. */
function ArbolClaude({ t, cat }) {
  const [abierta, setAbierta] = useState("skills");
  return (
    <div className="pb-8 pl-0 md:pl-[3.9rem]">
      {/* Raíz */}
      <div className="flex items-start gap-3.5 pb-2">
        <IconoTech t={t} slug={cat.raiz.slug} color={cat.raiz.color} nombre={cat.raiz.nombre} tam={22} />
        <div className="min-w-0">
          <div style={{ fontSize: 15.5, fontWeight: 600, color: t.text, letterSpacing: "-0.01em" }}>
            {cat.raiz.nombre}
          </div>
          <div className="mt-1 leading-snug" style={{ color: t.muted, fontSize: 14, maxWidth: "62ch" }}>
            {cat.raiz.detalle}
          </div>
        </div>
      </div>

      {/* Ramas */}
      <div className="mt-3 ml-[0.65rem]">
        {cat.ramas.map((rama, i) => (
          <RamaClaude
            key={rama.clave}
            t={t}
            rama={rama}
            abierta={abierta === rama.clave}
            onToggle={() => setAbierta(abierta === rama.clave ? null : rama.clave)}
            ultima={i === cat.ramas.length - 1}
          />
        ))}
      </div>

      {/* Motores de ejecución, bajo el árbol */}
      {cat.items?.length > 0 && (
        <div className="mt-8 pt-5" style={{ borderTop: `1px solid ${t.borderSoft}` }}>
          <span
            className="block mb-4"
            style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", color: t.faint, textTransform: "uppercase" }}
          >
            Motores de ejecución
          </span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
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
      )}
    </div>
  );
}

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
                {String(cat.arbol ? cat.ramas.length : cat.items.length).padStart(2, "0")}
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
            {(cat.arbol ? [cat.raiz] : cat.items.slice(0, 5)).map((item) => (
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
            {cat.arbol ? (
              <ArbolClaude t={t} cat={cat} />
            ) : (
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
            )}
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
   CERTIFICACIONES — ruta de formación, no muro de diplomas.

   Todas están en curso, así que la sección no finge lo contrario:
   se presenta como una ruta con su estado, y cada ficha se abre
   para leer qué es, para qué sirve y qué habilidades desarrolla.

   Cuando una se complete (estado: "completada" + enlace al badge),
   la fila lo muestra y aparece el botón al certificado verificable.
   ============================================================ */

// Logos de las instituciones formadoras. Los que no existen en
// Simple Icons se dibujan aquí para no depender de un CDN.
const LOGOS_CERT = {
  claude: LOGOS_SVG.claude,
  n8n: LOGOS_SVG.n8n,
  googlecloud: ({ size = 22, color = "#4285F4" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden focusable="false">
      <path d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.128-3.9 7.845-.008 9.972h-.008a9.28 9.28 0 0 0 4.816 1.298h9.42c4.171-.046 7.6-3.512 7.6-7.694a7.68 7.68 0 0 0-3.997-6.73l-.002.002a7.833 7.833 0 0 0-1.28-2.276c-1.759-2.16-4.38-3.464-7.307-3.465zm.007 1.5a6.316 6.316 0 0 1 6.125 4.76.75.75 0 0 0 .52.542 6.18 6.18 0 0 1 4.435 5.94c0 3.36-2.75 6.14-6.116 6.177H7.764a7.78 7.78 0 0 1-4.04-1.087c-2.89-1.58-2.87-5.83.03-7.42a.75.75 0 0 0 .37-.47A7.844 7.844 0 0 1 12.197 3.88z" />
    </svg>
  ),
  ibm: ({ size = 22, color = "#FFFFFF" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden focusable="false">
      <path d="M0 5.4h6.9v1.2H0V5.4zm8.1 0h8.4v1.2H8.1V5.4zm9.6 0H24v1.2h-6.3V5.4zM0 7.8h6.9V9H0V7.8zm8.1 0h8.4V9H8.1V7.8zm9.6 0H24V9h-6.3V7.8zM2.4 10.2h2.1v1.2H2.4v-1.2zm8.1 0h3.3v1.2h-3.3v-1.2zm9.3 0h2.1v1.2h-2.1v-1.2zM2.4 12.6h2.1v1.2H2.4v-1.2zm8.1 0h3.3v1.2h-3.3v-1.2zm9.3 0h2.1v1.2h-2.1v-1.2zM2.4 15h2.1v1.2H2.4V15zm8.1 0h3.3v1.2h-3.3V15zm9.3 0h2.1v1.2h-2.1V15zM0 17.4h6.9v1.2H0v-1.2zm8.1 0h8.4v1.2H8.1v-1.2zm9.6 0H24v1.2h-6.3v-1.2z" />
    </svg>
  ),
  // Harvard: el escudo real no es libre. Un monograma sobrio en su
  // carmesí resuelve la identidad sin usar marca ajena.
  harvard: ({ size = 22, color = "#A51C30" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      <path d="M4 3.4h16v13.2c0 2.2-3.6 3.6-8 4-4.4-.4-8-1.8-8-4V3.4z" fill="none" stroke={color} strokeWidth="1.6" />
      <path d="M8.4 8.2v7M15.6 8.2v7M8.4 11.6h7.2" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
};

function LogoCert({ marca, size = 22, color }) {
  const Svg = LOGOS_CERT[marca];
  if (!Svg) return null;
  return <Svg size={size} color={color ? `#${color}` : undefined} />;
}

/* Una fila de la ruta de formación. Cerrada muestra el logo, el
   nombre y el estado; abierta despliega la ficha completa. */
function FilaCertificacion({ t, cert, abierta, onToggle, indice, ultima }) {
  const completada = cert.estado === "completada";

  return (
    <div style={{ borderTop: `1px solid ${abierta ? t.border : t.borderSoft}` }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={abierta}
        data-cursor=""
        className="fila-cert w-full text-left py-6 md:py-7 flex items-start gap-4 md:gap-6"
      >
        {/* Índice y línea de ruta */}
        <span className="shrink-0 relative flex flex-col items-center" style={{ width: 26 }}>
          <span
            className="flex items-center justify-center"
            style={{
              width: 26, height: 26, borderRadius: "50%",
              border: `1px solid ${completada ? t.ok : abierta ? t.accent : t.border}`,
              background: completada ? t.ok : "transparent",
              color: completada ? "#0A0B0D" : abierta ? t.accentText : t.faint,
              fontFamily: MONO, fontSize: 10,
              transition: "border-color 240ms, color 240ms",
            }}
          >
            {completada ? <Check size={13} strokeWidth={3} /> : String(indice + 1).padStart(2, "0")}
          </span>
          {/* Tramo de ruta hacia la siguiente */}
          {!ultima && (
            <span
              aria-hidden
              className="absolute"
              style={{ top: 30, bottom: -28, width: 1, background: t.borderSoft }}
            />
          )}
        </span>

        {/* Logo de la institución */}
        <span
          className="shrink-0 hidden sm:flex items-center justify-center"
          style={{ width: 40, height: 40, borderRadius: 10, background: t.surface2, border: `1px solid ${t.borderSoft}` }}
        >
          <LogoCert marca={cert.marca} size={20} color={cert.color} />
        </span>

        {/* Nombre e institución */}
        <span className="min-w-0 flex-1">
          <span
            className="block"
            style={{
              fontFamily: DISPLAY, fontWeight: 400,
              fontSize: "clamp(1.1rem, 2.2vw, 1.55rem)",
              letterSpacing: "-0.02em", color: t.text, lineHeight: 1.15,
              textWrap: "balance",
            }}
          >
            {cert.nombre}
          </span>
          <span className="block mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", color: t.accentText, textTransform: "uppercase" }}>
              {cert.institucion}
            </span>
            <span style={{ fontFamily: MONO, fontSize: 10.5, color: t.faint }}>
              {cert.plataforma}
            </span>
          </span>
        </span>

        {/* Estado */}
        <span className="shrink-0 flex items-center gap-3 pt-1">
          <span
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1"
            style={{
              borderRadius: 6,
              border: `1px solid ${completada ? t.border : t.accentBorder}`,
              background: completada ? "transparent" : t.accentSoft,
              fontFamily: MONO, fontSize: 9,
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: completada ? t.ok : t.accentText,
            }}
          >
            {!completada && <span className="punto-vivo w-1 h-1 rounded-full" style={{ background: t.accent }} />}
            {completada ? "Completada" : "En curso"}
          </span>
          <span className="relative" style={{ width: 11, height: 11, color: t.muted }} aria-hidden>
            <span className="absolute" style={{ top: 5, left: 0, width: 11, height: 1, background: "currentColor" }} />
            <span
              className="absolute"
              style={{
                top: 0, left: 5, width: 1, height: 11, background: "currentColor",
                transform: abierta ? "scaleY(0)" : "scaleY(1)",
                transition: "transform 240ms cubic-bezier(0.22,0.61,0.36,1)",
              }}
            />
          </span>
        </span>
      </button>

      {/* Ficha desplegable */}
      <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: abierta ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <div className="pb-8 pl-0 sm:pl-[4.6rem] md:pl-[5.4rem] grid md:grid-cols-3 gap-x-8 gap-y-6">
            {[
              ["Qué es", cert.queEs],
              ["Para qué me sirve", cert.paraQue],
              ["Por qué importa", cert.impacto],
            ].map(([k, v]) => (
              <div key={k}>
                <div
                  className="mb-2"
                  style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.16em", color: t.faint, textTransform: "uppercase" }}
                >
                  {k}
                </div>
                <p className="leading-relaxed" style={{ color: t.muted, fontSize: 14, textWrap: "pretty" }}>
                  {v}
                </p>
              </div>
            ))}

            {/* Habilidades */}
            {cert.habilidades?.length > 0 && (
              <div className="md:col-span-3 pt-1">
                <div
                  className="mb-3"
                  style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.16em", color: t.accent2Text, textTransform: "uppercase" }}
                >
                  Habilidades que desarrollo
                </div>
                <div className="flex flex-wrap gap-2">
                  {cert.habilidades.map((h) => (
                    <span
                      key={h}
                      className="px-2.5 py-1.5"
                      style={{
                        fontFamily: MONO, fontSize: 11,
                        color: t.text, background: t.surface,
                        border: `1px solid ${t.borderSoft}`, borderRadius: 7,
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Enlaces: el badge sólo si está completada */}
            <div className="md:col-span-3 flex flex-wrap gap-3 pt-2">
              {completada && cert.enlace && (
                <Boton t={t} primario icono={ExternalLink} href={cert.enlace}>Ver certificado</Boton>
              )}
              {cert.web && (
                <a
                  href={cert.web}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="ABRIR"
                  className="enlace-cert inline-flex items-center gap-2"
                  style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: t.muted, textTransform: "uppercase" }}
                >
                  Ver la formación oficial
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Certificados({ t }) {
  const lista = DATOS.certificados || [];
  const cierre = DATOS.certificadosCierre || {};
  const [abierta, setAbierta] = useState(0);

  const completadas = lista.filter((c) => c.estado === "completada").length;

  return (
    <section id="certificados" className="relative py-20 md:py-28 px-5 md:px-8">
      <SepSeccion t={t} />
      <div className="max-w-6xl mx-auto">
        <CabeceraSeccion
          t={t}
          num="03"
          eyebrow="Formación"
          titulo="La ruta que estoy recorriendo ahora"
          descripcion={cierre.objetivo}
        />

        {/* Avance de la ruta */}
        <Reveal>
          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 pb-6"
            style={{ borderBottom: `1px solid ${t.borderSoft}` }}
          >
            <span className="inline-flex items-baseline gap-2">
              <span style={{ fontFamily: DISPLAY, fontSize: "2rem", fontWeight: 500, color: t.text, letterSpacing: "-0.03em", lineHeight: 1 }}>
                {String(lista.length).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.16em", color: t.faint, textTransform: "uppercase" }}>
                formaciones en curso
              </span>
            </span>
            {completadas > 0 && (
              <span className="inline-flex items-baseline gap-2">
                <span style={{ fontFamily: DISPLAY, fontSize: "2rem", fontWeight: 500, color: t.ok, letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {String(completadas).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.16em", color: t.faint, textTransform: "uppercase" }}>
                  completadas
                </span>
              </span>
            )}
            <span className="h-px flex-1 min-w-[2rem]" style={{ background: t.borderSoft }} />
            <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.12em", color: t.faint }}>
              ANTHROPIC · GOOGLE · N8N · IBM · HARVARD
            </span>
          </div>
        </Reveal>

        {/* La ruta */}
        <div style={{ borderBottom: `1px solid ${t.borderSoft}` }}>
          {lista.map((cert, i) => (
            <FilaCertificacion
              key={cert.codigo}
              t={t}
              cert={cert}
              indice={i}
              abierta={abierta === i}
              onToggle={() => setAbierta(abierta === i ? -1 : i)}
              ultima={i === lista.length - 1}
            />
          ))}
        </div>

        {/* Cierre: cómo encajan y la nota de honestidad */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-12">
          {cierre.complementan && (
            <Reveal>
              <div>
                <div
                  className="mb-3"
                  style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.16em", color: t.accentText, textTransform: "uppercase" }}
                >
                  Cómo encajan entre sí
                </div>
                <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15, textWrap: "pretty" }}>
                  {cierre.complementan}
                </p>
              </div>
            </Reveal>
          )}
          {cierre.transparencia && (
            <Reveal delay={80}>
              <div className="pl-5" style={{ borderLeft: `2px solid ${t.accent2Border}` }}>
                <div
                  className="mb-3"
                  style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.16em", color: t.accent2Text, textTransform: "uppercase" }}
                >
                  Nota de transparencia
                </div>
                <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15, textWrap: "pretty" }}>
                  {cierre.transparencia}
                </p>
              </div>
            </Reveal>
          )}
        </div>
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
function MiniaturaProyecto({ t, p, alta = false, color = false }) {
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
          {/* Velo de marca del proyecto. Con `color` sólo queda una
              sombra inferior para asentar la etiqueta: la captura se ve
              tal cual, en su color real. */}
          <div
            className="absolute inset-0"
            style={{
              background: color
                ? "linear-gradient(to top, rgba(7,9,13,0.72) 0%, rgba(7,9,13,0.12) 34%, transparent 62%)"
                : `linear-gradient(155deg, ${p.gradiente[0]}CC 0%, ${p.gradiente[1]}55 55%, rgba(7,9,13,0.45) 100%)`,
            }}
          />
          {/* Rejilla técnica sutil (sólo en la vista de tabla) */}
          <div
            className={color ? "hidden" : "absolute inset-0 opacity-20"}
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
          style={{ transition: "transform 400ms cubic-bezier(0.22,0.61,0.36,1)" }}
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
            <MiniaturaProyecto t={t} p={p} alta color />
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

/* Bloque de contenido del detalle: etiqueta a la izquierda,
   texto a la derecha. Rejilla editorial, no muro de párrafos. */
function BloqueDetalle({ t, etiqueta, titulo, children, ultimo = false }) {
  return (
    <Reveal>
      <div
        className="grid md:grid-cols-[10rem_1fr] gap-3 md:gap-10 py-9 md:py-11"
        style={{ borderBottom: ultimo ? "none" : `1px solid ${t.borderSoft}` }}
      >
        <div className="md:pt-1">
          <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.18em", color: t.accentText, textTransform: "uppercase" }}>
            {etiqueta}
          </span>
        </div>
        <div className="min-w-0">
          {titulo && (
            <h2
              className="mb-3"
              style={{ fontFamily: DISPLAY, color: t.text, fontSize: "clamp(1.3rem, 2.4vw, 1.75rem)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.2, textWrap: "balance" }}
            >
              {titulo}
            </h2>
          )}
          {children}
        </div>
      </div>
    </Reveal>
  );
}

// Párrafo de lectura del detalle
function Parrafo({ t, children }) {
  return (
    <p className="leading-relaxed" style={{ color: t.muted, fontSize: "1.0625rem", maxWidth: "62ch", textWrap: "pretty" }}>
      {children}
    </p>
  );
}

/* Vídeo del responsable del proyecto. Sólo se renderiza si
   `detalle.video.url` existe: no dejamos un hueco vacío en producción.
   Acepta cualquier URL de embed (YouTube, Vimeo, Drive). */
function VideoProyecto({ t, video }) {
  if (!video?.url) return null;
  return (
    <div>
      <div
        className="relative overflow-hidden"
        style={{ borderRadius: 14, border: `1px solid ${t.border}`, aspectRatio: "16 / 9", background: t.surface }}
      >
        <iframe
          src={video.url}
          title={video.titulo || `Vídeo de ${video.autor || "el proyecto"}`}
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
      {(video.autor || video.rol) && (
        <p className="mt-3" style={{ fontFamily: MONO, fontSize: 11.5, color: t.faint, letterSpacing: "0.06em" }}>
          {video.autor}
          {video.autor && video.rol ? " · " : ""}
          {video.rol}
        </p>
      )}
    </div>
  );
}

function PaginaProyecto({ t, proyecto: p, volver }) {
  const d = p.detalle;
  if (p.tipo === "historia") return <PaginaHistoria t={t} proyecto={p} volver={volver} />;

  const grupos = GRUPOS_STACK.filter(([clave]) => d.stackDetalle?.[clave]?.length);
  const demoOk = d.demo && d.demo !== "#";
  const repoOk = d.repo && d.repo !== "#";
  const hayEnlaces = demoOk || repoOk;
  const tipo = (CATEGORIAS.find((c) => c.id === p.categoria) || {}).label || p.categoria;

  return (
    <main className="pb-24 detalle-entra">
      {/* ---------- PORTADA A SANGRE ----------
          La captura ocupa el ancho completo, a color, y el titular se
          apoya sobre ella. Es lo primero que se ve del proyecto. */}
      <header className="relative overflow-hidden" style={{ minHeight: "64svh" }}>
        {/* La portada es OBLIGATORIA y es la misma imagen de la
            miniatura del listado: al abrir el proyecto, la foto que
            el visitante acaba de pulsar crece y llena la pantalla. */}
        <Foto
          src={p.imagen}
          alt={`Captura de ${p.nombre}`}
          gradiente={p.gradiente}
          tinte={false}
          className="portada-detalle absolute inset-0 w-full h-full"
        />
        {/* Único velo: degradado desde abajo para que el texto se lea.
            Sin tintes de color encima de la captura. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${t.bg} 1%, rgba(10,11,13,0.88) 24%, rgba(10,11,13,0.30) 64%, rgba(10,11,13,0.50) 100%)` }}
        />

        <div
          className="relative w-full max-w-[1200px] mx-auto px-5 md:px-8 flex flex-col justify-end"
          style={{ minHeight: "64svh", paddingTop: "6.5rem", paddingBottom: "2.75rem" }}
        >
          <Reveal>
            <button
              type="button"
              onClick={() => volver("proyectos")}
              data-cursor=""
              className="inline-flex items-center gap-2 text-sm font-medium mb-7 transition-transform duration-200 hover:-translate-x-1"
              style={{ color: t.muted }}
            >
              <ArrowLeft size={15} /> Volver a proyectos
            </button>
          </Reveal>

          <Reveal delay={60}>
            <div className="mb-4">
              <EtiquetaCategoria t={t} categoria={p.categoria} codigo={p.codigo} />
            </div>
            <h1
              className="mb-4"
              style={{ fontFamily: DISPLAY, color: t.text, fontSize: "clamp(2.1rem, 6.5vw, 4.5rem)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 0.98, textWrap: "balance" }}
            >
              {p.nombre}
            </h1>
            <p
              className="leading-relaxed"
              style={{ color: t.muted, fontSize: "clamp(1rem, 1.6vw, 1.2rem)", maxWidth: "56ch", textWrap: "pretty" }}
            >
              {p.corto}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8">

        {/* ---------- FICHA: datos duros de un vistazo ---------- */}
        <Reveal>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-y-7 gap-x-6 py-9"
            style={{ borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}
          >
            {[
              ["Proyecto", p.codigo],
              ["Tipo", tipo],
              ["Rol", "Diseño y desarrollo"],
              ["Estado", p.categoria === "implementado" ? "En uso real" : "Entregado"],
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: t.faint, textTransform: "uppercase" }}>{k}</div>
                <div className="mt-1.5" style={{ color: t.text, fontSize: 14.5, fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ---------- ENLACES ---------- */}
        {hayEnlaces && (
          <Reveal>
            <div className="flex flex-wrap gap-3 pt-8">
              {demoOk && <Boton t={t} primario icono={ExternalLink} href={d.demo}>Ver el proyecto en vivo</Boton>}
              {repoOk && <Boton t={t} icono={FolderGit2} href={d.repo}>Código en GitHub</Boton>}
            </div>
          </Reveal>
        )}

        {/* ---------- CUERPO EDITORIAL ---------- */}
        <div className={hayEnlaces ? "mt-6" : "mt-2"}>
          <BloqueDetalle t={t} etiqueta="Resumen">
            <Parrafo t={t}>{d.resumen}</Parrafo>
          </BloqueDetalle>

          {/* Problema y solución enfrentados: se leen como par, no como lista */}
          <BloqueDetalle t={t} etiqueta="El caso">
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              <div>
                <h2 className="mb-2.5" style={{ fontFamily: DISPLAY, color: t.text, fontSize: "1.25rem", fontWeight: 500, letterSpacing: "-0.02em" }}>
                  El problema
                </h2>
                <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15.5, textWrap: "pretty" }}>{d.problemaLargo}</p>
              </div>
              <div className="md:pl-10" style={{ borderLeft: `1px solid ${t.borderSoft}` }}>
                <h2 className="mb-2.5" style={{ fontFamily: DISPLAY, color: t.text, fontSize: "1.25rem", fontWeight: 500, letterSpacing: "-0.02em" }}>
                  La solución
                </h2>
                <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15.5, textWrap: "pretty" }}>{d.solucion}</p>
              </div>
            </div>
          </BloqueDetalle>

          {/* Captura secundaria: rompe el texto a media página */}
          {d.imagenSecundaria && (
            <BloqueDetalle t={t} etiqueta="En pantalla">
              <div className="overflow-hidden" style={{ borderRadius: 14, border: `1px solid ${t.border}` }}>
                <Foto src={d.imagenSecundaria} alt={`${p.nombre} en uso`} gradiente={p.gradiente} tinte={false} className="h-64 md:h-[26rem]" />
              </div>
              {d.imagenSecundariaPie && (
                <p className="mt-3" style={{ fontFamily: MONO, fontSize: 11.5, color: t.faint }}>{d.imagenSecundariaPie}</p>
              )}
            </BloqueDetalle>
          )}

          <BloqueDetalle t={t} etiqueta="Arquitectura" titulo="Enfoque técnico">
            <Parrafo t={t}>{d.arquitectura}</Parrafo>
          </BloqueDetalle>

          {/* Stack como ficha técnica, no como tarjetas */}
          {grupos.length > 0 && (
            <BloqueDetalle t={t} etiqueta="Stack">
              <div>
                {grupos.map(([clave, titulo], i) => (
                  <div
                    key={clave}
                    className="grid md:grid-cols-[9rem_1fr] gap-1.5 md:gap-6 py-4"
                    style={{ borderTop: i ? `1px solid ${t.borderSoft}` : "none" }}
                  >
                    <span
                      className="md:pt-1"
                      style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", color: t.accent2Text, textTransform: "uppercase" }}
                    >
                      {titulo}
                    </span>
                    <ul className="space-y-1.5">
                      {d.stackDetalle[clave].map((item) => (
                        <li key={item} className="leading-snug" style={{ color: t.muted, fontSize: 14.5 }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </BloqueDetalle>
          )}

          {/* Decisiones: numeradas, dos columnas */}
          {d.decisiones?.length > 0 && (
            <BloqueDetalle t={t} etiqueta="Decisiones" titulo="El criterio detrás del código">
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 mt-2">
                {d.decisiones.map((dec, i) => (
                  <div key={dec.titulo}>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span style={{ fontFamily: MONO, fontSize: 11, color: t.accentText, letterSpacing: "0.06em" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-semibold" style={{ color: t.text, fontSize: 15.5, letterSpacing: "-0.01em" }}>{dec.titulo}</h3>
                    </div>
                    <p className="leading-relaxed md:pl-[1.9rem]" style={{ color: t.muted, fontSize: 14.5, textWrap: "pretty" }}>{dec.texto}</p>
                  </div>
                ))}
              </div>
            </BloqueDetalle>
          )}

          {/* Vídeo del responsable, si existe */}
          {d.video?.url && (
            <BloqueDetalle t={t} etiqueta="En voz del responsable" titulo={d.video.titulo}>
              <VideoProyecto t={t} video={d.video} />
            </BloqueDetalle>
          )}

          {/* Impacto: cierre destacado */}
          <BloqueDetalle t={t} etiqueta="Resultado" ultimo>
            <div
              className="p-6 md:p-8"
              style={{ background: t.surface, border: `1px solid ${t.border}`, borderLeft: `2px solid ${t.accent}`, borderRadius: "0 12px 12px 0" }}
            >
              <p
                className="leading-relaxed"
                style={{ fontFamily: DISPLAY, color: t.text, fontSize: "clamp(1.05rem, 2vw, 1.35rem)", fontWeight: 400, letterSpacing: "-0.015em", textWrap: "pretty" }}
              >
                {d.impacto}
              </p>
            </div>
          </BloqueDetalle>
        </div>

        {/* ---------- PIE DE NAVEGACIÓN ---------- */}
        <Reveal>
          <div className="flex flex-wrap gap-3 pt-10" style={{ borderTop: `1px solid ${t.borderSoft}` }}>
            {demoOk && <Boton t={t} primario icono={ExternalLink} href={d.demo}>Ver el proyecto</Boton>}
            {repoOk && <Boton t={t} icono={FolderGit2} href={d.repo}>Código en GitHub</Boton>}
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
  const tieneFoto = Boolean(m.portada);
  const info = ICONO_MOMENTO[m.categoria] || ICONO_MOMENTO.personal;
  const colorIcono = t[info.color];
  // Cuantas fotos tiene el album (portada incluida)
  const nFotos = (m.portada ? 1 : 0) + (m.album || []).filter((f) => f.foto).length;
  // Se puede abrir si hay algo que ver o que leer
  const abrible = nFotos > 0 || Boolean(m.relato) || (m.album || []).length > 0;

  return (
    <div className="mb-5" style={{ breakInside: "avoid" }}>
      <button
        type="button"
        onClick={() => abrible && onAbrir(m)}
        className="momento-polaroid group relative w-full block text-left rounded-xl"
        style={{
          background: "#F4F1EA", padding: "10px 10px 14px",
          boxShadow: t.shadowMd, transform: `rotate(${rot}deg)`,
          border: "1px solid rgba(0,0,0,0.08)", cursor: abrible ? "pointer" : "default",
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
            <Foto src={m.portada} alt={m.titulo} tinte={false} className="w-full h-full">
              <span
                className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(7,9,13,0.55)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", backdropFilter: "blur(4px)" }}
              >
                <ArrowUp size={14} className="rotate-45" />
              </span>
              {/* Cuantas fotos hay detras de la portada */}
              {nFotos > 1 && (
                <span
                  className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 px-2 py-1"
                  style={{
                    background: "rgba(7,9,13,0.68)", border: "1px solid rgba(255,255,255,0.22)",
                    borderRadius: 6, color: "#fff", backdropFilter: "blur(4px)",
                    fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.1em",
                  }}
                >
                  <Images size={11} />
                  {nFotos}
                </span>
              )}
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
                {abrible ? "VER MOMENTO" : "PRÓXIMAMENTE"}
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
          num="06"
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

      {/* Visor de álbum: portada + el resto de fotos del momento.
          Un momento no se cuenta con una sola foto: la portada lo
          representa en el muro y aquí se abre completo. */}
      {activa && (
        <VisorAlbum t={t} momento={activa} onCerrar={() => setActiva(null)} />
      )}
    </section>
  );
}

/* Visor de álbum. Navega entre las fotos del momento con las flechas
   del teclado y cierra con Escape. Si el momento aún no tiene álbum
   cargado, muestra la portada y lo dice sin rodeos. */
function VisorAlbum({ t, momento, onCerrar }) {
  // La portada es la primera foto del álbum; el resto va detrás.
  const fotos = [
    ...(momento.portada ? [{ foto: momento.portada, pie: momento.titulo }] : []),
    ...(momento.album || []).filter((f) => f.foto),
  ];
  const pendientes = (momento.album || []).filter((f) => !f.foto).length;
  const [idx, setIdx] = useState(0);
  const total = fotos.length;

  const mover = React.useCallback(
    (paso) => setIdx((i) => (total ? (i + paso + total) % total : 0)),
    [total]
  );

  useEffect(() => {
    const alTecla = (e) => {
      if (e.key === "Escape") onCerrar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", alTecla);
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", alTecla);
      document.body.style.overflow = previo;
    };
  }, [onCerrar, mover]);

  const actual = fotos[idx];

  return (
    <div
      className="visor-album fixed inset-0 flex items-center justify-center p-4 md:p-8"
      style={{ zIndex: CAPA.modal, background: "rgba(6,7,9,0.92)", backdropFilter: "blur(10px)" }}
      role="dialog"
      aria-modal="true"
      aria-label={`Álbum: ${momento.titulo}`}
      onClick={onCerrar}
    >
      <div
        className="visor-album-caja relative w-full max-w-5xl max-h-full overflow-y-auto"
        style={{ background: t.bgAlt, border: `1px solid ${t.border}`, borderRadius: 16 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar"
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center z-10"
          style={{ background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 8, color: t.text }}
        >
          <X size={16} />
        </button>

        {/* Foto grande */}
        <div
          className="relative flex items-center justify-center"
          style={{ background: t.bg, minHeight: "18rem", borderBottom: `1px solid ${t.borderSoft}` }}
        >
          {actual ? (
            <img
              key={idx}
              src={actual.foto}
              alt={actual.pie || momento.titulo}
              className="foto-album max-w-full"
              style={{ maxHeight: "60vh", objectFit: "contain" }}
            />
          ) : (
            /* Sin fotos todavía: marco honesto, no un hueco roto */
            <div className="flex flex-col items-center gap-3 py-16">
              <span
                className="flex items-center justify-center"
                style={{ width: 54, height: 54, borderRadius: 14, background: t.surface, border: `1px solid ${t.border}`, color: t.faint }}
              >
                <Camera size={22} />
              </span>
              <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.16em", color: t.faint, textTransform: "uppercase" }}>
                Fotos en camino
              </span>
            </div>
          )}

          {/* Flechas sobre la foto */}
          {total > 1 && (
            <>
              <button
                type="button"
                aria-label="Foto anterior"
                onClick={() => mover(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center"
                style={{ background: "rgba(10,11,13,0.72)", border: `1px solid ${t.border}`, borderRadius: 10, color: t.text, backdropFilter: "blur(6px)" }}
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                aria-label="Foto siguiente"
                onClick={() => mover(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center"
                style={{ background: "rgba(10,11,13,0.72)", border: `1px solid ${t.border}`, borderRadius: 10, color: t.text, backdropFilter: "blur(6px)" }}
              >
                <ArrowRight size={16} />
              </button>
            </>
          )}
        </div>

        {/* Ficha del momento */}
        <div className="p-5 md:p-7">
          <div className="flex items-start justify-between gap-5 flex-wrap">
            <div className="min-w-0">
              <h3
                style={{ fontFamily: DISPLAY, color: t.text, fontSize: "clamp(1.3rem, 3vw, 1.85rem)", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.15, textWrap: "balance" }}
              >
                {momento.titulo}
              </h3>
              <p className="mt-1.5" style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.08em", color: t.accentText }}>
                {momento.lugar} · {momento.fecha}
              </p>
            </div>
            {total > 0 && (
              <span style={{ fontFamily: MONO, fontSize: 10.5, color: t.faint, letterSpacing: "0.1em" }}>
                {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            )}
          </div>

          {momento.relato && (
            <p
              className="mt-5 leading-relaxed"
              style={{ color: t.muted, fontSize: 15, maxWidth: "64ch", textWrap: "pretty" }}
            >
              {momento.relato}
            </p>
          )}

          {/* Pie de la foto actual */}
          {actual?.pie && (
            <p
              className="mt-5 pl-4"
              style={{ borderLeft: `2px solid ${t.accent}`, color: t.text, fontSize: 14 }}
            >
              {actual.pie}
            </p>
          )}

          {/* Tiras de miniaturas para saltar entre fotos */}
          {total > 1 && (
            <div className="mt-6 flex gap-2.5 flex-wrap">
              {fotos.map((f, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Ver foto ${i + 1}`}
                  className="mini-album overflow-hidden shrink-0"
                  style={{
                    width: 66, height: 46, borderRadius: 7,
                    border: `1px solid ${i === idx ? t.accent : t.borderSoft}`,
                    opacity: i === idx ? 1 : 0.55,
                  }}
                >
                  <img src={f.foto} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}

          {/* Fotos declaradas sin ruta: se avisa, no se esconde */}
          {pendientes > 0 && (
            <p className="mt-5" style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.08em", color: t.faint }}>
              {String(pendientes).padStart(2, "0")} FOTO{pendientes > 1 ? "S" : ""} MÁS DE ESTE MOMENTO, POR SUBIR
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   EN PROCESO — la pizarra de lo que viene

   Lo que estoy construyendo, estudiando o explorando. Sin fechas
   prometidas: es una pizarra honesta, no una hoja de ruta.

   El estado de cada cosa se lee de un vistazo por su color:
     construyendo → cobre, ya hay avance real
     estudiando   → cian, formación en curso
     explorando   → gris, idea con criterio sin empezar
   ============================================================ */

const ESTADOS_PROCESO = {
  construyendo: { label: "Construyendo", color: "accent", icono: Hammer },
  estudiando: { label: "Estudiando", color: "accent2", icono: BookOpen },
  explorando: { label: "Explorando", color: "faint", icono: Lightbulb },
};

function TarjetaProceso({ t, item, indice }) {
  const est = ESTADOS_PROCESO[item.estado] || ESTADOS_PROCESO.explorando;
  const color = t[`${est.color}Text`] || t[est.color] || t.muted;
  const borde = est.color === "accent" ? t.accentBorder : est.color === "accent2" ? t.accent2Border : t.border;
  const Icono = est.icono;

  return (
    <Reveal delay={indice * 80}>
      <article
        className="tarjeta-proceso h-full flex flex-col p-5 md:p-6"
        style={{
          background: t.card,
          border: `1px solid ${t.borderSoft}`,
          borderRadius: 14,
          borderLeft: `2px solid ${borde}`,
        }}
      >
        {/* Estado */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="inline-flex items-center gap-2">
            <Icono size={13} style={{ color }} />
            <span
              style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.18em", color, textTransform: "uppercase" }}
            >
              {est.label}
            </span>
          </span>
          <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.14em", color: t.faint, textTransform: "uppercase" }}>
            {item.etiqueta}
          </span>
        </div>

        {/* Título */}
        <h3
          className="mb-3"
          style={{
            fontFamily: DISPLAY, color: t.text,
            fontSize: "clamp(1.2rem, 2.4vw, 1.5rem)",
            fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.15,
            textWrap: "balance",
          }}
        >
          {item.titulo}
        </h3>

        {/* Qué es y por qué */}
        <p
          className="leading-relaxed flex-1"
          style={{ color: t.muted, fontSize: 14.5, textWrap: "pretty" }}
        >
          {item.texto}
        </p>

        {/* Con qué */}
        {item.pila?.length > 0 && (
          <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${t.borderSoft}` }}>
            <span style={{ fontFamily: MONO, fontSize: 10.5, color: t.faint, letterSpacing: "0.04em" }}>
              {item.pila.join("  ·  ")}
            </span>
          </div>
        )}
      </article>
    </Reveal>
  );
}

function EnProceso({ t }) {
  const lista = DATOS.enProceso || [];
  if (!lista.length) return null;

  return (
    <section id="en-proceso" className="relative py-20 md:py-28 px-5 md:px-8">
      <SepSeccion t={t} />
      <div className="max-w-6xl mx-auto">
        <CabeceraSeccion
          t={t}
          num="05"
          eyebrow="En proceso"
          titulo="Lo que estoy construyendo ahora"
          descripcion="Una pizarra abierta: proyectos en marcha, formación en curso e ideas que todavía no empiezan. Sin fechas prometidas."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {lista.map((item, i) => (
            <TarjetaProceso key={item.titulo} t={t} item={item} indice={i} />
          ))}
        </div>

        <Reveal>
          <p
            className="mt-7 inline-flex items-center gap-2.5"
            style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.06em", color: t.faint }}
          >
            <span className="punto-vivo w-1.5 h-1.5 rounded-full" style={{ background: t.ok }} />
            ESTA PIZARRA CAMBIA. SI ALGO TE INTERESA, ESCRÍBEME.
          </p>
        </Reveal>
      </div>
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
                <span style={{ fontFamily: MONO, fontSize: 11.5, color: t.accent, letterSpacing: "0.08em" }}>07</span>
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
                presenciales o remotas. Cuéntame qué necesitas resolver y vemos juntos
                si la IA es el camino.
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
    "en-proceso": <EnProceso t={t} />,
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
