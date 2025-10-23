"use client"

import { useState, useEffect } from "react"
import { Menu, X, ShoppingBag, Search } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/client"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()
  }, [])

  return (
    <header className="fixed top-0 w-full z-50 border-b" style={{ background: "white", borderColor: "#001F3F" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#001F3F" }}>
              <span className="text-white font-bold text-sm">MD</span>
            </div>
            <span className="font-serif text-xl font-semibold hidden sm:inline" style={{ color: "#001F3F" }}>
              Mendonça Dreams
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-sm hover:opacity-70 transition-opacity" style={{ color: "#001F3F" }}>
              Coleção
            </Link>
            <Link href="#about" className="text-sm hover:opacity-70 transition-opacity" style={{ color: "#001F3F" }}>
              Sobre
            </Link>
            <Link
              href="#newsletter"
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: "#001F3F" }}
            >
              Contato
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5" style={{ color: "#001F3F" }} />
            </button>
            {user ? (
              <>
                <Link href="/dashboard/cart" className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <ShoppingBag className="w-5 h-5" style={{ color: "#001F3F" }} />
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
            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
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
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="/" className="text-sm" style={{ color: "#001F3F" }}>
              Coleção
            </Link>
            <Link href="#about" className="text-sm" style={{ color: "#001F3F" }}>
              Sobre
            </Link>
            <Link href="#newsletter" className="text-sm" style={{ color: "#001F3F" }}>
              Contato
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
