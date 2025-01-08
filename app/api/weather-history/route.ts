import { NextRequest, NextResponse } from 'next/server';

export async function GET(res: NextResponse, req: NextRequest) {
  const getWeatherData = async () => {
    try {
      const response = await fetch(
        'https://solid-geolocation.vercel.app/weather?latitude=-32.5603447&longitude=-65.2351276'
      );
      if (!response.ok) {
        throw new Error('No se pudo procesar la solicitud a la API');
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (err) {
      console.error(err);
    }
  };

  const kelvinToCelsius = ({ value }: { value: number }) => {
    return value - 273.15;
  };

  try {
    const weatherData = await getWeatherData();
    const temp = kelvinToCelsius({ value: weatherData.main.temp }).toFixed(1);
    const humidity = weatherData.main.humidity;
    const city = weatherData.name;
    const countryName = weatherData.sys.country;

    return new Response(
      JSON.stringify({
        status: 200,
        city_name: city,
        country: countryName,
        temp: temp,
        humidity: humidity,
      })
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: 'Error del servidor: ' + err,
      })
    );
  }
}
