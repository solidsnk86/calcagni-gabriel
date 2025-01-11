import { GraphQLClient, gql } from 'graphql-request';

interface GraphqlProps {
  user: {
    contributionsCollection: {
      totalCommitContributions: number;
    };
  };
}

export default async function getGithubGraphql({
  username,
  token,
}: {
  username: string;
  token: string;
}) {
  try {
    const client = new GraphQLClient('https://api.github.com/graphql', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const query1 = gql`
      query ($username: String!) {
        user(login: $username) {
          contributionsCollection(
            from: "2024-01-01T00:00:00Z"
            to: "2024-12-31T23:59:59Z"
          ) {
            totalCommitContributions
            commitContributionsByRepository {
              repository {
                name
              }
              contributions {
                totalCount
              }
            }
          }
        }
      }
    `;

    const query2 = gql`
      query ($username: String!) {
        user(login: $username) {
          contributionsCollection(
            from: "2025-01-01T00:00:00Z"
            to: "2025-12-31T23:59:59Z"
          ) {
            totalCommitContributions
            commitContributionsByRepository {
              repository {
                name
              }
              contributions {
                totalCount
              }
            }
          }
        }
      }
    `;

    const results: Record<string, number> = {};

    const data1 = (await client.request(query1, {
      username,
    })) as unknown as Promise<GraphqlProps>;
    results['contrib_2024'] = (
      await data1
    ).user.contributionsCollection.totalCommitContributions;

    const data2 = (await client.request(query2, {
      username,
    })) as unknown as Promise<GraphqlProps>;
    results['contrib_2025'] = (
      await data2
    ).user.contributionsCollection.totalCommitContributions;

    return results;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}
