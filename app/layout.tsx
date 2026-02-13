import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ✅ 1. IMPORTS DE TOUS TES EFFETS
import Cursor from "./components/Cursor";
import Sparkles from "./components/Sparkles";
import ChatBot from "./components/ChatBot";
// 👇 NOUVEL IMPORT
import ScrollToTop from "./components/ScrollToTop";

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
        {/* --- A. INTERFACE UTILISATEUR (Curseur) --- */}
        <Cursor />

        {/* --- B. EFFETS D'ARRIÈRE-PLAN --- */}
        {/* Les poussières d'or statiques */}
        <Sparkles />

        {/* --- C. LE CONTENU DU SITE --- */}
        <div className="relative z-0">
          {children}
        </div>

        {/* --- D. ELEMENTS FLOTTANTS --- */}
        {/* Le bouton pour remonter (Apparaît au scroll) */}
        <ScrollToTop />
        
        {/* L'assistant IA */}
        <ChatBot />
      </body>
    </html>
  );
}