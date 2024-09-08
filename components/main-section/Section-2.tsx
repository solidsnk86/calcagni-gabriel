import { Sun } from "lucide-react";
import { OnlinePresence } from "../magic-ui/OnlinePresence";

export const Section_2 = () => {
  return (
    <section className="border border-foreground/5 bg-zinc-900/50 rounded-xl overflow-hidden">
      <header className="text-center p-6">
        <p className="text-gray-400">
          <Sun className="inline mr-1 -translate-y-[2px] text-violet-400 w-5 h-[18px]" />
          Presencia
        </p>
        <h3 className="text-white text-lg font-bold">En Línea</h3>
      </header>
      <aside className="w-[100%] relative">
        <OnlinePresence />
        <div className="shadow-left"></div>
        <div className="shadow-right"></div>
      </aside>
    </section>
  );
};
