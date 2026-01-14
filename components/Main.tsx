'use client';

import useMatchMedia from '@/app/hooks/useMatchMedia';
import { Section_1 } from './main-section/Section-1';
import { Section_2 } from './main-section/Section-2';
import { useIsClient } from '@/app/hooks/useIsClient';
import { Section_3 } from './main-section/Section-3';
import { Section_4 } from './main-section/Section-4';
import { useCallback, useEffect, useState } from 'react';
import { Section_5 } from './main-section/Section-5';
import { SupabaseModel } from '@/app/models/SupabaseModel';

export default function Main() {
  const mobile = useMatchMedia('(max-width: 700px)', true);
  const isClient = useIsClient();
  const [comments, setComments] = useState<any>([]);
  const [lastVisit, setLastVisit] = useState<any>([]);

  const fetchLastVisits = useCallback(async () => {
    try {
      const visitsData = await SupabaseModel.getLastVisits();
      setLastVisit(visitsData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchComments = useCallback(async () => {
    try {
      const data = await SupabaseModel.getComments();
      setComments(data);
    } catch (error) {
      console.error('Error', error);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    fetchLastVisits();
  }, []);

  return (
    isClient && (
      <>
        <div className="main-bento-grid gap-2 md:gap-3">
          <Section_1 />
          <Section_2 />
        </div>
        <div className={mobile ? 'grid mt-2 gap-2' : 'flex mt-3 gap-3'}>
          <Section_3
            data={comments && comments}
            className={mobile ? 'w-full' : 'w-[60%]'}
          />
          <Section_4 className={mobile ? 'w-full' : 'w-[40%]'} />
        </div>
        <Section_5
          city={lastVisit.city}
          country={lastVisit.country}
          flag={lastVisit.flag}
          createdAt={lastVisit.created_at}
          className={mobile ? 'mt-2' : 'mt-3'}
        />
      </>
    )
  );
}
