import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { encodedRedirect } from "@/utils/utils";
import { FancyButton } from "@/components/magic-ui/FancyButton";
import { DEFAULT_PATH } from "@/components/constants";

export async function LoginForm() {
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
    <form
      action={signInWithGitHub}
      className="grid gap-3 text-foreground mx-auto mt-32 md:mt-0"
    >
      <h3 className="text-center font-semibold text-3xl pb-2">Inciar sesión</h3>
      <FancyButton
        className="bg-btn-background rounded-md py-2 px-4 text-foreground mb-2 flex items-center justify-center hover:bg-btn-background-hover transition-all duration-300 border border-foreground/20"
        type="submit"
        radius={6}
        duration={2.5}
        inset={1}
        fancyColor="#A78BFA"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" className="mr-2 inline">
          <path
            fill="currentColor"
            d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.4 1 .2-.8.5-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 0z"
          />
        </svg>
        Ingresa con GitHub
      </FancyButton>
      <small className="text-center text-[12px] text-foreground dark:text-zinc-400 mt-2">
        Inicia sesión para unirte a la conversación en mi portfolio y dejar tus
        comentarios.
      </small>
    </form>
  );
}
