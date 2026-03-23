'use client';

import { useIsClient } from '@/app/hooks/useIsClient';
import useMatchMedia from '@/app/hooks/useMatchMedia';
import { Section_4 } from '@/components/header-components/Section-4';
import { Section_3 } from '@/components/header-components/Section-3';
import { Section_2 } from '@/components/header-components/Section-2';
import { Section_1 } from '@/components/header-components/Section-1';
import { useCallback, useEffect } from 'react';
import { SupabaseModel } from '@/app/models/SupabaseModel';
import { useLastVisit, useLocation } from '@/app/contexts/location-provider';

export default function Header() {
  const isClient = useIsClient();
  const mobile = useMatchMedia('(max-width: 700px)', false);
  const { data } = useLocation();
  const { data: lastVisit, isLoading } = useLastVisit();

  const sendDataLocation = useCallback(async () => {
    if (!data || !lastVisit) return;

    const objectData = {
      ip: data.ip,
      city: data.city.name,
      country: data.country.name,
      flag: data.country.emojiFlag,
    };

    try {
      const lastIp = lastVisit.ip;

      if (lastIp !== objectData.ip) {
        setTimeout(async () => await SupabaseModel.sendDataToSupabase({ data: objectData }), 400)
      }

    } catch (error) {
      console.error('Error sending data location:', error);
    }
  }, []);

  useEffect(() => {
    sendDataLocation()
  }, []);

  if (!isClient) return null;

  return (
    <div className="my-3">
      {mobile ? (
        <div className="flex flex-col gap-2">
          <Section_4 />
          <Section_2 visits={lastVisit?.id || 0} isLoading={isLoading} />
          <Section_3 />
          <Section_1 />
        </div>
      ) : (
        <div className="flex gap-3">
          {/* Columna Izquierda */}
          <div className="flex flex-col gap-3 w-[49.50%]">
            <Section_1 />
            <Section_3 />
          </div>
          {/* Columna Derecha */}
          <div className="flex flex-col gap-3 w-1/2">
            <Section_2 visits={lastVisit?.id || 0} isLoading={isLoading} />
            <Section_4 className="flex-1" />
          </div>
        </div>
      )}
    </div>
  );
}
