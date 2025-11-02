"use client";

import { ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VoltarInicio() {
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => router.push("/"), 800);
  };

  return (
    <button
      onClick={scrollToTop}
      className="mt-12 flex items-center gap-2 bg-[#D4AF37] text-[#001F3F] px-5 py-2 rounded-full font-semibold hover:bg-[#e0bf4b] transition-all animate__animated animate__fadeInUp"
    >
      <ArrowUp className="w-4 h-4" />
      Voltar ao Início
    </button>
  );
}
