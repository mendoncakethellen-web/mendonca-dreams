import Breadcrumb from "@/components/Breadcrumb";
import VoltarInicio from "@/components/VoltarInicio";

export default function TrocasDevolucoes() {
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
            { label: "Trocas e Devoluções" },
          ]}
        />

        <h1 className="text-3xl font-semibold mb-6 text-[#D4AF37] animate__animated animate__fadeInDown">
          Trocas e Devoluções
        </h1>

        <p className="text-white/80 leading-relaxed mb-4 animate__animated animate__fadeInUp">
          Você pode solicitar a troca ou devolução de um produto em até 7 dias
          corridos após o recebimento. O item deve estar sem uso, com etiqueta e
          na embalagem original.
        </p>

        <p className="text-white/80 leading-relaxed animate__animated animate__fadeInUp animate__delay-1s">
          Entre em contato pelo e-mail{" "}
          <span className="text-[#D4AF37]">mendoncadreams@gmail.com</span>{" "}
          informando o número do pedido e o motivo da solicitação. Nossa equipe
          retornará em até 48h úteis.
        </p>

        <VoltarInicio />
      </div>
    </main>
  );
}
