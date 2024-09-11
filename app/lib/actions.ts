import { supabase } from "@/utils/supabase/client";

/**
 * Supabase actions
 */

export async function handleDelete(id: string | number, onDelete: () => void) {
  try {
    const { data: updatedData, error: deleteError } = await supabase
      .from("comments")
      .delete()
      .eq("id", id)
      .select("*");

    if (deleteError) {
      throw new Error(`Error al eliminar comentario: ${deleteError.message}`);
    }

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
