import { getTranslations } from "next-intl/server";

async function fetchLegalPage(slug: string) {
  try {
    const res = await fetch(
      `https://hermanoscars.com/wp-json/wp/v2/pages?slug=${slug}&_fields=content,title`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] || null;
  } catch {
    return null;
  }
}

export default async function RefundPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  const t = await getTranslations("legal");
  const page = await fetchLegalPage("refund-policy");

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">{t("refundTitle")}</h1>
      {page ? (
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      ) : (
        <p className="text-neutral-500">Contenu en cours de chargement...</p>
      )}
    </div>
  );
}
