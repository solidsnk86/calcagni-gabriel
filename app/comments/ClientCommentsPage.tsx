"use client";

import { supabase } from "@/utils/supabase/client";
import { ClientCommentForm } from "./ClientCommentForm";
import { useState } from "react";
import { ReviewClientCard } from "./ReviewClientCard";

export const CLientCommentsPage = ({
  user,
  initialData,
}: {
  user: any;
  initialData: any;
}) => {
  const [data, setData] = useState<any>(initialData);
  const [editable, setEditable] = useState<string | number | null>(null);

  const handleRefresh = async () => {
    const { data: refreshedData, error } = await supabase
      .from("comments")
      .select("*")
      .eq("user_name", user.user_metadata.user_name)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Error to get data from supabase: ${error.message}`);
    }

    setData(refreshedData);
  };

  const handleSave = async (
    id: string | number,
    newComment: string,
    edited: boolean
  ) => {
    const { data: updatedData, error } = await supabase
      .from("comments")
      .update({ comment: newComment, edited: true })
      .match({ id })
      .select();

    if (error) {
      console.error("No se pudo guardar el comentario", error.message);
    } else if (updatedData) {
      setData(
        data.map((post: any) =>
          post.id === id ? { ...post, comment: newComment, edited } : post
        )
      );
      setEditable(null);
    }
  };

  const handleEdit = (id: any) => {
    setEditable(id);
  };

  return (
    <>
      <ClientCommentForm
        userName={user.user_metadata.user_name}
        fullName={user.user_metadata.full_name}
        avatar={user.user_metadata.avatar_url}
        onRefresh={handleRefresh}
      />
      {data && data.length > 0 ? (
        <h1 className="text-center text-xl font-semibold my-4">
          {data.length === 1 ? "Último comentario" : "Últimos comentarios"}
        </h1>
      ) : null}
      <ReviewClientCard
        data={data}
        onDelete={handleRefresh}
        onEdit={handleEdit}
        onSave={handleSave}
      />
    </>
  );
};
