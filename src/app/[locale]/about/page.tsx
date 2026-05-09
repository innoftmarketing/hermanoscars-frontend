import { getTranslations } from "next-intl/server";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  const t = await getTranslations("about");

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-3">{t("title")}</h1>
      <p className="text-lg text-primary-600 font-medium mb-8">{t("subtitle")}</p>
      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10">{t("story")}</p>

      <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📍</span>
          <div>
            <p className="font-medium text-neutral-900 dark:text-white">Adresse</p>
            <p className="text-neutral-500">{t("address")}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-2xl">📞</span>
          <div>
            <p className="font-medium text-neutral-900 dark:text-white">Téléphone</p>
            <a href={`tel:${t("phone")}`} className="text-primary-600 hover:underline">{t("phone")}</a>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-2xl">✉️</span>
          <div>
            <p className="font-medium text-neutral-900 dark:text-white">Email</p>
            <a href={`mailto:${t("email")}`} className="text-primary-600 hover:underline">{t("email")}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
