'use client';

import useMatchMedia from '@/app/hooks/useMatchMedia';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Section_1 } from './main-section/Section-1';
import { Section_2 } from './main-section/Section-2';
import { useIsClient } from '@/app/hooks/useIsClient';
import { Section_3 } from './main-section/Section-3';
import { Section_4 } from './main-section/Section-4';
import { useCallback, useEffect, useState } from 'react';
import { Section_5 } from './main-section/Section-5';
import { SupabaseModel } from '@/app/models/SupabaseModel';
import { showDialog } from '@/utils/dialog';

export default function Main() {
  const mobile = useMatchMedia('(max-width: 700px)', true);
  const isClient = useIsClient();
  const [comments, setComments] = useState<any>([]);
  const [lastVisit, setLastVisit] = useState<any>([]);
  const [delayed, setDelayed] = useState(mobile);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayed(mobile);
    }, 100);

    return () => clearTimeout(timer);
  }, [mobile]);

  const fetchLastVisits = useCallback(async () => {
    try {
      const visitsData = await SupabaseModel.getLastVisits();
      setLastVisit(visitsData);
    } catch (err) {
      console.error(err);
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

  if (lastVisit.ip === '188.192.167.115') {
    showDialog({
      content: (
        <div className="p-5">
          <h3>Hallo Toti! Wie geht es dir?</h3>
          <p>Ich hoffe, du hast einen großartigen Tag!</p>
        </div>
      ),
    });
  }

  return (
    isClient && (
      <>
        <ResponsiveMasonry columnsCountBreakPoints={{ 400: 1, 700: 1, 900: 2 }}>
          <Masonry gutter={mobile ? '0.5rem' : '0.8rem'}>
            <Section_1 />
            <Section_2 />
          </Masonry>
        </ResponsiveMasonry>
        <ResponsiveMasonry columnsCountBreakPoints={{ 400: 1, 700: 1, 900: 1 }}>
          <Masonry>
            <div className={mobile ? 'grid mt-2 gap-2' : 'flex mt-4 gap-4'}>
              <Section_3
                data={comments && comments}
                className={mobile ? 'w-[100%]' : 'w-[60%]'}
              />
              <Section_4 className={mobile ? 'w-[100%]' : 'w-[40%]'} />
            </div>
            <Section_5
              city={lastVisit.city}
              country={lastVisit.country}
              flag={lastVisit.flag}
              createdAt={lastVisit.created_at}
              className={mobile ? 'mt-2' : 'mt-4'}
            />
          </Masonry>
        </ResponsiveMasonry>
      </>
    )
  );
}
