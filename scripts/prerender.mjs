/* ============================================================
   PRERENDERIZADO — un HTML real por ruta
   ------------------------------------------------------------
   El sitio solo mostraba contenido con JavaScript: el HTML servido
   traía un <div id="root"> vacío y un <noscript> de respaldo. Un
   rastreador que no ejecute JS —o una vista previa de WhatsApp o
   LinkedIn— no veía nada del contenido real.

   Este script corre DESPUÉS de `vite build` y, para cada ruta,
   escribe un index.html con:

     · su propio <title>, description, canonical y og:*
     · el contenido de la sección como HTML estático dentro de #root

   POR QUÉ NO vite-react-ssg NI vite-plugin-prerender
   El primero exige migrar a su propio router y reestructurar la
   entrada de la app; el segundo está sin mantener y arrastra una
   copia de Puppeteer (~300 MB). Aquí se usa `react-dom/server`, que
   ya viene con React: cero dependencias nuevas.

   LÍMITE ACEPTADO, y es importante entenderlo
   React se renderiza en Node, donde no hay `window` ni `document`.
   Los componentes que dependen del navegador (el cursor propio, las
   animaciones Lottie, los observers de scroll) no se pintan aquí:
   aparecen al hidratarse. Lo que sí queda en el HTML es el texto, los
   encabezados, los enlaces y las imágenes — que es exactamente lo que
   Google y las vistas previas necesitan leer.
   ============================================================ */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(RAIZ, "dist");

/* El HTML que dejó Vite, con los <script> y <link> ya inyectados. */
const PLANTILLA = fs.readFileSync(path.join(DIST, "index.html"), "utf8");

/* Reemplaza el contenido de una etiqueta <title>. */
function conTitulo(html, titulo) {
  return html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapar(titulo)}</title>`);
}

/* Reemplaza el atributo de una meta/link ya presente; si no existe,
   lo añade antes de </head>. */
function conAtributo(html, selectorRe, atributo, valor, etiquetaSiFalta) {
  const m = html.match(selectorRe);
  if (m) {
    const etiqueta = m[0];
    const re = new RegExp(`(${atributo}=")([^"]*)(")`);
    const nueva = etiqueta.match(re)
      ? etiqueta.replace(re, `$1${escapar(valor)}$3`)
      : etiqueta.replace(/\/?>$/, ` ${atributo}="${escapar(valor)}">`);
    return html.replace(etiqueta, nueva);
  }
  if (!etiquetaSiFalta) return html;
  return html.replace("</head>", `  ${etiquetaSiFalta}\n  </head>`);
}

function escapar(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* Aplica los metadatos de una ruta a la plantilla. */
function aplicarMeta(html, meta) {
  let out = conTitulo(html, meta.titulo);
  out = conAtributo(out, /<meta\s+name="description"[^>]*>/, "content", meta.descripcion);
  out = conAtributo(out, /<link\s+rel="canonical"[^>]*>/, "href", meta.canonical);
  out = conAtributo(out, /<meta\s+property="og:url"[^>]*>/, "content", meta.canonical);
  out = conAtributo(out, /<meta\s+property="og:title"[^>]*>/, "content", meta.titulo);
  out = conAtributo(out, /<meta\s+property="og:description"[^>]*>/, "content", meta.descripcion);
  out = conAtributo(out, /<meta\s+property="og:type"[^>]*>/, "content", meta.tipo);
  out = conAtributo(out, /<meta\s+name="twitter:title"[^>]*>/, "content", meta.titulo);
  out = conAtributo(out, /<meta\s+name="twitter:description"[^>]*>/, "content", meta.descripcion);
  out = conAtributo(
    out,
    /<meta\s+name="robots"[^>]*>/,
    "content",
    meta.noIndexar ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1"
  );
  return out;
}

/* Inserta el HTML renderizado dentro de #root, conservando el
   <noscript> que ya existía como respaldo. */
function conContenido(html, cuerpo) {
  return html.replace(
    /(<div id="root">)([\s\S]*?)(<\/div>)/,
    (_, ini, dentro, fin) => `${ini}${cuerpo}${dentro}${fin}`
  );
}

async function main() {
  /* Se importa el build de servidor, generado aparte (ver
     package.json). En Windows hace falta pathToFileURL: un import()
     dinámico rechaza una ruta tipo "C:\..." porque lee la letra de
     unidad como un esquema de URL desconocido. */
  const modulo = await import(
    pathToFileURL(path.join(DIST, "server", "entrada-servidor.js")).href
  );
  const { render, todasLasRutas } = modulo;

  const rutas = todasLasRutas();
  let escritas = 0;
  const fallos = [];

  for (const ruta of rutas) {
    try {
      const { html: cuerpo, meta } = render(ruta);
      let doc = aplicarMeta(PLANTILLA, meta);
      doc = conContenido(doc, cuerpo);

      // "/" es dist/index.html; "/x" es dist/x/index.html, que es lo
      // que Vercel sirve para esa URL con cleanUrls.
      const destino =
        ruta === "/"
          ? path.join(DIST, "index.html")
          : path.join(DIST, ruta.replace(/^\//, ""), "index.html");

      fs.mkdirSync(path.dirname(destino), { recursive: true });
      fs.writeFileSync(destino, doc, "utf8");
      escritas += 1;
    } catch (e) {
      fallos.push(`${ruta} — ${e.message}`);
    }
  }

  // Un 404 estático para que Vercel lo sirva en rutas desconocidas.
  try {
    const { html: cuerpo, meta } = render("/__404__");
    let doc = aplicarMeta(PLANTILLA, meta);
    doc = conContenido(doc, cuerpo);
    fs.writeFileSync(path.join(DIST, "404.html"), doc, "utf8");
    escritas += 1;
  } catch (e) {
    fallos.push(`404.html — ${e.message}`);
  }

  console.log(`prerender: ${escritas} paginas escritas`);
  if (fallos.length) {
    console.error("prerender: fallos\n  " + fallos.join("\n  "));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("prerender: error fatal", e);
  process.exit(1);
});
