// app/api/nonFollowers/route.js
import { NextRequest } from "next/server";
import getGithubUser from "@/utils/getGithubUser";

export async function GET(req: NextRequest) {
  try {
    const { dataFollowers, dataFollowings } = await getGithubUser();
    const loginFollowers = new Set(dataFollowers.map((data) => data.login));
    const loginFollowings = new Set(dataFollowings.map((data) => data.login));
    const nonFolowers = Array.from(loginFollowings).filter(
      (login) => !loginFollowers.has(login)
    );

    return new Response(
      JSON.stringify({
        status: "success",
        message: {
          followings: dataFollowings,
          followers: dataFollowers,
          non_following: nonFolowers,
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
