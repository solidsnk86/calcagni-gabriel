import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Footer } from "@/components/Footer";
import { ClientCommentForm } from "./ClientCommentForm";
import { GetLocation } from "@/components/GetLocation";

export default async function Comments() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const ip = await GetLocation.ip();
  const city = await GetLocation.city();
  const country = await GetLocation.country();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex h-16 border-t">
          <div className="w-full flex justify-end items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>

      <main className="flex flex-col gap-6 max-w-xl">
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
          Hola 👋 {user.user_metadata.full_name}!! Puedes dejar tus comentarios
          sobre los proyectos de desarrollo de software que he realizado o si te
          ha gustado éste espacio. Aprecio mucho tu retroalimentación y te pido
          que, al hacerlo, uses un lenguaje respetuoso y profesional. Tus
          opiniones ayudan a mejorar mis servicios, así que te invito a
          compartirlas de manera clara y constructiva. ¡Muchas gracias por
          tomarte el tiempo para evaluar mi trabajo desde! Saludos.-
          <p className="text-right">Gabriel Calcagni ツ</p>
        </div>
        <h2 className="font-bold text-2xl text-center mb-4">Comentarios</h2>
        <ClientCommentForm
          ip={ip as string}
          city={city as string}
          country={country as string}
          userName={user.user_metadata.user_name}
          fullName={user.user_metadata.full_name}
          avatar={user.user_metadata.avatar_url}
        />
      </main>

      <Footer className="border-t border-foreground/5" />
    </div>
  );
}
