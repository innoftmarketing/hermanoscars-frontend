"use client";

import React, { FC, useState } from "react";
import LocationInput from "../LocationInput";
import RentalCarDatesRangeInput from "./RentalCarDatesRangeInput";
import ButtonSubmit from "../ButtonSubmit";
import { usePathname } from "next/navigation";

export interface RentalCarSearchFormProps {}

const RentalCarSearchForm: FC<RentalCarSearchFormProps> = ({}) => {
  const pathname = usePathname();
  // Extract locale from pathname (e.g. /fr/... → fr)
  const locale = pathname.split("/")[1] || "fr";

  const [pickupLocation, setPickupLocation] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const buildSearchUrl = () => {
    const params = new URLSearchParams();
    if (pickupLocation) params.set("location", pickupLocation);
    if (startDate) params.set("start", startDate.toISOString().split("T")[0]);
    if (endDate) params.set("end", endDate.toISOString().split("T")[0]);
    return `/${locale}/fleet?${params.toString()}`;
  };

  return (
    <form className="w-full relative mt-8 rounded-[40px] xl:rounded-[49px] rounded-t-2xl xl:rounded-t-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
      {/* Simplified: single pickup location (same pickup/dropoff for car rental agency) */}
      <div className="relative flex flex-row">
        <LocationInput
          placeHolder="Agence de prise en charge"
          desc="Où voulez-vous louer ?"
          className="flex-1"
          onSelectLocation={setPickupLocation}
        />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <RentalCarDatesRangeInput
          className="flex-1"
          onDatesChange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
        />
        <ButtonSubmit href={buildSearchUrl()} />
      </div>
    </form>
  );
};

export default RentalCarSearchForm;
