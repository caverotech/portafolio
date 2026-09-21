/* ============================================================
   DATOS DEL PORTAFOLIO
   ------------------------------------------------------------
   TODO el contenido del sitio vive aquí: tus datos, proyectos,
   certificados, tecnologías y galería. Para actualizar el
   portafolio normalmente solo se edita este archivo.
   ============================================================ */

export const DATOS = {
  nombre: "Alexys Cavero",
  titulo: "Ingeniero de IA & Automatización",
  tituloLinea2: "Agentes · LLMs · Procesos automatizados · Estudiante de Ingeniería de Sistemas",
  descripcion:
    "Diseño y construyo agentes de IA y flujos automatizados que reemplazan trabajo manual en negocios reales: integro modelos de lenguaje, orquesto procesos de punta a punta y desarrollo la interfaz que los vuelve usables. IA que entra en producción, no demos.",
  ubicacion: "Ica, Perú",
  disponible: "Disponible para oportunidades",
  email: "ing.alexyscavero@gmail.com",
  github: "https://github.com/ingalexyscavero-design",
  linkedin: "https://www.linkedin.com/in/alexyscavero/",
  cvUrl: "/Alexys-Cavero-CV-2026.pdf",       // ← PDF en public/

  /* FOTOS — reemplaza cada ruta por tus imágenes reales.
     Si una URL falla, el sitio muestra automáticamente un degradado. */
  fotos: {
    perfil: "/Foto-2026.jpeg",   // ← TU FOTO profesional real
  },

  indicadores: [
    { valor: "9+", etiqueta: "sistemas construidos y en uso" },
    { valor: "6+", etiqueta: "modelos y plataformas de IA integrados" },
    { valor: "100%", etiqueta: "proyectos nacidos de necesidades reales" },
  ],

  // Experiencia destacada — da credibilidad inmediata en el hero
  experiencia: ["Indra", "Minsait", "Conecta Systems", "Academia Barnard", "Rafo Calderón"],

  /* Capacidades de IA — el corazón del posicionamiento.
     Se muestran en el hero como prueba concreta de qué sabes hacer. */
  capacidadesIA: [
    "Agentes de IA",
    "MCP y Skills",
    "Orquestación con n8n",
    "Automatización de procesos",
    "Integración de LLMs",
    "Subagentes en paralelo",
  ],

  sobreMi: {
    intro:
      "Construyo sistemas donde la IA deja de ser una demo y sostiene un proceso real. Junto a un compañero llevo Conecta Systems, con la que automatizamos procesos y entregamos software a negocios locales.",
    // Lado humano: por qué la carrera y qué me mueve
    motivacion:
      "Vengo del desarrollo web, y es una ventaja: no solo conecto el modelo, también construyo la interfaz por la que alguien lo usa sin manual. Lo que me mueve es ver un sistema devolverle horas a una persona.",
    // Frase/mentalidad personal
    lema: "Planifica como Monje, ejecuta como Ninja",
    lemaTexto:
      "Primero pienso con calma y estrategia; después ejecuto con foco y precisión. Claridad antes de actuar, decisión al hacerlo.",
    puntos: [
      {
        titulo: "Agentes de IA",
        texto: "Construyo asistentes que no solo responden: consultan datos, ejecutan acciones y toman decisiones dentro de límites definidos. Diseño el flujo, las herramientas que puede usar y los puntos donde debe pedir confirmación humana.",
      },
      {
        titulo: "Automatización de procesos",
        texto: "Identifico el trabajo repetitivo de un negocio y lo convierto en un flujo que corre solo: Claude dirige y n8n ejecuta, conectados por MCP contra los sistemas que antes no se hablaban entre sí.",
      },
      {
        titulo: "Integración de LLMs",
        texto: "Claude es mi centro de mando y desde ahí opero el resto por MCP: GPT o Gemini entran cuando la tarea lo pide. Extracción de información de documentos, generación de contenido y bases de conocimiento consultables, con criterio sobre costo, latencia y cuándo el modelo NO es la respuesta.",
      },
      {
        titulo: "La interfaz que lo hace usable",
        texto: "Un sistema de IA que nadie entiende no se usa. Desarrollo el frontend en React que lo vuelve operable para gente no técnica: es lo que separa un experimento de una herramienta que el cliente adopta.",
      },
    ],
  },

  tecnologias: [
    {
      categoria: "IA y LLMs",
      icono: "sparkles",
      descripcion: "Los modelos que uso a diario, cada uno para lo que hace mejor.",
      items: [
        { nombre: "GPT / OpenAI", slug: "openai", color: "FFFFFF", detalle: "Razonamiento general y extracción estructurada: cuando necesito que un texto desordenado salga como datos limpios." },
        { nombre: "Gemini", slug: "googlegemini", color: "8E75FF", detalle: "Lo multimodal: procesamiento de imagen y documentos a escala, donde el volumen y el contexto largo mandan." },
        { nombre: "Perplexity", slug: "perplexity", color: "1FB8CD", detalle: "Investigación con fuentes citadas. Para lo que hay que verificar, no para lo que hay que redactar." },
        { nombre: "NotebookLM", slug: "googlenotebooklm", color: "4285F4", detalle: "Síntesis sobre un corpus cerrado de documentación: lo uso para estudiar material técnico denso." },
        { nombre: "Higgsfield", slug: "higgsfield", color: "22D3EE", detalle: "Generación de vídeo con IA para piezas audiovisuales y material de presentación." },
      ],
    },
    {
      /* Esta categoría se despliega en árbol: Claude es la raíz y de él
         salen dos ramas (Skills y MCP). Los Agentes tienen su propia
         categoría porque son otra cosa: no una forma de usar Claude,
         sino sistemas que ejecutan solos. La UI la dibuja `ArbolClaude`. */
      categoria: "Automatizaciones y Workflows",
      icono: "settings",
      descripcion: "Claude como raíz, n8n como motor de ejecución.",
      arbol: true,
      raiz: {
        nombre: "Claude",
        slug: "claude",
        color: "D97757",
        detalle: "Mi herramienta central de trabajo. Desde aquí construyo los procedimientos y las conexiones que hacen que todo lo demás se ejecute.",
      },
      ramas: [
        {
          nombre: "Skills",
          clave: "skills",
          resumen: "Procedimientos que escribo una vez y Claude aplica siempre igual. Dejo de repetir instrucciones en cada conversación: el criterio queda documentado y versionado.",
          hijos: [
            {
              nombre: "Diseño UI/UX",
              detalle: "Mis criterios de maquetación, tipografía, color y espaciado escritos como reglas. Cada pantalla que construyo sale con la misma jerarquía visual, sin volver a decidir lo mismo desde cero.",
            },
            {
              nombre: "Propuestas y cotizaciones",
              detalle: "La estructura comercial de Conecta Systems: alcance, entregables, plazos y precio, con el tono de la marca. Lo que antes tomaba una tarde ahora sale listo para revisar.",
            },
            {
              nombre: "Revisión de código",
              detalle: "Una pasada de calidad antes de dar algo por terminado: errores de lógica, casos sin cubrir y simplificaciones. Es el filtro que me evita entregar deuda técnica.",
            },
          ],
        },
        {
          nombre: "MCP",
          clave: "mcp",
          resumen: "El protocolo que conecta a Claude con aplicaciones reales. Deja de ser un chat y pasa a operar herramientas: lee, escribe y ejecuta dentro de cada sistema.",
          hijos: [
            { nombre: "n8n", slug: "n8n", color: "EA4B71", destacado: true, detalle: "La conexión principal. Claude dirige los flujos y n8n los ejecuta contra los sistemas del negocio." },
            { nombre: "Higgsfield", slug: "higgsfield", color: "22D3EE", detalle: "Generación de vídeo pedida desde el mismo flujo, sin salir a otra herramienta." },
            { nombre: "Meta Ads", slug: "meta", color: "0467DF", detalle: "Campañas: creación, seguimiento y lectura de métricas para analizar resultados." },
            { nombre: "Supabase", slug: "supabase", color: "3FCF8E", detalle: "Consultas directas a la base para responder con datos reales del negocio." },
            { nombre: "Figma", slug: "figma", color: "F24E1E", detalle: "Lectura de diseños para pasarlos a código sin traducir cada medida a mano." },
            { nombre: "GitHub", slug: "github", color: "FFFFFF", detalle: "Repositorios, ramas y revisiones operados desde el mismo sitio donde escribo el código." },
          ],
          nota: "El protocolo es abierto: cualquier aplicación con un servidor MCP entra en el flujo, desde herramientas de diseño hasta motores de videojuego.",
        },
      ],
      items: [
        { nombre: "n8n", slug: "n8n", color: "EA4B71", detalle: "Mi motor de automatización: flujos que corren solos conectando sistemas por APIs REST y webhooks. Claude los dirige mediante MCP en lugar de seguir una rama fija de nodos." },
        { nombre: "Node.js", slug: "nodedotjs", color: "5FA04E", detalle: "Automatizaciones programadas, funciones serverless y scripts de proceso." },
        { nombre: "Python", slug: "python", color: "3776AB", detalle: "Scripting de datos y automatización; lenguaje estándar del ecosistema de IA." },
      ],
    },
    {
      /* AGENTES — categoría propia. Un agente no es un flujo con pasos
         fijos: recibe un objetivo, decide qué hacer y usa herramientas
         hasta cumplirlo. Eso es lo que se describe aquí. */
      categoria: "Agentes de IA",
      icono: "bot",
      descripcion: "Sistemas que reciben un objetivo y deciden cómo cumplirlo.",
      items: [
        {
          nombre: "Agentes con herramientas",
          slug: "",
          color: "",
          detalle: "Le doy un objetivo y un conjunto de herramientas, y el agente decide qué usar y en qué orden. No sigue un guion: evalúa el resultado de cada paso y corrige el siguiente.",
        },
        {
          nombre: "Subagentes en paralelo",
          slug: "",
          color: "",
          detalle: "Una tarea grande repartida entre varios agentes que trabajan a la vez, cada uno con su especialidad, y un coordinador que junta los resultados.",
        },
        {
          nombre: "Límites y confirmación humana",
          slug: "",
          color: "",
          detalle: "Lo que define a un agente utilizable no es lo que puede hacer, sino lo que no puede. Defino qué ejecuta solo y qué requiere que una persona apruebe antes.",
        },
        {
          nombre: "Memoria y contexto",
          slug: "",
          color: "",
          detalle: "El agente recuerda lo que ya hizo y con qué datos trabaja, para que la segunda ejecución no empiece de cero.",
        },
        {
          nombre: "Evaluación de resultados",
          slug: "",
          color: "",
          detalle: "Un agente sin forma de medir si acertó es una apuesta. Compruebo sus salidas contra casos conocidos antes de dejarlo trabajar solo.",
        },
      ],
    },
    {
      categoria: "Front-End",
      icono: "monitor",
      descripcion: "La interfaz que hace usable al sistema de IA.",
      items: [
        { nombre: "React", slug: "react", color: "61DAFB", detalle: "Mi herramienta principal de interfaz: aplicaciones reales en producción." },
        { nombre: "TypeScript", slug: "typescript", color: "3178C6", detalle: "Tipado para detectar errores antes de llegar al usuario." },
        { nombre: "JavaScript (ES6+)", slug: "javascript", color: "F7DF1E", detalle: "La base de todo: lógica, interactividad y manejo del DOM." },
        { nombre: "Tailwind CSS", slug: "tailwindcss", color: "38BDF8", detalle: "Sistema visual consistente y rápido, sin CSS muerto." },
        { nombre: "Vite", slug: "vite", color: "9499FF", detalle: "Builds instantáneos y experiencia de desarrollo moderna." },
        { nombre: "Figma", slug: "figma", color: "F24E1E", detalle: "Diseño de interfaces antes de construir." },
      ],
    },
    {
      categoria: "Back-End",
      icono: "database",
      descripcion: "Sin datos ordenados no hay IA que funcione.",
      items: [
        { nombre: "Supabase", slug: "supabase", color: "3FCF8E", detalle: "Mi backend por defecto en productos nuevos: Postgres gestionado con autenticación, storage y realtime." },
        { nombre: "SQL Server", slug: "microsoftsqlserver", color: "CC2927", detalle: "Procedimientos almacenados y trazabilidad en sistemas empresariales." },
        { nombre: "Power BI", slug: "powerbi", color: "F2C811", detalle: "Modelado y dashboards para inteligencia de negocio." },
      ],
    },
    {
      categoria: "Infraestructura",
      icono: "wrench",
      descripcion: "Llevar y mantener lo construido en producción.",
      items: [
        { nombre: "AWS", slug: "amazonwebservices", color: "FF9900", detalle: "Cómputo y almacenamiento en la nube para cargas de trabajo e integraciones." },
        { nombre: "Git / GitHub", slug: "github", color: "FFFFFF", detalle: "Control de versiones y trabajo colaborativo." },
        { nombre: "Vercel", slug: "vercel", color: "FFFFFF", detalle: "Despliegue continuo y funciones serverless en el borde." },
        { nombre: "Docker", slug: "docker", color: "2496ED", detalle: "Entornos reproducibles para desarrollo y despliegue." },
      ],
    },
  ],

  /* CERTIFICACIONES — ruta de formación 2026.

     Todas están EN CURSO. Ninguna se presenta como obtenida: cada
     credencial se marcará como completada y con su enlace al badge
     únicamente cuando exista el comprobante.

     Para marcar una como terminada:
       estado: "completada"
       enlace: "URL del badge o certificado verificable"
       fecha:  "Mes 2026"

     Campos:
       codigo      → identificador en la ficha
       nombre      → nombre oficial del curso
       institucion → quién lo emite
       plataforma  → dónde se cursa
       estado      → "en-curso" | "completada"
       fecha       → periodo o fecha de obtención
       web         → enlace oficial de la formación
       enlace      → enlace al badge/certificado (sólo si completada)
       queEs       → qué es la formación
       paraQue     → para qué sirve en mi trabajo
       impacto     → por qué le importa a un reclutador o cliente
       habilidades → lista de competencias concretas */
  certificados: [
    {
      codigo: "CERT-01",
      nombre: "Claude AI",
      institucion: "Anthropic Academy",
      plataforma: "Anthropic Academy · Skilljar",
      estado: "en-curso",
      fecha: "2026",
      web: "https://anthropic.skilljar.com/",
      enlace: "",
      marca: "claude",
      color: "D97757",
      queEs:
        "Formación oficial de Anthropic, creadora de Claude, enfocada en uso profesional de IA generativa, prompting, agentes y desarrollo e integración con Claude.",
      paraQue:
        "Profundizar en el diseño de soluciones con Claude para tareas de negocio: automatizaciones, asistentes y aplicaciones con IA.",
      impacto:
        "Refuerza un perfil de especialista en IA aplicada y automatización. Es especialmente relevante para proyectos que usen Claude, APIs y flujos empresariales.",
      habilidades: ["Prompt engineering", "Uso responsable de IA", "Diseño de flujos asistidos por IA", "Agentes", "Integración por API"],
    },
    {
      codigo: "CERT-02",
      nombre: "Introduction to Generative AI & Large Language Models",
      institucion: "Google Cloud",
      plataforma: "Google Cloud Skills Boost",
      estado: "en-curso",
      fecha: "2026",
      web: "https://www.cloudskillsboost.google/",
      enlace: "",
      marca: "googlecloud",
      color: "4285F4",
      queEs:
        "Ruta de microcursos de Google Cloud sobre IA generativa, modelos de lenguaje grandes, modelos fundacionales y principios de IA responsable.",
      paraQue:
        "Comprender los criterios de implementación de LLMs y su aplicación en productos, automatizaciones y soluciones cloud.",
      impacto:
        "Los badges de Google Cloud aportan evidencia verificable respaldada por Google, y complementan la experiencia práctica con Claude y otras herramientas.",
      habilidades: ["Fundamentos de IA generativa", "LLMs", "Modelos fundacionales", "IA responsable", "Evaluación de soluciones"],
    },
    {
      codigo: "CERT-03",
      nombre: "N8N101 — Essentials: Your First Workflows",
      institucion: "n8n Academy",
      plataforma: "n8n Academy",
      estado: "en-curso",
      fecha: "2026",
      web: "https://learn.n8n.io/",
      enlace: "",
      marca: "n8n",
      color: "EA4B71",
      queEs:
        "Curso oficial de n8n para construir workflows automatizados mediante triggers, nodos, transformaciones de datos e integraciones con APIs y servicios externos.",
      paraQue:
        "Validar la capacidad de diseñar automatizaciones operativas para ventas, soporte y administración, conectando IA, CRM, bases de datos y mensajería.",
      impacto:
        "Está alineado directamente con el perfil de especialista en automatización con IA: acredita conocimiento formal de la herramienta con la que trabajo a diario.",
      habilidades: ["Workflows end-to-end", "Webhooks y APIs", "Lógica condicional", "Transformación de datos", "Manejo de errores"],
    },
    {
      codigo: "CERT-04",
      nombre: "AI Fundamentals & Generative AI",
      institucion: "IBM",
      plataforma: "IBM SkillsBuild",
      estado: "en-curso",
      fecha: "2026",
      web: "https://skillsbuild.ibm.com/",
      enlace: "",
      marca: "ibm",
      color: "FFFFFF",
      queEs:
        "Programa de IBM sobre fundamentos de inteligencia artificial e IA generativa, con conceptos de machine learning, deep learning, ética y aplicaciones de negocio.",
      paraQue:
        "Sustentar decisiones técnicas y de negocio: cuándo aplicar IA, cómo evaluar sus riesgos y cómo implementarla de forma responsable.",
      impacto:
        "Una credencial de IBM aporta respaldo empresarial y demuestra que el perfil combina uso práctico de herramientas con comprensión conceptual de la IA.",
      habilidades: ["Machine learning", "Deep learning", "IA generativa", "Ética y gestión de riesgos", "Casos de uso por industria"],
    },
    {
      codigo: "CERT-05",
      nombre: "CS50: Introduction to Computer Science",
      institucion: "HarvardX",
      plataforma: "edX · modalidad audit",
      estado: "en-curso",
      fecha: "2026",
      web: "https://cs50.harvard.edu/x/",
      enlace: "",
      marca: "harvard",
      color: "A51C30",
      queEs:
        "Curso de Harvard sobre fundamentos de ciencias de la computación: resolución de problemas, algoritmos, estructuras de datos, programación, SQL y desarrollo web.",
      paraQue:
        "Fortalecer la base técnica para construir software y automatizaciones robustas, y entender la arquitectura de las aplicaciones donde integro IA.",
      impacto:
        "Aporta una señal académica reconocible y evidencia de formación rigurosa en fundamentos de computación.",
      habilidades: ["Pensamiento computacional", "Algoritmos", "Estructuras de datos", "C y Python", "SQL", "Desarrollo web"],
    },
  ],

  /* Cómo se complementan entre sí y la nota de honestidad.
     Van al pie de la sección de certificaciones. */
  certificadosCierre: {
    objetivo:
      "Ruta orientada a un perfil de Ingeniero de IA y Automatización: diseño de automatizaciones empresariales, flujos con IA generativa, integración de APIs y desarrollo de software para empresas.",
    complementan:
      "Anthropic y Google Cloud refuerzan IA generativa y LLMs. n8n acredita automatización de procesos e integraciones. IBM aporta los fundamentos aplicados al contexto empresarial. CS50 consolida la base de ingeniería de software.",
    transparencia:
      "Un certificado por sí solo no sustituye experiencia demostrable. Cada credencial se añadirá aquí y a LinkedIn únicamente al completarla y obtener su comprobante; lo que de verdad sostiene el perfil son los proyectos de la sección anterior.",
  },

  /* MOMENTOS — álbumes. Cada momento tiene UNA foto de portada y,
     al abrirlo, el álbum completo con el resto de fotos.

     Cada momento:
       titulo    → qué fue
       lugar     → dónde
       fecha     → cuándo (texto libre: "2023", "Ene 2025", etc.)
       categoria → filtro de arriba. Una clave de `categoriasMomentos`:
                   "trabajo" | "formacion" | "ensenanza" | "voluntariado" | "personal"
       portada   → ruta de la foto que representa el momento ("" si aún no la tienes)
       alto      → tamaño en el mosaico: "alto" | "medio" | "bajo"
       relato    → (opcional) dos o tres frases sobre el momento, se leen al abrirlo
       album     → el resto de fotos. Cada una: { foto, pie }
                   El `pie` describe la foto; aparece bajo ella en el visor.

     👉 Para añadir fotos: ponlas en public/galeria/ y escribe la ruta
        (ej. portada: "/galeria/techsummit-portada.jpg"). Mientras
        `portada` esté vacía se muestra un marco con el ícono de su
        categoría, así la sección nunca se ve rota. */
  galeria: [
    // 🎓 Formación / Eventos
    {
      titulo: "UTP Tech Summit",
      lugar: "Universidad Tecnológica del Perú · Ica",
      fecha: "2026",
      categoria: "formacion",
      portada: "",
      alto: "alto",
      relato:
        "Conferencia organizada por mi universidad con ingenieros de Google, Microsoft y Tata Consultancy Services. Escuchar a peruanos que llegaron a esas empresas cambia la escala de lo que uno cree posible desde Ica.",
      album: [
        { foto: "", pie: "Mi fotocheck de acreditación del evento" },
        { foto: "", pie: "Los ponentes en escena durante una de las charlas" },
        { foto: "", pie: "Con mi enamorada frente al letrero del Tech Summit" },
      ],
    },
    {
      titulo: "Ingeniería de Sistemas",
      lugar: "Universidad Tecnológica del Perú",
      fecha: "En curso",
      categoria: "formacion",
      portada: "",
      alto: "medio",
      album: [],
    },

    // 💼 Trabajo
    {
      titulo: "Transformación digital",
      lugar: "Indra · Minsait",
      fecha: "2025",
      categoria: "trabajo",
      portada: "",
      alto: "medio",
      album: [],
    },
    {
      titulo: "Trabajo con clientes",
      lugar: "Conecta Systems",
      fecha: "2024–2025",
      categoria: "trabajo",
      portada: "",
      alto: "alto",
      album: [],
    },

    // 🧑‍🏫 Enseñanza
    {
      titulo: "Kidsapiens · IA para niños",
      lugar: "Colegio J. C. Mariátegui",
      fecha: "2023",
      categoria: "ensenanza",
      portada: "",
      alto: "alto",
      relato:
        "Llevé inteligencia artificial y robótica básica a un aula de primaria. Explicar un modelo de lenguaje a un niño de diez años obliga a entenderlo de verdad.",
      album: [],
    },
    {
      titulo: "Charla de Inteligencia Artificial",
      lugar: "Antonia Moreno de Cáceres",
      fecha: "2023",
      categoria: "ensenanza",
      portada: "",
      alto: "medio",
      album: [],
    },
    {
      titulo: "IA y robótica básica",
      lugar: "San Francisco College",
      fecha: "2023",
      categoria: "ensenanza",
      portada: "",
      alto: "medio",
      album: [],
    },

    // ✨ Personal
    {
      titulo: "Aprendiendo, siempre",
      lugar: "Detrás del código",
      fecha: "Hoy",
      categoria: "personal",
      portada: "",
      alto: "medio",
      album: [],
    },
  ],

  /* Categorías del muro de Momentos (definen los botones de filtro).
     id debe coincidir con el campo `categoria` de cada momento de arriba. */
  categoriasMomentos: [
    { id: "trabajo", label: "Trabajo" },
    { id: "formacion", label: "Formación" },
    { id: "ensenanza", label: "Enseñanza" },
    { id: "voluntariado", label: "Voluntariado" },
    { id: "personal", label: "Personal" },
  ],

  /* EN PROCESO — la pizarra de lo que viene.
     Es la sección más honesta del sitio: lo que estoy construyendo,
     estudiando o pensando, sin prometer fechas.

     estado: "construyendo" | "estudiando" | "explorando"
       construyendo → ya tiene código o avance real
       estudiando   → formación o investigación en curso
       explorando   → idea con criterio, todavía sin empezar

     Nota: las certificaciones NO van aquí, tienen su propia sección.
     Esto es para proyectos e intereses técnicos.

     Añade, quita o reordena libremente: la sección se adapta. */
  enProceso: [
    {
      titulo: "Jarvis en mi Alexa",
      estado: "explorando",
      etiqueta: "Asistente de voz",
      texto:
        "Tengo un Echo en casa y quiero dejar de hablarle a Alexa para hablarle a algo mío: conectar un modelo de lenguaje por API y devolver la respuesta con voz sintetizada tipo Jarvis. Lo interesante no es el disfraz de voz, es el puente — que el asistente responda con mis datos y pueda disparar mis automatizaciones de n8n por voz.",
      pila: ["Alexa Skills", "API de LLM", "Síntesis de voz", "n8n"],
    },
    {
      titulo: "Biblioteca de Skills propias",
      estado: "construyendo",
      etiqueta: "Automatización",
      texto:
        "Cada procedimiento que repito acaba siendo una Skill de Claude. Estoy convirtiendo mi forma de trabajar en una biblioteca versionada: diseño, revisión de código y propuestas comerciales ya están dentro, y la lista crece con cada proyecto.",
      pila: ["Claude Skills", "MCP", "Documentación"],
    },
    {
      titulo: "GPT-6 Astra para agentes",
      estado: "estudiando",
      etiqueta: "Modelos",
      texto:
        "El nuevo modelo de OpenAI está pensado para operar un ordenador y resolver tareas de varios pasos sin que alguien apruebe cada uno. Eso toca de lleno lo que construyo: quiero medir hasta dónde llega de verdad y en qué casos conviene sobre lo que ya uso con Claude.",
      pila: ["GPT-6 Astra", "API de OpenAI", "Agentes"],
    },
  ],

  /* PROYECTOS
     categoria: "implementado" | "negocio" | "personal"
     orden: (opcional) controla el orden de aparición dentro de su categoría

     ENLACES
       detalle.demo  → URL del proyecto en vivo. Si vale "#" el botón no se muestra.
       detalle.repo  → URL del repositorio. Si vale "#" el botón no se muestra.

     IMÁGENES
       imagen                    → captura de portada (se ve a sangre y a color)
       detalle.imagenSecundaria  → (opcional) segunda captura a media página
       detalle.imagenSecundariaPie → (opcional) pie de foto de la anterior

     VÍDEO DEL RESPONSABLE (opcional)
       Cuando tengas el vídeo de la persona a cargo del proyecto, añade:

         video: {
           url:    "https://www.youtube.com/embed/ID",  // URL de EMBED, no la de compartir
           titulo: "Cómo usamos la app en ruta",
           autor:  "Nombre de la persona",
           rol:    "Jefe de ventas · Vistony",
         }

       Sin el campo `video` el bloque simplemente no aparece: la página
       no queda con un hueco vacío. */
  proyectos: [
    {
      id: "vistony-ruta-nazca",
      codigo: "PRJ-01",
      categoria: "negocio",
      nombre: "Vistony · Ruta Nazca",
      corto: "App móvil de ventas en campo con 286 clientes geocodificados, ruta optimizada por GPS y registro diario de avance.",
      problema: "Un vendedor de lubricantes recorría su ruta sin mapa, sin orden de visitas y llevando las ventas en papel.",
      resultado: "Usada a diario en campo: ruta ordenada por cercanía, catálogo digital y carga de ventas desde Excel.",
      stack: ["JavaScript", "Leaflet", "Geolocalización", "Excel"],
      gradiente: ["#1B2430", "#2E3D52"],
      imagen: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80", // mapa / ruta GPS (oscuro). ← reemplazar con captura real del proyecto
      detalle: {
        resumen:
          "Aplicación móvil (archivo único HTML, sin instalación) para un vendedor de lubricantes que cubre la ruta de Nazca: mapa con 286 clientes geocodificados, orden de visitas por GPS, catálogo de productos y seguimiento de avance diario.",
        problemaLargo:
          "El vendedor manejaba su cartera en cuadernos: direcciones imprecisas, visitas desordenadas que alargaban la jornada y cero trazabilidad de qué cliente compró qué.",
        solucion:
          "Una app que funciona offline-first en el celular: geocodifiqué los 286 clientes, ordené la ruta por proximidad GPS en tiempo real y agregué catálogo, marcado de visitas y carga de ventas históricas desde Excel.",
        arquitectura:
          "Un único archivo HTML con JavaScript vanilla: cero dependencias de servidor, funciona desde el sistema de archivos del teléfono. Leaflet para el mapa y la API de geolocalización del navegador para la posición en vivo.",
        stackDetalle: {
          frontend: ["HTML + JavaScript vanilla — máxima compatibilidad en gama media", "Leaflet — mapas interactivos open source"],
          backend: ["Sin servidor — decisión deliberada por el contexto de uso"],
          baseDatos: ["Datos embebidos + importación de Excel (SheetJS)"],
          herramientas: ["Geocodificación de 286 direcciones reales", "API de Geolocalización del navegador"],
          ia: ["Claude — limpieza y geocodificación masiva de la cartera de clientes"],
        },
        decisiones: [
          {
            titulo: "Archivo único en lugar de app instalable",
            texto: "El usuario final no es técnico y la zona tiene conectividad irregular. Un HTML autocontenido elimina instalación, actualizaciones y dependencia de internet.",
          },
          {
            titulo: "Orden de ruta por proximidad real",
            texto: "En vez de una lista fija, la app reordena los clientes según la posición GPS actual: la jornada se adapta a dónde está el vendedor en cada momento.",
          },
        ],
        impacto:
          "Jornadas de venta más cortas y ordenadas, cartera de clientes digitalizada por primera vez y datos de venta listos para análisis.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "academia-barnard",
      codigo: "PRJ-02",
      categoria: "implementado",
      nombre: "Academia Barnard",
      corto: "Sitio web institucional para una academia, desarrollado como proyecto cliente de Conecta Systems.",
      problema: "La academia no tenía presencia digital: captaba alumnos solo por recomendación y volantes.",
      resultado: "Proyecto entregado y facturado a cliente real; primer canal digital de captación de la academia.",
      stack: ["React", "Tailwind", "Netlify"],
      gradiente: ["#16202E", "#24344A"],
      imagen: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=80", // diseño web / interfaz (oscuro). ← reemplazar con captura real del proyecto
      detalle: {
        resumen:
          "Sitio institucional para una academia: oferta académica, horarios, docentes y canal de contacto directo. Uno de los primeros proyectos comerciales de Conecta Systems, entregado a un cliente real.",
        problemaLargo:
          "La academia dependía del boca a boca. Los padres no tenían dónde verificar horarios, precios ni metodología, y la competencia con presencia web captaba a los alumnos que buscaban en Google.",
        solucion:
          "Un sitio rápido y claro, pensado para el padre de familia que decide en minutos: propuesta de valor visible de inmediato, información académica organizada y botón de contacto por WhatsApp en todo momento.",
        arquitectura:
          "SPA en React con contenido estructurado en datos (fácil de actualizar sin tocar componentes), desplegada en Netlify con dominio propio.",
        stackDetalle: {
          frontend: ["React + Vite — base mantenible para futuras secciones", "Tailwind CSS — sistema visual consistente"],
          backend: ["Estático — sin necesidades dinámicas en esta fase"],
          baseDatos: ["No aplica — contenido gestionado como datos del proyecto"],
          herramientas: ["Netlify — hosting y despliegue continuo", "Git — versionado del proyecto"],
          ia: ["Claude — prototipado rápido de secciones y copywriting"],
        },
        decisiones: [
          {
            titulo: "Contenido como datos, no hardcodeado",
            texto: "Horarios y cursos viven en objetos de datos separados de la UI: el mantenimiento posterior no requiere entender React a fondo.",
          },
          {
            titulo: "WhatsApp como conversión principal",
            texto: "En el mercado local, los padres no llenan formularios: escriben. El CTA principal abre una conversación directa, no un formulario que nadie responde.",
          },
        ],
        impacto:
          "Primer proyecto facturado de Conecta Systems y primera presencia digital de la academia, con un canal de captación medible.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "academia-lubricantes",
      codigo: "PRJ-03",
      categoria: "negocio",
      nombre: "Mini-academia de Lubricantes",
      corto: "Plataforma educativa para capacitar vendedores de lubricantes: lecciones, progreso y evaluaciones.",
      problema: "Capacitar vendedores nuevos dependía de que alguien con experiencia tuviera tiempo de enseñarles.",
      resultado: "Plataforma desplegada en Netlify con contenido estructurado por niveles y seguimiento de progreso.",
      stack: ["React", "Vite", "Tailwind"],
      gradiente: ["#1E2A38", "#33465E"],
      imagen: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80", // plataforma e-learning / app (oscuro). ← reemplazar con captura real del proyecto
      detalle: {
        resumen:
          "Plataforma de microaprendizaje para el área comercial de lubricantes: lecciones cortas sobre productos y técnicas de venta, con progreso persistente y evaluaciones por módulo.",
        problemaLargo:
          "El conocimiento del producto vivía en la cabeza de los vendedores antiguos. Cada incorporación nueva implicaba semanas de acompañamiento informal y errores frente al cliente.",
        solucion:
          "Convertí el conocimiento del negocio en módulos estructurados: qué producto recomendar según el vehículo, objeciones frecuentes y práctica con evaluaciones. El vendedor avanza a su ritmo desde el celular.",
        arquitectura:
          "SPA React + Vite con persistencia local del progreso (sin necesidad de cuentas en la fase inicial), desplegada en Netlify para acceso inmediato desde cualquier dispositivo.",
        stackDetalle: {
          frontend: ["React + Vite — navegación instantánea entre lecciones", "Tailwind CSS — UI clara optimizada para móvil"],
          backend: ["Sin backend en fase 1 — reduce fricción y costo"],
          baseDatos: ["Persistencia local del progreso del alumno"],
          herramientas: ["Netlify — despliegue y acceso por URL simple"],
          ia: ["Claude — estructuración pedagógica del contenido técnico"],
        },
        decisiones: [
          {
            titulo: "Sin login en la primera fase",
            texto: "Pedir cuentas a vendedores de campo mata la adopción. El progreso se guarda en el dispositivo; la autenticación queda para cuando el volumen lo justifique.",
          },
          {
            titulo: "Lecciones de 3 minutos",
            texto: "El contenido está fragmentado para consumirse entre visitas a clientes, no en sesiones largas que nadie completa.",
          },
        ],
        impacto:
          "El conocimiento comercial dejó de depender de personas específicas: ahora es un activo digital del negocio, reutilizable con cada incorporación.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "aiverse-os",
      codigo: "PRJ-04",
      categoria: "personal",
      orden: 2,
      nombre: "AIVERSE OS · Mi sistema con IA",
      corto: "Espacio donde comparto mi forma de trabajar con la IA: mi flujo, mis herramientas y cómo las combino en el día a día.",
      problema: "Mucha gente usa IA suelta; pocos tienen un flujo de trabajo real y ordenado para sacarle provecho de verdad.",
      resultado: "Una web personal que muestra mi metodología con IA + un pipeline que me envía noticias a Telegram, filtradas a mi criterio.",
      stack: ["React", "APIs de IA", "Automatización", "Telegram"],
      gradiente: ["#141C28", "#233247"],
      imagen: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=900&q=80", // IA / flujo de trabajo (oscuro). ← reemplazar con captura real del proyecto
      detalle: {
        resumen:
          "AIVERSE OS es mi espacio personal para mostrar cómo trabajo con la Inteligencia Artificial: el flujo, las herramientas y la forma en que las combino. Es a la vez una vitrina de mi metodología y un sistema real de automatización que uso a diario. (En actualización constante.)",
        problemaLargo:
          "La IA está al alcance de todos, pero la mayoría la usa de forma desordenada. Yo quería documentar y compartir un flujo de trabajo propio y replicable: qué herramienta uso para qué, cómo las encadeno y cómo automatizo lo repetitivo, para que otros puedan aprender de mi método.",
        solucion:
          "Construí una web donde explico mi flujo de trabajo con IA paso a paso, y le sumé un sistema de automatización: en lugar de revisar noticias de tecnología a mano, conecté Gemini + búsqueda y otras APIs para que cada mañana y noche me lleguen a mi Telegram las noticias filtradas según mis intereses y mi propio algoritmo.",
        arquitectura:
          "Frontend en React para la parte de divulgación, y un flujo de automatización que orquesta APIs de IA (Gemini, búsqueda) con entrega programada vía bot de Telegram. La información llega a mí, ya no tengo que ir a buscarla.",
        stackDetalle: {
          frontend: ["React + Vite — la vitrina de mi flujo de trabajo", "Tailwind CSS — tema oscuro tipo sistema operativo"],
          backend: ["Automatización programada — ejecución en horarios definidos (mañana y noche)"],
          baseDatos: ["No requiere: la información se entrega y consume al instante"],
          herramientas: ["Bot de Telegram — recibo las noticias filtradas en mi celular", "APIs de búsqueda — alimentan el flujo de noticias"],
          ia: ["Gemini API — filtra y resume las noticias a mi criterio", "Claude — diseño del flujo de trabajo y la metodología"],
        },
        decisiones: [
          {
            titulo: "La info viene a mí, no yo a la info",
            texto: "En vez de abrir una web a revisar noticias, automaticé la entrega a Telegram en mis horarios. La tecnología se adapta a mi rutina, no al revés.",
          },
          {
            titulo: "Compartir el método, no solo el resultado",
            texto: "El valor no es 'uso IA', sino mostrar CÓMO la uso: un flujo ordenado que otros pueden entender y replicar.",
          },
        ],
        impacto:
          "Un espacio que combina divulgación (enseño mi forma de trabajar con IA) y automatización real (un asistente de noticias que trabaja para mí). Refleja cómo entiendo la IA: como una herramienta de trabajo con método, no como una moda.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "panel-hipico",
      codigo: "PRJ-05",
      categoria: "personal",
      orden: 5,
      nombre: "Panel de Análisis Hípico",
      corto: "Herramienta de análisis de carreras de caballos: estadísticas históricas y comparación de rendimiento.",
      problema: "Analizar carreras implicaba cruzar datos dispersos a mano antes de cada jornada.",
      resultado: "Herramienta de uso real que ordena la información y reduce el análisis previo de horas a minutos.",
      stack: ["React", "Vite", "Visualización de datos"],
      gradiente: ["#1C2635", "#2B3C52"],
      imagen: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80", // datos / estadísticas (oscuro). ← reemplazar con captura real del proyecto
      detalle: {
        resumen:
          "Aplicación web construida para un usuario real (un familiar aficionado a la hípica) que centraliza estadísticas de caballos, jinetes y resultados históricos para analizar carreras con datos en lugar de intuición.",
        problemaLargo:
          "El análisis previo a cada jornada era artesanal: apuntes en papel, memoria y planillas sueltas. Información valiosa se perdía y comparar rendimiento entre jornadas era casi imposible.",
        solucion:
          "Un panel que estructura el historial por caballo y jinete, calcula métricas de rendimiento y permite comparar participantes de una carrera lado a lado antes de decidir.",
        arquitectura:
          "SPA React con capa de datos normalizada (caballos, jinetes, carreras, resultados) y componentes de visualización reutilizables para las comparativas.",
        stackDetalle: {
          frontend: ["React + Vite — interacción fluida con tablas y filtros", "Visualización de datos — comparativas gráficas de rendimiento"],
          backend: ["Sin backend — datos gestionados localmente en esta fase"],
          baseDatos: ["Modelo de datos normalizado en el cliente"],
          herramientas: ["Netlify — acceso desde cualquier dispositivo"],
          ia: ["Claude — diseño del modelo de datos del dominio hípico"],
        },
        decisiones: [
          {
            titulo: "Modelar el dominio antes que la UI",
            texto: "El valor está en las relaciones caballo-jinete-carrera. Definir bien ese modelo primero hizo que las vistas comparativas fueran triviales de construir.",
          },
          {
            titulo: "Construir para un usuario real",
            texto: "Cada iteración se validó con el usuario final. Funcionalidades que parecían obvias se descartaron porque no las usaba; otras nacieron de verlo trabajar.",
          },
        ],
        impacto:
          "Práctica real de levantamiento de requerimientos con un usuario no técnico y de modelado de un dominio de datos complejo desde cero.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "rafo-calderon",
      codigo: "PRJ-06",
      categoria: "implementado",
      nombre: "Rafo Calderón · Sitio del Actor",
      corto: "Website profesional para el actor Rafo Calderón: presencia digital con foco en posicionamiento SEO y branding.",
      problema: "El actor no tenía presencia digital propia que centralizara su trayectoria y lo posicionara en búsquedas.",
      resultado: "Sitio web profesional que estructura su historial artístico y mejora su visibilidad y branding en internet.",
      stack: ["React", "Tailwind", "SEO", "Netlify"],
      gradiente: ["#172231", "#26374D"],
      imagen: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80", // escenario / actor (oscuro). ← reemplazar con captura real
      detalle: {
        resumen:
          "Plataforma web y jerarquía de contenidos para la gestión del historial artístico y el branding digital del actor Rafo Calderón. Proyecto cliente de Conecta Systems. (Más información se añadirá próximamente.)",
        problemaLargo:
          "Sin un sitio propio, la trayectoria del actor estaba dispersa en redes de terceros. No había un espacio profesional que reuniera su historial, lo posicionara en búsquedas de Google y reforzara su identidad como marca.",
        solucion:
          "Un sitio web profesional con una jerarquía de contenidos clara (trayectoria, trabajos, contacto) y trabajo de SEO técnico para que aparezca en las búsquedas relevantes. El diseño refuerza su identidad y diferencia su presencia digital.",
        arquitectura:
          "SPA en React + Tailwind con contenido estructurado, optimización SEO (metadatos, semántica, rendimiento) y despliegue en Netlify con dominio propio.",
        stackDetalle: {
          frontend: ["React + Vite — base mantenible para crecer", "Tailwind CSS — sistema visual consistente"],
          backend: ["Estático — sin necesidades dinámicas en esta fase"],
          baseDatos: ["No aplica — contenido gestionado como datos del proyecto"],
          herramientas: ["SEO técnico — metadatos, semántica y rendimiento", "Netlify — hosting y despliegue continuo"],
          ia: ["Claude — apoyo en copywriting y estructura de contenidos"],
        },
        decisiones: [
          {
            titulo: "SEO desde el primer día",
            texto: "Para un artista, ser encontrado en Google es captación directa. El sitio se construyó con estructura semántica y metadatos pensados para posicionar, no como un añadido posterior.",
          },
          {
            titulo: "El branding manda sobre la plantilla",
            texto: "En lugar de un sitio genérico, el diseño se subordina a la identidad del actor: la presencia digital refuerza su marca, no la diluye.",
          },
        ],
        impacto:
          "Fortaleció la identidad profesional del artista, logrando un posicionamiento diferenciado y una experiencia de usuario optimizada.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "kit-herramientas",
      codigo: "PRJ-07",
      categoria: "personal",
      orden: 3,
      nombre: "Web de Enseñanza de Herramientas",
      corto: "Proyecto personal donde enseño mi kit de herramientas: cómo las uso y cuál elegir según el tipo de proyecto.",
      problema: "El conocimiento de qué herramienta usar para cada proyecto suele estar disperso y es difícil de transmitir.",
      resultado: "Un espacio propio que ordena mi stack y enseña, con criterio, cómo y cuándo usar cada herramienta.",
      stack: ["React", "Vite", "Tailwind"],
      gradiente: ["#1A2432", "#2F4159"],
      imagen: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80", // código / herramientas dev (oscuro). ← reemplazar con captura real
      detalle: {
        resumen:
          "Un lado más personal: una web donde comparto mi kit de herramientas de desarrollo, cómo las uso en el día a día y cómo elegir la adecuada según el proyecto que alguien quiere construir. (Más información se añadirá próximamente.)",
        problemaLargo:
          "Cuando alguien empieza, la pregunta no es solo 'cómo se usa X', sino 'qué debería usar para lo que quiero hacer'. Ese criterio de selección rara vez está explicado en un solo lugar, ordenado y con ejemplos reales de uso.",
        solucion:
          "Una web que organiza mi stack por propósito: para cada herramienta explico qué resuelve, cómo la uso y en qué tipo de proyecto encaja. Más que tutoriales sueltos, es una guía de criterio para decidir.",
        arquitectura:
          "SPA en React + Vite con contenido estructurado como datos (cada herramienta es un objeto con su descripción, uso y casos), fácil de ampliar sin tocar componentes.",
        stackDetalle: {
          frontend: ["React + Vite — navegación instantánea entre secciones", "Tailwind CSS — UI clara y enfocada en lectura"],
          backend: ["Sin backend — contenido estático en esta fase"],
          baseDatos: ["Contenido gestionado como datos del proyecto"],
          herramientas: ["Netlify — acceso por URL simple", "Git — versionado del contenido"],
          ia: ["Claude — apoyo en estructura pedagógica del contenido"],
        },
        decisiones: [
          {
            titulo: "Enseñar criterio, no solo pasos",
            texto: "Hay miles de tutoriales de 'cómo usar X'. El valor aquí es el 'cuándo y por qué': qué herramienta elegir según el problema, que es lo que de verdad cuesta aprender solo.",
          },
          {
            titulo: "Contenido como datos",
            texto: "Cada herramienta vive en un objeto de datos. Añadir o actualizar una no requiere tocar la interfaz: el proyecto crece sin fricción.",
          },
        ],
        impacto:
          "Un espacio propio para ordenar y compartir mi forma de trabajar, que además me obliga a articular el porqué de cada decisión técnica.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "kidsapiens",
      codigo: "PRJ-08",
      categoria: "personal",
      orden: 1,
      nombre: "Kidsapiens · IA para niños",
      corto: "Taller propio de Inteligencia Artificial para niños de primaria (2023), más charlas y exposiciones de IA en colegios de Ica.",
      problema: "En 2023, con la IA recién explotando, casi nadie la acercaba a los niños ni la explicaba de forma sencilla en Ica.",
      resultado: "Taller dictado durante 2 meses + charlas en 3 colegios: divulgación temprana de IA a estudiantes y comunidad escolar.",
      stack: ["Educación", "IA", "GPT", "Robótica básica"],
      gradiente: ["#152030", "#223144"],
      imagen: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80", // educación / niños aprendiendo (oscuro). ← reemplazar con foto real de Kidsapiens
      // tipo "historia": la página de detalle usa un layout distinto (no técnico)
      tipo: "historia",
      detalle: {
        resumen:
          "En mayo de 2023, con la IA generativa recién naciendo, propuse y dicté Kidsapiens: un taller de Inteligencia Artificial para niños de 4to, 5to y 6to de primaria. Una iniciativa propia que nació de una convicción simple: la IA no debía ser un privilegio de unos pocos.",
        historia:
          "Mientras me desempeñaba como Auxiliar de primaria en el colegio José Carlos Mariátegui, vi una oportunidad que casi nadie estaba tomando: acercar la IA a los más jóvenes en el momento exacto en que el mundo apenas la descubría. Propuse el taller, lo diseñé y lo dicté los sábados durante dos meses. Más que enseñar a usar una herramienta, quería que los niños perdieran el miedo y entendieran que la tecnología también es para ellos.",
        // Las distintas sedes / experiencias de divulgación
        experiencias: [
          { lugar: "Colegio J. C. Mariátegui", rol: "Taller Kidsapiens · 2 meses", detalle: "Taller sabatino de IA para niños de primaria. Iniciativa propia como Auxiliar." },
          { lugar: "Antonia Moreno de Cáceres", rol: "Charlas de IA", detalle: "Charlas de divulgación sobre Inteligencia Artificial a la comunidad escolar." },
          { lugar: "San Francisco College", rol: "Exposición de IA y robótica", detalle: "Exposición de IA y robótica básica en uno de los colegios privados referentes de Ica." },
        ],
        // Qué me dejó (no decisiones técnicas)
        aprendizajes: [
          { titulo: "Visión temprana", texto: "Apostar por divulgar IA en 2023, antes de que fuera tendencia, fue una decisión de criterio, no de moda." },
          { titulo: "Explicar simple lo complejo", texto: "Enseñar IA a un niño de 9 años te obliga a entenderla de verdad. Hoy aplico esa claridad al hablar con clientes no técnicos." },
          { titulo: "Iniciativa y liderazgo", texto: "Nadie me pidió montar el taller: lo propuse, lo diseñé y lo ejecuté. Crear algo de cero y sostenerlo es una habilidad en sí misma." },
        ],
        impacto:
          "Kidsapiens funcionó durante dos meses con buena acogida y se convirtió en el inicio de un pequeño recorrido de divulgación de IA en Ica. Una experiencia temprana de liderazgo, comunicación y de creer que la tecnología tiene más sentido cuando se comparte.",
      },
    },
    {
      id: "bot-telegram-noticias",
      codigo: "PRJ-09",
      categoria: "personal",
      orden: 4,
      nombre: "Bot de Noticias en Telegram",
      corto: "Un bot que cada mañana y noche me envía a Telegram las noticias de tecnología filtradas según mis intereses.",
      problema: "Mantenerse al día en tecnología exige revisar muchas fuentes a mano; la información dispersa quita tiempo y enfoque.",
      resultado: "Un asistente automático que me entrega noticias relevantes a mi Telegram en mis horarios, sin que yo tenga que buscar nada.",
      stack: ["Automatización", "Gemini API", "Telegram Bot", "APIs de búsqueda"],
      gradiente: ["#1D2836", "#31435C"],
      imagen: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=900&q=80", // mensajería / notificaciones (oscuro). ← reemplazar con captura real
      detalle: {
        resumen:
          "Un bot personal de Telegram que automatiza mi consumo de noticias tecnológicas: en lugar de ir yo a buscar la información, ella viene a mí, ya filtrada y resumida, dos veces al día. (Proyecto en desarrollo.)",
        problemaLargo:
          "Quería estar al día en tecnología sin perder tiempo abriendo decenas de fuentes ni ahogarme en información irrelevante. Necesitaba algo que filtrara por mí, según lo que de verdad me interesa, y que respetara mi rutina.",
        solucion:
          "Diseñé un flujo que conecta APIs de búsqueda con Gemini para encontrar, filtrar y resumir las noticias del día según mis criterios, y las entrega a mi Telegram en dos momentos: por la mañana y por la noche. Yo solo abro el chat y leo lo que importa.",
        arquitectura:
          "Flujo de automatización programado: APIs de búsqueda alimentan a Gemini (filtra y resume), y un bot de Telegram entrega el resultado en horarios definidos. Sin interfaz que mantener: el canal es el propio Telegram.",
        stackDetalle: {
          frontend: ["Sin frontend: la 'interfaz' es el chat de Telegram"],
          backend: ["Automatización programada — ejecución mañana y noche"],
          baseDatos: ["No requiere: la información se entrega y se consume al instante"],
          herramientas: ["Telegram Bot API — entrega de mensajes", "APIs de búsqueda — fuente de las noticias"],
          ia: ["Gemini API — filtra y resume según mis intereses"],
        },
        decisiones: [
          {
            titulo: "La información viene a mí",
            texto: "En vez de abrir webs a buscar, automaticé la entrega a Telegram en mis horarios. La tecnología se adapta a mi rutina, no al revés.",
          },
          {
            titulo: "Filtrar, no acumular",
            texto: "El bot no me manda todo: usa IA para quedarse solo con lo relevante para mí. Menos ruido, más señal.",
          },
        ],
        impacto:
          "Un asistente personal que me ahorra tiempo todos los días y me mantiene informado sin esfuerzo. Práctica real de automatización con IA y APIs, aplicable a cualquier flujo de información de un negocio.",
        demo: "#",
        repo: "#",
      },
    },
  ],
};

// Categorías para agrupar y filtrar los proyectos
export const CATEGORIAS = [
  { id: "implementado", titulo: "Clientes reales", nota: "Proyectos entregados y facturados a clientes reales." },
  { id: "negocio", titulo: "Proyectos aplicados", nota: "Trabajos profesionales para terceros: resuelven un problema real de alguien." },
  { id: "personal", titulo: "Proyectos personales", nota: "Iniciativas propias para explorar, divulgar y dominar nuevas tecnologías." },
];
