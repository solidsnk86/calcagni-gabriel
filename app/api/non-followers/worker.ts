self.onmessage = async (event) => {
  const { userName, repoName } = event.data;

  const repoCommits = await getRepoCommits({ owner: userName, repo: repoName });

  postMessage(repoCommits);
};

const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

const headers = {
  Authorization: `token ${TOKEN}`,
  Accept: 'application/vnd.github+json',
};

async function getRepoCommits({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo?.toLowerCase()}/stats/commit_activity`
  );
  const data = await response.json();
  return data;
}
