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
  const [data, setData] = useState<any>(initialData);
  const [editingId, setEditingId] = useState<string | number | null>(null);

  const handleRefresh = async () => {
    const { data: refreshedData, error } = await supabase
      .from('comments')
      .select('*')
      .eq('user_name', user.user_metadata.user_name)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error to get data from supabase: ${error.message}`);
    }

    setData(refreshedData);
  };

  const handleSave = async (
    id: string | number,
    newComment: string,
    edited: boolean
  ) => {
    const { data: updatedData, error } = await supabase
      .from('comments')
      .update({ message: newComment, edited })
      .match({ id })
      .select();

    if (error) {
      console.error('No se pudo guardar el comentario', error.message);
    } else if (updatedData) {
      setData(
        data.map(
          (post: { id: string | number; message: string; edited: boolean }) =>
            post.id === id ? { ...post, message: newComment, edited } : post
        )
      );
      setEditingId(null);
    }
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
