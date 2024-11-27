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

export const projects = [
  {
    name: "Portfolio Personal",
    img: "/Portada-Portfolio-Solid.png",
  },
  {
    name: "NeoTecs",
    img: "/Portada-NeoTecs.png",
  },
  {
    name: "Web LLM IA",
    img: "/Portada-Web-LLM-AI.png",
  },
  {
    name: "ChismeApp",
    img: "/Portada-ChismeApp.png",
  },
  {
    name: "Facturador Web",
    img: "/Portada-Formulario-Web.png",
  },
  {
    name: "Portfolio Gerardo",
    img: "/Portada-CV-Gerardo.png",
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
  {
    link: "/photos/IMG_20211112_140629341.webp",
    name: "El Filo Merlo, San Luis 🇦🇷",
  },
  {
    link: "/photos/IMG_20220402_194523982.webp",
    name: "Dique San Felipe Tilisarao, San Luis 🇦🇷",
  },
  {
    link: "/photos/IMG_20220417_130500956.webp",
    name: "Sierra de las Quijadas, San Luis 🇦🇷",
  },
  {
    link: "/photos/IMG_20230111_185210271.webp",
    name: "Carpintería Merlo, San Luis 🇦🇷",
  },
  {
    link: "/photos/PXL_20221129_055945143.NIGHT.webp",
    name: "Una noche en Concarán, San Luis 🇦🇷",
  },
  {
    link: "/photos/PXL_20230111_215448841.NIGHT.webp",
    name: "Carpintería Merlo, San Luis 🇦🇷",
  },
];

export const footerRoutes = [
  { name: "Inicio", link: "/" },
  { name: "Proyectos", link: "/projects" },
  { name: "Ingresar", link: "/comments" },
  { name: "404", link: "/404" },
];
