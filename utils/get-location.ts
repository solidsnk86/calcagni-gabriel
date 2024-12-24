const apiId = process.env.NEXT_PUBLIC_WEATHER_API;
const token = process.env.NEXT_PUBLIC_IP_API;

let url = "";
const hook: Record<string, string> = {};

export class GetLocation {
  static async fetchData() {
    try {
      const response = await fetch(`https://ipinfo.io/json?token=${token}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Cannot get the ip server API", err);
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
          hook.lat = data.coord.lat;
          hook.lon = data.coord.lon;
          resolve(hook);
        }),
          (error: Error) => {
            reject(error.message);
          };
      } else {
        reject(new Error("Geolocalización no soportada por el navegador."));
      }
    });
  }

  static async ip() {
    const data = await this.fetchData();
    return data.ip;
  }

  static async country() {
    const data = await this.fetchData();
    return data.country || "No disponible";
  }

  static async city() {
    const data = (await this.getCityFromWheaterAPI()) as Promise<{
      city: string;
    }>;
    return (await data).city;
  }

  static async latitude() {
    const data = (await this.getCityFromWheaterAPI()) as Promise<{
      lat: number | string;
    }>;
    return (await data).lat;
  }

  static async longitude() {
    const data = (await this.getCityFromWheaterAPI()) as Promise<{
      lon: number | string;
    }>;
    return (await data).lon;
  }

  static async province() {
    let data = await this.fetchData();
    data = data.timezone.replace(/.*\//, "");
    return data.replace("_", " ");
  }

  static async flag() {
    const data = await this.fetchData();
    return data.country === "AR" ? "🇦🇷" : data.country;
  }
}
