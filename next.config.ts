import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Imagens servidas pelo CDN do Sanity (capas dos posts do blog).
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
    // 90: fachada do escritório (texto da placa precisa ficar nítido).
    qualities: [75, 90],
  },
};

export default nextConfig;
