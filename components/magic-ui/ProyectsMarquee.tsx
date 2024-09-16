import React from "react";
import { Marquee } from "@/components/magic-ui/Marquee";
import Link from "next/link";

const proyects = [
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

const ProyectCard = ({ name, img }: { name: string; img: string }) => {
  return img && img ? (
    <img
      src={img}
      width="200px"
      height="auto"
      alt={`Imagen proyecto ${name}`}
      className="rounded-xl aspect-auto"
    />
  ) : (
    <div className="w-[200px] py-8 h-auto">
      <h1 className="text-xl">CARGANDO...</h1>
    </div>
  );
};

export const ProyectsMarquee = () => {
  return (
    <div className="flex flex-col flex-wrap items-center justify-center mb-[27px]">
      <Marquee className="[--duration:30s]" flex animateX>
        {proyects.reverse().map((proyect) => (
          <ProyectCard key={proyect.name} {...proyect} />
        ))}
      </Marquee>
      <Link
        href="/works"
        className="py-3 px-4 rounded-md bg-violet-400/60 b-404 flex items-center text-center absolute -bottom-2 left-[34%] hover:bg-violet-400/50"
      >
        Ver Trabajos
      </Link>
    </div>
  );
};
