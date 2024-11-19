import { ArrowLeft, ArrowRight, CameraIcon } from "lucide-react";
import React from "react";
import { Setcion_4Props } from "@/app/types/definitions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCards, Keyboard } from "swiper/modules";
import { photosImg } from "@/components/constants";
import "swiper/css";
import "swiper/css/pagination";

export const Section_4: React.FC<Setcion_4Props> = ({ className }) => {
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
          className="mySwiper"
        >
          {photosImg.map((photo, i) => {
            return (
              <SwiperSlide key={i + 1}>
                <img src={photo.link} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </aside>
    </section>
  );
};
