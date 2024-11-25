"use client";

import React from "react";
import { Chart } from "react-google-charts";
import { TitleComponent } from "@/components/ComponentTitles";
import { Format } from "@/components/Format";

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

  const chartData = [
    ["Country", "Visits"],
    ...Object.entries(visitsByCountry).map(([country, visits]) => [
      country,
      visits,
    ]),
  ];

  const colorPalettes = {
    ocean: ["#E6F2FF", "#BAE6FD", "#7DD3FC", "#38BDF8", "#0EA5E9"],
    forest: ["#ECFDF5", "#D1FAE5", "#6EE7B7", "#10B981", "#059669"],
    sunset: ["#FEF3C7", "#FDE68A", "#FCD34D", "#F59E0B", "#D97706"],
    berry: ["#AFBBE3", "#EDE9FE", "#DDD6FE", "#AC94C9", "#A78BFA"],
    monochrome: ["#F4F4F4", "#E5E5E5", "#A3A3A3", "#737373", "#404040"],
  };

  const chartOptions = {
    title: "Visitas por País",
    backgroundColor: "#04090B",
    colorAxis: {
      colors: colorPalettes.berry,
    },
    legend: {
      textStyle: {
        color: "#333",
      },
    },
    titleTextStyle: {
      color: "#f4f4f4",
    },
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center">
        <TitleComponent.H2 className="text-center my-10">
          Analítica del Portfolio
        </TitleComponent.H2>

        <TitleComponent.H4 className="text-center p-2">
          Total de visitas al Perfil:{" "}
          <span className="text-violet-400">{data.length}</span>
        </TitleComponent.H4>

        <div className="flex flex-col lg:flex-row w-full max-w-5xl my-10 space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="w-full lg:w-1/2">
            <Chart
              chartType="GeoChart"
              width="100%"
              height="400px"
              data={chartData}
              options={{
                ...chartOptions,
                width: 400,
                height: 400,
              }}
            />
          </div>

          <div className="w-full lg:w-1/2">
            <TitleComponent.H4 className="text-center py-2 border border-foreground/5 bg-violet-300/50">
              Últimas 20 visitas
            </TitleComponent.H4>

            <div className="h-[400px] overflow-y-auto border border-foreground/10">
              {data.slice(0, 20).map((d: any, index: number) => (
                <div
                  key={index}
                  className={`flex items-center p-2 border-b border-foreground/5 ${
                    index % 2 !== 0 ? "bg-zinc-800/20" : "bg-zinc-900/20"
                  }`}
                >
                  <span className="mr-2 font-bold text-violet-300 min-w-[30px]">
                    {index + 1}.
                  </span>
                  <p className="flex-1 text-pretty text-xs sm:text-sm">
                    El IP: {d.ip}. Ha visitado el perfil el día{" "}
                    {Format.dateAndTime(d.created_at)}, desde {d.city} -{" "}
                    {d.province}, {d.country}.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
