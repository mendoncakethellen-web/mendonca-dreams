"use client"

import { createClient } from "@/lib/client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOrders = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        setOrders(data || [])
      }
      setLoading(false)
    }

    loadOrders()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>
  }

  return (
    <div className="min-h-screen" style={{ background: "#f5f5f5" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/dashboard" className="flex items-center gap-2 mb-6" style={{ color: "#001F3F" }}>
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        <h1 className="text-3xl font-serif font-light mb-8" style={{ color: "#001F3F" }}>
          Meus Pedidos
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center border" style={{ borderColor: "#e5e5e5" }}>
            <p className="text-gray-600 mb-4">Você ainda não tem pedidos</p>
            <Link href="/" className="text-blue-600 hover:underline">
              Continuar comprando
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg p-6 border" style={{ borderColor: "#e5e5e5" }}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600">Pedido #{order.id.slice(0, 8)}</p>
                    <p className="font-semibold" style={{ color: "#001F3F" }}>
                      R$ {Number.parseFloat(order.total_price).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm" style={{ color: "#8B6F47" }}>
                      {order.status}
                    </p>
                    <p className="text-xs text-gray-600">{new Date(order.created_at).toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
