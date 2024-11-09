import { SupabaseLogo } from "@/components/logo-icons/SupabaseLogo";
import { ReactLogo } from "@/components/logo-icons/ReactLogo";
import { FigmaLogo } from "@/components/logo-icons/FigmaLogo";
import { NextjsLogo } from "@/components/logo-icons/NextjsLogo";
import { ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import useMatchMedia from "@/app/hooks/useMatchMedia";

export const Section_1 = ({ className }: { className?: string }) => {
  const mobile = useMatchMedia("(max-width: 700px)", false);
  return (
    <section
      className={`border border-foreground/5 bg-zinc-900/50 p-6 rounded-xl ${className}`}
    >
      <header className="text-center">
        <p className="text-gray-400">
          <Layers className="inline mr-1 -translate-y-[2px] text-violet-400 w-5 h-[18px]" />
          Mi Stack
        </p>
        <h3 className="text-white text-lg font-bold">Arsenal Tecnológico</h3>
      </header>
      <aside className="stack gap-2 mt-4">
        {[
          {
            name: "React",
            icon: <ReactLogo className="inline" />,
            url: "https://es.react.dev/learn",
          },
          {
            name: "Next.js",
            icon: <NextjsLogo className="inline" />,
            url: "https://nextjs.org/",
          },
          {
            name: "Supabase",
            icon: <SupabaseLogo className="inline" />,
            url: "https://supabase.com/",
          },
          {
            name: "Figma",
            icon: <FigmaLogo className="inline" />,
            url: "https://www.figma.com/",
          },
        ].map((btn, index) => (
          <Link
            key={index}
            href={btn.url}
            target="_blank"
            className="section-1-btn relative py-4 pl-2 bg-zinc-900/50 hover:bg-btn-background-hover text-white rounded-xl text-left border border-foreground/5"
          >
            <span className="p-2 border border-foreground/5 rounded-lg mr-2 bg-zinc-800/50 shadow-md">
              {btn.icon}
            </span>
            {btn.name}
            {mobile ? null : (
              <ArrowRight className="w-5 h-5 inline absolute right-4 top-[18px] arrow-right" />
            )}
          </Link>
        ))}
      </aside>
    </section>
  );
};
