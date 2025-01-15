const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const headers: HeadersInit = GITHUB_TOKEN
  ? {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    }
  : {
      Accept: 'application/vnd.github.v3+json',
    };

async function getGithubData(user: string, type: string) {
  const url = `https://api.github.com/users/${user}/${type}`;
  let allData: Array<any> = [];
  let page = 1;

  while (true) {
    try {
      const response = await fetch(`${url}?per_page=100&page=${page}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.length === 0) break;

      allData.push(...data);
      const linkHeader = response.headers.get('link');

      if (linkHeader) {
        const links = linkHeader.split(',').map((link) => link.trim());
        const nextLink = links.find((link) => link.includes('rel="next"'));
        if (!nextLink) break;
      } else {
        break;
      }

      page++;
    } catch (err) {
      throw new Error(`Server error: ${err}`);
    }
  }

  return allData;
}

async function getUserData(user: string) {
  const response = await fetch(`https://api.github.com/users/${user}`, {
    headers,
  });
  const jsonData = await response.json();
  return jsonData;
}

export { getGithubData, getUserData };
