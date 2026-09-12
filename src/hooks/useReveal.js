import { useState, useEffect, useRef } from "react";

/* ============================================================
   MOTION — hooks del sistema de movimiento
   ------------------------------------------------------------
   Todo el movimiento del sitio nace de aquí. Sin librerías:
   IntersectionObserver + rAF animan sólo `transform` y `opacity`
   (propiedades compuestas en GPU, sin reflow).

   Cada hook respeta `prefers-reduced-motion` devolviendo el
   estado final de inmediato, no una animación acelerada.
   ============================================================ */

// ¿El usuario pidió reducir el movimiento?
export const movReducido = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ¿Dispositivo con mouse real? (gobierna hover y cursor propio)
export const punteroFino = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches;

/* useReveal — revela un elemento al entrar en pantalla.
   `unaVez=false` permite que se oculte al salir (para storytelling). */
export function useReveal({ umbral = 0.15, margen = "0px 0px -8% 0px", unaVez = true } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (movReducido()) { setVisible(true); return; }
    const nodo = ref.current;
    if (!nodo) return;

    // Red de seguridad: si IntersectionObserver no existe (o falla), el
    // contenido se muestra en lugar de quedarse invisible para siempre.
    if (typeof IntersectionObserver === "undefined") { setVisible(true); return; }

    // Si ya está dentro (o por encima) del viewport al montar, revela sin
    // esperar un evento de scroll que quizá no llegue: al navegar por
    // secciones el elemento puede aparecer ya en pantalla.
    const caja = nodo.getBoundingClientRect();
    if (caja.top < (window.innerHeight || 0) && caja.bottom > 0) {
      setVisible(true);
      if (unaVez) return;
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          if (unaVez) obs.disconnect();
        } else if (!unaVez) {
          setVisible(false);
        }
      },
      { threshold: umbral, rootMargin: margen }
    );
    obs.observe(nodo);
    return () => obs.disconnect();
  }, [umbral, margen, unaVez]);

  return [ref, visible];
}

/* useProgresoScroll — avance 0→1 de un elemento cruzando la pantalla.
   Es la base del parallax y del sticky storytelling. Lee el layout
   dentro de rAF y nunca escribe estilos aquí: sólo devuelve el número. */
export function useProgresoScroll() {
  const ref = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (movReducido()) return;
    const nodo = ref.current;
    if (!nodo) return;

    let raf = null;
    const medir = () => {
      raf = null;
      const r = nodo.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 cuando el borde superior toca el pie de pantalla; 1 al salir por arriba
      const bruto = 1 - (r.top + r.height) / (vh + r.height);
      setP(Math.min(Math.max(bruto, 0), 1));
    };
    const alScroll = () => { if (!raf) raf = requestAnimationFrame(medir); };

    medir();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
    };
  }, []);

  return [ref, p];
}

/* useSecuenciaEntrada — reloj de la narrativa del hero.
   Devuelve el paso alcanzado; cada capa aparece cuando le toca.
   Con movimiento reducido entrega el último paso al instante. */
export function useSecuenciaEntrada(pasos = 6, intervalo = 130, retardoInicial = 120) {
  const [paso, setPaso] = useState(() => (movReducido() ? pasos : 0));

  useEffect(() => {
    if (movReducido()) return;
    const timers = [];
    for (let i = 1; i <= pasos; i++) {
      timers.push(setTimeout(() => setPaso(i), retardoInicial + i * intervalo));
    }
    return () => timers.forEach(clearTimeout);
  }, [pasos, intervalo, retardoInicial]);

  return paso;
}

/* useRatonSuave — posición del puntero normalizada (-1..1) y suavizada.
   Alimenta la luz ambiental y el paralaje del hero. Inactivo en táctil. */
export function useRatonSuave(inercia = 0.08) {
  const pos = useRef({ x: 0, y: 0 });
  const [suave, setSuave] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (movReducido() || !punteroFino()) return;
    let raf;
    const alMover = (e) => {
      pos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    const bucle = () => {
      setSuave((s) => {
        const dx = pos.current.x - s.x;
        const dy = pos.current.y - s.y;
        // Evita re-renders cuando ya está en su sitio
        if (Math.abs(dx) < 0.0008 && Math.abs(dy) < 0.0008) return s;
        return { x: s.x + dx * inercia, y: s.y + dy * inercia };
      });
      raf = requestAnimationFrame(bucle);
    };
    window.addEventListener("mousemove", alMover, { passive: true });
    raf = requestAnimationFrame(bucle);
    return () => {
      window.removeEventListener("mousemove", alMover);
      cancelAnimationFrame(raf);
    };
  }, [inercia]);

  return suave;
}
