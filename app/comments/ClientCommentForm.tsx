"use client";

import { supabase } from "@/utils/supabase/client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, ComponentProps } from "react";
import { GetLocation } from "@/components/GetLocation";
import { ClientFormProps } from "@/app/types/definitions";

type TextAreaProps = ComponentProps<"textarea">;

const formSchema = z.object({
  comment: z
    .string()
    .min(10, { message: "El comentario debe tener al menos 10 caracteres" })
    .max(260, {
      message: "El comentario no dbe exceder un máximo de 260 caracteres",
    }),
});

type FormData = z.infer<typeof formSchema>;

export const ClientCommentForm: React.FC<ClientFormProps> = ({
  userName,
  fullName,
  avatar,
  onRefresh,
}) => {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const formSubmit = async (formData: FormData) => {
    const { error } = await supabase.from("comments").insert([
      {
        ip: await GetLocation.ip(),
        city: await GetLocation.city(),
        country: await GetLocation.country(),
        message: formData.comment,
        user_name: userName,
        full_name: fullName,
        avatar_url: avatar,
      },
    ]);

    if (error) {
      console.error("Failed to submit comment:", error);
    }
    await onRefresh();
    reset();
  };

  const MAX_CHAR = 260;
  let [char, setChar] = useState(MAX_CHAR);
  let [charCount, setCharCount] = useState(0);
  const [wordsCount, setWordsCount] = useState(0);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setCharCount(text.length + 1);
    setWordsCount(text.split(" ").length);
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)} className="grid w-full">
      <textarea
        id="textarea"
        className="bg-zinc-900/50 rounded-t-md p-2 w-full border-x border-t border-foreground/5 mt-4 resize-none outline-none overflow-y-hidden"
        placeholder="Tu comentario aquí...✍"
        {...register("comment")}
        maxLength={MAX_CHAR}
        onInput={handleInput}
        onChange={() => {
          const textarea = document.getElementById("textarea");
          if (textarea) {
            textarea.addEventListener("input", () => {
              textarea.style.height = "auto";
              textarea.style.height = textarea.scrollHeight + "px";
            });
          }
        }}
      ></textarea>
      <aside className="text-xs flex justify-between items-center border-x border-b border-foreground/5 bg-zinc-900/50 p-2  rounded-b-md">
        <p>
          Máximo de caracteres:{" "}
          <span
            className={`${
              char <= 10 ? "text-red-400" : "text-violet-400"
            } w-10`}
          >
            {charCount}/{MAX_CHAR}
          </span>
        </p>
        <p>Cantidad de palabras: {wordsCount}</p>
        <button
          className="px-3 py-2 bg-btn-background hover:bg-btn-background-hover rounded-md border border-foreground/5 w-fit cursor-pointer disabled:cursor-not-allowed"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando" : "Enviar"}
        </button>
      </aside>
      {errors.comment && (
        <small className="text-red-400 text-xs ml-1 mb-3">
          {errors.comment.message}
        </small>
      )}
    </form>
  );
};
