import { ProyectsMarquee } from "@/components/magic-ui/ProyectsMarquee";
import { BriefcaseBusiness } from "lucide-react";

export const Section_3 = ({ className }: { className?: string }) => {
  return (
    <section
      className={`border border-foreground/5 bg-zinc-900/50 rounded-xl h-[100%] overflow-hidden ${className}`}
    >
      <header className="text-center p-6">
        <p className="text-gray-400">
          <BriefcaseBusiness className="inline mr-1 -translate-y-[2px] text-violet-400 w-5 h-[18px]" />
          Proyectos
        </p>
        <h3 className="text-white text-lg font-bold">Galería de Proyectos</h3>
      </header>
      <aside className="w-full relative">
        <ProyectsMarquee />
      </aside>
    </section>
  );
};
