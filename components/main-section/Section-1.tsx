import { LayoutGrid } from "lucide-react";
import { ServicesMarquee } from "../magic-ui/ServicesMarquee";

export const Section_1 = () => {
  return (
    <section className="border border-foreground/5 bg-zinc-900/50 rounded-xl overflow-hidden">
      <header className="text-center p-6">
        <p className="text-gray-400">
          <LayoutGrid className="inline mr-1 -translate-y-[2px] text-violet-400 w-5 h-[18px]" />
          Servicios
        </p>
        <h3 className="text-white text-lg font-bold">Soluciones</h3>
      </header>
      <aside className="w-[100%] relative">
        <ServicesMarquee />
        <div className="shadow-left"></div>
        <div className="shadow-right"></div>
      </aside>
    </section>
  );
};
