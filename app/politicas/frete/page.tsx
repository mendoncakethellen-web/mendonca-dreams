import Breadcrumb from "@/components/Breadcrumb";
import VoltarInicio from "@/components/VoltarInicio";

export default function Frete() {
  return (
    <main
      className="min-h-screen py-20 px-4"
      style={{ backgroundColor: "#001F3F", color: "#FFFFFF" }}
    >
      <div className="max-w-4xl mx-auto">
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: "Políticas", href: "/politicas" },
            { label: "Frete" },
          ]}
        />

        <h1 className="text-3xl font-semibold mb-6 text-[#D4AF37] animate__animated animate__fadeInDown">
          Política de Frete
        </h1>

        <p className="text-white/80 leading-relaxed mb-4 animate__animated animate__fadeInUp">
          Trabalhamos com envio via Correios e transportadoras parceiras,
          garantindo segurança e rastreio em todas as entregas.
        </p>

        <p className="text-white/80 leading-relaxed animate__animated animate__fadeInUp animate__delay-1s">
          O prazo de entrega é calculado automaticamente no checkout, de acordo
          com o CEP informado. Oferecemos frete grátis em compras acima de
          R$299,90 para todo o Brasil.
        </p>

        <VoltarInicio />
      </div>
    </main>
  );
}
