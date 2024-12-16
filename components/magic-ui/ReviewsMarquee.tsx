"use client";

import { Marquee } from "@/components/magic-ui/Marquee";
import { Format } from "../DateFormat";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ReviewsMarqueeProps } from "@/app/types/definitions";
import { DeleteButton } from "../DeleteBtn";
import Image from "next/image";
import { EditButton } from "../EditBtn";

export const ReviewCard = ({
  id,
  avatarUrl,
  fullName,
  city,
  province,
  flag,
  createdAt,
  comment,
  trash,
  editable: initialEditable,
  edited,
  onDelete,
  onEdit,
  onSave,
}: ReviewsMarqueeProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);

  useEffect(() => {
    setIsEditable(initialEditable || false);
  }, [initialEditable]);

  const handleSave = () => {
    if (onSave) {
      onSave(id, editedComment, true);
      setIsEditable(false);
    }
  };

  return (
    <div
      id={`comment-${id}`}
      className={`flex flex-col max-w-xs md:max-w-xl card-comment mx-auto space-y-2 bg-zinc-800/50 border border-zinc-800 rounded-2xl relative my-4 text-pretty`}
    >
      <header className="flex gap-[10px] items-center border-b border-foreground/10 dark:border-zinc-800 p-3">
        <Image
          src={avatarUrl}
          width={38}
          height={38}
          alt={`Avatar de ${fullName}`}
          className="rounded-lg"
        />
        <aside className="flex flex-col cursor-default">
          <small className="font-semibold">{fullName}</small>
          <small className="text-zinc-400 font-light line-clamp-1">
            {city}, {province} {flag}
          </small>
        </aside>
        <small className="flex absolute right-3 text-zinc-400">
          {trash ? (
            <>
              <EditButton
                onEdit={() => {
                  setIsEditable(true);
                  onEdit && onEdit(id);
                }}
              />
              <DeleteButton id={id} onDelete={() => onDelete && onDelete(id)} />
            </>
          ) : null}
          {createdAt as number}
        </small>
        <small className="text-zinc-400 text-xs absolute right-[26px] top-[36px]">
          {edited === true ? "(editado)" : null}
        </small>
      </header>
      <div className="space-y-2 p-3 relative">
        {isEditable ? (
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className="w-full text-zinc-400 bg-zinc-700 rounded-md p-2"
            rows={3}
          />
        ) : (
          <p className="text-balance text-zinc-400">{comment}</p>
        )}

        {isEditable && (
          <div className="flex space-x-2 mt-2">
            <button
              onClick={handleSave}
              className="px-2 py-1 bg-btn-background hover:bg-btn-background-hover rounded-md border border-foreground/5 w-fit cursor-pointer"
            >
              Guardar
            </button>
            <button
              onClick={() => {
                setIsEditable(false);
                setEditedComment(comment);
              }}
              className="px-2 py-1 bg-zinc-600 hover:bg-zinc-500 rounded-md border border-foreground/5 w-fit cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const ReviewsMarquee = ({ data }: { data: any | Promise<void> }) => {
  const reviews: any[] = [];

  data.forEach((review: any) => {
    reviews.push(review);
  });

  return (
    <div className="flex">
      {reviews.length !== 0 ? (
        <Marquee className="[--duration:20s]" animateY slice pauseOnHover>
          {reviews.map((review) => (
            <ReviewCard
              id={review.id}
              key={review.id}
              avatarUrl={review.avatar_url}
              fullName={review.full_name}
              city={review.city}
              province={review.province}
              country={review.country}
              flag={review.flag}
              createdAt={Format.date(review.created_at)}
              comment={review.message}
              edited={review.edited === true}
            />
          ))}
        </Marquee>
      ) : (
        <div className="text-center mt-10 md:mt-20">
          <p className="my-4">No hay comentarios aún..🙄</p>
          <Link
            href="/comments"
            className="b-404 bg-violet-400/60 hover:bg-violet-300/60 px-2 py-2 rounded-md"
          >
            Comentar
          </Link>
        </div>
      )}
    </div>
  );
};
