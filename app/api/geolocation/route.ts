import { NextRequest } from 'next/server';
import {
  getAllCities,
  getAllAntennas,
  getClosest,
  searchAntenna,
  getAllAirports,
} from './services/services';

export async function GET(req: NextRequest) {
  const lat = parseFloat(req.nextUrl.searchParams.get('lat') || '0');
  const lon = parseFloat(req.nextUrl.searchParams.get('lon') || '0');
  const query = req.nextUrl.searchParams.get('query')?.toLowerCase();

  if (!lat || !lon) {
    return Response.json(
      { message: 'You must to provide latitude and longitude params' },
      { status: 400 }
    );
  }

  const coords = { lat, lon };
  try {
    const [cities, antennas, airports] = await Promise.all([
      getAllCities(),
      getAllAntennas(),
      getAllAirports(),
    ]);

    const { closestTarget: closestCity, minDistance: cityDistance } =
      getClosest(coords, cities);
    const { closestTarget, minDistance } = getClosest(coords, antennas);
    const { closestTarget: target, minDistance: distance } = getClosest(
      coords,
      airports
    );

    if (query) {
      const { targetDistance, searchedTarget, coordinates, mac } =
        searchAntenna(coords, antennas, query);
      return Response.json({
        searched: {
          antenna: searchedTarget || 'Antena inexistente',
          distance: `${targetDistance}km` || 'No disponible',
          coords: coordinates || 'No disponible',
          MAC: mac,
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
        center_city: `${cityDistance.toFixed(3)}mts` || 'N/A',
        current_position: {
          latitude: lat,
          longitude: lon,
        },
        closest_wifi: {
          message: 'Only for San Luis AR',
          antenna: closestTarget.name || 'N/A',
          distance: `${minDistance.toFixed(3)}mts` || 'N/A',
          type: closestTarget.type || 'N/A',
          MAC: closestTarget.MAC || 'N/A',
        },
        international_location: {
          city: target.state,
          country: target.country,
          closest_airport: {
            airport: target.name,
            distance: `${distance.toFixed(3)}mts` || 'N/A',
          },
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
