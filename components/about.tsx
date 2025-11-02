"use client";

import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: "#001F3F", color: "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* === LEFT IMAGE === */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden max-w-md mx-auto">
          <Image
            src="/mendonca2.jpeg"
            alt="Equipe Mendonça Dreams e sua trajetória de elegância"
            width={800}
            height={600}
            quality={75} // ✅ define qualidade estável no SSR e cliente
            priority // ✅ pré-carrega a imagem principal
            className="w-full h-full object-cover object-center rounded-2xl"
          />
        </div>

        {/* === RIGHT CONTENT === */}
        <div className="space-y-6">
          <div className="space-y-4">
            <p
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "#D4AF37" }}
            >
              Sobre Nós
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-white">
              A História da Mendonça Dreams
            </h2>
          </div>

          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              A Mendonça Dreams nasceu do desejo de inspirar mulheres a
              acreditarem no próprio potencial. Nossas peças foram pensadas para
              transmitir poder e sofisticação em cada detalhe, para mulheres que
              não esperam o futuro acontecer elas o constroem.
            </p>
            <p>Vista-se com propósito. Vista-se de Mendonça Dreams.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
