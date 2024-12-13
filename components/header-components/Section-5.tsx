import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Format } from "../DateFormat";
import Image from "next/image";
import { languageChartOptions } from "../constants";
import Link from "next/link";

export const Section_5 = ({
  className,
  user,
}: {
  className: string;
  user: string;
}) => {
  const [githubStats, setGithubStats] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nonFollowings, setNonFollowings] = useState<any>([]);

  const getData = async () => {
    try {
      const response = await fetch(
        `https://neotecs.vercel.app/api/github-stats?username=${user}`
      );
      const stats = await response.json();
      setGithubStats(stats || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching GitHub stats:", error);
      setIsLoading(false);
    }
  };

  const getNonFollowings = async () => {
    const response = await fetch(`/api/non-followers?user=${user}`);
    const data = await response.json();
    setNonFollowings(data || []);
  };

  useEffect(() => {
    getData();
    getNonFollowings();
  }, []);

  const mostUsedLanguage = githubStats.most_used?.name || "N/A";
  const secondMostUsedLanguage = githubStats.second_most_used?.name || "N/A";
  const percentage = parseFloat(githubStats.most_used?.percentage || 0);
  const publicRepos = githubStats.data?.user?.public_repos || 0;
  const followers = githubStats.data?.user?.followers || 0;
  const following = githubStats.data?.user?.following || 0;
  const repos = githubStats.data?.repos || [];
  const stars = repos.map((repo: any) => repo.stars);
  const maxRepoStar = Math.max(...stars);
  const repoWithMoreStars = repos.find(
    (repo: { stars: number }) => repo.stars === maxRepoStar
  );
  const nonFollowingUsers = nonFollowings?.data?.non_following.users || [];
  const nonFollowingAvatars = nonFollowings?.data?.non_following.avatar || [];
  const lastCommitRepos = repos
    .map((repo: { updated_at: string }) => repo.updated_at)
    .sort()
    .reverse();

  const languageData = [
    ["Periodo", `Uso de ${mostUsedLanguage}`],
    ["Anterior", percentage * 0.1],
    ["Actual", percentage],
    ["Proyección", percentage * 1.1],
  ];

  const socialData = [
    ["Métrica", "Cantidad", { role: "style" }],
    ["Repositorios", publicRepos, "#8B5CF6"],
    ["Seguidores", followers, "#6D28D9"],
    ["Siguiendo", following, "#4C1D95"],
  ];

  const socialChartOptions = {
    ...languageChartOptions,
    title: "Estadísticas Sociales de GitHub",
    vAxis: {
      ...languageChartOptions.vAxis,
      title: "Número",
    },
  };

  if (isLoading) {
    return (
      <section
        className={`border border-foreground/5 bg-zinc-900/50 rounded-xl overflow-hidden ${className}`}
      >
        <div className="flex justify-center items-center h-64 animate-pulse">
          <p className="text-violet-400">Cargando estadísticas...</p>
        </div>
        <header className="text-center p-6">
          <p className="text-gray-400">
            <Github className="inline mr-1 -translate-y-[4px] text-violet-400 w-5 h-[18px]" />
            Datos de Github
          </p>
          <h3 className="text-white text-lg font-bold">Stats</h3>
        </header>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-4">Cargando...</div>

          <div className="w-full lg:w-1/2 p-4">Cargando...</div>
        </div>
      </section>
    );
  }

  const itemsStats = [
    {
      title: "Lenguaje más usado",
      stat: mostUsedLanguage,
    },
    {
      title: "Segundo más usado",
      stat: secondMostUsedLanguage,
    },
    {
      title: `Uso de ${mostUsedLanguage}`,
      stat: `%${percentage}`,
    },
    {
      title: "Repositorios Públicos",
      stat: publicRepos || 0,
    },
    {
      title: "Repositorio con más Estrellas",
      stat: repoWithMoreStars.name,
    },
    {
      title: "Cantidad Máxima de Estrellas",
      stat: maxRepoStar || 0,
    },
    {
      title: "Último Commit",
      stat: Format.dateAndTime(lastCommitRepos[0]).replace(/,/g, " a las"),
    },
  ];

  function clickSound() {
    const audio = new Audio("/effects-sounds/computer-click.mp3");
    audio.volume = 0.2;
    if (audio) {
      return audio.play();
    }
  }

  if (!nonFollowingUsers) {
    return <small className="text-center font-semibold">Cargando...</small>;
  }

  return (
    <section
      className={`border border-foreground/5 bg-zinc-900/50 rounded-xl overflow-hidden ${className}`}
    >
      <header className="text-center p-6">
        <p className="text-gray-400">
          <Github className="inline mr-1 -translate-y-[4px] text-violet-400 w-5 h-[18px]" />
          Estadísticas de Github
        </p>
        <h3 className="text-white text-lg font-bold">Datos</h3>
        <p className="text-gray-400 bg-zinc-900/50 border border-foreground/5 rounded-lg p-2 mt-4">
          Usuario <span className="text-violet-400">{user}</span>
        </p>
      </header>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full p-2">
          <Chart
            chartType="AreaChart"
            width="100%"
            height="300px"
            data={languageData}
            options={languageChartOptions}
          />
        </div>

        <div className="w-full p-2">
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="300px"
            data={socialData}
            options={socialChartOptions}
          />
        </div>
      </div>

      <aside className="w-[100%] grid grid-cols-2 gap-4 text-center px-6 py-4">
        {itemsStats.map((item) => {
          return (
            <div
              key={item.title}
              title={item.title}
              className={`bg-zinc-900/50 border border-foreground/5 rounded-lg p-2 last:col-span-2`}
            >
              <p className="text-zinc-400 text-sm line-clamp-1">{item.title}</p>
              <p className="text-violet-400 font-bold">{item.stat}</p>
            </div>
          );
        })}
      </aside>
      <article className="bg-zinc-900/50 border border-foreground/5 rounded-lg mx-6 items-center mb-4">
        <header className="flex justify-center items-center text-pretty border-b border-foreground/5 p-1">
          <p className="flex text-zinc-400 text-sm gap-1 mr-1">
            No te siguen:{" "}
            <span className="inline text-violet-400 font-bold">
              {nonFollowingUsers.length}
            </span>
          </p>
        </header>
        <div className="flex -space-x-4 justify-center mx-auto items-center text-pretty overflow-hidden p-2 overflow-x-auto">
          {nonFollowingUsers.length === 0 ? (
            <small className="font-bold text-center mx-auto">
              No hay usuarios
            </small>
          ) : (
            nonFollowingUsers.map((user: string, i: number) => (
              <Link
                key={user}
                href={`https://github.com/${user}/`}
                target="_blank"
                className="hover:z-10"
                title={user}
                onMouseEnter={(e) => {
                  e.preventDefault();
                  clickSound();
                }}
              >
                <Image
                  src={nonFollowingAvatars[i]}
                  alt={`Avatar del usuario ${user}`}
                  className="rounded-full border-2 border-zinc-900 hover:scale-125 transition-transform"
                  width={30}
                  height={30}
                />
              </Link>
            ))
          )}
        </div>
      </article>
    </section>
  );
};
