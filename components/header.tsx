"use client";

import { createClient } from "@/lib/client";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, []);

  // trava o scroll quando o menu está aberto
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className="fixed top-0 w-full z-50 border-b bg-white/90 backdrop-blur"
      style={{ borderColor: "#001F3F" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Ir para a página inicial"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "#001F3F" }}
            >
              <span className="text-white font-bold text-sm">MD</span>
            </div>
            <span
              className="font-serif text-xl font-semibold hidden sm:inline"
              style={{ color: "#001F3F" }}
            >
              Mendonça Dreams
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex gap-8"
            aria-label="Navegação principal"
          >
            {[
              { href: "/", label: "Coleção" },
              { href: "/#about", label: "Sobre" },
              { href: "/#newsletter", label: "Contato" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: "#001F3F" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Pesquisar"
            >
              <Search className="w-5 h-5" style={{ color: "#001F3F" }} />
            </button>

            {user ? (
              <>
                <Link
                  href="/dashboard/cart"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Abrir carrinho"
                >
                  <ShoppingBag
                    className="w-5 h-5"
                    style={{ color: "#001F3F" }}
                  />
                </Link>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg text-white font-semibold"
                  style={{ background: "#001F3F" }}
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="px-4 py-2 rounded-lg text-white font-semibold"
                style={{ background: "#001F3F" }}
              >
                Entrar
              </Link>
            )}

            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isOpen ? (
                <X className="w-5 h-5" style={{ color: "#001F3F" }} />
              ) : (
                <Menu className="w-5 h-5" style={{ color: "#001F3F" }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav
            id="mobile-nav"
            className="md:hidden pb-4 flex flex-col gap-3"
            aria-label="Navegação mobile"
          >
            <Link
              onClick={() => setIsOpen(false)}
              href="/"
              className="text-sm"
              style={{ color: "#001F3F" }}
            >
              Coleção
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              href="/#about"
              className="text-sm"
              style={{ color: "#001F3F" }}
            >
              Sobre
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              href="/#newsletter"
              className="text-sm"
              style={{ color: "#001F3F" }}
            >
              Contato
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
