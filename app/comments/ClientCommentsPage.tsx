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
          Últimos comentarios
        </h1>
      ) : null}
      <ReviewClientCard data={data} onDelete={handleRefresh} />
    </>
  );
};
