import { getTranslations } from "next-intl/server";
import { getCars } from "@/lib/api/cars";
import { getOffices } from "@/lib/api/offices";
import FleetClient from "./FleetClient";

export default async function FleetPage({ params, searchParams }: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ office?: string; start?: string; end?: string; transmission?: string; fuel?: string }>;
}) {
  const { locale } = await params;
  const filters = await searchParams;
  const t = await getTranslations("fleet");

  const [cars, offices] = await Promise.all([getCars(), getOffices()]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">{t("title")}</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mt-1">{t("subtitle")}</p>
      </div>
      <FleetClient
        cars={cars}
        offices={offices}
        locale={locale}
        initialFilters={{
          office: filters.office ? Number(filters.office) : null,
          start: filters.start || null,
          end: filters.end || null,
          transmission: filters.transmission || null,
          fuel: filters.fuel || null,
        }}
      />
    </div>
  );
}
