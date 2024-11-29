import { api } from "./constants";

const apiId = process.env.NEXT_PUBLIC_WEATHER_API;
let url: string = "";
let hook: any = {};

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

  static async getCityFromWheaterAPI() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiId}`;

          const res = await fetch(url);
          const data = await res.json();
          hook.city = data.name;
          resolve(hook);
        }),
          (error: Error) => {
            reject(error);
          };
      } else {
        reject(new Error("Geolocalización no soportada por el navegador."));
      }
    });
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
    const data: any | [] =
      (await this.getCityFromWheaterAPI()) ?? (await this.fetchData());
    return data.city ?? data.city.name;
  }

  static async latitude() {
    const data = await this.fetchData();
    return data.coordinates.latitude;
  }

  static async longitude() {
    const data = await this.fetchData();
    return data.coordinates.longitude;
  }

  static async province() {
    let data = await this.fetchData();
    data = data.timezone.replace(/.*\//, "");
    return data.replace("_", " ");
  }

  static async flag() {
    const data = await this.fetchData();
    return data.country.flag;
  }
}
