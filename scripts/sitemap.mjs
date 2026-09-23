/* ============================================================
   SITEMAP — generado desde el mapa de rutas
   ------------------------------------------------------------
   El sitemap anterior estaba escrito a mano y declaraba una sola
   URL (la raíz), porque era la única que existía. Ahora hay 19, y
   mantenerlas a mano se desincronizaría en la primera sección nueva.

   Se genera después del prerenderizado, leyendo el mismo
   src/rutas.js que usa la app. Añadir una sección actualiza la
   navegación, el prerenderizado y el sitemap de una vez.

   El sitemap de imágenes (public/sitemap-images.xml) NO se toca:
   está escrito a mano porque depende de qué fotos reales existen,
   y eso no se puede deducir del código.
   ============================================================ */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(RAIZ, "dist");
const SITIO = "https://www.caverotech.com";

/* Prioridad y frecuencia por tipo de ruta. La portada manda; las
   secciones que cambian seguido (proyectos, en proceso) se declaran
   más frecuentes que las estables. */
function pesoDe(ruta) {
  if (ruta === "/") return { prioridad: "1.0", frecuencia: "weekly" };
  if (ruta === "/proyectos") return { prioridad: "0.9", frecuencia: "weekly" };
  if (ruta.startsWith("/proyectos/")) return { prioridad: "0.8", frecuencia: "monthly" };
  if (ruta === "/en-proceso") return { prioridad: "0.7", frecuencia: "weekly" };
  if (ruta === "/contacto") return { prioridad: "0.8", frecuencia: "monthly" };
  return { prioridad: "0.7", frecuencia: "monthly" };
}

async function main() {
  const { todasLasRutas } = await import(
    pathToFileURL(path.join(DIST, "server", "entrada-servidor.js")).href
  );

  const hoy = new Date().toISOString().slice(0, 10);
  const rutas = todasLasRutas();

  const entradas = rutas
    .map((ruta) => {
      const { prioridad, frecuencia } = pesoDe(ruta);
      return [
        "  <url>",
        `    <loc>${SITIO}${ruta}</loc>`,
        `    <lastmod>${hoy}</lastmod>`,
        `    <changefreq>${frecuencia}</changefreq>`,
        `    <priority>${prioridad}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generado por scripts/sitemap.mjs desde src/rutas.js. No editar a mano. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entradas}
</urlset>
`;

  fs.writeFileSync(path.join(DIST, "sitemap.xml"), xml, "utf8");
  console.log(`sitemap: ${rutas.length} URLs`);
}

main().catch((e) => {
  console.error("sitemap: error", e);
  process.exit(1);
});
