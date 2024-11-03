import { Suspense } from "react";
import { LoginForm } from "./LoginForm";
import { Loader } from "@/components/Loader";
import Link from "next/link";
import AnimatedLayout from "@/components/AnimatedLayouts";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  return (
    <AnimatedLayout>
      <main className="md:flex flex-1 w-full items-center overflow-hidden">
        <div className="bg-effect-1 hidden lg:flex"></div>
        <aside className="flex flex-col xl:justify-center mx-auto p-6 md:sticky top-0 left-0 max-w-xs md:border-r border-foreground/5 md:h-screen overflow-hidden z-20 shadow-zinc-950 xl:shadow-md">
          <div className="bg-effect-2"></div>
          <Link
            href="/"
            title="Volver"
            className="py-2 pl-1 pr-2 absolute top-4 left-2 md:top-4 md:left-4 w-fit rounded-md text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
          >
            <ArrowLeft className="inline mr-2 w-4 h-4" />
            Volver
          </Link>
          <Suspense fallback={<Loader />}>
            <LoginForm />
          </Suspense>
        </aside>

        <div className="flex flex-col md:flex-1 text-center justify-around mx-auto text-balance relative py-4 px-2 border-t border-b border-foreground/10 z-10">
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
          <h2 className="text-2xl font-bold mb-4 z-30">
            ¡Bienvenido a la sección de comentarios!
          </h2>
          <p className="text-foreground mb-4 z-30">
            Aquí puedes compartir opiniones, sugerencias o preguntas sobre mi
            portfolio. Inicia sesión con tu cuenta de GitHub para participar.
          </p>
          <p className="text-foreground mb-4 z-30">
            Ya sea que tengas preguntas, recomendaciones o solo quieras saludar,
            este espacio está diseñado para facilitar una comunicación abierta y
            directa.
          </p>
          <p className="text-foreground z-30">
            Si aún no tienes una cuenta de GitHub, te recomiendo{" "}
            <Link
              href="https://github.com/"
              className="underline text-violet-400 hover:opacity-70"
              target="_blank"
            >
              crear una
            </Link>{" "}
            para aprovechar todas las funciones de esta plataforma. ¡Nos vemos
            en los comentarios!
          </p>
        </div>
      </main>
    </AnimatedLayout>
  );
}
