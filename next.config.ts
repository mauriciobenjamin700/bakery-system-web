const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jpimg.com.br',
      },
      {
        protocol: 'https',
        hostname: 'ceagesp.gov.br',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      },
      // Adicione outros domínios que você usa para imagens externas
    ],
    dangerouslyAllowSVG: true, // se usar SVG externo
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;