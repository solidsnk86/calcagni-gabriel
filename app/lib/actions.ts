import { supabase } from "@/utils/supabase/client";

/**
 * Supabase actions
 */

export async function getData(userName: string | any) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("user_name", userName);
  if (error) {
    console.error("Error to get data", error.message);
  }
  return data;
}

export async function handleDelete(
  id: string | number,
  onDelete: () => void,
  userName: string
) {
  try {
    const { error: deleteError } = await supabase
      .from("comments")
      .delete()
      .eq("id", id)
      .select();

    if (deleteError) {
      throw new Error(`Error al eliminar comentario: ${deleteError.message}`);
    }

    const updatedData = await getData(userName);

    onDelete();

    return updatedData;
  } catch (error) {
    console.error("Error en handleDelete:", error);
    throw error;
  }
}

export async function getLastVisit() {
  const { data, error } = await supabase
    .from("profile_visits")
    .select("city, country, created_at")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    throw new Error(`Error to get data from profile_visits ${error.message}`);
  }

  return data;
}
