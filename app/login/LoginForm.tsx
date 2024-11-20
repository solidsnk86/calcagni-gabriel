import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { encodedRedirect } from "@/utils/utils";
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
      className="flex flex-col w-full items-center space-y-6"
    >
      <h3 className="font-semibold text-xl">Iniciar Sesión</h3>
      <SubmitButton />
    </form>
  );
}
