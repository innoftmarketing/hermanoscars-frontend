import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale ? useLocale() : "fr";

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-primary-400">Hermanos</span>
              <span className="text-xl font-light text-white">Cars</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Location de voiture à l&apos;aéroport Mohammed V de Casablanca. Service premium, flotte moderne.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="flex flex-col gap-2 text-sm text-neutral-400">
              <p>📍 {t("address")}</p>
              <p>🕐 {t("hours")}</p>
              <a href="tel:+212661220832" className="hover:text-primary-400 transition-colors">
                📞 {t("phone")}
              </a>
              <a href="mailto:Hermanosrentcar@gmail.com" className="hover:text-primary-400 transition-colors">
                ✉️ {t("email")}
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href={`/${locale}/fleet`} className="text-neutral-400 hover:text-primary-400 transition-colors">Notre Flotte</Link>
              <Link href={`/${locale}/about`} className="text-neutral-400 hover:text-primary-400 transition-colors">À Propos</Link>
              <Link href={`/${locale}/contact`} className="text-neutral-400 hover:text-primary-400 transition-colors">Contact</Link>
              <Link href={`/${locale}/cgv`} className="text-neutral-400 hover:text-primary-400 transition-colors">{t("cgv")}</Link>
              <Link href={`/${locale}/refund`} className="text-neutral-400 hover:text-primary-400 transition-colors">{t("refund")}</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} Hermanos Cars. {t("rights")}.</p>
          <a
            href="https://wa.me/212661220832"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.122 1.528 5.855L.057 23.492a.5.5 0 00.614.65l5.88-1.54A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.525-5.185-1.437l-.372-.22-3.856 1.012 1.031-3.759-.24-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            +212 661-220832
          </a>
        </div>
      </div>
    </footer>
  );
}
