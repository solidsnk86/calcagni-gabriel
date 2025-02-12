import { haversine } from '@/utils/haversine-formula';

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
  let mac = null;
  let mac5 = null;
  let coords = { latitude: 0, longitude: 0 };

  for (const data of allData) {
    const distance = haversine(coordinates, data);
    const nameA = String(data.name).toLowerCase();
    const nameB = String(data.name5g).toLowerCase();
    if (query === nameA || query === nameB) {
      searchedTarget = data.name;
      searchedTarget5g = data.name5g;
      targetDistance = Number(distance);
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

export { getAllAntennas, getClosest, searchAntenna };
