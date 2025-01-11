// import { GraphQLClient, gql } from 'graphql-request';

// interface GithubGraphqlProps {
//   data: {
//     user: {
//       contributionsCollections: { totalCommitContributions: number };
//     };
//   };
// }

// export default function getGithubGraphql({ username }: { username: string }) {
//   const token = process.env.GITHUB_TOKEN;
//   const client = new GraphQLClient('https://api.github.com/graphql', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const query1 = gql`
//   {
//     user(login: "${username}") {
//       contributionsCollection(
//         from: "2024-01-01T00:00:00Z",
//         to: "2024-12-31T23:59:59Z"
//       ) {
//         totalCommitContributions
//         commitContributionsByRepository {
//           repository {
//             name
//           }
//           contributions {
//             totalCount
//           }
//         }
//       }
//     }
//   }
// `;
//   const query2 = gql`
//   {
//     user(login: "${username}") {
//       contributionsCollection(
//         from: "2025-01-01T00:00:00Z",
//         to: "2025-12-31T23:59:59Z"
//       ) {
//         totalCommitContributions
//         commitContributionsByRepository {
//           repository {
//             name
//           }
//           contributions {
//             totalCount
//           }
//         }
//       }
//     }
//   }
// `;
//   const results: Record<string, number> = {};
//   client.request(query1).then((contrib): G => {
//     results['contributions2024'] = contrib.data.user.contributionsCollections.totalCommitContributions
//   });
// }
