import { getTranslations } from "next-intl/server";
import { getCars } from "@/lib/api/cars";
import { getOffices } from "@/lib/api/offices";
import { carToCarDataType } from "@/lib/api/mappers";
import CarCard from "@/components/CarCard";
import BookingSearchForm from "@/components/BookingSearchForm";
import BackgroundSection from "@/components/BackgroundSection";
import BgGlassmorphism from "@/components/BgGlassmorphism";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("home");

  const [cars, offices] = await Promise.all([getCars(), getOffices()]);
  const featuredCars = cars.slice(0, 6).map((car) => carToCarDataType(car, locale));

  const features = [
    { icon: "✈️", title: t("feature1Title"), desc: t("feature1Desc") },
    { icon: "💳", title: t("feature2Title"), desc: t("feature2Desc") },
    { icon: "🚗", title: t("feature3Title"), desc: t("feature3Desc") },
    { icon: "✅", title: t("feature4Title"), desc: t("feature4Desc") },
  ];

  return (
    <div className="nc-PageHome relative overflow-hidden">
      <BgGlassmorphism />

      {/* Hero */}
      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <div className="relative pt-10 lg:pt-16 pb-0">
          {/* Hero text */}
          <div className="relative z-10 mb-12 lg:mb-0">
            <h2 className="font-semibold text-3xl lg:text-5xl text-neutral-900 dark:text-neutral-100">
              {t("heroTitle")}
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-lg max-w-xl">
              {t("heroSubtitle")}
            </p>
          </div>

          {/* Search form */}
          <div className="mt-10 lg:mt-14 hidden lg:block">
            <BookingSearchForm offices={offices} />
          </div>
        </div>

        {/* Featured cars */}
        <div className="relative py-16">
          <BackgroundSection />
          <div>
            <div className="nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-12 text-neutral-900 dark:text-neutral-50">
              <div>
                <h2 className="text-2xl md:text-4xl font-semibold">
                  {t("featuredCars")}
                </h2>
                <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
                  {cars.length} véhicules disponibles
                </span>
              </div>
              <a
                href={`/${locale}/fleet`}
                className="flex-shrink-0 flex items-center text-primary-700 dark:text-primary-6000"
              >
                {t("viewAllCars")}
                <svg
                  className="ml-1.5 w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.70697 16.9498L15.207 11.4498L9.70697 5.94977"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-7">
              {featuredCars.map((car) => (
                <CarCard key={car.id} data={car} />
              ))}
            </div>
          </div>
        </div>

        {/* Why us */}
        <div className="py-16">
          <h2 className="text-2xl md:text-4xl font-semibold text-center text-neutral-900 dark:text-neutral-100 mb-12">
            {t("whyUs")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-6 bg-white dark:bg-neutral-800 rounded-3xl shadow-sm border border-neutral-100 dark:border-neutral-700"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="py-12 text-center bg-green-500 rounded-3xl">
          <h2 className="text-2xl font-bold text-white mb-4">{t("contactWhatsapp")}</h2>
          <a
            href="https://wa.me/212661220832"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-green-600 font-bold text-lg px-8 py-4 rounded-full hover:bg-green-50 transition-colors shadow-lg"
          >
            +212 661-220832
          </a>
        </div>
      </div>
    </div>
  );
}
