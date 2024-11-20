"use client";

import { ArrowLeft, ArrowRight, CameraIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Setcion_4Props } from "@/app/types/definitions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCards, Keyboard } from "swiper/modules";
import { photosImg } from "@/components/constants";
import "swiper/css";
import "swiper/css/pagination";

export const Section_4: React.FC<Setcion_4Props> = ({ className }) => {
  const [value, setValue] = useState<number>(0);

  const handleSlideChange = (swiper: any) => {
    setValue(swiper.activeIndex);
  };

  return (
    <section
      className={`border border-foreground/5 bg-zinc-900/50 rounded-xl overflow-hidden ${className}`}
    >
      <header className="text-center p-6">
        <p className="text-gray-400">
          <CameraIcon className="inline mr-1 -translate-y-[2px] text-violet-400 w-5 h-[18px]" />
          Fotos
        </p>
        <h3 className="text-white text-lg font-bold">Galeria de Fotos</h3>
      </header>
      <div className="flex justify-evenly">
        <button
          className="swiper-button-prev mx-4 -translate-y-3 p-[2px] bg-zinc-800 border-zinc-800/50 rounded-full"
          title="Previa"
        >
          <ArrowLeft />
        </button>
        <small className="-translate-y">
          {value + 1} de {photosImg.length}
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
          {photosImg.map((photo, i) => (
            <SwiperSlide key={i + 1}>
              <img src={photo.link} alt={`Foto ${i + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </aside>
    </section>
  );
};
