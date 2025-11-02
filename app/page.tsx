"use client"; // Torna a página inteira cliente-side para evitar hidratação SSR

import About from "@/components/about";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Newsletter from "@/components/newsletter";
import Products from "@/components/products";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Products />
      <About />
      <Newsletter />
      <Footer />
    </main>
  );
}
