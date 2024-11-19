import { Drama } from "lucide-react";
import { ReviewsMarquee } from "../magic-ui/ReviewsMarquee";
import React from "react";
import { Section_3Props } from "@/app/types/definitions";

export const Section_3: React.FC<Section_3Props> = ({
  data,
  id,
  className,
}) => {
  return (
    <section
      className={`border border-foreground/5 bg-zinc-900/50 rounded-xl overflow-hidden ${className}`}
    >
      <header className="text-center border-b border-foreground/5">
        <div className="p-6">
          <p className="text-gray-400">
            <Drama className="inline mr-1 -translate-y-[2px] text-violet-400 w-5 h-[18px]" />
            Comentarios
          </p>
          <h3 className="text-white text-lg font-bold">Críticas y Reseñas</h3>
        </div>
      </header>
      <aside className="w-[100%] relative overflow-hidden h-[329px]">
        <div className="px-2 grid mx-auto justify-center">
          <ReviewsMarquee key={id} data={data} />
          <div className="shadow-top"></div>
          <div className="shadow-bottom"></div>
        </div>
      </aside>
    </section>
  );
};
