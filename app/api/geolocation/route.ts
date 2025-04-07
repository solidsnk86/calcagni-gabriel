import { NextRequest } from 'next/server';
import { getClosest, searchAntenna } from './services/utils';
import antennas from './services/wifi-v6.json';
import cities from './services/geodata-v3-mgc.json';
import airports from './services/airports.json';

const wirteMAC = (mac: string) => mac?.split(' ').join('-');

export async function GET(req: NextRequest) {
  const lat = parseFloat(req.nextUrl.searchParams.get('lat') || '0');
  const lon = parseFloat(req.nextUrl.searchParams.get('lon') || '0');
  const query = req.nextUrl.searchParams.get('query')?.toLowerCase();
  const clientIp = req.headers.get('x-real-ip') || 'No disponible';

  if (!lat || !lon) {
    return Response.json(
      {
        message: 'Debes proporcionar los parámetros de latitud y longitud',
      },
      { status: 400 }
    );
  }

  const coords = { lat, lon };
  try {
    const { closestTarget: closestCity, minDistance: cityDistance } =
      getClosest(coords, cities);
    const {
      closestTarget,
      minDistance,
      secondClosestTarget,
      secondMinDistance,
      coords: antennaCoords,
      secondCoords,
      thirdClosestTarget,
      thirdMinDistance,
      thirdCoords,
    } = getClosest(coords, antennas);
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
      type,
    } = searchAntenna(coords, antennas, query as string);

    if (query) {
      return Response.json({
        antenna: {
          name: searchedTarget || 'Antena inexistente',
          name5g: searchedTarget5g || 'No disponible',
        },
        distance: `${targetDistance ? targetDistance.toFixed(3) : '0'}mts`,
        coords: coordinates || 'No disponible',
        MAC: mac ? wirteMAC(mac) : 'MAC 2.4G no disponible',
        MAC5G: mac5 ? wirteMAC(mac5) : 'MAC 5G no disponible',
        type: type || 'No disponible',
      });
    }

    return Response.json(
      {
        ip: clientIp,
        city: closestCity?.nombre,
        state: closestCity?.provincia,
        country: closestCity?.pais,
        departament: closestCity?.departamento,
        city_coords: {
          latitude: closestCity?.lat,
          longitude: closestCity?.lon,
        },
        center_distance: `${cityDistance.toFixed(3)}mts` || 'No disponible',
        current_position: {
          latitude: lat,
          longitude: lon,
        },
        closest_wifi: {
          antenna: closestTarget?.name || 'No disponible',
          name: closestTarget?.name5g || 'No disponible',
          distance: `${minDistance.toFixed(3)}mts` || 'No disponible',
          type: closestTarget.type || 'No disponible',
          MAC: closestTarget.MAC
            ? wirteMAC(closestTarget.MAC)
            : 'No disponible',
          MAC5G: closestTarget.MAC5g
            ? wirteMAC(closestTarget.MAC5g)
            : 'No disponible',
          coords: antennaCoords || 'No Disponible',
        },
        second_closest_wifi: {
          antenna: secondClosestTarget.name || 'No disponible',
          name: secondClosestTarget.name5g || 'No disponible',
          distance: `${secondMinDistance.toFixed(3)}mts` || 'No disponible',
          type: secondClosestTarget.type || 'No disponible',
          MAC: closestTarget.MAC
            ? wirteMAC(secondClosestTarget.MAC)
            : 'No disponible',
          MAC5G: secondClosestTarget.MAC5g
            ? wirteMAC(secondClosestTarget.MAC5g)
            : 'No disponible',
          coords: secondCoords || 'No disponible',
        },
        third_closest_wifi: {
          antenna: thirdClosestTarget.name || 'No disponible',
          name: thirdClosestTarget.name5g || 'No disponible',
          distance: `${thirdMinDistance.toFixed(3)}mts` || 'No disponible',
          type: thirdClosestTarget.type || 'No disponible',
          MAC: thirdClosestTarget.MAC
            ? wirteMAC(thirdClosestTarget.MAC)
            : 'No disponible',
          MAC5G: thirdClosestTarget.MAC5g
            ? wirteMAC(thirdClosestTarget.MAC5g)
            : 'No disponible',
          coords: thirdCoords || 'No disponible',
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
