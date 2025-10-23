"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function CheckoutSuccess() {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{
        background: "linear-gradient(135deg, #001F3F 0%, #8B6F47 100%)",
        color: "white",
      }}
    >
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
      />

      <div className="max-w-lg bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-serif mb-4 text-[#D4AF37]">
          Compra Concluída!
        </h1>
        <p className="text-white/90 text-lg mb-8">
          Obrigado por confiar na <strong>Mendonça Dreams</strong>.
          <br />
          Seu pedido foi confirmado com sucesso 💫
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => router.push("/dashboard/orders")}
            className="px-8 py-3 rounded-lg bg-[#D4AF37] text-[#001F3F] font-medium hover:opacity-90 transition-opacity"
          >
            Ver Meus Pedidos
          </button>
          <button
            onClick={() => router.push("/#products")}
            className="px-8 py-3 rounded-lg border border-white font-medium text-white hover:bg-white/10 transition-colors"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    </section>
  );
}
