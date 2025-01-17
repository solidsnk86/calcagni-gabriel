let url = '';
const hook: Record<string, string> = {};

export class GetLocation {
  public static async fetchData() {
    try {
      const response = await fetch(
        'https://solid-geolocation.vercel.app/location'
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Cannot get the ip server API', err);
    }
  }

  static async ip() {
    const data = await this.fetchData();
    return data.ip;
  }

  static async country() {
    const data = await this.fetchData();
    return data.country.name;
  }

  static async city() {
    const data = (await this.fetchData()) as Promise<{
      haversine_location: { city: string };
    }>;
    return (await data).haversine_location.city;
  }

  static async latitude() {
    const data = (await this.fetchData()) as Promise<{
      coords: { latitude: number | string };
    }>;
    return (await data).coords.latitude;
  }

  static async longitude() {
    const data = (await this.fetchData()) as Promise<{
      coords: { longitude: number | string };
    }>;
    return (await data).coords.longitude;
  }

  static async province() {
    const data = await this.fetchData();
    return data.city.name;
  }

  static async flag() {
    const data = await this.fetchData();
    return data.country.flag.emoji_flag;
  }
}
