import {
  GraduationCap,
  MapPin,
  Globe,
  BookMarked,
  SmileIcon,
  University,
  CodeSquare,
  Smartphone,
  SwatchBook,
  BarChart,
  Wrench,
  Plug,
  MessageCircle,
  Cloud,
  Layout,
} from 'lucide-react';

export const DEFAULT_PATH =
  process.env.NODE_ENV === 'production'
    ? 'https://calcagni-gabriel.vercel.app/auth/callback'
    : `http://${'localhost:3000' || 'localhost:3001'}/auth/callback`;

export const wap = {
  number: '+5492665290020',
  message: encodeURIComponent(
    '👋 ¡Hola, Gabriel! Me interesa conocer más sobre tus servicios. ¿Podrías contactarme para ayudarme con mi proyecto? 😊...Gracias!'
  ),
};

export const itemsSection_4 = [
  {
    name: 'San Luis',
    icon: <MapPin className="w-4 h-4 mr-1 text-violet-400" />,
  },
  {
    name: 'Front End Dev',
    icon: <GraduationCap className="w-4 h-4 mr-1 text-violet-400" />,
  },
  {
    name: 'English',
    icon: <Globe className="w-4 h-4 mr-1 text-violet-400" />,
  },
  {
    name: 'UTN-FRSR',
    icon: (
      <University className="w-4 h-4 mr-1 text-violet-400 -translate-y-[1px]" />
    ),
  },
  {
    name: 'Estudiando',
    icon: <BookMarked className="w-4 h-4 mr-1 text-violet-400" />,
  },
  {
    name: 'Buen Chico',
    icon: <SmileIcon className="w-4 h-4 mr-1 text-violet-400" />,
  },
];

export const services = [
  {
    name: 'Desarrollo Web',
    icon: <CodeSquare className="w-5 h-5" />,
  },
  {
    name: 'Diseño Web',
    icon: <SwatchBook className="w-5 h-5" />,
  },
  {
    name: 'Diseño Aplicación Móvil',
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    name: 'Optimización de SEO',
    icon: <BarChart className="w-5 h-5" />,
  },
  {
    name: 'Mantenimiento de Aplicaciones',
    icon: <Wrench className="w-5 h-5" />,
  },
  {
    name: 'Integración de APIs',
    icon: <Plug className="w-5 h-5" />,
  },
  {
    name: 'Consultoría Técnica',
    icon: <MessageCircle className="w-5 h-5" />,
  },
  {
    name: 'Despliegue en la Nube',
    icon: <Cloud className="w-5 h-5" />,
  },
  {
    name: 'Diseño UI/UX',
    icon: <Layout className="w-5 h-5" />,
  },
];

export const worksProyects = [
  {
    name: 'NeoWiFi',
    url: 'https://neo-wifi.vercel.app/',
    image: '/Portada-Neo-WiFi.png',
    type: 'Información WiFi',
    repoName: 'neo-wifi',
    description:
      'Neo WiFi es una aplicación innovadora diseñada específicamente para los habitantes de San Luis y Córdoba, Argentina. Su objetivo principal es simplificar la configuración de conexiones WiFi mediante una localización precisa de antenas cercanas.',
    tech: [
      'typescript',
      'redux',
      'css',
      'nodemailer',
      'talwindcss',
      'nextjs15',
    ],
  },
  {
    name: 'Neo-WiFi App',
    url: 'https://github.com/solidsnk86/neo-wifi/releases/tag/v1.1.3',
    image: '/Portada-NeoWiFi-Electron-App.png',
    type: 'Desktop App',
    repoName: 'neo-wifi',
    description:
      'NeoWiFi App es una aplicación para instalar en la pc (Windows) 64x para automatizar la conectividad WiFi en sistemas TP-LINK en las redes del Gobierno de la Provincia de San Luis.',
    tech: [
      'typescript',
      'javascript',
      'electron.js',
      'ipc-renderer',
      'talwindcss',
      'nextjs15',
    ],
  },
  {
    name: 'Solid Geolocation',
    url: 'https://solid-geolocation.vercel.app/',
    image: '/solid-geolocation-api.png',
    type: 'Geolocation API',
    repoName: 'geo-api',
    description:
      'Solid-geolocation es una api para consultar los datos de ip del usaurio, así como también ciudad, país, código postal, etc.',
    tech: ['javascript', 'nodejs', 'express', 'cors', 'rate-limiter'],
  },
  {
    name: 'Clean Indent',
    url: 'https://www.npmjs.com/package/clean-indent',
    image: '/clean-indent-screen-shot.png',
    type: 'Paquete NPM',
    repoName: 'clean-indent',
    description:
      'Clean-indent es una utilidad ligera y eficiente para limpiar las indentaciones de cadenas de código. Ideal para formatear textos y asegurarte de que no queden espacios innecesarios al inicio o al final de cada línea. Ideal para presentaciones de código dentro de los elementos <pre>.',
    tech: ['typescript', 'npm'],
  },
  {
    name: 'Web LLM IA',
    url: 'https://solidsnk86.github.io/web-Llm-local/',
    image: '/Portada-Web-LLM-AI.webp',
    type: 'Chat GPT',
    repoName: 'web-llm-local',
    description:
      'Neo WiFi es una aplicación innovadora diseñada específicamente para los habitantes de San Luis y Córdoba, Argentina. Su objetivo principal es simplificar la configuración de conexiones WiFi mediante una localización precisa de antenas cercanas.',
    tech: [
      'typescript',
      'redux',
      'css',
      'nodemailer',
      'talwindcss',
      'nextjs15',
    ],
  },
  {
    name: 'CV Gerardo',
    url: 'https://cv-gec.vercel.app/',
    image: '/Portada-CV-Gerardo.png',
    type: 'Portfolio',
    repoName: 'cv-gec',
    description:
      'Un currículum minimalista diseñado para la web, con la opción de imprimir o descargar en formato PDF. Este currículum es completamente editable directamente desde Google Sheets.',
    tech: [
      'typescript',
      'css',
      'talwindcss',
      'nextjs14',
      'supabase',
      'postgresql',
    ],
  },
];

export const footerRoutes = [
  { name: 'Inicio', link: '/' },
  { name: 'Proyectos', link: '/projects' },
  { name: 'Github-stats', link: '/github-stats' },
  { name: '404', link: '/404' },
];
