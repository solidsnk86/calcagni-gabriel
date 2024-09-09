"use client";

import { ReviewCard } from "@/components/magic-ui/ReviewsMarquee";
import { ReviewsClientTypes } from "../types/types";
import React from "react";
import { Format } from "@/components/Format";

export const ReviewClientCard: React.FC<ReviewsClientTypes> = ({
  data,
  onDelete,
}) => {
  return (
    <div className="flex flex-col justify-center mx-auto">
      {data &&
        data.map((comment: any) => (
          <ReviewCard
            data={data}
            id={comment.id}
            key={comment.id}
            avatarUrl={comment.avatar_url}
            fullName={comment.full_name}
            city={comment.city}
            country={comment.country}
            createdAt={Format.formatDate(comment.created_at)}
            comment={comment.message}
            trash
            onDelete={() => onDelete && onDelete(comment.id)}
          />
        ))}
    </div>
  );
};
