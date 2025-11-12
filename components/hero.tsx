"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(135deg, #001F3F 100%, #8B6F47 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* TEXTO */}
        <div className="space-y-6">
          <p className="text-white text-sm font-semibold tracking-widest uppercase">
            Bem-vinda
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light leading-tight text-white">
            Exclusividade e Elegância
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Cada peça é cuidadosamente selecionada para mulheres profissionais
            que entendem a importância da qualidade, estilo e sofisticação.
          </p>

          <div className="flex gap-4 pt-4">
            <Link href="/#products" aria-label="Explorar coleção de produtos">
              <button
                className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                style={{ background: "#0d0842ff" }}
              >
                Explorar Coleção
              </button>
            </Link>
            <Link href="/#about" aria-label="Saiba mais sobre a marca">
              <button className="px-8 py-3 border border-white rounded-lg hover:bg-white/10 transition-colors font-medium text-white">
                Saiba Mais
              </button>
            </Link>
          </div>
        </div>

        {/* IMAGEM */}
        <div className="relative h-96 md:h-[400px] rounded-2xl overflow-hidden">
          <Image
            src="/mendonca4.png"
            alt="Coleção exclusiva Mendonça Dreams"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 50vw"
            className="object-cover object-center"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMScgaGVpZ2h0PScxJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLz4="
          />
        </div>
      </div>
    </section>
  );
}
