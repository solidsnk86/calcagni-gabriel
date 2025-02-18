import { Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Format } from '../../../components/DateFormat';
import Image from 'next/image';
import Link from 'next/link';

type LanguagesProps = {
  name: string;
  count: number;
  percentage: number | string;
};
type FollowProps = { login: string; id: number; avatar_url: string };
type ReposProps = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
  };
  stargazers_count: number;
  updated_at: string | Date;
};

interface UserProps {
  data: {
    followers: [FollowProps];
    following: [FollowProps];
    repos: Array<ReposProps>;
    non_following: { users: [string]; avatar: [string] };
    nonfollowing_count: number;
    used_languages: Array<LanguagesProps>;
    most_used_language: LanguagesProps;
    second_most_used: LanguagesProps;
    contributions: { contrib_2024: number; contrib_2025: number };
  };
}

export const GithubStats = ({
  className,
  user,
}: {
  className: string;
  user: string;
}) => {
  const [githubStats, setGithubStats] = useState<UserProps>();
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch(`/api/non-followers?user=${user}`);
      const stats = await response.json();

      setGithubStats(stats || []);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const followersCount = githubStats?.data?.followers?.length || 0;
  const followingCount = githubStats?.data?.following?.length || 0;
  const mostUsedLanguage =
    githubStats?.data?.most_used_language?.name || 'No disponible';
  const secondMostUsedLanguage =
    githubStats?.data?.second_most_used?.name || 'No disponible';
  const percentage =
    Number(githubStats?.data?.most_used_language?.percentage) || 0;
  const publicRepos = githubStats?.data?.repos.length;
  const repos = githubStats?.data?.repos || [];
  const stars = repos.map((repo) => repo.stargazers_count);
  const maxRepoStar = Math.max(...stars);
  const repoWithMoreStars = repos.find(
    (repo) => repo.stargazers_count === maxRepoStar
  );
  const nonFollowingUsers = githubStats?.data?.non_following?.users || [];
  const nonFollowingAvatars = githubStats?.data?.non_following?.avatar || [];
  const lastCommitRepos = repos
    .map((repo) => repo.updated_at)
    .sort()
    .reverse();
  const earnedStars = stars.reduce((acc, value) => acc + value, 0);
  const lastYearContributions =
    githubStats?.data?.contributions?.contrib_2024 || 'No disponible';
  const currentYearContributions =
    githubStats?.data?.contributions?.contrib_2025 || 'No disponible';

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

        <div className="flex flex-col animate-pulse duration-400">
          <div className="w-full p-4 text-center justify-center">
            Cargando...
          </div>
        </div>
      </section>
    );
  }

  const itemsStats = [
    {
      title: 'Seguidores',
      stat: followersCount,
    },
    {
      title: 'Seguidos',
      stat: followingCount,
    },
    {
      title: 'Lenguaje más usado',
      stat: mostUsedLanguage,
    },
    {
      title: 'Segundo más usado',
      stat: secondMostUsedLanguage,
    },
    {
      title: `Uso de ${mostUsedLanguage}`,
      stat: `%${percentage}`,
    },
    {
      title: 'Repositorios Públicos',
      stat: publicRepos || 0,
    },
    {
      title: 'Repo con más Estrellas',
      stat: repoWithMoreStars?.name || 'No disponible',
    },
    {
      title: 'Estrellas ' + repoWithMoreStars?.name,
      stat: maxRepoStar || 0,
    },
    {
      title: 'Total Estrellas Ganadas',
      stat: earnedStars || 0,
    },
    {
      title: 'Total de Commits 2024',
      stat: lastYearContributions,
    },
    {
      title: 'Total de commits 2025',
      stat: currentYearContributions,
    },
    {
      title: 'Último Commit',
      stat: Format.dateAndTime(lastCommitRepos[0]).replace(/,/g, ' a las'),
    },
  ];

  function clickSound() {
    const audio = new Audio('/effects-sounds/computer-click.mp3');
    audio.volume = 0.1;
    if (audio) {
      return audio.play();
    }
  }

  if (!nonFollowingUsers) {
    return (
      <small className="text-center flex justify-center font-semibold">
        Cargando...
      </small>
    );
  }

  return (
    <section
      className={`border border-foreground/5 bg-zinc-900/50 rounded-xl overflow-hidden p-4 ${className}`}
    >
      <header className="text-center">
        <p className="text-gray-400">
          <Github className="inline mr-1 -translate-y-[4px] text-violet-400 w-5 h-[18px]" />
          Estadísticas de Github
        </p>
        <h3 className="text-white text-lg font-bold">Datos</h3>
        <p className="text-gray-400 bg-zinc-900/50 border border-foreground/5 rounded-lg p-2 mt-4 mx-4">
          Usuario <span className="text-violet-400">{user}</span>
        </p>
      </header>

      <aside className="w-[100%] grid grid-cols-2 gap-4 text-center px-4 py-4">
        {itemsStats.map((item) => (
          <div
            key={item.title}
            title={`${item.title}: ${item.stat}`}
            className="bg-zinc-900/50 border border-foreground/5 rounded-lg p-2 last:col-span-2 overflow-hidden text-ellipsis stat-card"
          >
            <p className="text-zinc-400 text-sm line-clamp-1">{item.title}</p>
            <p className="text-violet-400 font-semibold line-clamp-1">
              {item.stat}
            </p>
          </div>
        ))}
      </aside>
      <article className="bg-zinc-900/50 border border-foreground/5 rounded-lg mx-4 items-center mb-4">
        <header className="flex justify-center items-center text-pretty border-b border-foreground/5 p-1">
          <p className="flex text-zinc-400 text-sm gap-1 mr-1">
            No te siguen:{' '}
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
            nonFollowingUsers.map((user, i: number) => (
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
                onMouseLeave={(event) => event.stopPropagation()}
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
