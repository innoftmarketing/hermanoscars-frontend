"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const LOCALES = ["fr", "en", "es"] as const;

export default function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/fleet`, label: t("fleet") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary-600 tracking-tight">Hermanos</span>
          <span className="text-xl font-light text-neutral-700 dark:text-neutral-300">Cars</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-600 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="hidden md:flex items-center gap-1 text-xs font-medium text-neutral-500">
            {LOCALES.map((loc, i) => (
              <span key={loc} className="flex items-center gap-1">
                {i > 0 && <span className="text-neutral-300">|</span>}
                <Link
                  href={switchLocale(loc)}
                  className={`uppercase hover:text-primary-600 transition-colors ${loc === locale ? "text-primary-600 font-bold" : ""}`}
                >
                  {loc}
                </Link>
              </span>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/212661220832"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.122 1.528 5.855L.057 23.492a.5.5 0 00.614.65l5.88-1.54A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.525-5.185-1.437l-.372-.22-3.856 1.012 1.031-3.759-.24-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            WhatsApp
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-neutral-600 dark:text-neutral-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
            {LOCALES.map((loc) => (
              <Link
                key={loc}
                href={switchLocale(loc)}
                onClick={() => setMobileOpen(false)}
                className={`uppercase text-sm font-medium px-2 py-1 rounded ${loc === locale ? "bg-primary-600 text-white" : "text-neutral-500 hover:text-primary-600"}`}
              >
                {loc}
              </Link>
            ))}
          </div>
          <a
            href="https://wa.me/212661220832"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 text-white text-sm font-medium px-4 py-3 rounded-full"
          >
            Contacter sur WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
