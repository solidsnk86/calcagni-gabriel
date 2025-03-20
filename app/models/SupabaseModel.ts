export class SupabaseModel {
  public static async getProfileVisits() {
    const data = await fetch(
      'https://supabase-rest-api.vercel.app/supabase/optional/?from=profile_visits&select=id,ip&limit=1&order=id'
    );
    const visitData = await data.json();
    const { id, ip } = visitData[0];
    return { id, ip };
  }
}
