/** @type {import('next').NextConfig} */

import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  reloadOnOnline: true,
  disable: false,
});

const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["api.qrserver.com", "ygokgtgl7r.ufs.sh"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withPWA(nextConfig);
