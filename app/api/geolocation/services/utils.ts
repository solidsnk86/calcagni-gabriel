import { haversine } from '@/utils/haversine-formula';

const getClosest = (
  coordinates: { lat: number; lon: number },
  allData: any
) => {
  let closestTarget = null;
  let secondClosestTarget = null;
  let minDistance = Infinity;
  let secondMinDistance = Infinity;
  let coords = { lat: 0, lon: 0 };
  let secondCoords = { lat: 0, lon: 0 };

  for (const data of allData) {
    const distance = haversine(coordinates, data);

    if (distance < minDistance) {
      secondMinDistance = minDistance;
      secondClosestTarget = closestTarget;
      secondCoords = { ...coords };

      minDistance = distance;
      closestTarget = data;
      coords = { lat: data.lat, lon: data.lon };
    } else if (distance < secondMinDistance) {
      secondMinDistance = distance;
      secondClosestTarget = data;
      secondCoords = { lat: data.lat, lon: data.lon };
    }
  }

  return {
    closestTarget,
    secondClosestTarget,
    minDistance,
    secondMinDistance,
    coords,
    secondCoords,
  };
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
  let type = null;
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
      type = data.type;
    }
  }

  return {
    targetDistance,
    searchedTarget,
    searchedTarget5g,
    coordinates,
    mac,
    mac5,
    type,
  };
};

export { getClosest, searchAntenna };
