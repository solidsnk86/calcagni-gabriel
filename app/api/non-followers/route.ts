import { NextRequest } from "next/server";
import getGithubUser from "@/utils/services";

function hasDuplicates(array: any[]): boolean {
  const elementCount: Record<string, number> = {};
  for (const element of array) {
    if (elementCount[element]) {
      return true;
    }
    elementCount[element] = 1;
  }
  return false;
}

export async function GET(req: NextRequest) {
  const user = req.nextUrl.searchParams.get("user") || "";

  try {
    const [dataFollowers, dataFollowings] = await Promise.all([
      getGithubUser(user, "followers"),
      getGithubUser(user, "following"),
    ]);
    const loginFollowers = new Set(dataFollowers.map((data) => data.login));
    const loginFollowings = new Set(dataFollowings.map((data) => data.login));
    const nonFollowers = Array.from(loginFollowings).filter(
      (login) => !loginFollowers.has(login)
    );

    const avatarFollowings = dataFollowings.map((data) => data.avatar_url);
    const avatarFollowers = dataFollowers.map((data) => data.avatar_url);
    const noDuplicatesAvatars = avatarFollowings.filter(
      (avatar_url) => !avatarFollowers.includes(avatar_url)
    );
    const languages: Record<string, string> = {};
    const languageArray = {};

    return new Response(
      JSON.stringify({
        status: "success",
        data: {
          followings: dataFollowings,
          followers: dataFollowers,
          non_following: {
            users: nonFollowers,
            avatar: noDuplicatesAvatars,
          },
          nonfollowings_count: nonFollowers.length,
        },
      }),
      { status: 200 }
    );
  } catch (err: Error | any) {
    return new Response(
      JSON.stringify({ status: "error", message: err?.message }),
      { status: 500 }
    );
  }
}
