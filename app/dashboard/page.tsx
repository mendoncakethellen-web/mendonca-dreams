"use client"

import { createClient } from "@/lib/client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, ShoppingBag, User, Package } from "lucide-react"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setUser(user)
        const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single()
        setProfile(data)
      }
      setLoading(false)
    }

    loadData()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>
  }

  return (
    <div className="min-h-screen" style={{ background: "#f5f5f5" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-serif font-light" style={{ color: "#001F3F" }}>
              Bem-vinda, {profile?.full_name || user?.email}!
            </h1>
            <p className="text-gray-600 mt-2">Gerencie sua conta e pedidos</p>
          </div>
          <Button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white"
            style={{ background: "#8B6F47" }}
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Profile Card */}
          <Link href="/dashboard/profile">
            <div
              className="bg-white rounded-lg p-8 border cursor-pointer hover:shadow-lg transition-shadow"
              style={{ borderColor: "#e5e5e5" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg" style={{ background: "#001F3F" }}>
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: "#001F3F" }}>
                  Meu Perfil
                </h3>
              </div>
              <p className="text-gray-600">Edite suas informações pessoais</p>
            </div>
          </Link>

          {/* Cart Card */}
          <Link href="/dashboard/cart">
            <div
              className="bg-white rounded-lg p-8 border cursor-pointer hover:shadow-lg transition-shadow"
              style={{ borderColor: "#e5e5e5" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg" style={{ background: "#8B6F47" }}>
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: "#001F3F" }}>
                  Carrinho
                </h3>
              </div>
              <p className="text-gray-600">Veja seus itens no carrinho</p>
            </div>
          </Link>

          {/* Orders Card */}
          <Link href="/dashboard/orders">
            <div
              className="bg-white rounded-lg p-8 border cursor-pointer hover:shadow-lg transition-shadow"
              style={{ borderColor: "#e5e5e5" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg" style={{ background: "#D4AF37" }}>
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: "#001F3F" }}>
                  Meus Pedidos
                </h3>
              </div>
              <p className="text-gray-600">Acompanhe seus pedidos</p>
            </div>
          </Link>
        </div>

        {/* Continue Shopping */}
        <div className="bg-white rounded-lg p-8 border text-center" style={{ borderColor: "#e5e5e5" }}>
          <h3 className="text-xl font-semibold mb-4" style={{ color: "#001F3F" }}>
            Continuar Comprando
          </h3>
          <Link href="/">
            <Button className="text-white" style={{ background: "#001F3F" }}>
              Voltar à Loja
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
