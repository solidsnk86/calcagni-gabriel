'use client';

import { Pre } from './components/Pre';

export default function Page() {
  return (
    <>
      <article className="">
        <div className="justify-center mx-auto">
          <h1 className="font-semibold text-2xl">Ejemplos de uso de la API</h1>
        </div>
        <Pre
          lang="typescript"
          stringCode={
            /**javascrip */ 
        `
        async function getApiData({ user }) {
            const response = await fetch('https://calcagni-gabriel/api/non-followers?user=\${user}');
            const data = await response.json();
            return data;
        \b\b\b}
        `
          }
        />
      </article>
    </>
  );
}
