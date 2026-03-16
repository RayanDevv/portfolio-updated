import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import Cursor from "./components/Cursor";
import Sparkles from "./components/Sparkles";
import ChatBot from "./components/ChatBot";
import ScrollToTop from "./components/ScrollToTop";
import NavbarWrapper from "./components/ui/NavbarWrapper";
import StockTicker from "./components/ui/StockTicker"; 


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Portfolio | Rayane Bouras",
  description: "L'Architecte Financier - Portfolio Développeur & Comptable",

  icons: {
    icon: "/icon.png", 
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
        {}
        <Cursor />

        {}
        <NavbarWrapper />

        {}
        <Sparkles />

        {}
        <div className="relative z-0">
          {children}
        </div>

        {}
        {}
        <div className="mt-20">
          <StockTicker />
        </div>

        {}
        <ScrollToTop />
        <ChatBot />
      </body>
    </html>
  );
}