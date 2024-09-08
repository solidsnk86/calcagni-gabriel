"use client";

import useMatchMedia from "@/app/hooks/useMatchMedia";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Section_1 } from "./main-section/Section-1";
import { Section_2 } from "./main-section/Section-2";
import { useIsClient } from "@/app/hooks/useIsClient";
import { Section_3 } from "./main-section/Section-3";
import { Section_4 } from "./main-section/Section-4";
import { supabase } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Main({
  city,
  country,
  flag,
  latitude,
  longitude,
}: {
  city?: string;
  country?: string;
  flag?: string;
  longitude?: string | number;
  latitude?: string | number;
}) {
  const mobile = useMatchMedia("(max-width: 700px)", false);
  const isClient = useIsClient();
  const [comments, setComments] = useState<any>([]);

  const fetchComments = async () => {
    const { data, error } = await supabase.from("comments").select("*");

    if (error) {
      console.error("Error to get data from database", error.message);
    }
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    isClient && (
      <>
        <ResponsiveMasonry columnsCountBreakPoints={{ 400: 1, 700: 1, 900: 2 }}>
          <Masonry gutter={mobile ? "0.5rem" : "0.8rem"}>
            <Section_1 />
            <Section_2 />
          </Masonry>
        </ResponsiveMasonry>
        <ResponsiveMasonry columnsCountBreakPoints={{ 400: 1, 700: 1, 900: 1 }}>
          <Masonry>
            <div className={mobile ? "grid mt-2 gap-2" : "flex mt-4 gap-4"}>
              <Section_3
                data={comments && comments}
                className={mobile ? "w-[100%]" : "w-[70%]"}
              />
              <Section_4
                city={city}
                country={country}
                flag={flag}
                latitude={latitude}
                longitude={longitude}
                className={mobile ? "w-[100%]" : "w-[30%]"}
              />
            </div>
          </Masonry>
        </ResponsiveMasonry>
      </>
    )
  );
}
