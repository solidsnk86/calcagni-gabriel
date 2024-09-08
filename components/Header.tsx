"use client";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useIsClient } from "@/app/hooks/useIsClient";
import useMatchMedia from "@/app/hooks/useMatchMedia";
import { Section_4 } from "./header-components/Section-4";
import { Section_3 } from "./header-components/Section-3";
import { Section_2 } from "./header-components/Section-2";
import { Section_1 } from "./header-components/Section-1";

export default function Header({ visits }: { visits: number | string }) {
  const isClient = useIsClient();
  const mobile = useMatchMedia("(max-width: 700px)", false);

  return (
    <>
      {isClient && (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 400: 1, 700: 1, 900: 2 }}
          className="my-4"
        >
          {mobile ? (
            <Masonry gutter={mobile ? "0.5rem" : "0.8rem"}>
              <Section_4 />

              <Section_2 visits={visits} />

              <Section_3 />

              <Section_1 />
            </Masonry>
          ) : (
            <Masonry gutter={mobile ? "0.5rem" : "0.8rem"}>
              <Section_1 />

              <Section_2 visits={visits} />

              <Section_3 />

              <Section_4 />
            </Masonry>
          )}
        </ResponsiveMasonry>
      )}
    </>
  );
}
