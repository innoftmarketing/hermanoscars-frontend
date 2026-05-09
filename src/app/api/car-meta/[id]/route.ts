import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const baseUrl = process.env.WP_BACKEND_URL || process.env.NEXT_PUBLIC_WP_URL || "";
  const key = process.env.WC_CONSUMER_KEY || "";
  const secret = process.env.WC_CONSUMER_SECRET || "";
  if (!key || !secret) return NextResponse.json({ error: "Not configured" }, { status: 500 });

  const auth = Buffer.from(`${key}:${secret}`).toString("base64");
  try {
    const res = await fetch(`${baseUrl}/wp-json/wc/v3/products/${id}`, {
      headers: { Authorization: `Basic ${auth}` },
      next: { revalidate: 3600, tags: [`product-${id}`] },
    });
    if (!res.ok) return NextResponse.json({ error: "WP error" }, { status: res.status });
    const data = await res.json();
    const metaMap: Record<string, string> = {};
    if (Array.isArray(data.meta_data)) {
      for (const m of data.meta_data) metaMap[m.key] = String(m.value);
    }
    return NextResponse.json({
      id: data.id,
      meta: {
        cars_qty: metaMap["cars_qty"] || "1",
        interior_color: metaMap["interior-color"] || "",
        stm_rental_office: metaMap["stm_rental_office"] || "",
      },
    });
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
