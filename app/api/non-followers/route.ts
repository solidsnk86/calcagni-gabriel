import { NextRequest } from 'next/server';
import { getGithubData, getUserData } from '@/utils/get-github-stats';
import getGithubGraphql from '@/utils/get-github-graphql';

export async function GET(req: NextRequest) {
  const user = req.nextUrl.searchParams.get('user');
  const TOKEN = req.nextUrl.searchParams.get('gh_token');

  if (!user || !TOKEN) {
    return Response.json(
      {
        mensaje:
          'Debes proporcionar el nombre de usuario y tu token de github para obtener los datos',
        ejemplo:
          'https://calcagni-gabriel.vercel.app/api/non-followers?user=usuario_name&gh_token=tu_token_de_github',
      },
      { status: 400 }
    );
  }

  try {
    const [dataFollowers, dataFollowing, dataRepos, extraData, results] =
      await Promise.all([
        getGithubData(user, 'followers'),
        getGithubData(user, 'following'),
        getGithubData(user, 'repos'),
        getUserData(user),
        getGithubGraphql({
          username: user,
          token: TOKEN as string,
        }),
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

    const followersCount = extraData.followers;
    const followingCount = extraData.following;

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
          followers_count: followersCount,
          following_count: followingCount,
          contributions: results,
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
