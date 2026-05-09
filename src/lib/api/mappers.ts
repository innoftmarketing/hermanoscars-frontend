import { Car } from "./types";
import { CarDataType } from "@/data/types";

const HERMANOS_AUTHOR = {
  id: 1,
  firstName: "Hermanos",
  lastName: "Cars",
  displayName: "Hermanos Cars",
  avatar: "",
  count: 0,
  desc: "Location de voiture à l'aéroport de Casablanca",
  jobName: "Car Rental",
  href: "/" as const,
};

const CAR_CATEGORY = {
  id: 33,
  name: "Car Rental",
  href: "/fleet" as const,
  taxonomy: "category" as const,
  listingType: "car" as const,
};

export function carToCarDataType(car: Car, locale: string = "fr"): CarDataType {
  return {
    id: car.id,
    author: HERMANOS_AUTHOR,
    date: new Date().toLocaleDateString(),
    href: `/${locale}/fleet/${car.id}` as const,
    title: car.title,
    featuredImage: car.featuredImage,
    commentCount: 0,
    viewCount: 0,
    address: car.address,
    reviewStart: car.reviewStart || 5,
    reviewCount: car.reviewCount || 0,
    like: car.like || false,
    galleryImgs: car.galleryImgs,
    price: car.price,
    listingCategory: CAR_CATEGORY,
    seats: car.seats,
    gearshift: car.gearshift,
    saleOff: car.saleOff,
    isAds: car.isAds,
    map: { lat: 33.3675, lng: -7.5898 },
  };
}
