"use client";

import React from "react";
import { Trash } from "lucide-react";
import { DeleteButtonProps } from "@/app/types/definitions";
import { handleDelete } from "@/app/lib/actions";

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onDelete }) => {
  return (
    <span
      className="dark:hover:bg-zinc-800 hover:bg-zinc-300 p-2 rounded-full cursor-pointer -translate-y-2 mr-1"
      onClick={() => handleDelete(id, onDelete)}
      title="Eliminar"
    >
      <Trash className="w-[18px] h-[18px] text-zinc-600 dark:text-zinc-400" />
    </span>
  );
};
