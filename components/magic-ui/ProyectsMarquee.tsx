import React from 'react';
import { Marquee } from '@/components/magic-ui/Marquee';
import Link from 'next/link';
import { worksProyects } from '../constants';
import Image from 'next/image';

const ProyectCard = ({ name, img }: { name: string; img: string }) => {
  return img && img ? (
    <Image
      src={img}
      width={200}
      height={100}
      alt={`Imagen proyecto ${name}`}
      className="rounded-xl"
      priority
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
        {worksProyects.reverse().map((project) => (
          <ProyectCard
            key={project.name}
            name={project.name}
            img={project.image}
          />
        ))}
      </Marquee>
      <Link
        href="/projects"
        className="py-3 px-4 rounded-md bg-violet-400/60 b-404 flex items-center text-center absolute -bottom-2 left-[34%] hover:bg-violet-400/50"
      >
        Ver Trabajos
      </Link>
    </div>
  );
};
