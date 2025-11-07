"use client";

import { Mail } from "lucide-react";
import type React from "react";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="newsletter"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: "#8B6F47" }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-12 text-center space-y-6">
          <Mail className="w-12 h-12 mx-auto" style={{ color: "#001F3F" }} />

          <div className="space-y-2">
            <h2
              className="font-serif text-3xl md:text-4xl font-light"
              style={{ color: "#001F3F" }}
            >
              Fique por Dentro
            </h2>
            <p style={{ color: "#666666" }}>
              Receba as novidades, ofertas exclusivas e inspiração de moda
              direto no seu email
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 text-gray-900 placeholder:text-gray-500"
              style={
                { borderColor: "#e5e5e5", "--tw-ring-color": "#001F3F" } as any
              }
            />
            <button
              type="submit"
              className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-colors font-medium"
              style={{ background: "#001F3F" }}
            >
              Inscrever
            </button>
          </form>

          {submitted && (
            <p className="text-sm font-medium" style={{ color: "#001F3F" }}>
              Obrigada! Verifique seu email para confirmar a inscrição.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
