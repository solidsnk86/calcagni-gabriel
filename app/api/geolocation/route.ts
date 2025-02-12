import { NextRequest } from 'next/server';
import { getClosest, searchAntenna } from './services/services';
import antennas from './services/wifi-sl-v1.json';
import cities from './services/geodata-arg-v3.json';
import airports from './services/airports.json';

const wirteMAC = (mac: string) => mac.split(' ').join('-');

export async function GET(req: NextRequest) {
  const lat = parseFloat(req.nextUrl.searchParams.get('lat') || '0');
  const lon = parseFloat(req.nextUrl.searchParams.get('lon') || '0');
  const query = req.nextUrl.searchParams.get('query')?.toLowerCase();
  const clientIp = req.headers.get('x-real-ip') || 'No disponible';

  if (!lat || !lon) {
    return Response.json(
      { message: 'You must to provide latitude and longitude params' },
      { status: 400 }
    );
  }

  const coords = { lat, lon };
  try {
    const { closestTarget: closestCity, minDistance: cityDistance } =
      getClosest(coords, cities);
    const { closestTarget, minDistance } = getClosest(coords, antennas);
    const { closestTarget: target, minDistance: distance } = getClosest(
      coords,
      airports
    );

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
          name5g: searchedTarget5g || 'Antena inexistente',
        },
        distance: `${
          targetDistance === Infinity ? 'No disponible ' : targetDistance
        }mts`,
        coords: coordinates || 'No disponible',
        MAC: mac ? wirteMAC(mac) : 'MAC 2.4G no disponible',
        MAC5G: mac5 ? wirteMAC(mac5) : 'MAC 5G no disponible',
      });
    }

    return Response.json(
      {
        ip: clientIp,
        city: closestCity.nombre,
        state: closestCity.provincia,
        country: closestCity.pais,
        departament: closestCity.departamento,
        city_coords: {
          latitude: closestCity.lat,
          longitude: closestCity.lon,
        },
        center_distance: `${cityDistance.toFixed(3)}mts` || 'No disponible',
        current_position: {
          latitude: lat,
          longitude: lon,
        },
        closest_wifi: {
          message: 'Only for San Luis AR',
          antenna: closestTarget.name || 'No disponible',
          name: closestTarget.name5g || 'No disponible',
          distance: `${minDistance.toFixed(3)}mts` || 'No disponible',
          type: closestTarget.type || 'No disponible',
          MAC: wirteMAC(closestTarget.MAC) || 'No disponible',
          MAC5G: wirteMAC(closestTarget.MAC5g) || 'No disponible',
        },
        airport_location: {
          city: target?.state,
          country: target?.country,
          closest_airport: {
            airport: target?.name,
            distance: `${distance?.toFixed(3)}mts` || 'No disponible',
          },
        },
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json({ message: String(err) });
  }
}
