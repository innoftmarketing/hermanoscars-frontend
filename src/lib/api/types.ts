export interface WCStoreProduct {
  id: number; name: string; slug: string;
  prices: { price: string; regular_price: string; currency_symbol: string };
  images: Array<{ id: number; src: string; alt: string }>;
  variations: number[];
  is_in_stock: boolean;
}
export interface WCStoreVariation {
  id: number;
  prices: { price: string; regular_price: string; currency_symbol: string };
}
export interface Car {
  id: number; title: string; slug: string; featuredImage: string; galleryImgs: string[];
  price: string; priceRaw: number; seats: number; gearshift: string; fuelType: string;
  variationId: number; officeIds: number[]; fleetSize: number; href: string;
  reviewStart: number; reviewCount: number; like: boolean; saleOff: string | null;
  isAds: boolean | null; address: string;
}
export interface Office { id: number; name: string; }
export interface AvailabilityResult {
  available: boolean; booked_dates: string[]; available_units: number; cars_qty: number;
}
