"use client"

import { Heart, ShoppingBag } from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/client"
import { useRouter } from "next/navigation"

export default function Products() {
  const [products, setProducts] = useState<any[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient()

      // Get user
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      // Get products
      const { data } = await supabase.from("products").select("*")
      setProducts(data || [])
    }

    loadData()
  }, [])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const addToCart = async (productId: string) => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    const supabase = createClient()
    const { data: existingItem } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .single()

    if (existingItem) {
      await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + 1 })
        .eq("id", existingItem.id)
    } else {
      await supabase.from("cart_items").insert({
        user_id: user.id,
        product_id: productId,
        quantity: 1,
      })
    }

    alert("Produto adicionado ao carrinho!")
  }

  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "#f5f5f5" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#8B6F47" }}>
            Coleção
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light" style={{ color: "#001F3F" }}>
            Peças Selecionadas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubra nossa curadoria exclusiva de peças que definem elegância e sofisticação profissional
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group">
              {/* Product Image */}
              <div className="relative mb-4 rounded-lg overflow-hidden bg-white aspect-square">
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badge */}
                <div
                  className="absolute top-4 left-4 text-white px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: "#001F3F" }}
                >
                  {product.category}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                    }`}
                  />
                </button>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product.id)}
                  className="absolute bottom-0 left-0 right-0 py-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity text-white"
                  style={{ background: "#001F3F" }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Adicionar
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="font-medium" style={{ color: "#001F3F" }}>
                  {product.name}
                </h3>
                <p className="font-semibold" style={{ color: "#8B6F47" }}>
                  R$ {Number.parseFloat(product.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            className="px-8 py-3 border rounded-lg hover:opacity-80 transition-opacity font-medium"
            style={{ color: "#001F3F", borderColor: "#001F3F" }}
          >
            Ver Toda Coleção
          </button>
        </div>
      </div>
    </section>
  )
}
