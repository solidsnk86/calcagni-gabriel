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
import { GetLocation } from "./GetLocation";
import { Section_5 } from "./main-section/Section-5";
import { getLastVisit } from "@/app/lib/actions";

export default function Main() {
  const mobile = useMatchMedia("(max-width: 700px)", false);
  const isClient = useIsClient();
  const [comments, setComments] = useState<any>([]);
  const [location, setLocation] = useState<any>({});
  const [lastVisit, setLastVisit] = useState<any>([]);
  const [navLocation, setNavLocation] = useState<any>({});

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase.from("comments").select("*");

      if (error) {
        console.error("Error to get data from database", error.message);
      }

      setComments(data);
    } catch (error) {
      console.error("Error", error);
    }

    const visitsData = await getLastVisit();
    setLastVisit(visitsData[0]);
  };

  const getLocation = async () => {
    const dataLocation = {
      ip: await GetLocation.ip(),
      city: await GetLocation.city(),
      country: await GetLocation.country(),
      flag: await GetLocation.flag(),
    };
    setLocation(dataLocation);
  };

  useEffect(() => {
    const navigatorLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          setNavLocation({ longitude, latitude });
        });
      }
    };
    navigatorLocation();
    fetchComments();
    getLocation();
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
                city={location.city}
                country={location.country}
                flag={location.flag}
                latitude={
                  navLocation.latitude
                    ? navLocation.latitude
                    : location.latitude
                }
                longitude={
                  navLocation.longitude
                    ? navLocation.longitude
                    : location.longitude
                }
                className={mobile ? "w-[100%]" : "w-[30%]"}
              />
            </div>
            <Section_5
              city={lastVisit.city}
              country={lastVisit.country}
              createdAt={lastVisit.created_at}
              className={mobile ? "mt-2" : "mt-4"}
            />
          </Masonry>
        </ResponsiveMasonry>
      </>
    )
  );
}
