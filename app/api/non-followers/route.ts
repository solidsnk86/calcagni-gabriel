import { NextRequest } from "next/server";
import getGithubUser from "@/utils/getGithubUser";

function hasDuplicates(array: any[]): boolean {
  const elementCount: { [key: string]: number } = {};
  for (const element of array) {
    if (elementCount[element]) {
      return true;
    }
    elementCount[element] = 1;
    element[element] = elementCount;
  }
  return false;
}

export async function GET(req: NextRequest) {
  try {
    const { dataFollowers, dataFollowings } = await getGithubUser();
    const loginFollowers: any = new Set(
      dataFollowers.map((data) => data.login)
    );
    const loginFollowings: any = new Set(
      dataFollowings.map((data) => data.login)
    );
    const nonFolowers = Array.from(loginFollowings).filter(
      (login) => !loginFollowers.has(login)
    );

    return new Response(
      JSON.stringify({
        status: "success",
        data: {
          followings: dataFollowings,
          followers: dataFollowers,
          non_following: nonFolowers,
          nonfollowings_count: nonFolowers.length,
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
