import { supabase } from "@/utils/supabase/client";

/**
 * Supabase actions
 */

export async function getData(userName: string) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("user_name", userName);
  if (error) {
    console.error("Error to get data", error.message);
  }
  return data;
}

export async function handleDelete(id: string | number, onDelete: () => void) {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(`Error to delete comment ${error.message}`);
  }

  onDelete();
}