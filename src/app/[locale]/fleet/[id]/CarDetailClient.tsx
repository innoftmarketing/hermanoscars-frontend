"use client";

import React from "react";
import Image from "next/image";
import { CarDataType } from "@/data/types";
import { Car, Office } from "@/lib/api/types";
import BookingSidebar from "./BookingSidebar";
import StartRating from "@/components/StartRating";
import Badge from "@/shared/Badge";

interface CarDetailClientProps {
  car: CarDataType;
  rawCar: Car;
  offices: Office[];
  defaultOfficeId: number;
  locale: string;
}

const includes = [
  "Annulation gratuite jusqu'à 48h avant la prise en charge",
  "Assistance routière 24h/24",
  "Couverture de base incluse",
  "Kilométrage illimité",
  "Véhicule désinfecté avant chaque location",
  "TVA et taxes locales incluses",
];

export default function CarDetailClient({
  car,
  rawCar,
  offices,
  defaultOfficeId,
}: CarDetailClientProps) {
  const [tab, setTab] = React.useState<"specs" | "features" | "conditions" | "location">("specs");
  const photo = rawCar.galleryImgs[0] || rawCar.featuredImage;

  return (
    <div className="container py-8">
      {/* SPLIT HERO: photo left, booking right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: photo + title */}
        <div className="space-y-4">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-100">
            <Image
              src={photo}
              alt={car.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex items-center gap-3">
            <Badge color="pink" name="Hermanos Cars" />
            <StartRating />
            <span className="text-sm text-neutral-500">· {rawCar.address}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{car.title}</h1>
          <div className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
            <span className="flex items-center gap-2">
              <i className="las la-user-friends text-xl"></i>
              {car.seats} sièges
            </span>
            <span className="flex items-center gap-2">
              <i className="las la-dharmachakra text-xl"></i>
              {car.gearshift}
            </span>
            <span className="flex items-center gap-2">
              <i className="las la-gas-pump text-xl"></i>
              {rawCar.fuelType}
            </span>
          </div>
        </div>

        {/* Right: booking */}
        <div className="lg:pl-8">
          <BookingSidebar
            rawCar={rawCar}
            offices={offices}
            defaultOfficeId={defaultOfficeId}
            variant="inline"
          />
        </div>
      </div>

      {/* TABS */}
      <div className="mt-12 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex gap-8">
          {(
            [
              ["specs", "Caractéristiques"],
              ["features", "Inclus"],
              ["conditions", "Conditions"],
              ["location", "Localisation"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
                tab === key
                  ? "border-primary-6000 text-primary-6000"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 mb-16">
        {tab === "specs" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              ["Transmission", car.gearshift],
              ["Carburant", rawCar.fuelType],
              ["Sièges", `${car.seats} places`],
              ["Flotte", `${rawCar.fleetSize} unités`],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-5 text-center"
              >
                <p className="text-xs text-neutral-400 mb-1">{label}</p>
                <p className="font-semibold text-neutral-900 dark:text-white">{value}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "features" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {includes.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm">
                <span className="text-green-500 font-bold mt-0.5">✓</span>
                <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "conditions" && (
          <div className="space-y-6 text-sm">
            <div>
              <h4 className="font-semibold text-base mb-2">Politique d&apos;annulation</h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                Annulation gratuite jusqu&apos;à 24h avant la prise en charge. Réservez maintenant, payez à la prise en charge.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-base mb-2">Note spéciale</h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                Un permis de conduire valide est requis. Le conducteur doit avoir au moins 21 ans. Une caution peut être demandée à la prise en charge.
              </p>
            </div>
          </div>
        )}

        {tab === "location" && (
          <div className="aspect-w-16 aspect-h-7 rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.1!2d-7.5897!3d33.3675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sA%C3%A9roport+Mohammed+V!5e0!3m2!1sfr!2sma!4v1"
            />
          </div>
        )}
      </div>
    </div>
  );
}
