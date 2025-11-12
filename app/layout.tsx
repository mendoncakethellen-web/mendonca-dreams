import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import type React from "react";
import "./globals.css";

// === FONTES ===
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// === SEO e METADADOS ===
export const metadata = {
  title: "Mendonça Dreams - Moda Feminina Exclusiva",
  description: "Descubra nossa coleção exclusiva de moda feminina premium.",
  icons: {
    icon: "/public/favicon.png",
  },
  openGraph: {
    title: "Mendonça Dreams",
    description:
      "Moda feminina premium com exclusividade e elegância em cada detalhe.",
    url: "https://mendonca-dreams.vercel.app",
    siteName: "Mendonça Dreams",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mendonça Dreams - Moda Feminina Premium",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

// === LAYOUT ===
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${inter.variable} ${playfair.variable}
          font-[var(--font-inter)] antialiased bg-white text-neutral-900 selection:bg-[#D4AF37]/20 selection:text-neutral-900`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
