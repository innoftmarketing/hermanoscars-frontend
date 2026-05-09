"use client";

import React, { FC, useState } from "react";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import CommentListing from "@/components/CommentListing";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import StartRating from "@/components/StartRating";
import Avatar from "@/shared/Avatar";
import Badge from "@/shared/Badge";
import ButtonCircle from "@/shared/ButtonCircle";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import Input from "@/shared/Input";
import Image from "next/image";
import { Amenities_demos, includes_demo } from "./constant";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import { usePathname, useRouter } from "next/navigation";
import SectionDateRange from "@/app/(listing-detail)/SectionDateRange";
import RentalCarDatesRangeInput from "./RentalCarDatesRangeInput";
import { CarDataType } from "@/data/types";
import { Car, Office } from "@/lib/api/types";
import { buildBookingUrl, checkAvailability } from "@/lib/api/availability";

interface CarDetailClientProps {
  car: CarDataType;
  defaultOfficeId?: number | null;
  rawCar: Car;
  offices: Office[];
  locale: string;
}

const CarDetailClient: FC<CarDetailClientProps> = ({ car, rawCar, offices, defaultOfficeId, locale }) => {
  const thisPathname = usePathname();
  const router = useRouter();
  const [selectedOffice, setSelectedOffice] = useState<number>(
    defaultOfficeId || offices[0]?.id || 0
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [availability, setAvailability] = useState<{ available: boolean; checked: boolean } | null>(null);
  const [checking, setChecking] = useState(false);

  const PHOTOS = rawCar.galleryImgs.length > 0 ? rawCar.galleryImgs : [rawCar.featuredImage];

  const numDays = startDate && endDate
    ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const totalPrice = numDays > 0 ? rawCar.priceRaw * numDays : 0;

  const handleDatesChange = async (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    setAvailability(null);
    if (start && end) {
      setChecking(true);
      try {
        const startStr = start.toISOString().split("T")[0];
        const endStr = end.toISOString().split("T")[0];
        const result = await checkAvailability(rawCar.id, startStr, endStr);
        setAvailability({ available: result.available, checked: true });
      } finally {
        setChecking(false);
      }
    }
  };

  const handleReserve = () => {
    if (!startDate || !endDate || !selectedOffice) return;
    const start = startDate.toISOString().split("T")[0];
    const end = endDate.toISOString().split("T")[0];
    window.location.href = buildBookingUrl(rawCar.variationId, start, end, selectedOffice);
  };

  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as any);
  };

  const renderSection1 = () => (
    <div className="listingSection__wrap !space-y-6">
      <div className="flex justify-between items-center">
        <Badge color="pink" name="Hermanos Cars" />
        <LikeSaveBtns />
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{car.title}</h2>
      <div className="flex items-center space-x-4">
        <StartRating />
        <span>·</span>
        <span>
          <i className="las la-map-marker-alt"></i>
          <span className="ml-1">{car.address}</span>
        </span>
      </div>
      <div className="flex items-center">
        <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
        <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
          Agence{" "}
          <span className="text-neutral-900 dark:text-neutral-200 font-medium">Hermanos Cars</span>
        </span>
      </div>
      <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />
      <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3">
          <i className="las la-user-friends text-2xl"></i>
          <span>{car.seats} sièges</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3">
          <i className="las la-dharmachakra text-2xl"></i>
          <span>{car.gearshift}</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3">
          <i className="las la-gas-pump text-2xl"></i>
          <span>{rawCar.fuelType}</span>
        </div>
      </div>
    </div>
  );

  const renderSectionTienIch = () => (
    <div className="listingSection__wrap">
      <div>
        <h2 className="text-2xl font-semibold">Caractéristiques du véhicule</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Équipements et options disponibles
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300">
        {Amenities_demos.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-10 flex-shrink-0">
              <Image src={item.icon} alt="" />
            </div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSection3 = () => (
    <div className="listingSection__wrap">
      <div>
        <h2 className="text-2xl font-semibold">Inclus dans le prix</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">Tout compris</span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-neutral-700 dark:text-neutral-300">
        {includes_demo.filter((_, i) => i < 12).map((item) => (
          <div key={item.name} className="flex items-center space-x-3">
            <i className="las la-check-circle text-2xl"></i>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSection6 = () => (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">Avis (23 avis)</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="space-y-5">
        <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
        <div className="relative">
          <Input fontClass="" sizeClass="h-16 px-4 py-3" rounded="rounded-3xl" placeholder="Partagez votre avis ..." />
          <ButtonCircle className="absolute right-2 top-1/2 transform -translate-y-1/2" size=" w-12 h-12 ">
            <ArrowRightIcon className="w-5 h-5" />
          </ButtonCircle>
        </div>
      </div>
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        <CommentListing className="py-8" />
        <CommentListing className="py-8" />
        <div className="pt-8">
          <ButtonSecondary>Voir plus d&apos;avis</ButtonSecondary>
        </div>
      </div>
    </div>
  );

  const renderSection7 = () => (
    <div className="listingSection__wrap">
      <div>
        <h2 className="text-2xl font-semibold">Localisation</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Aéroport Mohammed V, Casablanca, Maroc
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
        <div className="rounded-xl overflow-hidden z-0">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.1!2d-7.5897!3d33.3675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sA%C3%A9roport+Mohammed+V!5e0!3m2!1sfr!2sma!4v1"
          ></iframe>
        </div>
      </div>
    </div>
  );

  const renderSection8 = () => (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">Conditions</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div>
        <h4 className="text-lg font-semibold">Politique d&apos;annulation</h4>
        <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
          Annulation gratuite jusqu&apos;à 24h avant la prise en charge. Réservez maintenant, payez à la prise en charge.
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div>
        <h4 className="text-lg font-semibold">Note spéciale</h4>
        <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
          Un permis de conduire valide est requis. Le conducteur doit avoir au moins 21 ans. Une caution peut être demandée à la prise en charge.
        </span>
      </div>
    </div>
  );

  const renderSidebarPrice = () => (
    <div className="listingSectionSidebar__wrap shadow-xl">
      <div className="flex justify-between">
        <span className="text-3xl font-semibold">
          {car.price}
          <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">/jour</span>
        </span>
        <StartRating />
      </div>

      {/* Office selector */}
      {offices.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Agence de prise en charge
          </label>
          <select
            value={selectedOffice}
            onChange={(e) => setSelectedOffice(Number(e.target.value))}
            className="w-full border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-neutral-800 outline-none focus:ring-2 focus:ring-primary-500"
          >
            {offices.map((office) => (
              <option key={office.id} value={office.id}>{office.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Date picker */}
      <form className="border border-neutral-200 dark:border-neutral-700 rounded-2xl">
        <RentalCarDatesRangeInput onDatesChange={handleDatesChange} />
      </form>

      {/* Availability status */}
      {checking && (
        <p className="text-xs text-neutral-400 text-center">Vérification de la disponibilité...</p>
      )}
      {!checking && availability?.checked && (
        <div className={`text-sm font-medium text-center py-2 px-4 rounded-xl ${
          availability.available
            ? "bg-green-50 text-green-600 border border-green-100"
            : "bg-red-50 text-red-600 border border-red-100"
        }`}>
          {availability.available ? "Disponible ✓" : "Non disponible pour ces dates"}
        </div>
      )}

      {/* Price total */}
      {numDays > 0 && (
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
            <span>{car.price} × {numDays} jours</span>
            <span>€{totalPrice}</span>
          </div>
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>€{totalPrice}</span>
          </div>
        </div>
      )}

      {/* RESERVE — redirects to WooCommerce cart */}
      <button
        onClick={handleReserve}
        disabled={!startDate || !endDate || !selectedOffice || availability?.available === false}
        className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary-6000 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Réserver
      </button>
    </div>
  );

  const renderSidebarDetail = () => (
    <div className="listingSection__wrap lg:shadow-xl">
      <span className="text-2xl font-semibold block">Prise en charge et retour</span>
      <div className="mt-8 flex">
        <div className="flex-shrink-0 flex flex-col items-center py-2">
          <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
          <span className="block flex-grow border-l border-neutral-400 border-dashed my-1"></span>
          <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
        </div>
        <div className="ml-4 space-y-14 text-sm">
          <div className="flex flex-col space-y-2">
            <span className="text-neutral-500 dark:text-neutral-400">Date de prise en charge</span>
            <span className="font-semibold">
              {offices.find((o) => o.id === selectedOffice)?.name || "Sélectionner une agence"}
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-neutral-500 dark:text-neutral-400">Date de retour</span>
            <span className="font-semibold">
              {offices.find((o) => o.id === selectedOffice)?.name || "Même agence"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="nc-ListingCarDetailPage">
      {/* PHOTO HEADER — adaptive layout based on photo count */}
      <header className="rounded-md sm:rounded-xl">
        {PHOTOS.length === 1 ? (
          // Single photo: full-width hero
          <div
            className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
            onClick={handleOpenModalImageGallery}
          >
            <Image
              fill
              src={PHOTOS[0]}
              alt={car.title}
              className="object-cover rounded-md sm:rounded-xl"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
        ) : (
          // Multiple photos: 4-column grid
          <div className="relative grid grid-cols-4 gap-1 sm:gap-2 min-h-[280px] sm:min-h-[400px]">
            <div
              className="col-span-2 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
              onClick={handleOpenModalImageGallery}
            >
              <Image
                fill
                src={PHOTOS[0]}
                alt={car.title}
                className="object-cover rounded-md sm:rounded-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>

            {PHOTOS[1] && (
              <div
                className="col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                onClick={handleOpenModalImageGallery}
              >
                <Image
                  fill
                  className="object-cover rounded-md sm:rounded-xl"
                  src={PHOTOS[1]}
                  alt={car.title}
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>
            )}

            {PHOTOS.filter((_, i) => i >= 2 && i < 4).map((item, index) => (
              <div key={index} className="relative rounded-md sm:rounded-xl overflow-hidden">
                <div className="aspect-w-4 aspect-h-3">
                  <Image
                    fill
                    className="object-cover w-full h-full rounded-md sm:rounded-xl"
                    src={item}
                    alt={car.title}
                    sizes="400px"
                  />
                </div>
                <div
                  className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={handleOpenModalImageGallery}
                />
              </div>
            ))}
          </div>
        )}

        {/* Show all photos button — only with multiple photos */}
        {PHOTOS.length > 1 && (
          <div
            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
            onClick={handleOpenModalImageGallery}
          >
            <Squares2X2Icon className="h-5 w-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">Voir toutes les photos</span>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 mt-11 flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
          {renderSection1()}
          <div className="block lg:hidden">{renderSidebarDetail()}</div>
          {renderSectionTienIch()}
          {renderSection3()}
          <SectionDateRange />
          {renderSection6()}
          {renderSection7()}
          {renderSection8()}
        </div>

        {/* SIDEBAR */}
        <div className="block flex-grow mt-14 lg:mt-0">
          {renderSidebarDetail()}
          <div className="hidden lg:block mt-10 sticky top-28">
            {renderSidebarPrice()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarDetailClient;
