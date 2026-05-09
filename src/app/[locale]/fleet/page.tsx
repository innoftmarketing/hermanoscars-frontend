import React from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { getCars } from "@/lib/api/cars";
import { carToCarDataType } from "@/lib/api/mappers";

export default async function FleetPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cars = await getCars();
  const carData = cars.map((car) => carToCarDataType(car, locale));

  return (
    <div className="container">
      <SectionGridFilterCard
        className="pb-24 lg:pb-28"
        data={carData}
        heading="Notre Flotte"
        subHeading={`${cars.length} véhicules disponibles`}
      />
    </div>
  );
}
