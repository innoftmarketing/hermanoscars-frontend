import { getCar, getAllCarIds } from "@/lib/api/cars";
import { getOffices } from "@/lib/api/offices";
import { carToCarDataType } from "@/lib/api/mappers";
import { notFound } from "next/navigation";
import CarDetailClient from "./CarDetailClient";

export async function generateStaticParams() {
  const ids = await getAllCarIds();
  return ids.map((id) => ({ id: String(id) }));
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const [car, offices] = await Promise.all([getCar(Number(id)), getOffices()]);
  if (!car) notFound();

  const carData = carToCarDataType(car, locale);
  const carOffices = offices.filter((o) => car.officeIds.includes(o.id));

  return (
    <CarDetailClient
      car={carData}
      rawCar={car}
      offices={carOffices.length > 0 ? carOffices : offices}
      locale={locale}
    />
  );
}
