import { haversine } from '@/utils/haversine-formula';
import { NextRequest, NextResponse } from 'next/server';

const getAllAirports = async () => {
  const response = await fetch(
    'https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/world-airports.json'
  );
  const airports = await response.json();
  const filteredData = Object.keys(airports)
    .map((key) => {
      const { iata, name, city, state, country, lat, lon } = airports[key];
      return iata ? { iata, name, city, state, country, lat, lon } : null;
    })
    .filter(Boolean);
  return filteredData;
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
    const airports = await getAllAirports();

    const getAirport = (coordinates: any, airports: any) => {
      let closestAirport = null;
      let minDistance = Infinity;

      for (const airport of airports) {
        const meters = haversine(coordinates, airport);

        if (meters < minDistance) {
          minDistance = meters;
          closestAirport = airport;
        }
      }

      return { closestAirport, minDistance };
    };
    const { closestAirport, minDistance } = getAirport(coords, airports);
    return Response.json(
      {
        message: 'Haversine geolocation math forlmula',
        city: closestAirport.city,
        state: closestAirport.state,
        country: closestAirport.country,
        airport: closestAirport.name,
        airport_coords: {
          latitude: closestAirport.lat,
          longitude: closestAirport.lon,
        },
        airport_distance: `${minDistance.toFixed(2)}km`,
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
