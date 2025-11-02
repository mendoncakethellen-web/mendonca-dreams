"use client";

import { Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ background: "#001F3F", color: "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* === BRAND === */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#D4AF37" }}
              >
                <span
                  className="font-bold text-sm"
                  style={{ color: "#001F3F" }}
                >
                  MD
                </span>
              </div>
              <span className="font-serif text-lg font-semibold">
                Mendonça Dreams
              </span>
            </div>
            <p className="text-white/70 text-sm">
              Exclusividade e elegância para mulheres profissionais que entendem
              a importância da qualidade.
            </p>
          </div>

          {/* === NAVEGAÇÃO === */}
          <div className="space-y-4">
            <h3 className="font-semibold">Navegação</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Coleção
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="hover:text-white transition-colors"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="#newsletter"
                  className="hover:text-white transition-colors"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* === POLÍTICAS === */}
          <div className="space-y-4">
            <h3 className="font-semibold">Políticas</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link
                  href="/politicas/privacidade"
                  className="hover:text-white transition-colors"
                >
                  Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/politicas/termos"
                  className="hover:text-white transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/politicas/trocas"
                  className="hover:text-white transition-colors"
                >
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link
                  href="/politicas/frete"
                  className="hover:text-white transition-colors"
                >
                  Frete
                </Link>
              </li>
            </ul>
          </div>

          {/* === CONTATO === */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contato</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Email: mendoncadreams@gmail.com</li>
              <li>Telefone: (11) 98744-2033</li>
              <li className="pt-2">
                <div className="flex gap-3">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/mendoncadreams/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                    aria-label="Instagram Mendonça Dreams"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://www.tiktok.com/@mendoncadreams"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                    aria-label="TikTok Mendonça Dreams"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 2c.8 0 1.6 0 2.4.2 1 .3 2 .7 2.8 1.3.3.2.4.5.4.8v2.4a4.6 4.6 0 0 0 3 1.1h.5c.5 0 .9.4.9.9v3.1a.9.9 0 0 1-.9.9h-.4c-1.2 0-2.3-.2-3.4-.6v4.8a6.8 6.8 0 0 1-7.7 6.8 6.9 6.9 0 0 1-6-7 6.8 6.8 0 0 1 6.8-6.7h.4v3.2h-.3a3.5 3.5 0 0 0-3.5 3.5c0 2 1.7 3.6 3.7 3.5a3.5 3.5 0 0 0 3.2-3.5V2z" />
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* === DIVIDER === */}
        <div
          className="border-t pt-8"
          style={{ borderColor: "rgba(255,255,255,0.2)" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
            <p>&copy; 2025 Mendonça Dreams. Todos os direitos reservados.</p>
            <p>Desenvolvido com elegância e sofisticação</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
