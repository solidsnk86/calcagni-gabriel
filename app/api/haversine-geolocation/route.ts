import { haversine } from '@/utils/haversine-formula';
import { NextRequest } from 'next/server';

const getAllAirports = async () => {
  const response = await fetch(
    'https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/world-airports.json'
  );
  const airports = await response.json();
  const filteredData = Object.keys(airports)
    .map((key) => {
      const { iata, name, city, country, lat, lon } = airports[key];
      return iata ? { iata, name, city, country, lat, lon } : null;
    })
    .filter(Boolean);
  return filteredData;
};

export async function GET(req: NextRequest) {
  const lat = parseFloat(req.nextUrl.searchParams.get('lat') || '0');
  const lon = parseFloat(req.nextUrl.searchParams.get('lon') || '0');

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
      let minMeters = Infinity;

      for (const airport of airports) {
        const meters = haversine(coordinates, airport);

        if (meters < minMeters) {
          minMeters = meters;
          closestAirport = airport;
        }
      }

      return { closestAirport, minMeters };
    };
    const { closestAirport, minMeters } = getAirport(coords, airports);
    return Response.json(
      {
        message: 'success',
        city: closestAirport.city,
        country: closestAirport.country,
        airport: closestAirport.name,
        airport_coords: {
          longitude: closestAirport.lon,
          latitude: closestAirport.lat,
        },
        airport_distance: `${minMeters.toFixed(2)}km`,
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=3600, public',
        },
      }
    );
  } catch (err) {
    return Response.json({ message: 'Server Error', error_message: err });
  }
}
