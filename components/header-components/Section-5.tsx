import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Format } from "../Format";

export const Section_5 = ({ className }: { className: string }) => {
  const [githubStats, setGithubStats] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    getData();
  }, []);

  const mostUsedLanguage = githubStats.most_used?.name || "N/A";
  const percentage = parseFloat(githubStats.most_used?.percentage || 0);
  const publicRepos = githubStats.data?.user?.public_repos || 0;
  const followers = githubStats.data?.user?.followers || 0;
  const following = githubStats.data?.user?.following || 0;
  const notFollowingMe = following - followers;
  const timeStampsPortfolio = githubStats.data?.repos?.[18];
  const createdAt = timeStampsPortfolio
    ? Format.date(timeStampsPortfolio.created_at)
    : "N/A";
  const lastUpdate = timeStampsPortfolio
    ? Format.date(timeStampsPortfolio.updated_at)
    : "N/A";

  const languageData = [
    ["Periodo", "Uso de JavaScript"],
    ["Anterior", percentage * 0.9],
    ["Actual", percentage],
    ["Proyección", percentage * 1.1],
  ];

  const languageChartOptions = {
    title: "Evolución de Uso de Lenguaje",
    curveType: "function",
    legend: { position: "bottom" },
    backgroundColor: "transparent",
    chartArea: {
      width: "80%",
      height: "70%",
    },
    titleTextStyle: { color: "#f4f4f4", fontSize: 16 },
    hAxis: {
      textStyle: { color: "#f4f4f4" },
      titleTextStyle: { color: "#f4f4f4" },
    },
    vAxis: {
      title: "Porcentaje (%)",
      textStyle: { color: "#f4f4f4" },
      titleTextStyle: { color: "#f4f4f4" },
      viewWindow: { min: 0 },
    },
    series: {
      0: { color: "#8B5CF6" },
    },
  };

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
        <div className="bg-zinc-900/50 border border-foreground/5 rounded-lg p-2">
          <p className="text-zinc-400 text-sm">Lenguaje más usado</p>
          <p className="text-violet-400 font-bold">{mostUsedLanguage}</p>
        </div>
        <div className="bg-zinc-900/50 border border-foreground/5 rounded-lg p-2">
          <p className="text-zinc-400 text-sm">Uso de JavaScript</p>
          <p className="text-violet-400 font-bold">{percentage}%</p>
        </div>
        <div className="bg-zinc-900/50 border border-foreground/5 rounded-lg p-2">
          <p className="text-zinc-400 text-sm">Creación Portfolio</p>
          <p className="text-violet-400 font-bold">{createdAt}</p>
        </div>
        <div className="bg-zinc-900/50 border border-foreground/5 rounded-lg p-2">
          <p className="text-zinc-400 text-sm">Actualización Portfolio</p>
          <p className="text-violet-400 font-bold">{lastUpdate}</p>
        </div>
        <div className="bg-zinc-900/50 border border-foreground/5 rounded-lg p-2">
          <p className="text-zinc-400 text-sm">Seguidores</p>
          <p className="text-violet-400 font-bold">{followers}</p>
        </div>
        <div className="bg-zinc-900/50 border border-foreground/5 rounded-lg p-2">
          <p className="text-zinc-400 text-sm">Seguidos</p>
          <p className="text-violet-400 font-bold">{following}</p>
        </div>
        <div className="bg-zinc-900/50 border border-foreground/5 rounded-lg p-2">
          <p className="text-zinc-400 text-sm">No Siguen de Vuelta</p>
          <p className="text-violet-400 font-bold">{notFollowingMe}</p>
        </div>
        <div className="bg-zinc-900/50 border border-foreground/5 rounded-lg p-2">
          <p className="text-zinc-400 text-sm">Repositorios Públicos</p>
          <p className="text-violet-400 font-bold">{publicRepos}</p>
        </div>
      </aside>
    </section>
  );
};
