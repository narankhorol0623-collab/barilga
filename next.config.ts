import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/gund-supply-logo.webp",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
