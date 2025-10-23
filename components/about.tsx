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
            quality={90}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 800px"
            className="w-full h-full object-cover object-center"
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
              Fundada com a visão de trazer exclusividade e elegância para
              mulheres profissionais que entendem a importância da qualidade, a
              Mendonça Dreams é mais que uma marca de moda.
            </p>
            <p>
              Cada peça é cuidadosamente selecionada, considerando não apenas o
              design sofisticado, mas também a qualidade dos materiais e o
              conforto que proporcionam para o dia a dia profissional.
            </p>
            <p>
              Acreditamos que a moda verdadeira é atemporal, sofisticada e
              reflete a personalidade e profissionalismo de quem a veste.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
