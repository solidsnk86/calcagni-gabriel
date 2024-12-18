"use client";

import { LogOut } from "lucide-react";
import React from "react";
import { AuthButtonProps } from "@/app/types/definitions";
import useMatchMedia from "@/app/hooks/useMatchMedia";
import { useFormStatus } from "react-dom";
import { Loader } from "./Loader";

const LogoutButton = ({ mobile }: { mobile: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <button
      className="py-2 px-4 flex items-center rounded-md no-underline bg-btn-background hover:bg-btn-background-hover border border-foreground/5"
      title="Cerrar Sesión"
      type="submit"
    >
      {mobile ? (
        pending ? (
          <Loader width={20} height={20} />
        ) : (
          ""
        )
      ) : pending ? (
        <>
          <span className="mr-1">Cerrando..</span>
          <Loader width={20} height={20} />
        </>
      ) : (
        "Cerrar Sesión"
      )}
      {pending ? null : (
        <LogOut className={`${mobile ? "ml-0" : "ml-2"} w-5 h-5 inline`} />
      )}
    </button>
  );
};

export const AuthButtonClient: React.FC<AuthButtonProps> = ({
  signOut,
  user,
}) => {
  const mobile = useMatchMedia("(max-width: 700px)", false);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <img
          className="rounded-full border border-zinc-500"
          src={user.user_metadata.avatar_url}
          width={33}
          height={33}
          alt="User Avatar"
        />
        <span className="hidden md:block">{user.user_metadata.user_name}!</span>
      </div>
      <form action={signOut}>
        <LogoutButton mobile={mobile} />
      </form>
    </div>
  );
};
