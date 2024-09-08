import { Eye, Flag, Sparkles } from "lucide-react";
import Masonry from "react-responsive-masonry";

export const Section_2 = ({ visits }: { visits: number | string }) => {
  const getExperienceYears = (currentDate: Date = new Date()): number => {
    const startDate = new Date(2023, 1, 26);
    const diffTime = currentDate.getTime() - startDate.getTime();
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);

    return Math.max(0, Number(diffYears.toFixed(1)));
  };

  return (
    <Masonry className="flex" gutter="0.8rem">
      {[
        {
          name: "Proyectos",
          quantity: 5,
          icon: <Flag className="inline w-4 h-5 mr-1 text-violet-400" />,
        },
        {
          name: "Visitas",
          quantity: visits,
          icon: <Eye className="inline w-4 h-5 mr-1 text-violet-400" />,
        },
        {
          name: "Experiencia",
          quantity: getExperienceYears(),
          icon: <Sparkles className="inline w-4 h-5 mr-1 text-violet-400" />,
        },
      ].map((sec, index) => (
        <section
          key={index}
          className="flex items-center justify-center border border-foreground/5 bg-zinc-900/50 p-6 rounded-xl"
        >
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl font-bold text-white flex items-center">
              {sec.quantity as number}
              {sec.name !== "Experiencia" && sec.name !== "Visitas" ? (
                <span className="text-violet-400 font-semibold text-3xl ml-1">
                  +
                </span>
              ) : null}
            </h1>
            <aside className="flex items-center xl:px-3 px-2 xl:py-1 py-[2px] mt-2 bg-zinc-800/30 border border-foreground/5 rounded-full">
              {sec.icon}
              <span className="xl:text-xs text-[10px]">{sec.name}</span>
            </aside>
          </div>
        </section>
      ))}
    </Masonry>
  );
};
