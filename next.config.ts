import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Optionnel : Si tu utilises le composant <Image /> de Next.js plus tard,
     tu devras ajouter les domaines ici. Pour l'instant, tes <img> classiques fonctionnent sans. */
  
  // 🛡️ SÉCURITÉ : Injection des en-têtes HTTP
  async headers() {
    return [
      {
        // Applique ces règles à TOUTES les routes de ton site
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload' // Force le HTTPS pendant 2 ans
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN' // Empêche ton site d'être affiché dans une iframe (anti-clickjacking)
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff' // Empêche les navigateurs de "deviner" les types de fichiers (sécurité MIME)
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin' // Protège la vie privée de tes visiteurs
          }
        ]
      }
    ]
  }
};

export default nextConfig;