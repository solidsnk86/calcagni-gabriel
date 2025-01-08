import { NextRequest } from 'next/server';
import getGithubUser from '@/utils/get-github-stats';

export async function GET(req: NextRequest) {
  const user = req.nextUrl.searchParams.get('user');

  if (!user) {
    return Response.json(
      {
        message:
          'Debes proporcionar el nombre de usuario para obtener los datos',
        example:
          'https://calcagni-gabriel.vercel.app/api/non-followers?user=usuario-de-github',
      },
      { status: 400 }
    );
  }

  try {
    const [dataFollowers, dataFollowing, dataRepos] = await Promise.all([
      getGithubUser(user, 'followers'),
      getGithubUser(user, 'following'),
      getGithubUser(user, 'repos'),
    ]);

    const loginFollowers = new Set(dataFollowers.map((data) => data.login));
    const loginFollowings = new Set(dataFollowing.map((data) => data.login));
    const nonFollowers = Array.from(loginFollowings).filter(
      (login) => !loginFollowers.has(login)
    );

    const avatarFollowings = dataFollowing.map((data) => data.avatar_url);
    const avatarFollowers = dataFollowers.map((data) => data.avatar_url);
    const noDuplicatesAvatars = avatarFollowings.filter(
      (avatar_url) => !avatarFollowers.includes(avatar_url)
    );

    const languages: Record<string, number> = {};
    dataRepos.map((repo) => {
      const language = repo.language || 'Sin especificar';
      languages[language] = (languages[language] || 0) + 1;
    });

    const languageArray = Object.entries(languages)
      .map(([name, count]) => ({
        name,
        count,
        percentage: ((count / dataRepos.length) * 100).toFixed(1),
      }))
      .sort((a, b) => b.count - a.count);

    const mostUsedLanguage = languageArray[0] || {
      name: 'Sin lenguaje',
      count: 0,
      percentage: '0.0',
    };

    const secondUsedLanguge = languageArray[1] || {
      name: 'Sin lenguaje',
      count: 0,
      percentage: '0.0',
    };

    return Response.json(
      {
        status: 'success',
        data: {
          following: dataFollowing,
          followers: dataFollowers,
          repos: dataRepos,
          non_following: {
            users: nonFollowers,
            avatar: noDuplicatesAvatars,
          },
          nonfollowings_count: nonFollowers.length,
          used_languages: languageArray,
          most_used_language: mostUsedLanguage,
          second_most_used: secondUsedLanguge,
        },
      },
      { status: 200 }
    );
  } catch (err: Error | any) {
    return new Response(
      JSON.stringify({ status: 'error', message: err?.message }),
      { status: 500 }
    );
  }
}
