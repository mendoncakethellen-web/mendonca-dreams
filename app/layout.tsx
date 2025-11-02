"use client";

import PageTransition from "@/components/PageTransition";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import type React from "react";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Mendonça Dreams - Moda Feminina Exclusiva",
  description:
    "Descubra nossa coleção exclusiva de moda feminina premium. Elegância, sofisticação e qualidade em cada peça.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`font-sans antialiased ${_playfair.variable}`}>
        <PageTransition>{children}</PageTransition>
        <Analytics />
      </body>
    </html>
  );
}
