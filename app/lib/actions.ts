import { supabase } from "@/utils/supabase/client";

/**
 * Supabase actions
 */

export async function handleEdit(id: string | number, content: string) {
  try {
    const { error } = await supabase
      .from("comments")
      .update(content)
      .match({ id });

    if (error) {
      throw new Error(`Error to update the comment ${error.message}`);
    }

    const { data, error: newError } = await supabase.from("comments").select();

    if (newError) {
      throw new Error(`Error ${newError.message}`);
    }

    return data;
  } catch (err) {
    console.error("Server Error: ", err);
  }
}

async function handleDelete(id: any, onDelete: () => void) {
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

async function getLastVisit() {
  const { data, error } = await supabase
    .from("profile_visits")
    .select("city, province, country, created_at")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    throw new Error(`Error to get data from profile_visits ${error.message}`);
  }

  return data;
}

export { handleDelete, getLastVisit };
