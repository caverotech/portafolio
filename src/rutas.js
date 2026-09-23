/* ============================================================
   RUTAS — la URL como fuente de verdad de la navegación
   ------------------------------------------------------------
   El sitio navegaba solo con estado de React: la URL era siempre
   "/" y las secciones se intercambiaban en memoria. Eso rompía
   tres cosas a la vez:

     · /proyectos daba 404 (la ruta no existía en ninguna parte)
     · no se podía enlazar ni compartir una sección concreta
     · Google veía un único documento, imposible de posicionar
       por secciones

   Aquí vive el mapa ruta → sección, en un módulo aparte porque lo
   consumen tres sitios: la app (para navegar), el prerenderizador
   (para saber qué HTML generar) y el generador de sitemap.

   NO se usa react-router a propósito: con secciones planas y una
   vista de detalle, la History API nativa hace lo mismo sin sumar
   dependencia ni reescribir los componentes de navegación.
   ============================================================ */

/* Ruta pública de cada sección. La clave es el id que ya usaba
   `vista`, así que nada del resto de la app cambia de contrato.
   "inicio" vive en la raíz: es la portada. */
export const RUTAS = {
  inicio: "/",
  "sobre-mi": "/sobre-mi",
  tecnologias: "/tecnologias",
  certificados: "/certificados",
  proyectos: "/proyectos",
  "en-proceso": "/en-proceso",
  galeria: "/momentos",
  contacto: "/contacto",
};

/* El detalle de un proyecto: /proyectos/<id> */
export const rutaProyecto = (id) => `/proyectos/${id}`;

/* Inverso de RUTAS, para resolver una URL entrante. */
const POR_RUTA = Object.fromEntries(
  Object.entries(RUTAS).map(([id, ruta]) => [ruta, id])
);

/* Normaliza: quita la barra final y la query, y pasa a minúsculas.
   "/Proyectos/" y "/proyectos?x=1" llevan al mismo sitio. */
function limpiar(camino) {
  const sinQuery = String(camino || "/").split("?")[0].split("#")[0];
  const bajo = sinQuery.toLowerCase();
  if (bajo.length > 1 && bajo.endsWith("/")) return bajo.slice(0, -1);
  return bajo || "/";
}

/* Resuelve una URL a un estado de vista.

   Devuelve siempre un objeto con la misma forma que usaba `vista`,
   más `encontrada`: false significa que la URL no corresponde a
   nada, y quien llame decide si mostrar un 404. Nunca lanza. */
export function resolverRuta(camino, proyectos = []) {
  const ruta = limpiar(camino);

  const idSeccion = POR_RUTA[ruta];
  if (idSeccion) return { pagina: "seccion", id: idSeccion, encontrada: true };

  // Detalle de proyecto: /proyectos/<id>
  const m = ruta.match(/^\/proyectos\/([a-z0-9-]+)$/);
  if (m) {
    const existe = proyectos.some((p) => p.id === m[1]);
    return existe
      ? { pagina: "proyecto", id: m[1], encontrada: true }
      : { pagina: "404", id: null, encontrada: false };
  }

  return { pagina: "404", id: null, encontrada: false };
}

/* Ruta que corresponde a un estado de vista (para escribir la URL). */
export function rutaDeVista(vista) {
  if (!vista) return "/";
  if (vista.pagina === "proyecto") return rutaProyecto(vista.id);
  return RUTAS[vista.id] || "/";
}

/* Rutas a prerenderizar y a listar en el sitemap. Se calcula desde
   el mismo mapa, así que añadir una sección no obliga a recordar
   actualizar tres archivos. */
export function todasLasRutas(proyectos = []) {
  return [...Object.values(RUTAS), ...proyectos.map((p) => rutaProyecto(p.id))];
}
