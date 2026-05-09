import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hermanos Cars — Location de voiture Casablanca Aéroport",
  description: "Location de voiture à l'aéroport Mohammed V de Casablanca. Flotte premium, service 24h/24, paiement CMI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
