import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { encodedRedirect } from "@/utils/utils";
import { ArrowLeft } from "lucide-react";
import { FancyButton } from "@/components/magic-ui/FancyButton";
import AnimatedLayout from "@/components/AnimatedLayouts";
import { DEFAULT_PATH } from "@/components/constants";

type LoginProps = {
  searchParams?: Partial<{
    message: string;
  }>;
};

export default function Login({ searchParams = {} }: LoginProps) {
  const signInWithGitHub = async () => {
    "use server";

    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: DEFAULT_PATH,
      },
    });

    if (error) {
      return encodedRedirect("error", "/login", "Could not authenticate user");
    }

    return redirect(data.url);
  };

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
          <form
            action={signInWithGitHub}
            className="grid gap-3 text-foreground mx-auto mt-32 md:mt-0"
          >
            <h3 className="text-center font-semibold text-3xl pb-2">
              Inciar sesión
            </h3>
            <FancyButton
              className="bg-btn-background rounded-md py-2 px-4 text-foreground mb-2 flex items-center justify-center hover:bg-btn-background-hover transition-all duration-300 border border-foreground/20"
              type="submit"
              radius={6}
              duration={2.5}
              inset={1}
              fancyColor="#A78BFA"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-2 inline"
              >
                <path
                  fill="currentColor"
                  d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.4 1 .2-.8.5-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 0z"
                />
              </svg>
              Ingresa con GitHub
            </FancyButton>
            <small className="text-center text-[12px] text-foreground dark:text-zinc-400 mt-2">
              Inicia sesión para unirte a la conversación en mi portfolio y
              dejar tus comentarios.
            </small>
            {searchParams.message && (
              <small className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </small>
            )}
          </form>
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
              className="underline text-violet-400"
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
