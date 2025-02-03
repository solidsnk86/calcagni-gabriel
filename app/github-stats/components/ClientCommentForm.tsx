'use client';

import { supabase } from '@/utils/supabase/client';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useState } from 'react';
import { GetLocation } from '@/utils/get-location';
import { ClientFormProps } from '@/app/types/definitions';

const formSchema = z.object({
  comment: z
    .string()
    .min(10, { message: 'El comentario debe tener al menos 10 caracteres' })
    .max(260, {
      message: 'El comentario no debe exceder un máximo de 260 caracteres',
    })
    .refine((val) => !val.includes('<script>'), {
      message:
        'No se permiten scripts, HTML o cualquier otra cosa que pueda ser maliciosa',
    }),
});

type FormData = z.infer<typeof formSchema>;

export const ClientCommentForm = ({
  userName,
  fullName,
  avatar,
  onRefresh,
}: ClientFormProps) => {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const MAX_CHAR = 260;
  let [char, setChar] = useState(MAX_CHAR);
  let [charCount, setCharCount] = useState(0);
  const [wordsCount, setWordsCount] = useState(0);

  const formSubmit = async (formData: FormData) => {
    const { error } = await supabase.from('comments').insert([
      {
        ip: await GetLocation.ip(),
        city: await GetLocation.city(),
        country: await GetLocation.country(),
        flag: await GetLocation.flag(),
        message: formData.comment,
        user_name: userName,
        full_name: fullName,
        avatar_url: avatar,
      },
    ]);
    if (error) {
      console.error('Error al envair comentario: ', error);
    }
    await onRefresh();
    setCharCount(0);
    setWordsCount(0);

    reset();
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setCharCount(text.length);
    setWordsCount(text.split(' ').length);
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)} className="grid">
      <textarea
        id="textarea"
        className="bg-zinc-900/50 rounded-t-md p-2 w-full border-x border-t border-foreground/5 mt-4 resize-none outline-none overflow-y-hidden"
        placeholder="Tu comentario aquí..."
        {...register('comment')}
        maxLength={MAX_CHAR}
        onInput={handleInput}
      ></textarea>
      <aside className="text-xs flex justify-between items-center border-x border-b border-foreground/5 bg-zinc-900/50 p-2  rounded-b-md">
        <span
          className={`${char <= 10 ? 'text-red-400' : 'text-violet-400'} w-10`}
        >
          {charCount}/{MAX_CHAR}
        </span>
        <p>Cantidad de palabras: {wordsCount}</p>
        <button
          className="px-3 py-2 bg-btn-background hover:bg-btn-background-hover rounded-md border border-foreground/5 w-fit cursor-pointer disabled:cursor-not-allowed"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando' : 'Enviar'}
        </button>
      </aside>
      {errors.comment && (
        <small className="text-red-400 text-xs m-1">
          {errors.comment.message}
        </small>
      )}
    </form>
  );
};
