"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Office } from "@/lib/api/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MapPinIcon, CalendarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface BookingSearchFormProps {
  offices: Office[];
  initialOfficeId?: number;
  initialStart?: Date | null;
  initialEnd?: Date | null;
}

export default function BookingSearchForm({
  offices,
  initialOfficeId,
  initialStart = null,
  initialEnd = null,
}: BookingSearchFormProps) {
  const t = useTranslations("booking");
  const locale = useLocale();
  const router = useRouter();

  const [selectedOffice, setSelectedOffice] = useState<number | null>(initialOfficeId || null);
  const [startDate, setStartDate] = useState<Date | null>(initialStart);
  const [endDate, setEndDate] = useState<Date | null>(initialEnd);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedOffice) params.set("office", String(selectedOffice));
    if (startDate) params.set("start", startDate.toISOString().split("T")[0]);
    if (endDate) params.set("end", endDate.toISOString().split("T")[0]);
    router.push(`/${locale}/fleet?${params.toString()}`);
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-xl p-2 flex flex-col md:flex-row gap-2">
      {/* Office selector */}
      <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-neutral-50 dark:bg-neutral-700 rounded-2xl">
        <MapPinIcon className="w-5 h-5 text-primary-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mb-0.5">{t("pickupLocation")}</p>
          <select
            value={selectedOffice || ""}
            onChange={(e) => setSelectedOffice(Number(e.target.value) || null)}
            className="w-full bg-transparent text-sm font-medium text-neutral-900 dark:text-white outline-none"
          >
            <option value="">{t("selectOffice")}</option>
            {offices.map((office) => (
              <option key={office.id} value={office.id}>
                {office.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Date range */}
      <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-neutral-50 dark:bg-neutral-700 rounded-2xl">
        <CalendarIcon className="w-5 h-5 text-primary-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mb-0.5">{t("pickupReturn")}</p>
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates as [Date | null, Date | null];
              setStartDate(start);
              setEndDate(end);
            }}
            startDate={startDate || undefined}
            endDate={endDate || undefined}
            selectsRange
            minDate={new Date()}
            placeholderText={t("addDates")}
            className="w-full bg-transparent text-sm font-medium text-neutral-900 dark:text-white outline-none placeholder-neutral-400"
            dateFormat="dd MMM yyyy"
            monthsShown={2}
          />
        </div>
      </div>

      {/* Search button */}
      <button
        onClick={handleSearch}
        className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-2xl transition-colors flex-shrink-0"
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
        <span className="hidden md:inline">{t("search")}</span>
      </button>
    </div>
  );
}
