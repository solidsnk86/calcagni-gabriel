import { PartialReviewMarqueeProps } from '../types/definitions';

export class SupabaseModel {
  public static async getProfileVisits() {
    const data = await fetch(
      'https://supabase-rest-api.vercel.app/supabase/optional/?from=profile_visits&select=id,ip&limit=1&order=id'
    );
    const visitData = await data.json();
    const { id, ip } = visitData[0];
    return { id, ip };
  }

  public static async getComments() {
    const data = await fetch(
      'https://supabase-rest-api.vercel.app/supabase/?from=comments&select=*'
    );
    const comments = (await data.json()) as Promise<
      Array<PartialReviewMarqueeProps>
    >;
    return comments;
  }

  public static async getLastVisits() {
    const data = await fetch(
      'https://supabase-rest-api.vercel.app/supabase/optional/?from=profile_visits&select=city,province,country,flag,created_at&limit=1&order=created_at'
    );
    const visitsData = await data.json();
    return visitsData[0];
  }
}
