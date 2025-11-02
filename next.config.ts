import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,

    // Configuração dinâmica com fallback para o hostname do Supabase
    remotePatterns: process.env.NEXT_PUBLIC_SUPABASE_URL
      ? [
          {
            protocol: "https",
            hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [
          // Fallback direto (remova após confirmar que a env var funciona)
          {
            protocol: "https",
            hostname: "ackwpgvkqlcaxqqqrqkt.supabase.co",
            pathname: "/storage/v1/object/public/**",
          },
        ],

    unoptimized: false,
  },

  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
