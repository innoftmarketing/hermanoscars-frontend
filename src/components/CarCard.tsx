import Image from "next/image";
import Link from "next/link";
import { Car } from "@/lib/api/types";

interface CarCardProps {
  car: Car;
  locale?: string;
}

export default function CarCard({ car, locale = "fr" }: CarCardProps) {
  return (
    <div className="group relative bg-white dark:bg-neutral-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-neutral-100 dark:border-neutral-700">
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {car.featuredImage ? (
          <Image
            src={car.featuredImage}
            alt={car.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
            <span className="text-neutral-400 text-4xl">🚗</span>
          </div>
        )}
        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-white dark:bg-neutral-800 rounded-xl px-3 py-1.5 shadow-md">
          <span className="text-sm font-bold text-primary-600">{car.price}</span>
          <span className="text-xs text-neutral-400"> / jour</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-neutral-900 dark:text-white text-sm leading-tight mb-3 line-clamp-2">
          {car.title}
        </h3>

        {/* Specs */}
        <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mb-4">
          <span className="flex items-center gap-1">
            <span>👤</span>
            {car.seats} sièges
          </span>
          <span>•</span>
          <span>{car.gearshift}</span>
          <span>•</span>
          <span>{car.fuelType}</span>
        </div>

        {/* CTA */}
        <Link
          href={`/${locale}/fleet/${car.id}`}
          className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
        >
          Voir & Réserver
        </Link>
      </div>
    </div>
  );
}
