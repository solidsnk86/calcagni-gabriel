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

    const writeMAC = (address: string) => address.split(' ').join('-');

    const {
      targetDistance,
      searchedTarget,
      searchedTarget5g,
      coordinates,
      mac,
      mac5,
    } = searchAntenna(coords, antennas, query as string);

    if (query) {
      return Response.json({
        antenna: {
          name: searchedTarget || 'Antena inexistente',
          name5g: searchedTarget5g,
        },
        distance: `${targetDistance}mts` || 'No disponible',
        coords: coordinates || 'No disponible',
        MAC: mac || 'MAC no disponible',
        MAC5G: mac5 || 'MAC 5G no disponible',
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
          MAC5G: closestTarget.MAC5G || 'N/A',
        },
        airport_location: {
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
