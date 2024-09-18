"use client";

import { LogOut } from "lucide-react";
import React from "react";
import { AuthButtonProps } from "@/app/types/definitions";
import useMatchMedia from "@/app/hooks/useMatchMedia";

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
      <form>
        {mobile ? (
          <button
            className="py-2 px-2 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover border border-foreground/5"
            title="Cerrar Sesión"
            onClick={async (e) => {
              e.preventDefault();
              await signOut();
            }}
          >
            <LogOut className="w-5 h-5 inline ml-2" />
          </button>
        ) : (
          <button
            className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover border border-foreground/5"
            title="Cerrar Sesión"
            onClick={async (e) => {
              e.preventDefault();
              await signOut();
            }}
          >
            Cerrar Sesión
            <LogOut className="w-5 h-5 inline ml-2" />
          </button>
        )}
      </form>
    </div>
  );
};
