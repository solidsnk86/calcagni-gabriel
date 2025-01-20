import { haversine } from '@/utils/haversine-formula';

const getAllCities = async () => {
  const resposne = await fetch(
    'https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/geodata-ar.json'
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

const getAllAntennas = async () => {
  try {
    const resposne = await fetch(
      'https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/wifi-sl-antennas.json'
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

const searchAntenna = (coordinates: any, allData: any, query: any) => {
  let targetDistance = Infinity;
  let searchedTarget = null;
  let coords = { latitude: 0, longitude: 0 };

  for (const data of allData) {
    const distance = haversine(coordinates, data);

    if (query === data.name) {
      searchedTarget = data.name;
      targetDistance = Number(distance.toFixed(3));
      coords.latitude = data.lat;
      coords.longitude = data.lon;
    }
  }

  return { targetDistance, searchedTarget, coordinates };
};

export { getAllCities, getAllAntennas, getClosest, searchAntenna };
