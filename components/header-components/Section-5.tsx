import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Format } from "../Format";
import Image from "next/image";
import { languageChartOptions } from "../constants";
import Link from "next/link";

export const Section_5 = ({ className }: { className: string }) => {
  const [githubStats, setGithubStats] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nonFollowings, setNonFollowings] = useState<any>([]);

  const getData = async () => {
    try {
      const response = await fetch(
        "https://neotecs.vercel.app/api/github-stats"
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
    const response = await fetch("/api/non-followers");
    const data = await response.json();
    setNonFollowings(data || []);
  };

  useEffect(() => {
    getData();
    getNonFollowings();
  }, []);

  const mostUsedLanguage = githubStats.most_used?.name || "N/A";
  const percentage = parseFloat(githubStats.most_used?.percentage || 0);
  const publicRepos = githubStats.data?.user?.public_repos || 0;
  const followers = githubStats.data?.user?.followers || 0;
  const following = githubStats.data?.user?.following || 0;
  const timeStampsPortfolio = githubStats.data?.repos?.[18];
  const createdAt = timeStampsPortfolio
    ? Format.date(timeStampsPortfolio.created_at)
    : "N/A";
  const lastUpdate = timeStampsPortfolio
    ? Format.date(timeStampsPortfolio.updated_at)
    : "N/A";
  const nonFollowingUsers = nonFollowings?.data?.non_following.users || [];
  const nonFollowingAvatars = nonFollowings?.data?.non_following.avatar || [];

  const languageData = [
    ["Periodo", "Uso de JavaScript"],
    ["Anterior", percentage * 0.9],
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
        <div className="flex justify-center items-center h-64">
          <p className="text-violet-400">Cargando estadísticas...</p>
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
      title: `Uso de ${mostUsedLanguage}`,
      stat: `% ${percentage}`,
    },
    {
      title: "Creación Portfolio",
      stat: createdAt,
    },
    {
      title: "Actualización Portfolio",
      stat: lastUpdate,
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
          Datos de Github
        </p>
        <h3 className="text-white text-lg font-bold">Stats</h3>
      </header>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-4">
          <Chart
            chartType="AreaChart"
            width="100%"
            height="300px"
            data={languageData}
            options={languageChartOptions}
          />
        </div>

        <div className="w-full lg:w-1/2 p-4">
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="300px"
            data={socialData}
            options={socialChartOptions}
          />
        </div>
      </div>

      <aside className="w-[100%] grid grid-cols-2 md:grid-cols-4 gap-4 text-center px-6 py-4">
        {itemsStats.map((item) => {
          return (
            <div
              key={item.title}
              title={item.title}
              className="bg-zinc-900/50 border border-foreground/5 rounded-lg p-2"
            >
              <p className="text-zinc-400 text-sm line-clamp-1">{item.title}</p>
              <p className="text-violet-400 font-bold">{item.stat}</p>
            </div>
          );
        })}
      </aside>
      <article className="bg-zinc-900/50 border border-foreground/5 rounded-lg p-2 mx-6 items-center mb-4">
        <div className="flex -space-x-4 justify-center mx-auto items-center text-pretty overflow-hidden py-1">
          <small className="flex text-zinc-400 lg:-translate-x-6 -translate-x-8">
            No me siguen: {nonFollowingUsers.length}
          </small>
          {nonFollowingUsers.length === 0 ? (
            <small className="font-bold text-center mx-auto">
              No hay usuarios
            </small>
          ) : (
            <>
              {nonFollowingUsers.slice(0, 30).map((user: string, i: number) => (
                <Link
                  key={user}
                  href={`https://github.com/${user}/`}
                  target="_blank"
                  className="hover:z-10"
                  title={user}
                  onMouseEnter={clickSound}
                >
                  <Image
                    src={nonFollowingAvatars[i]}
                    alt={`Avatar del usuario ${user}`}
                    className="rounded-full border-2 border-zinc-900 hover:scale-125 transition-transform"
                    width={30}
                    height={30}
                  />
                </Link>
              ))}
              {nonFollowingUsers.length > 30 && (
                <div className="text-center line-clamp-1">
                  {nonFollowingUsers
                    .slice(30)
                    .map((user: string, i: number) => (
                      <Link
                        key={user}
                        href={`https://github.com/${user}/`}
                        target="_blank"
                        className="hover:z-10 line-clamp-1"
                        title={user}
                        onMouseEnter={clickSound}
                      >
                        <Image
                          src={nonFollowingAvatars[i + 30]}
                          alt={`Avatar del usuario ${user}`}
                          className="rounded-full border-2 border-zinc-900 hover:scale-125 transition-transform"
                          width={30}
                          height={30}
                        />
                      </Link>
                    ))}
                </div>
              )}
            </>
          )}
        </div>
      </article>
    </section>
  );
};
