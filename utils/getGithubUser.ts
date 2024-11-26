import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL_SOLIDSNK!;
const ANNON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_SOLIDSNK!;

const supabase = createClient(URL, ANNON_KEY);

export default async function getGithubUser() {
  try {
    const { data: githubFollowers, error } = await supabase
      .from("github_followers_user")
      .select("login, avatar_url, url");
    const { data: githubFollowings, error: newError } = await supabase
      .from("github_followings_user")
      .select("login, avatar_url, url");

    if (error || newError) {
      throw new Error(
        `Cannot get data from supabase: , ${
          error?.message || newError?.message
        }`
      );
    }

    return {
      dataFollowers: githubFollowers,
      dataFollowings: githubFollowings,
    };
  } catch (err) {
    throw new Error(`Server error: ${err}`);
  }
}
