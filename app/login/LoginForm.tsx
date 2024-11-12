import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { encodedRedirect } from "@/utils/utils";
import { FancyButton } from "@/components/magic-ui/FancyButton";
import { DEFAULT_PATH } from "@/components/constants";
import { SubmitButton } from "./SubmitButton";

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
      <SubmitButton />
      <small className="text-center text-[12px] text-foreground dark:text-zinc-400 mt-2">
        Inicia sesión para unirte a la conversación en mi portfolio y dejar tus
        comentarios.
      </small>
    </form>
  );
}
