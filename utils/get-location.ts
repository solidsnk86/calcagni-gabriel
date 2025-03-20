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
    const data = (await this.fetchData()) as Promise<{ ip: string }>;
    return (await data).ip;
  }

  static async country() {
    const data = (await this.fetchData()) as Promise<{
      country: { name: string };
    }>;
    return (await data).country.name;
  }

  static async city() {
    const data = (await this.fetchData()) as Promise<{
      city: { name: string };
    }>;
    return (await data).city.name;
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

  static async flag() {
    const data = (await this.fetchData()) as Promise<{
      country: { emojiFlag: string };
    }>;
    return (await data).country.emojiFlag;
  }
}
