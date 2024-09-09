"use client";

import { supabase } from "@/utils/supabase/client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { GetLocation } from "@/components/GetLocation";

const formSchema = z.object({
  comment: z
    .string()
    .min(10, { message: "El comentario debe tener al menos 10 caracteres" })
    .max(260, {
      message: "El comentario no dbe exceder un máximo de 260 caracteres",
    }),
});

type FormData = z.infer<typeof formSchema>;

export const ClientCommentForm = ({
  userName,
  fullName,
  avatar,
}: {
  userName: string;
  fullName: string;
  avatar: string;
}) => {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = async (formData: FormData) => {
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

    reset();
  };

  const getLocation = async () => {
    const dataLocation = {};
  };

  const MAX_CHAR = 260;
  let [char, setChar] = useState(MAX_CHAR);
  const [wordsCount, setWordsCount] = useState(0);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setChar(MAX_CHAR - text.length);
    setWordsCount(text.split(" ").length);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="grid w-full">
      <textarea
        id="textarea"
        className="bg-zinc-900/50 rounded-md p-2 w-full border border-foreground/5 my-4 resize-none focus:outline-violet-400"
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
            if (textarea.textContent === "") {
              char = 0;
            }
          }
        }}
      ></textarea>
      <aside className="mb-3 text-xs flex justify-around text-violet-400">
        <p>
          Máximo de caracteres:{" "}
          <span
            className={`${char <= 10 ? "text-red-400" : "text-violet-400"}`}
          >
            {char}
          </span>
        </p>
        <p>Cantidad de palabras: {wordsCount}</p>
      </aside>
      {errors.comment && (
        <small className="text-red-400 text-xs mb-3">
          {errors.comment.message}
        </small>
      )}
      <button
        className="px-3 py-2 bg-btn-background hover:bg-btn-background-hover rounded-lg border border-foreground/10 w-fit cursor-pointer disabled:cursor-not-allowed"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando" : "Enviar"}
      </button>
    </form>
  );
};
