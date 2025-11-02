import Breadcrumb from "@/components/Breadcrumb";
import VoltarInicio from "@/components/VoltarInicio";

export default function PoliticaPrivacidade() {
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
            { label: "Privacidade" },
          ]}
        />

        <h1 className="text-3xl font-semibold mb-6 text-[#D4AF37] animate__animated animate__fadeInDown">
          Política de Privacidade
        </h1>

        <p className="text-white/80 leading-relaxed mb-4 animate__animated animate__fadeInUp">
          A Mendonça Dreams valoriza a privacidade e a segurança das informações
          de seus clientes. Todos os dados pessoais coletados são utilizados
          exclusivamente para melhorar sua experiência de compra. Não
          compartilhamos informações com terceiros sem o seu consentimento.
        </p>

        <p className="text-white/80 leading-relaxed animate__animated animate__fadeInUp animate__delay-1s">
          Utilizamos cookies apenas para otimizar o funcionamento do site e
          personalizar ofertas. Você pode desativar os cookies a qualquer
          momento nas configurações do seu navegador.
        </p>

        <VoltarInicio />
      </div>
    </main>
  );
}
