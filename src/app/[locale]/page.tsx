import React from "react";
import SectionHero from "@/app/(server-components)/SectionHero";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import SectionHowItWork from "@/components/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection";
import SectionGridFilterCard from "./fleet/SectionGridFilterCard";
import SectionClientSay from "@/components/SectionClientSay";
import { getCars } from "@/lib/api/cars";
import { carToCarDataType } from "@/lib/api/mappers";

export default async function PageHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cars = await getCars();
  const featuredCars = cars.slice(0, 8).map((car) => carToCarDataType(car, locale));

  return (
    <main className="nc-PageHome relative overflow-hidden">
      <BgGlassmorphism />
      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* HERO with HeroSearchForm (Cars tab) */}
        <SectionHero className="pt-10 lg:pt-16 lg:pb-16" />

        {/* FEATURED CARS — real data from WordPress */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridFilterCard
            data={featuredCars}
            heading="Véhicules populaires"
            subHeading={`${cars.length} véhicules disponibles`}
          />
        </div>

        {/* HOW IT WORKS */}
        <SectionHowItWork />

        {/* TESTIMONIALS */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="PageHome_" />
        </div>
      </div>
    </main>
  );
}
