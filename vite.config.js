import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/* `isSsrBuild` distingue el build de cliente del de servidor (el que
   alimenta el prerenderizado). Importa: en SSR React es un módulo
   externo, así que intentar meterlo en manualChunks rompe el build. */
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  server: { port: 8080, host: true },

  build: {
    /* El bundle salía en un único archivo de ~665 KB, así que el
       navegador tenía que descargarlo entero antes de pintar nada.
       Separarlo permite que el chunk de React se sirva desde caché
       entre despliegues (su hash no cambia al editar el contenido) y
       que la animación Lottie, que solo aparece en Contacto, no
       bloquee la primera pintura. */
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            /* Lottie no va aquí: se importa con lazy() en App.jsx, así
               que Rollup ya le da su propio chunk y no se descarga hasta
               abrir Contacto. Declararlo también aquí lo devolvería al
               grupo de carga inicial. */
            manualChunks: {
              react: ["react", "react-dom"],
              iconos: ["lucide-react"],
            },
          },
        },
    /* Avisa a partir de 300 KB por chunk: el aviso por defecto (500)
       dejaba pasar el bundle monolítico sin llamar la atención. */
    chunkSizeWarningLimit: 300,
  },
}));
