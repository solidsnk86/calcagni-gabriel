import { DataModel } from "@/app/lib/actions";
import { EditButtonProps } from "@/app/types/definitions";
import { supabase } from "@/utils/supabase/client";
import { Pencil } from "lucide-react";

export const EditButton = ({ onEdit, className }: EditButtonProps) => {
  return (
    <span
      className={`dark:hover:bg-zinc-800 hover:bg-zinc-300 p-2 rounded-full cursor-pointer -translate-y-2 mr-1 ${className}`}
      title="Editar"
      onClick={onEdit}
    >
      <Pencil className="w-[18px] h-[18px] text-zinc-600 dark:text-zinc-400" />
    </span>
  );
};
