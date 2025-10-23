"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ background: "#001F3F", color: "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#D4AF37" }}
              >
                <span
                  className="text-foreground font-bold text-sm"
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

          {/* Links */}
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

          {/* Políticas */}
          <div className="space-y-4">
            <h3 className="font-semibold">Políticas</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Frete
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contato</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Email: mendoncadreams@gmail.com</li>
              <li>Telefone: (11) 9999-9999</li>
              <li className="pt-2">
                <div className="flex gap-3">
                  <a href="#" className="hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
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
