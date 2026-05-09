"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Car, Office } from "@/lib/api/types";
import CarCard from "@/components/CarCard";
import BookingSearchForm from "@/components/BookingSearchForm";

interface FleetClientProps {
  cars: Car[];
  offices: Office[];
  locale: string;
  initialFilters: {
    office: number | null;
    start: string | null;
    end: string | null;
    transmission: string | null;
    fuel: string | null;
  };
}

export default function FleetClient({ cars, offices, locale, initialFilters }: FleetClientProps) {
  const t = useTranslations("fleet");
  const [officeFilter, setOfficeFilter] = useState<number | null>(initialFilters.office);
  const [transmissionFilter, setTransmissionFilter] = useState<string | null>(initialFilters.transmission);
  const [fuelFilter, setFuelFilter] = useState<string | null>(initialFilters.fuel);

  const transmissions = [...new Set(cars.map((c) => c.gearshift).filter(Boolean))];
  const fuels = [...new Set(cars.map((c) => c.fuelType).filter(Boolean))];

  const filtered = useMemo(() => {
    return cars.filter((car) => {
      if (officeFilter && !car.officeIds.includes(officeFilter)) return false;
      if (transmissionFilter && car.gearshift !== transmissionFilter) return false;
      if (fuelFilter && car.fuelType !== fuelFilter) return false;
      return true;
    });
  }, [cars, officeFilter, transmissionFilter, fuelFilter]);

  return (
    <div>
      {/* Search form */}
      <div className="mb-8">
        <BookingSearchForm
          offices={offices}
          initialOfficeId={initialFilters.office || undefined}
          initialStart={initialFilters.start ? new Date(initialFilters.start) : null}
          initialEnd={initialFilters.end ? new Date(initialFilters.end) : null}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* Office filter */}
        <select
          value={officeFilter || ""}
          onChange={(e) => setOfficeFilter(Number(e.target.value) || null)}
          className="text-sm border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">{t("allLocations")}</option>
          {offices.map((office) => (
            <option key={office.id} value={office.id}>{office.name}</option>
          ))}
        </select>

        {/* Transmission filter */}
        <select
          value={transmissionFilter || ""}
          onChange={(e) => setTransmissionFilter(e.target.value || null)}
          className="text-sm border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">{t("allTransmissions")}</option>
          {transmissions.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        {/* Fuel filter */}
        <select
          value={fuelFilter || ""}
          onChange={(e) => setFuelFilter(e.target.value || null)}
          className="text-sm border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">{t("allFuels")}</option>
          {fuels.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>

        {/* Active filters count */}
        {(officeFilter || transmissionFilter || fuelFilter) && (
          <button
            onClick={() => { setOfficeFilter(null); setTransmissionFilter(null); setFuelFilter(null); }}
            className="text-sm text-red-500 hover:text-red-600 border border-red-200 rounded-xl px-4 py-2 transition-colors"
          >
            Réinitialiser
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
        {filtered.length} véhicule{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-neutral-400">
          <div className="text-5xl mb-4">🚗</div>
          <p>{t("noResults")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((car) => (
            <CarCard key={car.id} car={car} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
