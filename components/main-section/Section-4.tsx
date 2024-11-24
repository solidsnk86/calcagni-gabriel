"use client";

import { ArrowLeft, ArrowRight, CameraIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Setcion_4Props } from "@/app/types/definitions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCards, Keyboard } from "swiper/modules";
import { photosImg } from "@/components/constants";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";

export const Section_4 = ({ className, userId }: Setcion_4Props) => {
  const [value, setValue] = useState<number>(0);
  const [media, setMedia] = useState<Array<any>>();
  const [error, setError] = useState<Error>();

  const handleSlideChange = (swiper: any) => {
    setValue(swiper.activeIndex);
  };

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
    <section
      className={`border border-foreground/5 bg-zinc-900/50 rounded-xl overflow-hidden ${className}`}
    >
      <header className="text-center p-6">
        <p className="text-gray-400">
          <CameraIcon className="inline mr-1 -translate-y-[2px] text-violet-400 w-5 h-[18px]" />
          Fotos
        </p>
        <h3 className="text-white text-lg font-bold">Galeria de Imágenes</h3>
      </header>
      <div className="flex justify-evenly">
        <button
          className="swiper-button-prev mx-4 -translate-y-3 p-[2px] bg-zinc-800 border-zinc-800/50 rounded-full"
          title="Previa"
        >
          <ArrowLeft />
        </button>
        <small className="-translate-y">
          {value + 1} de {media?.length}
        </small>
        <button
          className="swiper-button-next mx-4 -translate-y-3 p-[2px] bg-zinc-800 border-zinc-800/50 rounded-full"
          title="Siguiente"
        >
          <ArrowRight />
        </button>
      </div>
      <aside className="w-[100%] relative text-center">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Keyboard, Navigation, Pagination]}
          pagination={{ clickable: true }}
          keyboard={{ enabled: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          onSlideChange={handleSlideChange}
          className="mySwiper"
        >
          {media &&
            media.map((photo, i) => (
              <SwiperSlide key={i + 1}>
                <Image
                  className="next-img"
                  fill
                  src={`https://yyqjcfzddjozcwahhugs.supabase.co/storage/v1/object/public/upload/${userId}/${photo.name}`}
                  alt={`Foto ${i + 1}: ${photo.name}`}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </aside>
    </section>
  );
};
