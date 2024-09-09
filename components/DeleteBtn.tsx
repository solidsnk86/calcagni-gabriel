"use client";

import React from "react";
import { Trash } from "lucide-react";
import { supabase } from "@/utils/supabase/client";

type DeleteButtonProps = {
  id: string | number;
  onDelete: () => void;
};

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onDelete }) => {
  async function handleDelete(id: string | number) {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error at delete comment from database:", error.message);
      return;
    }

    onDelete();
  }

  return (
    <span
      className="dark:hover:bg-zinc-800 hover:bg-zinc-300 p-2 rounded-full cursor-pointer -translate-y-2 mr-1"
      onClick={() => handleDelete(id)}
      title="Eliminar"
    >
      <Trash className="w-[18px] h-[18px] text-zinc-600 dark:text-zinc-400" />
    </span>
  );
};
