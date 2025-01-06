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

export const projects = [
  {
    name: 'Portfolio Personal',
    img: '/Portada-Portfolio-Solid.png',
  },
  {
    name: 'NeoTecs',
    img: '/Portada-NeoTecs.png',
  },
  {
    name: 'Web LLM IA',
    img: '/Portada-Web-LLM-AI.png',
  },
  {
    name: 'ChismeApp',
    img: '/Portada-ChismeApp.png',
  },
  {
    name: 'Facturador Web',
    img: '/Portada-Formulario-Web.png',
  },
  {
    name: 'Portfolio Gerardo',
    img: '/Portada-CV-Gerardo.png',
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
    name: 'ChismeApp',
    url: 'https://gossip-app.vercel.app/',
    image: '/Portada-ChismeApp.png',
    type: 'Social',
    repoName: 'gossip-app',
  },
  {
    name: 'SolidSnk86',
    url: 'https://portfolio-mgc.vercel.app/',
    image: '/Portada-Portfolio-Solid.png',
    type: 'Portfolio',
    repoName: 'portfolioweb',
  },
  {
    name: 'NeoTecs',
    url: 'https://neotecs.vercel.app/',
    image: '/Portada-NeoTecs.png',
    type: 'Documentación Web',
    repoName: 'neotecs',
  },
  {
    name: 'Web LLM IA',
    url: 'https://solidsnk86.github.io/web-Llm-local/',
    image: '/Portada-Web-LLM-AI.png',
    type: 'Chat GPT',
    repoName: 'web-llm-local',
  },
  {
    name: 'CV Gerardo',
    url: 'https://cv-gec.vercel.app/',
    image: '/Portada-CV-Gerardo.png',
    type: 'Portfolio',
    repoName: 'cv-gec',
  },
  {
    name: 'Facturador Web',
    url: 'https://solidsnk86.github.io/formularioWeb/',
    image: '/Portada-Formulario-Web.png',
    type: 'Facturación',
    repoName: 'formularioweb',
  },
];

export const footerRoutes = [
  { name: 'Inicio', link: '/' },
  { name: 'Proyectos', link: '/projects' },
  { name: 'Comentar', link: '/comments' },
  { name: '404', link: '/404' },
];
