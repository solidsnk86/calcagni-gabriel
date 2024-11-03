// components/SubmitButton.tsx
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
      duration={2.5}
      inset={1}
      fancyColor="#A78BFA"
      disabled={pending}
    >
      {pending ? (
        <Loader className="w-6 h-6 mr-2" />
      ) : (
        <svg viewBox="0 0 24 24" width="24" height="24" className="mr-2 inline">
          {/* ... */}
        </svg>
      )}
      {pending ? "Ingresando..." : "Ingresa con GitHub"}
    </FancyButton>
  );
}
