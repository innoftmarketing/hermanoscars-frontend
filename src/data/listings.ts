import { CarDataType } from "./types";

// Demo fallback data — real data comes from WordPress via src/lib/api/cars.ts
// This file exists to satisfy template component imports during build
const carsJson = require("./jsons/__carsListing.json");

export const DEMO_CAR_LISTINGS: CarDataType[] = carsJson.map(
  (car: {
    id: string;
    title: string;
    featuredImage: string;
    galleryImgs: string[];
    price: string;
    seats: number;
    gearshift: string;
    reviewStart: number;
    reviewCount: number;
    like: boolean;
    saleOff: string | null;
    isAds: boolean | null;
    address: string;
    href: string;
    date: string;
    commentCount: number;
    viewCount: number;
  }) => ({
    id: car.id,
    author: {
      id: 1,
      firstName: "Hermanos",
      lastName: "Cars",
      displayName: "Hermanos Cars",
      avatar: "",
      count: 0,
      desc: "",
      jobName: "",
      href: "/" as const,
    },
    date: car.date || "",
    href: car.href || "/fleet",
    title: car.title,
    featuredImage: car.featuredImage,
    commentCount: car.commentCount || 0,
    viewCount: car.viewCount || 0,
    address: car.address || "Casablanca Mohammed V Airport",
    reviewStart: car.reviewStart || 5,
    reviewCount: car.reviewCount || 0,
    like: car.like || false,
    galleryImgs: car.galleryImgs || [],
    price: car.price || "€48",
    listingCategory: {
      id: 1,
      name: "Car",
      href: "/fleet",
      taxonomy: "category" as const,
      listingType: "car" as const,
    },
    seats: car.seats || 5,
    gearshift: car.gearshift || "Automatic",
    saleOff: car.saleOff || null,
    isAds: car.isAds || null,
    map: { lat: 33.3675, lng: -7.5898 },
  })
);
