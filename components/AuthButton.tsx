import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthButtonClient } from "./AuthButtonClient";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      return redirect("/login");
    } catch (error) {
      console.error("Sign Out error", error);
      redirect(`/comments?=error${error}`);
    }
  };

  return user ? (
    <AuthButtonClient user={user} signOut={signOut} />
  ) : (
    <div className="flex gap-2">
      <Link
        href="/login"
        className="h-8 flex items-center justify-center rounded-md no-underline text-sm font-medium px-4"
      >
        Iniciar Sesión
      </Link>
    </div>
  );
}
