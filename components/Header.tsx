'use client';

import { useIsClient } from '@/app/hooks/useIsClient';
import useMatchMedia from '@/app/hooks/useMatchMedia';
import { Section_4 } from '@/components/header-components/Section-4';
import { Section_3 } from '@/components/header-components/Section-3';
import { Section_2 } from '@/components/header-components/Section-2';
import { Section_1 } from '@/components/header-components/Section-1';
import { useCallback, useEffect, useState } from 'react';
import { GetLocation } from '@/utils/get-location';
import { SupabaseModel } from '@/app/models/SupabaseModel';
import { closeDialog, showDialog } from '@/utils/dialog';
import { X } from 'lucide-react';

export default function Header() {
  const isClient = useIsClient();
  const mobile = useMatchMedia('(max-width: 700px)', false);
  const [visits, setVisits] = useState<number | string>();

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
    <div className="my-3">
      {mobile ? (
        <div className="flex flex-col gap-2">
          <Section_4 />
          <Section_2 visits={visits} />
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
            <Section_2 visits={visits} />
            <Section_4 className="flex-1" />
          </div>
        </div>
      )}
    </div>
  );
}
