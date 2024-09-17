import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CLientCommentsPage } from "./ClientCommentsPage";
import { footerRoutes } from "@/components/constants";

export default async function Comments() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("user_name", user.user_metadata.user_name);
  if (error) {
    throw new Error(`Error to get comments: ${error.message}`);
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex h-16">
          <div className="w-full flex justify-between items-center p-3 text-sm">
            <img
              src="/logo.png"
              alt="Logo"
              width={45}
              height={45}
              className="mb-2"
            />
            <AuthButton />
          </div>
        </nav>
      </div>

      <main className="flex flex-col gap-6 max-w-xl px-3">
        <div className="p-6 italic bg-violet-400/20 text-white text-balance rounded-xl relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="100%"
            height="100%"
            className="absolute top-0 left-0 opacity-[0.2] rounded-xl"
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
          Hola 👋 {user.user_metadata.full_name}! Agradezco mucho tu
          retroalimentación sobre mis proyectos de software. Te invito a
          compartir tus comentarios de manera respetuosa y profesional para
          ayudarme a mejorar. ¡Gracias por tu tiempo!
          <p className="text-right">Gabriel Calcagni ツ</p>
        </div>
        <h2 className="font-bold text-2xl text-center mb-4">Comentarios</h2>
        <CLientCommentsPage user={user} initialData={data} />
      </main>

      <footer className="w-full p-8 justify-between text-center text-base text-zinc-400 flex">
        <a
          href="https://github.com/solidsnk86"
          target="_blank"
          rel="noreferrer"
          className="hover:brightness-150 transition-all duration-300"
        >
          &copy;SolidSnk86
        </a>
        <aside className="flex gap-3 font-medium">
          {footerRoutes
            .filter((route) => route.name !== "Comentar")
            .map((link, index) => (
              <Link
                key={index}
                href={link.link}
                className="hover:opacity-60 transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
        </aside>
      </footer>
    </div>
  );
}
