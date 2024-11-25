import { useEffect, useState } from "react";

export default async function GithubStats() {
  const [githubStats, setGithubStats] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://neotecs.vercel.app/api/github-stats"
      );
      const stats = await response.json();
      setGithubStats(stats || []);
    };
    getData();
  }, []);

  return githubStats;
}
