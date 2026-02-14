import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ✅ 1. IMPORTS CORRIGÉS ET COMPLETS
import Cursor from "./components/Cursor";
import Sparkles from "./components/Sparkles";
import ChatBot from "./components/ChatBot";
import ScrollToTop from "./components/ScrollToTop";
import NavbarWrapper from "./components/ui/NavbarWrapper";
import StockTicker from "./components/ui/StockTicker"; 

// Configuration des polices
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configuration SEO
export const metadata: Metadata = {
  title: "Portfolio | Rayane Bouras",
  description: "L'Architecte Financier - Portfolio Développeur & Comptable",
  // 👇 C'EST ICI QUE LA MAGIE OPÈRE : On force l'icône
  icons: {
    icon: "/icon.png", // Cherche l'image directement dans le dossier public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white selection:bg-[#C0B283] selection:text-black cursor-none`}
      >
        {/* --- 1. INTERFACE UTILISATEUR (Curseur) --- */}
        <Cursor />

        {/* --- 2. BARRE DE NAVIGATION (Permanente) --- */}
        <NavbarWrapper />

        {/* --- 3. EFFETS D'ARRIÈRE-PLAN --- */}
        <Sparkles />

        {/* --- 4. LE CONTENU DE LA PAGE --- */}
        <div className="relative z-0">
          {children}
        </div>

        {/* --- 5. BANDE DYNAMIQUE (Ticker) --- */}
        {/* Placé juste au-dessus du footer pour un look financier pro */}
        <div className="mt-20">
          <StockTicker />
        </div>

        {/* --- 6. ELEMENTS FLOTTANTS --- */}
        <ScrollToTop />
        <ChatBot />
      </body>
    </html>
  );
}