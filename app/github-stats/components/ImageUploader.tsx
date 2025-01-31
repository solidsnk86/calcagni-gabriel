'use client';

import { TitleComponent } from '@/components/ComponentTitles';
import { Loader } from '@/components/Loader';
import { supabase } from '@/utils/supabase/client';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function ImageUpload({ userId }: { userId: string | number }) {
  const [media, setMedia] = useState<Array<any>>([]);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>();

  async function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    let file: File | any;
    if (event.target.files && event.target.files.length > 0) {
      file = event.target.files[0];
    }
    setLoading(true);

    const { data, error } = await supabase.storage
      .from('upload')
      .upload(userId + '/' + uuidv4(), file);

    if (data) {
      setLoading(false);
      getMedia();
    } else {
      setError(error);
      setLoading(false);
    }
  }

  async function getMedia() {
    const { data, error } = await supabase.storage
      .from('upload')
      .list(userId + '/', {
        limit: 10,
        offset: 0,
        sortBy: {
          column: 'name',
          order: 'asc',
        },
      });

    if (data) {
      setMedia(data);
    } else {
      setError(error);
    }
  }

  async function deleteMedia(fileName: string) {
    setLoading(true);
    try {
      const { error } = await supabase.storage
        .from('upload')
        .remove([`${userId}/${fileName}`]);

      if (error) {
        setError(error);
        setLoading(false);
      } else {
        await getMedia();
        setLoading(false);
      }
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getMedia();
  }, [userId]);

  return (
    <div className="p-4">
      <TitleComponent.H2 className="text-center mb-12">
        Mis Fotos
      </TitleComponent.H2>
      <h2 className="text-xl font-bold mb-4">Subir Foto</h2>

      <div className="mb-6">
        <input
          type="file"
          onChange={uploadImage}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          accept="image/*"
        />
        {loading && (
          <Loader
            width={45}
            height={45}
            className="flex justify-center mx-auto my-4"
          />
        )}
      </div>

      <div className="xl:max-w-2xl xl:w-[672px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 image-uploader">
        {media.length === 0 ? (
          <Loader
            className="flex justify-center mx-auto my-6 left-1/2"
            width={45}
            height={45}
          />
        ) : (
          media.map((item) => (
            <div key={item.id} className="relative group">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <Image
                  src={`https://yyqjcfzddjozcwahhugs.supabase.co/storage/v1/object/public/upload/${userId}/${item.name}`}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => deleteMedia(item.name)}
                  className="absolute top-2 right-2 p-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                  title="Eliminar imagen"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-500 rounded">
          {error.message}
        </div>
      )}
    </div>
  );
}
