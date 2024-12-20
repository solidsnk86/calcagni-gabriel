"use client";

import { ReviewCard } from "@/components/magic-ui/ReviewsMarquee";
import { ReviewsClientProps } from "@/app/types/definitions";
import React from "react";
import { Format } from "@/components/DateFormat";

export const ReviewClientCard: React.FC<ReviewsClientProps> = ({
  data,
  onDelete,
  onEdit,
  editable,
  onSave,
}) => {
  return (
    <div className="flex flex-col justify-center">
      {data &&
        data.map((comment: any) => (
          <ReviewCard
            data={data}
            id={comment.id}
            key={comment.id}
            avatarUrl={comment.avatar_url}
            fullName={comment.full_name}
            city={comment.city}
            province={comment.province}
            country={comment.country}
            flag={comment.flag}
            createdAt={Format.date(comment.created_at)}
            comment={comment.message}
            trash
            editable={editable === comment.id}
            onEdit={() => onEdit && onEdit(comment.id)}
            edited={comment.edited}
            onDelete={() => onDelete && onDelete(comment.id)}
            onSave={onSave}
          />
        ))}
    </div>
  );
};
