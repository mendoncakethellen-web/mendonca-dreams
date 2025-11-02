import Breadcrumb from "@/components/Breadcrumb";
import VoltarInicio from "@/components/VoltarInicio";

export default function TermosUso() {
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
            { label: "Termos de Uso" },
          ]}
        />

        <h1 className="text-3xl font-semibold mb-6 text-[#D4AF37] animate__animated animate__fadeInDown">
          Termos de Uso
        </h1>

        <p className="text-white/80 leading-relaxed mb-4 animate__animated animate__fadeInUp">
          Ao acessar o site da Mendonça Dreams, o usuário concorda em utilizar o
          conteúdo apenas para fins pessoais e não comerciais. Reservamo-nos o
          direito de alterar preços, descrições e promoções sem aviso prévio.
        </p>

        <p className="text-white/80 leading-relaxed animate__animated animate__fadeInUp animate__delay-1s">
          O uso indevido de imagens, textos e logotipos da marca é proibido e
          sujeito a penalidades conforme a legislação vigente.
        </p>

        <VoltarInicio />
      </div>
    </main>
  );
}
