"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/client";
import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("cart_items")
          .select("*, products(*)")
          .eq("user_id", user.id);

        setCartItems(data || []);
        const cartTotal = (data || []).reduce(
          (sum, item) => sum + (item.products?.price || 0) * item.quantity,
          0
        );
        setTotal(cartTotal);
      }
      setLoading(false);
    };

    loadCart();
  }, []);

  const removeItem = async (cartItemId: string) => {
    const supabase = createClient();
    await supabase.from("cart_items").delete().eq("id", cartItemId);
    setCartItems(cartItems.filter((item) => item.id !== cartItemId));
  };

  const checkout = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user && cartItems.length > 0) {
      // Create order
      const { data: order } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_price: total,
          status: "pending",
        })
        .select()
        .single();

      if (order) {
        // Create order items
        const orderItems = cartItems.map((item) => ({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.products?.price,
        }));

        await supabase.from("order_items").insert(orderItems);

        // Clear cart
        await supabase.from("cart_items").delete().eq("user_id", user.id);

        alert("Pedido realizado com sucesso!");
        setCartItems([]);
        setTotal(0);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#f5f5f5" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 mb-6"
          style={{ color: "#001F3F" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        <h1
          className="text-3xl font-serif font-light mb-8"
          style={{ color: "#001F3F" }}
        >
          Carrinho
        </h1>

        {cartItems.length === 0 ? (
          <div
            className="bg-white rounded-lg p-8 text-center border"
            style={{ borderColor: "#e5e5e5" }}
          >
            <p className="text-gray-600 mb-4">Seu carrinho está vazio</p>
            <Link href="/" className="text-blue-600 hover:underline">
              Continuar comprando
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg p-6 border flex justify-between items-center"
                  style={{ borderColor: "#e5e5e5" }}
                >
                  <div>
                    <h3 className="font-semibold" style={{ color: "#001F3F" }}>
                      {item.products?.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Quantidade: {item.quantity}
                    </p>
                    <p className="font-semibold" style={{ color: "#8B6F47" }}>
                      R$ {(item.products?.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              ))}
            </div>

            <div
              className="bg-white rounded-lg p-6 border h-fit"
              style={{ borderColor: "#e5e5e5" }}
            >
              <h3 className="font-semibold mb-4" style={{ color: "#001F3F" }}>
                Resumo
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>
              </div>
              <div
                className="border-t pt-4 mb-4"
                style={{ borderColor: "#e5e5e5" }}
              >
                <div
                  className="flex justify-between font-semibold"
                  style={{ color: "#001F3F" }}
                >
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>
              <Button
                onClick={checkout}
                className="w-full text-white"
                style={{ background: "#001F3F" }}
              >
                Finalizar Compra
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
