"use client"

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "#001F3F", color: "#ffffff" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-54 md:h-50 min-h-54 rounded-2xl overflow-hidden max-w-md">  {/* Ajustado para menor: h-64 em vez de h-96, e max-w-md para largura limitada */}
            <img
              src="/mendonca2.jpeg"
              alt="Nossa História"
              className="w-full h-full object-cover"
            />
          </div>
</div>
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#D4AF37" }}>
                Sobre Nós
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-white">A História da Mendonça Dreams</h2>
            </div>

            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Fundada com a visão de trazer exclusividade e elegância para mulheres profissionais que entendem a
                importância da qualidade, a Mendonça Dreams é mais que uma marca de moda.
              </p>
              <p>
                Cada peça é cuidadosamente selecionada, considerando não apenas o design sofisticado, mas também a
                qualidade dos materiais e o conforto que proporcionam para o dia a dia profissional.
              </p>
              <p>
                Acreditamos que a moda verdadeira é atemporal, sofisticada e reflete a personalidade e profissionalismo
                de quem a veste.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              
          </div>
        </div>
      </div>
    </section>
  )
}