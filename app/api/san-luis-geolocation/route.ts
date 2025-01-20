import { haversine } from '@/utils/haversine-formula';
import { NextRequest, NextResponse } from 'next/server';

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
    const getCity = (coordinates: any, allCities: any) => {
      let closestCity = null;
      let minDistance = Infinity;

      for (const city of allCities) {
        const distance = haversine(coordinates, city);

        if (distance < minDistance) {
          minDistance = distance;
          closestCity = city;
        }
      }

      return { closestCity, minDistance };
    };
    const cities = await getAllCities();
    const { closestCity, minDistance } = getCity(coords, cities);
    return Response.json(
      {
        city: closestCity.nombre,
        state: closestCity.provincia,
        country: closestCity.pais,
        city_coords: {
          latitude: closestCity.lat,
          longitude: closestCity.lon,
        },
        center_of_city: `${minDistance.toFixed(0)}km`,
        current_position: {
          latitude: lat,
          longitude: lon,
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
