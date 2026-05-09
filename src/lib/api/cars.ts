import { Car, WCStoreProduct, WCStoreVariation } from "./types";

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://hermanoscars.com";
const CAR_CATEGORY_ID = 33;

function mapProductToCar(product: WCStoreProduct, variationId: number, meta: Record<string, string>): Car {
  const priceRaw = parseInt(product.prices.regular_price || "0", 10) / 100;
  const currency = product.prices.currency_symbol || "€";
  const interiorColor = meta["interior-color"] || "";
  const parts = interiorColor.split(",");
  const gearshift = parts[0]?.trim() || "Automatic";
  const fuelType = (parts[1]?.trim() || "Essence").split(" ")[0];
  const officeIds = (meta["stm_rental_office"] || "")
    .split(",").map((id) => parseInt(id.trim(), 10)).filter((id) => !isNaN(id) && id > 0);
  const fleetSize = parseInt(meta["cars_qty"] || "1", 10);

  return {
    id: product.id,
    title: product.name,
    slug: product.slug,
    featuredImage: product.images[0]?.src || "",
    galleryImgs: product.images.map((img) => img.src),
    price: `${currency}${priceRaw}`,
    priceRaw,
    seats: 5,
    gearshift,
    fuelType,
    variationId,
    officeIds,
    fleetSize,
    href: `/fleet/${product.id}`,
    reviewStart: 5,
    reviewCount: 0,
    like: false,
    saleOff: null,
    isAds: null,
    address: "Casablanca Mohammed V Airport",
  };
}

async function getCarMeta(productId: number): Promise<Record<string, string>> {
  const baseUrl = process.env.WP_BACKEND_URL || process.env.NEXT_PUBLIC_WP_URL || "";
  const key = process.env.WC_CONSUMER_KEY || "";
  const secret = process.env.WC_CONSUMER_SECRET || "";
  if (!key || !secret) return {};
  const auth = Buffer.from(`${key}:${secret}`).toString("base64");
  try {
    const res = await fetch(`${baseUrl}/wp-json/wc/v3/products/${productId}`, {
      headers: { Authorization: `Basic ${auth}` },
      next: { revalidate: 3600, tags: [`product-${productId}`] },
    });
    if (!res.ok) return {};
    const data = await res.json();
    const metaMap: Record<string, string> = {};
    if (Array.isArray(data.meta_data)) {
      for (const m of data.meta_data) metaMap[m.key] = String(m.value);
    }
    return metaMap;
  } catch {
    return {};
  }
}

export async function getCarVariations(productId: number): Promise<WCStoreVariation[]> {
  try {
    const res = await fetch(`${WP_URL}/wp-json/wc/store/v1/products/${productId}/variations?per_page=5`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function getCars(): Promise<Car[]> {
  const res = await fetch(
    `${WP_URL}/wp-json/wc/store/v1/products?category=${CAR_CATEGORY_ID}&per_page=100&orderby=date&order=desc`,
    { next: { revalidate: 3600, tags: ["cars-list"] } }
  );
  if (!res.ok) return [];
  const products: WCStoreProduct[] = await res.json();
  return Promise.all(
    products.map(async (product) => {
      const [variations, meta] = await Promise.all([getCarVariations(product.id), getCarMeta(product.id)]);
      return mapProductToCar(product, variations[0]?.id || product.id, meta);
    })
  );
}

export async function getCar(id: number): Promise<Car | null> {
  const res = await fetch(`${WP_URL}/wp-json/wc/store/v1/products/${id}`, {
    next: { revalidate: 3600, tags: [`product-${id}`] },
  });
  if (!res.ok) return null;
  const product: WCStoreProduct = await res.json();
  const [variations, meta] = await Promise.all([getCarVariations(id), getCarMeta(id)]);
  return mapProductToCar(product, variations[0]?.id || id, meta);
}

export async function getAllCarIds(): Promise<number[]> {
  const cars = await getCars();
  return cars.map((car) => car.id);
}
