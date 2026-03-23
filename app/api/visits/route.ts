import { supabase } from "@/utils/supabase/client"

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("profile_visits")
            .select("id, ip, city, country, flag, created_at")
            .order("created_at", { ascending: false })
            .limit(1)
            .single();
        if (error) throw new Error(error.message);
        const { id, ip, city, country, flag, created_at } = data;
        return Response.json({ id: Number(id), ip, city, country, flag, created_at });
    } catch (error) {
        return Response.json({ message: "Error: " + error })
    }
}