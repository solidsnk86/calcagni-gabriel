import { haversine } from '@/utils/haversine-formula';
import { NextRequest, NextResponse } from 'next/server';

const getAllCities = async () => {
  const resposne = await fetch(
    'https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/geodata-sanluis-ar.json'
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
      'https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/wifi-antennas.json'
    );
    if (!resposne.ok) throw new Error(`Cannot get data from cdn`);
    const josnData = await resposne.json();
    return josnData;
  } catch (err) {
    console.error(err);
  }
};

export async function GET(req: NextRequest) {
  const lat = parseFloat(req.nextUrl.searchParams.get('lat') || '0');
  const lon = parseFloat(req.nextUrl.searchParams.get('lon') || '0');
  const query = req.nextUrl.searchParams.get('query');

  if (!lat || !lon) {
    return Response.json(
      { message: 'You must to provide latitude and longitude params' },
      { status: 400 }
    );
  }

  const coords = { lat, lon };
  try {
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

    const [cities, antennas] = await Promise.all([
      getAllCities(),
      getAllAntennas(),
    ]);
    const { closestTarget: closestCity, minDistance: cityDistance } =
      getClosest(coords, cities);
    const { closestTarget, minDistance } = getClosest(coords, antennas);

    if (query) {
      const { targetDistance, searchedTarget, coordinates } = searchAntenna(
        coords,
        antennas,
        query
      );
      return Response.json({
        searched: {
          antenna: searchedTarget || 'Antena inexistente',
          distance: `${targetDistance}km` || 'No disponible',
          coords: coordinates || 'No disponible',
        },
      });
    }

    return Response.json(
      {
        city: closestCity.nombre,
        state: closestCity.provincia,
        country: closestCity.pais,
        city_coords: {
          latitude: closestCity.lat,
          longitude: closestCity.lon,
        },
        center_city: `${cityDistance.toFixed(3)}km`,
        current_position: {
          latitude: lat,
          longitude: lon,
        },
        closest_wifi: {
          antenna: closestTarget.name || 'N/A',
          distance: `${minDistance.toFixed(3)}km` || 'N/A',
          type: closestTarget.type || 'N/A',
          MAC: closestTarget.MAC || 'N/A',
        },
        q: query,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json({ message: 'Server Error', error_message: err });
  }
}
