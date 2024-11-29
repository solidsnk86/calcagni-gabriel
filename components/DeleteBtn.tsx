"use client";

import React from "react";
import { Trash } from "lucide-react";
import { DeleteButtonProps } from "@/app/types/definitions";
import { supabase } from "@/utils/supabase/client";

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onDelete }) => {
  const handleDelete = async (id: string | number) => {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) {
      console.error("Error al borrar comentario: ", error);
    }
    onDelete();
  };
  return (
    <span
      className="dark:hover:bg-zinc-800 hover:bg-zinc-300 p-2 rounded-full cursor-pointer -translate-y-2 mr-1"
      onClick={() => handleDelete(id)}
      title="Eliminar"
    >
      <Trash className="w-[16px] h-[16px] text-zinc-600 dark:text-zinc-400" />
    </span>
  );
};
