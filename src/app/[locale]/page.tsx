import { getTranslations } from "next-intl/server";
import { getCars } from "@/lib/api/cars";
import { getOffices } from "@/lib/api/offices";
import CarCard from "@/components/CarCard";
import BookingSearchForm from "@/components/BookingSearchForm";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("home");

  const [cars, offices] = await Promise.all([getCars(), getOffices()]);
  const featuredCars = cars.slice(0, 6);

  const features = [
    { icon: "✈️", title: t("feature1Title"), desc: t("feature1Desc") },
    { icon: "💳", title: t("feature2Title"), desc: t("feature2Desc") },
    { icon: "🚗", title: t("feature3Title"), desc: t("feature3Desc") },
    { icon: "✅", title: t("feature4Title"), desc: t("feature4Desc") },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900 text-white py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mb-10">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              {t("heroTitle")}
            </h1>
            <p className="text-lg text-neutral-300">{t("heroSubtitle")}</p>
          </div>
          <BookingSearchForm offices={offices} />
        </div>
      </section>

      {/* Featured cars */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{t("featuredCars")}</h2>
          </div>
          <a
            href={`/${locale}/fleet`}
            className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            {t("viewAllCars")} →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} locale={locale} />
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-neutral-50 dark:bg-neutral-800/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white text-center mb-12">
            {t("whyUs")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-6 text-center shadow-sm border border-neutral-100 dark:border-neutral-700"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="bg-green-500 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{t("contactWhatsapp")}</h2>
          <a
            href="https://wa.me/212661220832"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-green-600 font-bold text-lg px-8 py-4 rounded-full hover:bg-green-50 transition-colors shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.122 1.528 5.855L.057 23.492a.5.5 0 00.614.65l5.88-1.54A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.525-5.185-1.437l-.372-.22-3.856 1.012 1.031-3.759-.24-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            +212 661-220832
          </a>
        </div>
      </section>
    </div>
  );
}
