"use client";

import { ArrowLeft, ArrowRight, CameraIcon, ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Setcion_4Props } from "@/app/types/definitions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCards, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";

export const Section_4 = ({ className }: Setcion_4Props) => {
  const [value, setValue] = useState<number>(0);
  const [media, setMedia] = useState<Array<any>>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSlideChange = (swiper: any) => {
    setValue(swiper.activeIndex);
  };

  async function getMedia() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from("upload")
        .list("2334c6e1-adb2-4738-b786-e32570d9318e" + "/", {
          limit: 10,
          offset: 0,
          sortBy: {
            column: "name",
            order: "asc",
          },
        });

      if (data) {
        setMedia(data || []);
        setIsLoading(false);
      } else {
        setError(error as Error);
        setIsLoading(false);
      }
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMedia();
  }, []);

  if (error) {
    return (
      <section
        className={`border border-foreground/5 bg-zinc-900/50 rounded-xl p-8 ${className}`}
      >
        <div className="text-center text-red-400 space-y-2">
          <p>Error al cargar las imágenes</p>
          <p className="text-sm opacity-75">{error.message}</p>
          <button
            onClick={() => {
              setError(null);
              getMedia();
            }}
            className="px-4 py-2 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section
        className={`border border-foreground/5 bg-zinc-900/50 rounded-xl p-8 ${className}`}
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-gray-400">
          <div className="animate-pulse w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center">
            <ImageIcon className="w-8 h-8 opacity-50" />
          </div>
          <p>Cargando galería...</p>
        </div>
      </section>
    );
  }

  if (media.length === 0) {
    return (
      <section
        className={`border border-foreground/5 bg-zinc-900/50 rounded-xl p-8 ${className}`}
      >
        <div className="flex flex-col items-center justify-center space-y-2 text-gray-400">
          <ImageIcon className="w-12 h-12 opacity-50" />
          <p>No hay imágenes disponibles</p>
        </div>
      </section>
    );
  }

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
          className="swiper-button-prev mx-4 -translate-y-3 p-[2px] bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700 rounded-full disabled:cursor-not-allowed"
          title="Previa"
          disabled={media.length <= 1}
        >
          <ArrowLeft />
        </button>
        <small className="-translate-y">
          {media?.length > 0 ? `${value + 1} de ${media.length}` : "0 de 0"}
        </small>
        <button
          className="swiper-button-next mx-4 -translate-y-3 p-[2px] bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700 rounded-full disabled:cursor-not-allowed"
          title="Siguiente"
          disabled={media.length <= 1}
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
                  width={400}
                  height={400}
                  src={`https://yyqjcfzddjozcwahhugs.supabase.co/storage/v1/object/public/upload/2334c6e1-adb2-4738-b786-e32570d9318e/${photo.name}`}
                  alt={`Foto ${i + 1}: ${photo.name}`}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </aside>
    </section>
  );
};
