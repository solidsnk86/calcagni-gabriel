'use client';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useIsClient } from '@/app/hooks/useIsClient';
import useMatchMedia from '@/app/hooks/useMatchMedia';
import { Section_4 } from '@/components/header-components/Section-4';
import { Section_3 } from '@/components/header-components/Section-3';
import { Section_2 } from '@/components/header-components/Section-2';
import { Section_1 } from '@/components/header-components/Section-1';
import { useCallback, useEffect, useState } from 'react';
import { GetLocation } from '@/utils/get-location';
import { SupabaseModel } from '@/app/models/SupabaseModel';

export default function Header() {
  const isClient = useIsClient();
  const mobile = useMatchMedia('(max-width: 700px)', false);
  const [visits, setVisits] = useState<number | string>();
  const [delayed, setDelayed] = useState(mobile);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayed(mobile);
    }, 100);

    return () => clearTimeout(timer);
  }, [mobile]);

  const sendDataLocation = useCallback(async () => {
    const objectData = {
      ip: await GetLocation.ip(),
      city: await GetLocation.city(),
      country: await GetLocation.country(),
      flag: await GetLocation.flag(),
    };

    try {
      const { id: visitsData, ip: lastIp } =
        await SupabaseModel.getProfileVisits();

      if (lastIp !== objectData.ip) {
        await SupabaseModel.sendDataToSupabase({ data: objectData });
      }

      setVisits(visitsData);
    } catch (error) {
      console.error('Error sending data location:', error);
    }
  }, []);

  useEffect(() => {
    sendDataLocation();
  }, []);

  if (!isClient) return null;

  return (
    <>
      {isClient && (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 400: 1, 700: 1, 900: 2 }}
          className="my-3"
        >
          {mobile ? (
            <Masonry gutter={mobile ? '0.5rem' : '0.8rem'}>
              <Section_4 />
              <Section_2 visits={visits} />
              <Section_3 />
              <Section_1 />
            </Masonry>
          ) : (
            <Masonry gutter={mobile ? '0.5rem' : '0.8rem'}>
              <Section_1 />
              <Section_2 visits={visits} />
              <Section_4 />
              <Section_3 />
            </Masonry>
          )}
        </ResponsiveMasonry>
      )}
    </>
  );
}
