/* ============================================================
   ENTRADA DE SERVIDOR — para el prerenderizado
   ------------------------------------------------------------
   Se compila aparte (vite build --ssr) y la consume
   scripts/prerender.mjs. Renderiza la app a HTML en Node, sin
   navegador, para que cada ruta tenga contenido real en su
   index.html.

   `rutaInicial` sustituye a window.location: en Node no existe.
   ============================================================ */

import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { todasLasRutas as rutasDelMapa } from "./rutas";
import { metaDeRuta } from "./meta";
import { DATOS } from "./data/portafolio";

export function todasLasRutas() {
  return rutasDelMapa(DATOS.proyectos);
}

export function render(ruta) {
  const meta = metaDeRuta(ruta === "/__404__" ? "/ruta-inexistente" : ruta);

  let html = "";
  try {
    html = renderToString(<App rutaInicial={ruta === "/__404__" ? "/__404__" : ruta} />);
  } catch (e) {
    /* Si un componente depende del navegador de forma que no se puede
       resolver en Node, no se rompe el build entero: esa ruta queda
       con el <noscript> de respaldo y el error se informa. Es mejor
       una página con metadatos correctos que un build fallido. */
    console.error(`  aviso: ${ruta} no se pudo renderizar en servidor — ${e.message}`);
    html = "";
  }

  return { html, meta };
}
