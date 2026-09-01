import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;