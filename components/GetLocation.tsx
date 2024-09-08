import { api } from "./constants";

export class GetLocation {
  static async fetchData() {
    try {
      const res = await fetch(api.url);
      const data = await res.json();

      if (!res.ok) {
        console.error("Error to get data from api:", res.statusText);
      }

      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  static async ip() {
    const data = await this.fetchData();

    return data.ip.address;
  }

  static async country() {
    const data = await this.fetchData();

    return data.country.name;
  }

  static async city() {
    const data = await this.fetchData();

    return data.city.name;
  }

  static async latitude() {
    const data = await this.fetchData();

    return data.coordinates.latitude;
  }

  static async longitude() {
    const data = await this.fetchData();

    return data.coordinates.longitude;
  }

  static async flag() {
    const data = await this.fetchData();

    return data.country.flag;
  }
}
