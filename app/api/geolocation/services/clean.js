import json from './yeison2.json';

async function cleaning() {
  const formattedData = Object.keys(json)
    .map((key) => {
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
        zonza_horaria,
      } = json[key];
      return id
        ? {
            id,
            nombre,
            tipo,
            departamento,
            provincia,
            pais,
            elevacion,
            lat,
            lon,
            zonza_horaria,
          }
        : null;
    })
    .filter(Boolean);
  return formattedData;
}

export default cleaning;
