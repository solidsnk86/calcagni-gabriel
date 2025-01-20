import { haversine } from '@/utils/haversine-formula';
import { NextRequest, NextResponse } from 'next/server';
import { json } from 'stream/consumers';

const getAllCities = async () => {
  const resposne = await fetch(
    'https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/san-luis-geodata.json'
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
  const resposne = await fetch(
    'https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/conca-antennas.json'
  );
  const josnData = await resposne.json();
  return josnData;
};

export async function GET(req: NextRequest) {
  const lat = parseFloat(req.nextUrl.searchParams.get('lat') || '0');
  const lon = parseFloat(req.nextUrl.searchParams.get('lon') || '0');
  const response = NextResponse.next();

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  response.headers.set('Access-Control-Max-Age', '86400');

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

      for (const city of allData) {
        const distance = haversine(coordinates, city);

        if (distance < minDistance) {
          minDistance = distance;
          closestTarget = city;
        }
      }

      return { closestTarget, minDistance };
    };
    const [cities, antennas] = await Promise.all([
      getAllCities(),
      getAllAntennas(),
    ]);
    const { closestTarget: closestCity, minDistance: cityDistance } =
      getClosest(coords, cities);
    const { closestTarget, minDistance } = getClosest(coords, antennas);
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
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json({ message: 'Server Error', error_message: err });
  }
}
