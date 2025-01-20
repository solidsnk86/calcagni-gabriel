import { NextRequest } from 'next/server';
import {
  getAllCities,
  getAllAntennas,
  getClosest,
  searchAntenna,
} from './services/services';

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
          message: 'Only for San Luis AR',
          antenna: closestTarget.name || 'N/A',
          distance: `${minDistance.toFixed(3)}kms` || 'N/A',
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
