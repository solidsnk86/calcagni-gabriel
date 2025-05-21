import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="px-8 justify-center mx-auto mt-20 reflection-404">
      <header>
        <Image
          src="/404-page/grim-fandango.png"
          alt="Avatar Image"
          width={80}
          height={80}
        />
      </header>
      <div className="bg-gradient-to-t from-zinc-800/50 to-zinc-700/50 backdrop-blur-lg relative rounded-xl w-fit p-12 overflow-hidden">
        <div className="effect-1"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="100%"
          height="100%"
          className="absolute top-0 left-0 opacity-[0.2]"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="9.5"
              numOctaves="2"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
        <article className="text-center z-[3]">
          <h3 className="text-center text-6xl pb-2 font-bold text-404">404</h3>
          <p>Ooops!! No se Encontró la Página</p>
          <Link href="/">
            <button
              className="rounded-lg my-6 p-3 text-foreground mb-2 items-center justify-center transition-all duration-300 b-404 z-[3]"
              type="submit"
            >
              Volver al Inicio
            </button>
          </Link>
        </article>
      </div>
    </div>
  );
}
