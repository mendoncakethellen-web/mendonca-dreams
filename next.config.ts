import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ackwpgvkqlcaxqqqrqkt.supabase.co", // 👈 coloque o seu domínio do Supabase aqui
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
