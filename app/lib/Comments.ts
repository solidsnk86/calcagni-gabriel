import { supabase } from "@/utils/supabase/client";
import { CreateProps, DeleteProps, UpdateProps } from "./definitions";

export class Comment {
  public static commentsCount = 0;
  idComment: number;

  constructor() {
    this.idComment = ++Comment.commentsCount;
  }

  getIdComment() {
    return this.idComment;
  }

  public static async get() {
    try {
      const { data, error } = await supabase.from("comments").select("*");

      if (error) {
        throw new Error(`Error to get data from supabase: ${error.message}`);
      }

      return data;
    } catch (e) {
      console.error("Error: ", e);
    }
  }

  public static async create({ content }: CreateProps) {
    try {
      const { error } = await supabase.from("comments").insert(content);

      if (error) {
        throw new Error(`Error to get data from supabase: ${error.message}`);
      }

      const newData = await this.get();

      return newData;
    } catch (e) {
      console.error("Error: ", e);
    }
  }

  public static async update({ id, content }: UpdateProps) {
    try {
      const { error } = await supabase
        .from("comments")
        .update(content)
        .match({ id });

      if (error) {
        throw new Error(`Error to get data from supabase: ${error.message}`);
      }

      const updatedData = await this.get();

      return updatedData;
    } catch (e) {
      console.error("Error: ", e);
    }
  }

  public static async delete({ id }: DeleteProps) {
    try {
      const { error } = await supabase.from("comments").delete().match({ id });

      if (error) {
        throw new Error(`Error to delete the comment: ${error.message}`);
      }
      const newData = await this.get();

      return newData;
    } catch (e) {
      console.error("Error", e);
    }
  }
}
