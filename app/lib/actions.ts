import { supabase } from "@/utils/supabase/client";

/**
 * Supabase actions
 */

export class DataModel {
  public static async getData(
    table: string,
    column: string,
    key?: string,
    value?: any
  ) {
    try {
      let query = supabase.from(table).select(column);
      if (key && value) {
        query = query.eq(key, value);
      }
      const { data, error } = await query;

      if (error) {
        throw new Error(`Cannot get comments from DB: ${error.message}`);
      }

      return data;
    } catch (err) {
      console.error("Server error, cannot get data: ", err);
    }
  }

  public static async create(
    table: string,
    content: object,
    onCreate: () => void
  ) {
    try {
      const { error } = await supabase.from(table).insert(content);

      if (error) {
        throw new Error(`Cannot create comment: ${error.message}`);
      }

      onCreate();
    } catch (err) {
      console.error("Server error, cannot create comment: ", err);
    }
  }

  public static async update(id: string | number, content: object | any) {
    try {
      const { error } = await supabase
        .from("comments")
        .update(content)
        .match({ id });

      if (error) {
        throw new Error(`Error to update comment: ${error.message}`);
      }

      const { data: newData, error: newError } = await supabase
        .from("comments")
        .select()
        .order("created_at", { ascending: false });

      if (newError) {
        throw new Error(`cannot get updated comment: ${newError.message}`);
      }

      return newData;
    } catch (err) {
      console.error("Server error, cannot update comment: ", err);
    }
  }

  public static async delete(
    table: string,
    id: string | number,
    onDelete: () => void
  ) {
    try {
      const { error } = await supabase.from(table).delete().match({ id });

      if (error) {
        throw new Error(`Cannot delete comment: ${error.message}`);
      }

      location.reload();
    } catch (err) {
      console.error("Server error, cannot delete data: ", err);
    }
  }

  public static async getLastVisit() {
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
}
