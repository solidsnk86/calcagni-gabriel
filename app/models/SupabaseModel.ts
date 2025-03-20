import { PartialReviewMarqueeProps } from '../types/definitions';

export class SupabaseModel {
  public static async getProfileVisits() {
    const data = await fetch(
      'https://supabase-rest-api.vercel.app/supabase/optional/?from=profile_visits&select=id,ip&limit=1&order=id',
      {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!data.ok) console.error(data.statusText);
    const visitData = await data.json();
    const { id, ip } = visitData[0];
    return { id, ip };
  }

  public static async getComments() {
    try {
      const data = await fetch(
        'https://supabase-rest-api.vercel.app/supabase/?from=comments&select=*',
        {
          method: 'GET',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!data.ok) throw new Error(data.statusText);
      const comments = (await data.json()) as Promise<
        Array<PartialReviewMarqueeProps>
      >;
      return comments;
    } catch (error) {
      console.error(error);
    }
  }

  public static async getLastVisits() {
    try {
      const data = await fetch(
        'https://supabase-rest-api.vercel.app/supabase/optional/?from=profile_visits&select=city,province,country,flag,created_at&limit=1&order=created_at',
        {
          method: 'GET',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!data.ok) throw new Error(data.statusText);
      const visitsData = await data.json();
      return visitsData[0];
    } catch (error) {
      console.error(error);
    }
  }

  public static async sendDataToSupabase({
    data,
  }: {
    data: { ip: string; city: string; country: string; flag: string };
  }) {
    try {
      const response = await fetch(
        'https://supabase-rest-api.vercel.app/supabase/',
        {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) throw new Error(response.statusText);
    } catch (error) {
      console.error(error);
    }
  }
}
