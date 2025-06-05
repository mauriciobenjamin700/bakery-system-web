import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // CORREÇÃO: Usando images.remotePatterns em vez de images.domains (depreciado)
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Protocolo da imagem (http ou https)
        hostname: 'cdn.2rscms.com.br', // Domínio das imagens
        port: '', // Deixe vazio se for a porta padrão (80 para http, 443 para https)
        pathname: '/**', // Caminho (use '/**' para qualquer subpasta ou seja mais específico)
      },
      // Se você estiver usando images do placehold.co ou outros:
      // {
      //   protocol: 'https',
      //   hostname: 'placehold.co',
      //   port: '',
      //   pathname: '/**',
      // },
      // Adicione outros padrões de domínio aqui se tiver mais fontes de imagem
    ],
  },
  
  // Sua configuração existente de rewrites
  async rewrites() {
    return [
      {
        source: "/api/:path*", // tudo que começar com /api/
        destination: "http://localhost:8000/api/:path*", // redireciona para seu backend
      },
    ];
  },
};

export default nextConfig;
