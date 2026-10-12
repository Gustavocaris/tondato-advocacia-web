import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Imagens servidas pelo CDN do Sanity (capas dos posts do blog).
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
};

export default nextConfig;
