import React from "react";
import { Section_5Props } from "@/app/types/types";
import { MapPin } from "lucide-react";
import { Format } from "../Format";

export const Section_5: React.FC<Section_5Props> = ({
  city,
  country,
  className,
  createdAt,
}) => {
  return (
    <section
      className={`border border-foreground/5 bg-zinc-900/50 rounded-xl overflow-hidden ${className}`}
    >
      <header className="text-center p-6">
        <p className="text-gray-400">
          <MapPin className="inline mr-1 -translate-y-[2px] text-violet-400 w-5 h-[18px]" />
          Última Visita
        </p>
        <h3 className="text-white text-lg font-bold">Desde</h3>
      </header>
      <aside className="w-[100%] relative text-center">
        <p className="text-zinc-400 text-md mb-3">
          {city as string}, {country as string} el día{" "}
          {Format.formatLongDateAndTime(createdAt as string)}
        </p>
      </aside>
    </section>
  );
};