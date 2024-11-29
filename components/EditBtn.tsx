import { EditButtonProps } from "@/app/types/definitions";
import { Pencil } from "lucide-react";

export const EditButton = ({ onEdit, className }: EditButtonProps) => {
  return (
    <span
      className={`dark:hover:bg-zinc-800 hover:bg-zinc-300 p-2 rounded-full cursor-pointer -translate-y-2 mr-1 ${className}`}
      title="Editar"
      onClick={() => onEdit}
    >
      <Pencil className="w-[16px] h-[16px] text-zinc-600 dark:text-zinc-400" />
    </span>
  );
};
