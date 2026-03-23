import {
  PartialReviewMarqueeProps,
} from '../types/definitions';

export class SupabaseModel {
  public static async getComments() {
    try {
      const response = await fetch(
        '/api/all-comments',
        {
          method: 'GET',
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

  public static async sendDataToSupabase({
    data
  }: {
    data: { ip: string; city: string; country: string; flag: string };
  }) {
    try {
      const response = await fetch(
        '/api/visits/send-data',
        {
          method: 'POST',
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
