import { supabase } from '@/utils/supabase/client';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const user = req.nextUrl.searchParams.get('username') || '';

  if (!user)
    return Response.json(
      {
        message: 'The username is required in the parameters.',
      },
      { status: 400 }
    );

  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('user_name', user)
      .order('created_at', { ascending: false });
    if (error) {
      return Response.json(
        { message: 'Cannot get data from DB' },
        { status: 400 }
      );
    }

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: 'Server Error: ' + error },
      { status: 500 }
    );
  }
}
