import { NextResponse } from "next/server";

const FALLBACK = [
  { id: 107, name: "CASABLANCA AIRPORT" },
  { id: 99, name: "CASABLANCA CITY" },
  { id: 98, name: "MARRAKECH AIRPORT" },
  { id: 1219, name: "AGADIR AIRPORT" },
  { id: 1222, name: "RABAT AIRPORT" },
  { id: 1224, name: "FES AIRPORT" },
  { id: 1226, name: "TANGIER AIRPORT" },
];

export async function GET() {
  try {
    // Server-side fetch — no CORS issue
    const res = await fetch("https://hermanoscars.com/wp-json/cars/v1/offices", {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return NextResponse.json(FALLBACK);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(FALLBACK);
  }
}
