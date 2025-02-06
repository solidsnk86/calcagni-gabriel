import { haversine } from '@/utils/haversine-formula';
import jsonAirports from './airports.json';

interface AirportData {
  iata: string;
  name: string;
  city: string;
  state: string;
  country: string;
  elevation: number;
  lat: number;
  lon: number;
}

type AirportsMap = {
  [key: string]: AirportData;
};

const getAllAirports = async (): Promise<AirportData[]> => {
  const airportsMap = jsonAirports as AirportsMap;
  const cleanedData: AirportData[] = Object.keys(airportsMap)
    .map((key: string) => {
      const { iata, name, city, state, country, elevation, lat, lon } =
        airportsMap[key];
      return iata
        ? { iata, name, city, state, country, elevation, lat, lon }
        : null;
    })
    .filter((airport): airport is AirportData => airport !== null);
  return cleanedData;
};

const getAllAntennas = async () => {
  try {
    const response = await fetch(
      'https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/wifi-sl-v1.json'
    );
    if (!response.ok) throw new Error(`Cannot get data from cdn`);
    const josnData = await response.json();
    return josnData;
  } catch (err) {
    console.error(err);
  }
};

const getClosest = (coordinates: any, allData: any) => {
  let closestTarget = null;
  let minDistance = Infinity;

  for (const data of allData) {
    const distance = haversine(coordinates, data);

    if (distance < minDistance) {
      minDistance = distance;
      closestTarget = data;
    }
  }

  return { closestTarget, minDistance };
};

const searchAntenna = (
  coordinates: { lat: number; lon: number },
  allData: any,
  query: string
) => {
  let targetDistance = Infinity;
  let searchedTarget = null;
  let searchedTarget5g = null;
  let coords = { latitude: 0, longitude: 0 };
  let mac = null;
  let mac5 = null;

  for (const data of allData) {
    const distance = haversine(coordinates, data);
    const nameA = String(data.name).toLowerCase();
    const nameB = String(data.name5g).toLowerCase();
    if (query === nameA || query === nameB) {
      searchedTarget = data.name;
      searchedTarget5g = data.name5g;
      targetDistance = Number(distance.toFixed(3)) || 0;
      coords.latitude = data.lat;
      coords.longitude = data.lon;
      mac = data.MAC;
      mac5 = data.MAC5g;
    }
  }

  return {
    targetDistance,
    searchedTarget,
    searchedTarget5g,
    coordinates,
    mac,
    mac5,
  };
};

export { getAllAntennas, getAllAirports, getClosest, searchAntenna };
