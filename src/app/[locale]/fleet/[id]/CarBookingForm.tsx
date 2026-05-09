"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Car, Office } from "@/lib/api/types";
import { checkAvailability, buildBookingUrl } from "@/lib/api/availability";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";

interface CarBookingFormProps {
  car: Car;
  offices: Office[];
  initialOfficeId: number | null;
  initialStart: string | null;
  initialEnd: string | null;
  locale: string;
}

export default function CarBookingForm({
  car, offices, initialOfficeId, initialStart, initialEnd, locale,
}: CarBookingFormProps) {
  const t = useTranslations("booking");

  const [selectedOffice, setSelectedOffice] = useState<number | null>(initialOfficeId);
  const [startDate, setStartDate] = useState<Date | null>(initialStart ? new Date(initialStart) : null);
  const [endDate, setEndDate] = useState<Date | null>(initialEnd ? new Date(initialEnd) : null);
  const [availability, setAvailability] = useState<{ available: boolean; checked: boolean } | null>(null);
  const [checking, setChecking] = useState(false);

  const numDays = startDate && endDate
    ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const totalPrice = numDays > 0 ? car.priceRaw * numDays : 0;

  const checkDates = useCallback(async () => {
    if (!startDate || !endDate) return;
    setChecking(true);
    try {
      const start = startDate.toISOString().split("T")[0];
      const end = endDate.toISOString().split("T")[0];
      const result = await checkAvailability(car.id, start, end);
      setAvailability({ available: result.available, checked: true });
    } finally {
      setChecking(false);
    }
  }, [startDate, endDate, car.id]);

  useEffect(() => {
    if (startDate && endDate) {
      const timer = setTimeout(checkDates, 500);
      return () => clearTimeout(timer);
    } else {
      setAvailability(null);
    }
  }, [startDate, endDate, checkDates]);

  const handleBook = () => {
    if (!startDate || !endDate || !selectedOffice) return;
    const start = startDate.toISOString().split("T")[0];
    const end = endDate.toISOString().split("T")[0];
    const url = buildBookingUrl(car.variationId, start, end, selectedOffice);
    window.location.href = url;
  };

  const canBook = startDate && endDate && selectedOffice && availability?.available && !checking;

  return (
    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-3xl p-6 shadow-lg space-y-5">
      {/* Price header */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-neutral-900 dark:text-white">{car.price}</span>
        <span className="text-neutral-400 text-sm">{t("perDay")}</span>
      </div>

      {/* Date picker */}
      <div>
        <label className="flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">
          <CalendarIcon className="w-4 h-4" />
          {t("pickupReturn")}
        </label>
        <div className="border border-neutral-200 dark:border-neutral-600 rounded-2xl px-4 py-3">
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates as [Date | null, Date | null];
              setStartDate(start);
              setEndDate(end);
              setAvailability(null);
            }}
            startDate={startDate || undefined}
            endDate={endDate || undefined}
            selectsRange
            minDate={new Date()}
            placeholderText={t("addDates")}
            className="w-full text-sm font-medium text-neutral-900 dark:text-white bg-transparent outline-none placeholder-neutral-400"
            dateFormat="dd MMM yyyy"
            monthsShown={1}
          />
        </div>
      </div>

      {/* Office selector */}
      <div>
        <label className="flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">
          <MapPinIcon className="w-4 h-4" />
          {t("pickupLocation")}
        </label>
        <select
          value={selectedOffice || ""}
          onChange={(e) => setSelectedOffice(Number(e.target.value) || null)}
          className="w-full border border-neutral-200 dark:border-neutral-600 rounded-2xl px-4 py-3 text-sm text-neutral-900 dark:text-white bg-white dark:bg-neutral-800 outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">{t("selectOffice")}</option>
          {offices.map((office) => (
            <option key={office.id} value={office.id}>{office.name}</option>
          ))}
        </select>
      </div>

      {/* Availability status */}
      {checking && (
        <p className="text-xs text-neutral-400 text-center">{t("checkAvailability")}</p>
      )}
      {!checking && availability?.checked && (
        <div className={`text-sm font-medium text-center py-2 px-4 rounded-xl ${
          availability.available
            ? "bg-green-50 text-green-600 border border-green-100"
            : "bg-red-50 text-red-600 border border-red-100"
        }`}>
          {availability.available ? t("available") : t("notAvailable")}
        </div>
      )}

      {/* Price breakdown */}
      {numDays > 0 && (
        <div className="border-t border-neutral-100 dark:border-neutral-700 pt-4 space-y-2">
          <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
            <span>{car.price} × {numDays} {t("days")}</span>
            <span>€{totalPrice}</span>
          </div>
          <div className="flex justify-between font-bold text-neutral-900 dark:text-white">
            <span>{t("total")}</span>
            <span>€{totalPrice}</span>
          </div>
        </div>
      )}

      {/* Book button */}
      <button
        onClick={handleBook}
        disabled={!canBook}
        className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
          canBook
            ? "bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl"
            : "bg-neutral-200 dark:bg-neutral-700 text-neutral-400 cursor-not-allowed"
        }`}
      >
        {t("reserve")}
      </button>

      <p className="text-xs text-center text-neutral-400">
        Vous serez redirigé vers notre page de paiement sécurisé
      </p>
    </div>
  );
}
