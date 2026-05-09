import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-revalidate-token");
  if (!process.env.REVALIDATE_SECRET || token !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { productId, type } = await req.json();
    if (type === "product.updated" && productId) {
      revalidateTag(`product-${productId}`);
    }
    revalidateTag("cars-list");
    return NextResponse.json({ revalidated: true, timestamp: Date.now() });
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
}
