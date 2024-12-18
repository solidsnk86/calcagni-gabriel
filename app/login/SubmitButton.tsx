"use client";

import { useFormStatus } from "react-dom";
import { FancyButton } from "@/components/magic-ui/FancyButton";
import { Loader } from "@/components/Loader";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <FancyButton
      className="bg-btn-background rounded-md py-2 px-4 text-foreground mb-2 flex items-center justify-center hover:bg-btn-background-hover transition-all duration-300 border border-foreground/20"
      type="submit"
      radius={6}
      duration={2.6}
      inset={1}
      fancyColor="#A78BFA"
      disabled={pending}
    >
      <span className="flex items-center">
        {pending ? (
          <Loader className="mr-2" width="22px" height="22px" />
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" className="mr-2">
            <path
              fill="currentColor"
              d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.4 1 .2-.8.5-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 0z"
            />
          </svg>
        )}
        {pending ? "Ingresando..." : "Continuar con GitHub"}
      </span>
    </FancyButton>
  );
}
