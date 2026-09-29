/* ============================================================
   METADATOS POR RUTA
   ------------------------------------------------------------
   Antes todas las rutas heredaban el <title> y la descripción del
   home, así que en Google cada sección habría competido con la
   misma entrada. Aquí cada ruta declara los suyos.

   REGLA: no se redacta copy nuevo. Cada título y cada descripción
   son EXACTAMENTE los que ya se leen en la interfaz — el encabezado
   de la sección y su párrafo de entrada. Si un texto cambia en la
   UI, hay que cambiarlo aquí también (son dos sitios a propósito:
   el de la UI lleva JSX y saltos de línea, el de meta necesita
   texto plano de una línea).

   ORDEN DEL TÍTULO: nombre · sección · encabezado. El nombre va
   primero porque la búsqueda que más importa es la del propio
   nombre, y Google pesa más el principio del título y corta el
   final (~60 caracteres): así nombre y sección siempre se ven.
   ============================================================ */

import { DATOS } from "./data/portafolio";
import { RUTAS, rutaProyecto } from "./rutas";

const SITIO = "https://www.caverotech.com";
const MARCA = "Alexys Cavero";

/* Los del home vienen del propio index.html, que es la única página
   que ya estaba bien resuelta. Se repiten aquí para que el
   prerenderizador tenga un único origen de datos. */
const HOME = {
  /* En el título y la descripción el rol va en texto corrido, sin el
     "·" que el hero usa como separador visual: aquí lo que cuenta son
     los términos por los que alguien busca. */
  titulo: "Alexys Cavero · Desarrollador Full Stack, IA y Automatización en Perú",
  descripcion:
    "Desarrollador Full Stack especializado en IA y automatización, en Ica, Perú. Construyo agentes de IA, automatizo procesos con n8n y Claude, e integro LLMs en sistemas reales — con la interfaz que los hace usables. Trabajo remoto en todo Perú.",
};

/* Título y descripción de cada sección, tomados de su encabezado
   visible en la interfaz. */
const SECCIONES = {
  inicio: HOME,

  "sobre-mi": {
    // App.jsx: eyebrow "Sobre mí" + h2
    titulo: `${MARCA} · Sobre mí · Automatizo lo que hoy alguien hace a mano`,
    descripcion: DATOS.descripcion,
  },

  tecnologias: {
    // App.jsx: h2 + párrafo de la sección Tecnologías
    titulo: `${MARCA} · Tecnologías · El stack con el que llevo IA a producción`,
    descripcion:
      "Cada tecnología de esta lista está en uso real en mis proyectos. No es una colección de logos: es el stack con el que diseño, integro y sostengo sistemas de IA.",
  },

  certificados: {
    // App.jsx: h2 de la sección Certificados
    titulo: `${MARCA} · Formación · La ruta que estoy recorriendo ahora`,
    descripcion:
      DATOS.certificadosCierre?.objetivo ||
      "Formación en curso en inteligencia artificial y automatización.",
  },

  proyectos: {
    // App.jsx: h2 + párrafo de la sección Proyectos
    titulo: `${MARCA} · Proyectos · Sistemas que resuelven un problema concreto`,
    descripcion:
      "Cada caso incluye el problema de negocio, la solución, la arquitectura y las decisiones técnicas detrás — incluida la capa de IA y automatización.",
  },

  "en-proceso": {
    // App.jsx: h2 + párrafo de la sección En proceso
    titulo: `${MARCA} · En proceso · Lo que estoy construyendo ahora`,
    descripcion:
      "Una pizarra abierta: workflows en marcha, agentes que quiero construir e ideas que todavía no empiezan. Sin fechas prometidas — lo que está aquí es lo que estoy pensando, no lo que ya entregué.",
  },

  galeria: {
    // App.jsx: h2 + párrafo de la sección Momentos
    titulo: `${MARCA} · Momentos · El muro de mis momentos`,
    descripcion:
      "Como programador y como persona: trabajo, formación, enseñanza, voluntariado y los momentos detrás del código. Este muro sigue creciendo.",
  },

  contacto: {
    // App.jsx: h2 de la sección Contacto (sin el marcado del énfasis)
    titulo: `${MARCA} · Contacto · ¿Tienes un proceso que debería estar automatizado?`,
    descripcion:
      "Estoy abierto a oportunidades como Desarrollador Full Stack en IA y Automatización. Trabajo con negocios de todo el Perú, presencial o en remoto.",
  },
};

/* Recorta a la longitud que Google muestra sin cortar una palabra
   por la mitad. No reescribe: solo trunca. */
function recortar(texto, max = 158) {
  const t = String(texto || "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const corte = t.slice(0, max);
  const ultimo = corte.lastIndexOf(" ");
  return (ultimo > max * 0.6 ? corte.slice(0, ultimo) : corte).replace(/[,;:.\s]+$/, "") + "…";
}

/* Metadatos de una ruta cualquiera. Para el detalle de proyecto se
   usan el nombre y el resumen corto que ya tiene cada proyecto. */
export function metaDeRuta(camino, proyectos = DATOS.proyectos) {
  const ruta = String(camino || "/").split("?")[0].replace(/\/$/, "") || "/";

  // ¿Sección?
  const idSeccion = Object.keys(RUTAS).find((id) => RUTAS[id] === ruta);
  if (idSeccion) {
    const m = SECCIONES[idSeccion] || HOME;
    return {
      titulo: m.titulo,
      descripcion: recortar(m.descripcion),
      canonical: `${SITIO}${ruta === "/" ? "/" : ruta}`,
      tipo: idSeccion === "inicio" ? "profile" : "website",
    };
  }

  // ¿Detalle de proyecto?
  const mp = ruta.match(/^\/proyectos\/([a-z0-9-]+)$/);
  if (mp) {
    const p = proyectos.find((x) => x.id === mp[1]);
    if (p) {
      return {
        titulo: `${p.nombre} · Proyecto de ${MARCA}`,
        descripcion: recortar(p.detalle?.resumen || p.corto),
        canonical: `${SITIO}${rutaProyecto(p.id)}`,
        tipo: "article",
      };
    }
  }

  // Ruta desconocida: no debe indexarse.
  return {
    titulo: `Página no encontrada · ${MARCA}`,
    descripcion: recortar(HOME.descripcion),
    canonical: `${SITIO}/`,
    tipo: "website",
    noIndexar: true,
  };
}
