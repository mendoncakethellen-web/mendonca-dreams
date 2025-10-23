import Header from "@/components/header"
import Hero from "@/components/hero"
import Products from "@/components/products"
import About from "@/components/about"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

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
  )
}
