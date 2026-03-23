import { supabase } from "@/utils/supabase/client";

export async function POST(req: Request) {
    const { ip, city, country, flag } = await req.json();
    if (!ip || !city || !country || !flag) return Response.json({ message: "Payload incompleto" })
    try {
        const { error } = await supabase.from("profile_visits").insert([{ ip, city, country, flag }]);
        if (error) throw new Error(error.message);
        return Response.json({ message: "Datos enviados" });
    } catch (error) {
        return Response.json({ message: "Error: " + error });
    }
}