import jsonData from './geodata-arg-v3.json';

interface CityProps {
  nombre: string;
  tipo: string;
  departamento: string;
  provincia: string;
  pais: string;
  elevacion: number;
  lat: number;
  lon: number;
}

type CityMap = {
  [key: string]: CityProps;
};

const cleaning = async (): Promise<CityProps[]> => {
  const cityMap = jsonData as unknown as CityMap;
  const cleanedCities: CityProps[] = Object.keys(cityMap)
    .map((key: string) => {
      const {
        nombre,
        tipo,
        departamento,
        provincia,
        pais,
        elevacion,
        lat,
        lon,
      } = cityMap[key];
      return nombre
        ? { nombre, tipo, departamento, provincia, pais, elevacion, lat, lon }
        : null;
    })
    .filter((city): city is CityProps => city !== null);
  return cleanedCities;
};

export default cleaning;
