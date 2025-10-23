"use client";

import { createClient } from "@/lib/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const loadCart = async () => {
      const supabase = createClient();

      // 🔹 Pega o usuário logado
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      setUser(user);

      // 🔹 Define os tipos esperados
      type ProductRow = {
        name: string;
        price: string | number;
        image_url: string | null;
      };

      type CartItemRow = {
        id: string;
        quantity: number;
        products: ProductRow | null;
      };

      // 🔹 Busca os itens do carrinho + produtos relacionados
      const { data, error } = await (
        supabase.from("cart_items").select(`
    id,
    quantity,
    products:product_id ( name, price, image_url )
  `) as any
      ).eq("user_id", user.id);

      if (error) {
        console.error("Erro ao carregar carrinho:", error.message);
        return;
      }

      if (data) {
        setCartItems(data);

        // 🔹 Calcula o total com tipos definidos
        const totalAmount = (data as any[]).reduce((sum: number, item: any) => {
          const priceNum = Number(item.products?.price ?? 0);
          const qty = item.quantity ?? 0;
          return sum + priceNum * qty;
        }, 0);

        setTotal(totalAmount);
      }

      if (error) {
        console.error("Erro ao carregar carrinho:", error.message);
        return;
      }

      if (data) {
        setCartItems(data);

        // 🔹 Calcula o total com tipos definidos
        const totalAmount = data.reduce((sum: number, item: CartItemRow) => {
          const priceNum = Number(item.products?.price ?? 0);
          const qty = item.quantity ?? 0;
          return sum + priceNum * qty;
        }, 0);

        setTotal(totalAmount);
      }
    };

    loadCart();
  }, [router]);

  // 🔹 Finaliza a compra
  const handleCheckout = async () => {
    const supabase = createClient();

    const { error: orderError } = await supabase.from("orders").insert({
      user_id: user.id,
      total_amount: total,
      status: "confirmado",
      created_at: new Date(),
    });

    if (orderError) {
      alert("Erro ao finalizar compra. Tente novamente.");
      console.error(orderError);
      return;
    }

    await supabase.from("cart_items").delete().eq("user_id", user.id);

    alert("Compra finalizada com sucesso!");
    router.push("/checkout/success");
  };

  // 🔹 Carrinho vazio
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-gray-700">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Seu carrinho está vazio 🛒
          </h2>
          <button
            onClick={() => router.push("/#products")}
            className="px-6 py-3 bg-[#001F3F] text-white rounded-lg hover:opacity-90"
          >
            Ver produtos
          </button>
        </div>
      </div>
    );
  }

  // 🔹 Página de checkout
  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-[#f9f9f9]">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-light text-[#001F3F] mb-8">
          Finalizar Compra
        </h1>

        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.products?.image_url || "/placeholder.png"}
                  alt={item.products?.name || "Produto"}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium text-[#001F3F]">
                    {item.products?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantidade: {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-[#8B6F47]">
                R${" "}
                {(
                  Number(item.products?.price ?? 0) * (item.quantity ?? 0)
                ).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-10">
          <p className="text-lg font-medium text-[#001F3F]">Total:</p>
          <p className="text-2xl font-bold text-[#8B6F47]">
            R$ {total.toFixed(2)}
          </p>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleCheckout}
            className="px-10 py-4 bg-[#001F3F] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </section>
  );
}
