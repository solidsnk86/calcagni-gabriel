"use client";

import { supabase } from "@/utils/supabase/client";
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

  useEffect(() => {
    getMedia();
  }, [userId]);

  return (
    <div>
      <h2>Subir Foto</h2>
      <div className="grid my-3">
        <input type="file" onChange={(e) => uploadImage(e)} />
        {uploading && (
          <small className="text-blue-500">Subiendo imagen...</small>
        )}
      </div>
      <figure className="grid lg:grid-cols-3 grid-cols-1 gap-3">
        {media.map((item) => (
          <Image
            key={item.id}
            src={`https://yyqjcfzddjozcwahhugs.supabase.co/storage/v1/object/public/upload/2334c6e1-adb2-4738-b786-e32570d9318e/${item.name}`}
            alt={item.name}
            width={300}
            height={300}
            className="object-cover rounded"
          />
        ))}
      </figure>
      {error && <small className="text-red-400">{error.message}</small>}
    </div>
  );
}
