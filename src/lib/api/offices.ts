import { Office } from "./types";
const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://hermanoscars.com";
export async function getOffices(): Promise<Office[]> {
  try {
    const res = await fetch(`${WP_URL}/wp-json/cars/v1/offices`, { next: { revalidate: 86400 } });
    if (!res.ok) return fallback();
    return await res.json();
  } catch { return fallback(); }
}
function fallback(): Office[] {
  return [
    { id: 107, name: "CASABLANCA AIRPORT" }, { id: 99, name: "CASABLANCA CITY" },
    { id: 98, name: "MARRAKECH AIRPORT" }, { id: 1219, name: "AGADIR AIRPORT" },
    { id: 1222, name: "RABAT AIRPORT" }, { id: 1224, name: "FES AIRPORT" }, { id: 1226, name: "TANGIER AIRPORT" },
  ];
}
