async function getCommitHistory() {
  const response = await fetch(
    "https://api.github.com/repos/facebook/react/stats/commit_activity"
  );
  const jsonData = (await response.json()) as Promise<
    {
      total: number;
      week: number;
      days: number[];
    }[]
  >;
  const weeks = (await jsonData).map((data) => ({
    id: data.week,
    date: new Date(data.week * 1000),
    days: data.days.map((contributions) => contributions),
  }));

  return weeks;
}

export default async function Page() {
  const weeks = await getCommitHistory();
  return (
    <div className="flex flex-col">
      {weeks.map((week) => (
        <>
          <p key={week.id}>{new Date(week.date).toLocaleString()}</p>
          <p>{week.days}</p>
        </>
      ))}
    </div>
  );
}
