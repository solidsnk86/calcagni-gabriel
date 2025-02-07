const EARTH_RAIDUS = 6378137;
const square = (num: number) => num * num;
const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180.0;

type Coords = {
  lat: number;
  lon: number;
  latitude?: any;
  longitude?: any;
};

export const haversine = (locationA: Coords, locationB: Coords) => {
  const latitudeA = degreesToRadians(
    locationA.lat || (locationA.latitude as number)
  );
  const latitudeB = degreesToRadians(
    locationB.lat || (locationB.latitude as number)
  );
  const longitudeA = degreesToRadians(
    locationA.lon || (locationA.longitude as number)
  );
  const longitudeB = degreesToRadians(
    locationB.lon || (locationB.longitude as number)
  );
  // Fórmula de Haversine
  const formula =
    square(Math.sin((latitudeB - latitudeA) / 2)) +
    Math.cos(latitudeA) *
      Math.cos(latitudeB) *
      square((longitudeB - longitudeA) / 2);
  // Calcular distancia usando la fórmula de Haversine
  const distance = 2 * EARTH_RAIDUS * Math.asin(Math.sqrt(formula));
  return distance / 1000;
};
