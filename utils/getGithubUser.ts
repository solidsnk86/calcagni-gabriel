export default async function getGithubUser(user: string, type: string) {
  const url = `https://api.github.com/users/${user}/${type}`;
  let allData: Array<any> = [];
  let page = 1;
  while (true) {
    try {
      const response = await fetch(`${url}?per_page=100?page=${page}`);

      if (!response.ok) {
        throw new Error(`Error fetchind data: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.length === 0) break;

      allData.push(...data);
      const linkHeader = response.headers.get("link");
      if (linkHeader) {
        const links = linkHeader.split(",").map((link) => link.trim());
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
