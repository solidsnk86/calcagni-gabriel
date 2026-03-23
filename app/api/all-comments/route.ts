import { supabase } from '@/utils/supabase/client';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);

        return Response.json(data, { status: 200 });
    } catch (error) {
        return Response.json(
            { message: 'Server Error: ' + error },
            { status: 500 }
        );
    }
}
