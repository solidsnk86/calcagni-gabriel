import { NextRequest } from 'next/server';
import getgetGithubGraphql from '@/utils/get-github-graphql';

export async function GET(req: NextRequest) {
  const user = req.nextUrl.searchParams.get('username') || 'solidsnk86';
  const TOKEN = process.env.GITHUB_TOKEN;
  try {
    const results = await getgetGithubGraphql({
      username: user,
      token: TOKEN as string,
    });

    if (!user) {
      return Response.json(
        {
          message: 'Username is required',
          example: 'api/graphql-stats?username=user_name_here',
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        status: 'success',
        contributions_2024: results.contrib_2024 || 'Not available',
        contributions_2025: results.contrib_2025 || 'Not available',
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: 'Server error', error: error },
      { status: 500 }
    );
  }
}
