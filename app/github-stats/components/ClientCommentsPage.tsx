'use client';

import { supabase } from '@/utils/supabase/client';
import { ClientCommentForm } from './ClientCommentForm';
import { useState } from 'react';
import { ReviewClientCard } from './ReviewClientCard';
import { GithubStats } from '@/app/github-stats/components/Github-Stats';

export const CLientCommentsPage = ({
  user,
  initialData,
}: {
  user: any;
  initialData: any;
}) => {
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState<string | number | null>(null);

  const handleRefresh = async () => {
    const [comments] = await Promise.all([
      fetch(`api/comments?username=${user.user_metadata.user_name}`, {
        headers: { 'content-type': 'application/json' },
        method: 'GET',
      }),
    ]);
    const refreshedData = await comments.json();

    setData(refreshedData);
  };

  const handleSave = async (
    id: string | number,
    newComment: string,
    edited: boolean
  ) => {
    const response = await fetch(`/api/comments/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, message: newComment, edited }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('No se pudo guardar el comentario:', result.message);
      return;
    }

    setData(
      data.map(
        (post: { id: string | number; message: string; edited: boolean }) =>
          post.id === id ? { ...post, message: newComment, edited } : post
      )
    );
    setEditingId(null);
  };

  const handleEdit = (id: string | number) => {
    setEditingId(id);
  };

  return (
    <>
      <div className="w-full">
        <ClientCommentForm
          userName={user.user_metadata.user_name}
          fullName={user.user_metadata.full_name}
          avatar={user.user_metadata.avatar_url}
          onRefresh={handleRefresh}
        />
        {data && data.length > 0 ? (
          <h1 className="text-center text-xl font-semibold my-12">
            {data.length === 1 ? 'Último comentario' : 'Últimos comentarios'}
          </h1>
        ) : null}
        <ReviewClientCard
          data={data}
          onDelete={handleRefresh}
          onEdit={handleEdit}
          onSave={handleSave}
        />
      </div>
      <GithubStats className="mt-10" user={user.user_metadata.user_name} />
    </>
  );
};
