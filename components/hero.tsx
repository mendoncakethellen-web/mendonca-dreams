"use client";

import Image from "next/image"; // ✅ Faltava importar o Image!
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(135deg, #001F3F 0%, #8B6F47 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* === LEFT CONTENT === */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-white text-sm font-semibold tracking-widest uppercase">
                Bem-vinda
              </p>
              <h1 className="font-serif text-5xl md:text-6xl font-light leading-tight text-balance text-white">
                Exclusividade e Elegância
              </h1>
              <p className="text-white/80 text-lg leading-relaxed">
                Cada peça é cuidadosamente selecionada para mulheres
                profissionais que entendem a importância da qualidade, estilo e
                sofisticação.
              </p>
            </div>

            {/* === BUTTONS === */}
            <div className="flex gap-4 pt-4">
              <Link href="/#products" aria-label="Explorar coleção de produtos">
                <button
                  className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                  style={{ background: "#D4AF37" }}
                >
                  Explorar Coleção
                </button>
              </Link>
              <button
                className="px-8 py-3 border border-white rounded-lg hover:bg-white/10 transition-colors font-medium text-white"
                aria-label="Saiba mais sobre a marca"
              >
                Saiba Mais
              </button>
            </div>
          </div>

          {/* === RIGHT IMAGE === */}
          <div className="relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden">
            <Image
              src="/mendonca3.jpeg"
              alt="Coleção Exclusiva da Mendonça Dreams"
              width={1200}
              height={800}
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, 1200px"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
