export class GetLocation {
  static async fetchData() {
    try {
      const res = await fetch("https://geolocation.microlink.io");
      const data = await res.json();

      if (!res.ok) {
        console.error("Error to fetch data location", res.statusText);
      }

      return data;
    } catch (error) {
      console.error("Error to get data:", error);
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
