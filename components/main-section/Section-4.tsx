import { MapPinnedIcon } from "lucide-react";
import React from "react";
import { Setcion_4Props } from "@/app/types/types";

export const Section_4: React.FC<Setcion_4Props> = ({
  city,
  country,
  flag,
  longitude,
  latitude,
  className,
}) => {
  return (
    <section
      className={`border border-foreground/5 bg-zinc-900/50 rounded-xl overflow-hidden ${className}`}
    >
      <header className="text-center p-6">
        <p className="text-gray-400">
          <MapPinnedIcon className="inline mr-1 -translate-y-[2px] text-violet-400 w-5 h-[18px]" />
          Me Complace
        </p>
        <h3 className="text-white text-lg font-bold">Recibirte Desde</h3>
      </header>
      <aside className="w-[100%] relative text-center">
        <h1 className="text-zinc-400 text-lg">
          {city as string}, {country as string} {flag as string}
        </h1>
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3362.721134731404!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzLCsDMzJzM3LjAiUyA2NcKwMTQnMDYuNSJX!5e0!3m2!1ses-419!2sar!4v1716605671110!5m2!1ses-419!2sar`}
          width="600"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </aside>
    </section>
  );
};
