import {
  PartialReviewMarqueeProps,
  SupabaseResponse,
} from '../types/definitions';

export class SupabaseModel {
  public static async getProfileVisits() {
    const response = await fetch(
      'https://supabase-rest-api.vercel.app/supabase/optional/?from=profile_visits&select=id,ip&limit=1&order=id',
      {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!response.ok) console.error(response.statusText);
    const visitData = await response.json();
    const { id, ip } = visitData[0];
    return { id, ip };
  }

  public static async getComments() {
    try {
      const response = await fetch(
        'https://supabase-rest-api.vercel.app/supabase/?from=comments&select=*',
        {
          method: 'GET',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!response.ok) throw new Error(response.statusText);
      const comments = (await response.json()) as Promise<
        Array<PartialReviewMarqueeProps>
      >;
      return comments;
    } catch (error) {
      console.error(error);
    }
  }

  public static async getLastVisits() {
    try {
      const response = await fetch(
        'https://supabase-rest-api.vercel.app/supabase/optional/?from=profile_visits&select=city,province,country,flag,created_at&limit=1&order=created_at',
        {
          method: 'GET',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!response.ok) throw new Error(response.statusText);
      const visitsData = await response.json();
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
        'https://supabase-rest-api.vercel.app/supabase/?from=profile_visits',
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
