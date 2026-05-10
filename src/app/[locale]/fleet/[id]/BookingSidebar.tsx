"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Car, Office } from "@/lib/api/types";
import { buildBookingUrl, checkAvailability } from "@/lib/api/availability";
import RentalCarDatesRangeInput from "./RentalCarDatesRangeInput";
import StartRating from "@/components/StartRating";

interface BookingSidebarProps {
  rawCar: Car;
  offices: Office[];
  defaultOfficeId: number;
  variant?: "card" | "inline" | "compact";
}

export default function BookingSidebar({
  rawCar,
  offices,
  defaultOfficeId,
  variant = "card",
}: BookingSidebarProps) {
  const [selectedOffice, setSelectedOffice] = useState<number>(defaultOfficeId);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [availability, setAvailability] = useState<{ available: boolean; checked: boolean } | null>(null);
  const [checking, setChecking] = useState(false);

  const numDays = startDate && endDate
    ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const totalPrice = numDays > 0 ? rawCar.priceRaw * numDays : 0;

  const handleDatesChange = useCallback(async (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    setAvailability(null);
    if (start && end) {
      setChecking(true);
      try {
        const result = await checkAvailability(
          rawCar.id,
          start.toISOString().split("T")[0],
          end.toISOString().split("T")[0]
        );
        setAvailability({ available: result.available, checked: true });
      } finally {
        setChecking(false);
      }
    }
  }, [rawCar.id]);

  const handleReserve = () => {
    if (!startDate || !endDate || !selectedOffice) return;
    window.location.href = buildBookingUrl(
      rawCar.variationId,
      startDate.toISOString().split("T")[0],
      endDate.toISOString().split("T")[0],
      selectedOffice
    );
  };

  const canBook = startDate && endDate && selectedOffice && availability?.available !== false && !checking;

  const wrapperClass =
    variant === "card"
      ? "listingSectionSidebar__wrap shadow-xl"
      : variant === "inline"
      ? "border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 space-y-4"
      : "space-y-3"; // compact

  return (
    <div className={wrapperClass}>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl font-semibold">{rawCar.price}</span>
          <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">/jour</span>
        </div>
        <StartRating />
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-500 mb-1.5">
          Agence de prise en charge
        </label>
        <select
          value={selectedOffice}
          onChange={(e) => setSelectedOffice(Number(e.target.value))}
          className="w-full border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-neutral-800 outline-none focus:ring-2 focus:ring-primary-6000"
        >
          {offices.map((office) => (
            <option key={office.id} value={office.id}>{office.name}</option>
          ))}
        </select>
      </div>

      <form className="border border-neutral-200 dark:border-neutral-700 rounded-2xl">
        <RentalCarDatesRangeInput onDatesChange={handleDatesChange} />
      </form>

      {checking && (
        <p className="text-xs text-neutral-400 text-center">Vérification...</p>
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

      {numDays > 0 && (
        <div className="flex flex-col space-y-2 border-t border-neutral-100 dark:border-neutral-700 pt-4">
          <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-300">
            <span>{rawCar.price} × {numDays} jours</span>
            <span>€{totalPrice}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>€{totalPrice}</span>
          </div>
        </div>
      )}

      <button
        onClick={handleReserve}
        disabled={!canBook}
        className="w-full flex items-center justify-center px-6 py-3.5 rounded-full text-base font-medium text-white bg-primary-6000 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Réserver
      </button>
    </div>
  );
}
