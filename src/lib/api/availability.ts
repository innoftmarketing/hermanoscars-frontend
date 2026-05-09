import { AvailabilityResult } from "./types";
const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://hermanoscars.com";
const fallback: AvailabilityResult = { available: true, booked_dates: [], available_units: 1, cars_qty: 1 };
export async function checkAvailability(carId: number, startDate: string, endDate: string): Promise<AvailabilityResult> {
  if (!carId || !startDate || !endDate) return fallback;
  try {
    const res = await fetch(`${WP_URL}/wp-json/cars/v1/availability`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ car_id: carId, start_date: startDate, end_date: endDate }),
      cache: "no-store",
    });
    if (!res.ok) return fallback;
    return await res.json();
  } catch { return fallback; }
}
export function buildBookingUrl(variationId: number, startDate: string, endDate: string, officeId: number): string {
  const params = new URLSearchParams({ "add-to-cart": String(variationId), quantity: "1", rental_start: startDate, rental_end: endDate, pickup_location_id: String(officeId) });
  return `https://hermanoscars.com/?${params.toString()}`;
}
