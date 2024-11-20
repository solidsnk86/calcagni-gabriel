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
} from "lucide-react";

export const DEFAULT_PATH =
  process.env.NODE_ENV === "production"
    ? "https://personal-portfolio-mgc.vercel.app/auth/callback"
    : "http://localhost:3000/auth/callback";

export const api = {
  url: "https://geolocation.microlink.io",
  options: {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  },
};

export const wap = {
  number: "+5492665290020",
  message: encodeURIComponent(
    "👋 ¡Hola, Gabriel! Me interesa conocer más sobre tus servicios. ¿Podrías contarme cómo podrías ayudarme con mi proyecto? 😊"
  ),
};

export const itemsSection_4 = [
  {
    name: "San Luis",
    icon: <MapPin className="w-4 h-4 mr-1 text-violet-400" />,
  },
  {
    name: "Front End Dev",
    icon: <GraduationCap className="w-4 h-4 mr-1 text-violet-400" />,
  },
  {
    name: "English",
    icon: <Globe className="w-4 h-4 mr-1 text-violet-400" />,
  },
  {
    name: "UTN-FRSR",
    icon: (
      <University className="w-4 h-4 mr-1 text-violet-400 -translate-y-[1px]" />
    ),
  },
  {
    name: "Estudiando",
    icon: <BookMarked className="w-4 h-4 mr-1 text-violet-400" />,
  },
  {
    name: "Buen Chico",
    icon: <SmileIcon className="w-4 h-4 mr-1 text-violet-400" />,
  },
];

export const worksProyects = [
  {
    name: "ChismeApp",
    url: "https://gossip-app.vercel.app/",
    image: "/Portada-ChismeApp.png",
    type: "Social",
  },
  {
    name: "SolidSnk86",
    url: "https://portfolio-mgc.vercel.app/",
    image: "/Portada-Portfolio-Solid.png",
    type: "Portfolio",
  },
  {
    name: "NeoTecs",
    url: "https://neotecs.vercel.app/",
    image: "/Portada-NeoTecs.png",
    type: "Documentación Web",
  },
  {
    name: "Web LLM IA",
    url: "https://solidsnk86.github.io/web-Llm-local/",
    image: "/Portada-Web-LLM-AI.png",
    type: "GPT Chat",
  },
  {
    name: "Gerardo",
    url: "https://cv-gec.vercel.app/",
    image: "/Portada-CV-Gerardo.png",
    type: "Portfolio",
  },
  {
    name: "Facturador Web",
    url: "https://solidsnk86.github.io/formularioWeb/",
    image: "/Portada-Formulario-Web.png",
    type: "Facturación",
  },
];

export const services = [
  {
    name: "Desarrollo Web",
    icon: <CodeSquare className="w-5 h-5" />,
  },
  {
    name: "Diseño Web",
    icon: <SwatchBook className="w-5 h-5" />,
  },
  {
    name: "Diseño Aplicación Móvil",
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    name: "Optimización de SEO",
    icon: <BarChart className="w-5 h-5" />,
  },
  {
    name: "Mantenimiento de Aplicaciones",
    icon: <Wrench className="w-5 h-5" />,
  },
  {
    name: "Integración de APIs",
    icon: <Plug className="w-5 h-5" />,
  },
  {
    name: "Consultoría Técnica",
    icon: <MessageCircle className="w-5 h-5" />,
  },
  {
    name: "Despliegue en la Nube",
    icon: <Cloud className="w-5 h-5" />,
  },
  {
    name: "Diseño UI/UX",
    icon: <Layout className="w-5 h-5" />,
  },
];

export const photosImg = [
  { link: "/photos/IMG_20211112_140629341.webp" },
  { link: "/photos/IMG_20220402_194523982.webp" },
  { link: "/photos/IMG_20220417_130500956.webp" },
  { link: "/photos/IMG_20230111_185210271.webp" },
  { link: "/photos/PXL_20221129_055945143.NIGHT.webp" },
  { link: "/photos/PXL_20230111_215448841.NIGHT.webp" },
];

export const footerRoutes = [
  { name: "Inicio", link: "/" },
  { name: "Trabajos", link: "/works" },
  { name: "Comentar", link: "/comments" },
  { name: "404", link: "/404" },
];
