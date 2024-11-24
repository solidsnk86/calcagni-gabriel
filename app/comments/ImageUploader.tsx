"use client";

import { supabase } from "@/utils/supabase/client";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ImageUpload({ userId }: { userId: string | number }) {
  const [media, setMedia] = useState<Array<any>>([]);
  const [error, setError] = useState<Error>();
  const [uploading, setUploading] = useState<boolean>();

  async function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    let file: File | any;
    if (event.target.files && event.target.files.length > 0) {
      file = event.target.files[0];
    }
    setUploading(true);

    const { data, error } = await supabase.storage
      .from("upload")
      .upload(userId + "/" + uuidv4(), file);

    if (data) {
      setUploading(false);
      getMedia();
    } else {
      setError(error);
      setUploading(false);
    }
  }

  async function getMedia() {
    const { data, error } = await supabase.storage
      .from("upload")
      .list(userId + "/", {
        limit: 10,
        offset: 0,
        sortBy: {
          column: "name",
          order: "asc",
        },
      });

    if (data) {
      setMedia(data);
    } else {
      setError(error);
    }
  }

  async function deleteMedia(fileName: string) {
    try {
      const { error } = await supabase.storage
        .from("upload")
        .remove([`${userId}/${fileName}`]);

      if (error) {
        setError(error);
      } else {
        getMedia();
      }
    } catch (err) {
      setError(err as Error);
    }
  }

  useEffect(() => {
    getMedia();
  }, [userId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Subir Foto</h2>

      <div className="mb-6">
        <input
          type="file"
          onChange={uploadImage}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          accept="image/*"
        />
        {uploading && (
          <div className="mt-2 text-blue-500">Subiendo imagen...</div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {media.map((item) => (
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
        ))}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-500 rounded">
          {error.message}
        </div>
      )}
    </div>
  );
}
