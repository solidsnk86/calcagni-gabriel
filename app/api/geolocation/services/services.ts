import { haversine } from '@/utils/haversine-formula';

const getAllCities = async () => {
  const resposne = await fetch(
    'https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/geodata-arg.json'
  );
  const jsonData = await resposne.json();
  const formatJSON = Object.keys(jsonData).map((key) => {
    const {
      id,
      nombre,
      tipo,
      departamento,
      provincia,
      pais,
      elevacion,
      lat,
      lon,
    } = jsonData[key];
    return {
      id,
      nombre,
      tipo,
      departamento,
      provincia,
      pais,
      elevacion,
      lat,
      lon,
    };
  });
  return formatJSON;
};

const getAllAirports = async () => {
  const response = await fetch(
    'https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/world-airports.json'
  );
  const data = await response.json();
  const formattedData = Object.keys(data)
    .map((key) => {
      const { iata, name, city, state, country, elevation, lat, lon } =
        data[key];
      return iata
        ? { iata, name, city, state, country, elevation, lat, lon }
        : null;
    })
    .filter(Boolean);
  return formattedData;
};

const getAllAntennas = async () => {
  try {
    const resposne = await fetch(
      'https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/wifi-sl.json'
    );
    if (!resposne.ok) throw new Error(`Cannot get data from cdn`);
    const josnData = await resposne.json();
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
    if (query === nameA && query === nameB) {
      searchedTarget = data.name;
      searchedTarget5g = data.name5g;
      targetDistance = Number(distance.toFixed(3));
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

export {
  getAllCities,
  getAllAntennas,
  getAllAirports,
  getClosest,
  searchAntenna,
};
