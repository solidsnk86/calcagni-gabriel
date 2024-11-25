import { Github } from "lucide-react";
import { useEffect, useState } from "react";

export const Section_5 = ({ className }: { className: string }) => {
  const [githubStats, setGithubStats] = useState<any>([]);
  const getData = async () => {
    const response = await fetch("https://neotecs.vercel.app/api/github-stats");
    const stats = await response.json();
    setGithubStats(stats || []);
  };

  useEffect(() => {
    getData();
  }, []);

  const mostUsedLanguage = githubStats?.most_used?.name;
  const percentage = githubStats?.most_used?.percentage;
  const publicRepos = githubStats?.data?.user?.public_repos;

  return (
    <section
      className={`border border-foreground/5 bg-zinc-900/50 rounded-xl overflow-hidden ${className}`}
    >
      <header className="text-center p-6">
        <p className="text-gray-400">
          <Github className="inline mr-1 -translate-y-[4px] text-violet-400 w-5 h-[18px]" />
          Datos de Github
        </p>
        <h3 className="text-white text-lg font-bold">Stats</h3>
      </header>
      <aside className="w-[100%] grid grid-cols-4 gap-2 relative text-center px-6">
        <p className="text-zinc-400 text-md mb-3 border border-foreground/5 rounded-lg">
          Lenguaje más usado:
          <span>{mostUsedLanguage}</span>
        </p>
        <p className="text-zinc-400 text-md mb-3 border border-foreground/5 rounded-lg">
          Uso JavaScript Porcentaje:
          <span>%{percentage}</span>
        </p>
        <p className="text-zinc-400 text-md mb-3 border border-foreground/5 rounded-lg">
          Lenguaje más usado:
          <span>{mostUsedLanguage}</span>
        </p>
        <p className="text-zinc-400 text-md mb-3 border border-foreground/5 rounded-lg relative">
          Repositorios Públicos:
          <span className="sr-only">{publicRepos}</span>
        </p>
      </aside>
    </section>
  );
};
