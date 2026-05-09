import { getCar, getAllCarIds } from "@/lib/api/cars";
import { getOffices } from "@/lib/api/offices";
import { notFound } from "next/navigation";
import Image from "next/image";
import CarBookingForm from "./CarBookingForm";

export async function generateStaticParams() {
  const ids = await getAllCarIds();
  return ids.map((id) => ({ id: String(id) }));
}

export default async function CarDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ office?: string; start?: string; end?: string }>;
}) {
  const { locale, id } = await params;
  const filters = await searchParams;

  const [car, offices] = await Promise.all([getCar(Number(id)), getOffices()]);
  if (!car) notFound();

  const carOffices = offices.filter((o) => car.officeIds.includes(o.id));

  const specs = [
    { label: "Transmission", value: car.gearshift },
    { label: "Carburant", value: car.fuelType },
    { label: "Places", value: `${car.seats} sièges` },
    { label: "Flotte", value: `${car.fleetSize} unité${car.fleetSize > 1 ? "s" : ""}` },
  ];

  const includes = [
    "Annulation gratuite",
    "Assistance routière 24h/24",
    "Kilométrage illimité",
    "Couverture de base incluse",
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Car info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main image */}
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-neutral-100">
            {car.featuredImage ? (
              <Image
                src={car.featuredImage}
                alt={car.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">🚗</div>
            )}
          </div>

          {/* Gallery thumbnails */}
          {car.galleryImgs.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {car.galleryImgs.slice(1, 5).map((img, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100">
                  <Image src={img} alt={`${car.title} ${i + 2}`} fill className="object-cover hover:scale-105 transition-transform" sizes="25vw" />
                </div>
              ))}
            </div>
          )}

          {/* Title & location */}
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">{car.title}</h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">📍 {car.address}</p>
          </div>

          {/* Specs */}
          <div>
            <h2 className="font-semibold text-neutral-900 dark:text-white mb-4">Caractéristiques</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {specs.map((spec) => (
                <div key={spec.label} className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-4 text-center">
                  <p className="text-xs text-neutral-400 mb-1">{spec.label}</p>
                  <p className="font-semibold text-neutral-900 dark:text-white text-sm">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Included */}
          <div>
            <h2 className="font-semibold text-neutral-900 dark:text-white mb-4">Inclus dans le prix</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {includes.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="text-green-500 font-bold">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Pickup offices */}
          {carOffices.length > 0 && (
            <div>
              <h2 className="font-semibold text-neutral-900 dark:text-white mb-4">Agences disponibles</h2>
              <div className="flex flex-wrap gap-2">
                {carOffices.map((office) => (
                  <span key={office.id} className="text-sm bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-1.5 rounded-full border border-primary-100 dark:border-primary-800">
                    📍 {office.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Booking form */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <CarBookingForm
              car={car}
              offices={carOffices.length > 0 ? carOffices : offices}
              initialOfficeId={filters.office ? Number(filters.office) : (carOffices[0]?.id || null)}
              initialStart={filters.start || null}
              initialEnd={filters.end || null}
              locale={locale}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
