import { DataModel } from "@/app/lib/actions";
import { Pencil } from "lucide-react";

export const EditButton = (id: string | number, content: object | any) => {
  return (
    <span
      className="dark:hover:bg-zinc-800 hover:bg-zinc-300 p-2 rounded-full cursor-pointer -translate-y-2 mr-1"
      title="Editar"
      onClick={() => DataModel.update(id, content)}
    >
      <Pencil className="w-[18px] h-[18px] text-zinc-600 dark:text-zinc-400" />
    </span>
  );
};
