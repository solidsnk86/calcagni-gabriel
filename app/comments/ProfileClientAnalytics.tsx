"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { TitleComponent } from "@/components/ComponentTitles";
import { Format } from "@/components/Format";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProfileClientAnalytics({ data }: { data: Array<any> }) {
  // Construct a type with a set of properties K of type T
  const visitsByCountry: Record<string, number> = {};

  for (let i = 0; i < data.length; i++) {
    const country = data[i].country;
    if (visitsByCountry[country]) {
      visitsByCountry[country]++;
    } else {
      visitsByCountry[country] = 1;
    }
  }

  const chartData = {
    labels: Object.keys(visitsByCountry),
    datasets: [
      {
        data: Object.values(visitsByCountry),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Visitas por País",
      },
    },
  };

  return (
    <div className="border-t border-foreground/5">
      <TitleComponent.H2 className="text-center my-10">
        Analítica del Portfolio
      </TitleComponent.H2>
      <TitleComponent.H4 className="text-center p-2">
        Total de visitas al Perfil:{" "}
        <span className="text-violet-400">{data.length}</span>
      </TitleComponent.H4>

      <div className="my-10 w-full max-w-md mx-auto">
        <Doughnut data={chartData} options={chartOptions} />
      </div>
      <TitleComponent.H4 className="text-center py-2 border border-foreground/5 bg-violet-300/50">
        Últimas 20 visitas
      </TitleComponent.H4>
      {data.map((d: any, index: number) =>
        index <= 19 ? (
          <article
            key={index}
            className={`flex border-t border-l border-r py-2 border-foreground/5 text-wrap p-2 ${
              index % 2 !== 0 ? "bg-zinc-800/50" : "bg-zinc-700/50"
            }`}
          >
            <span className="pr-2">{index + 1}.</span>
            <p className="text-pretty">
              El IP: {d.ip}. Ha visitado el perfil el día{" "}
              {Format.dateAndTime(d.created_at)}, desde {d.city}, {d.country}.
            </p>
          </article>
        ) : null
      )}
    </div>
  );
}
