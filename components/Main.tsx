'use client';

import useMatchMedia from '@/app/hooks/useMatchMedia';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Section_1 } from './main-section/Section-1';
import { Section_2 } from './main-section/Section-2';
import { useIsClient } from '@/app/hooks/useIsClient';
import { Section_3 } from './main-section/Section-3';
import { Section_4 } from './main-section/Section-4';
import { useEffect, useState } from 'react';
import { GetLocation } from '../utils/get-location';
import { Section_5 } from './main-section/Section-5';
import { DataModel } from '@/app/lib/actions';

export default function Main() {
  const mobile = useMatchMedia('(max-width: 700px)', true);
  const isClient = useIsClient();
  const [comments, setComments] = useState<any>([]);
  const [location, setLocation] = useState<any>({});
  const [lastVisit, setLastVisit] = useState<any>([]);
  const [delayed, setDelayed] = useState(mobile);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayed(mobile);
    }, 100);

    return () => clearTimeout(timer);
  }, [mobile]);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  const fetchComments = async () => {
    try {
      const data = await DataModel.getData('comments', '*');

      setComments(data);
    } catch (error) {
      console.error('Error', error);
    }

    const visitsData = await DataModel.getLastVisit();
    setLastVisit(visitsData[0]);
  };

  const getLocation = async () => {
    const dataLocation = {
      ip: await GetLocation.ip(),
      city: await GetLocation.city(),
      country: await GetLocation.country(),
      province: await GetLocation.province(),
      flag: await GetLocation.flag(),
    };

    setLocation(dataLocation);
  };

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
              <Section_4
                city={location.city}
                country={location.country}
                province={location.province}
                flag={location.flag}
                className={mobile ? 'w-[100%]' : 'w-[40%]'}
              />
            </div>
            <Section_5
              city={lastVisit.city}
              flag={lastVisit.flag}
              country={lastVisit.country}
              createdAt={lastVisit.created_at}
              className={mobile ? 'mt-2' : 'mt-4'}
            />
          </Masonry>
        </ResponsiveMasonry>
      </>
    )
  );
}
