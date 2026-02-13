"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 👈 IMPORT NÉCESSAIRE

export const FloatingTextNavbar = ({
  items,
  className,
  typedName,
}: {
  items: { title: string; href: string }[];
  className?: string;
  typedName?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // ✅ FONCTION DE RETOUR EN HAUT
  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-[99999]",
          "w-[90%] flex items-center justify-between",
          "lg:w-fit lg:justify-center",
          "rounded-full bg-black/90 border border-[#C0B283]/30 px-6 py-3 backdrop-blur-md shadow-2xl transition-all duration-300",
          className
        )}
      >
        {/* --- MOBILE ONLY : LOGO --- */}
        <Link 
          href="/" 
          onClick={handleScrollTop} // 👈 AJOUTÉ ICI
          className="lg:hidden flex items-center gap-2 overflow-hidden cursor-pointer pointer-events-auto"
        >
          <span className="font-bold text-white uppercase text-xs tracking-widest whitespace-nowrap">
            RAYANE
          </span> 
          <span className="text-[#C0B283] font-serif italic font-medium tracking-wide flex items-center text-xs whitespace-nowrap">
              {typedName || "\u00A0"}
              <span className="inline-block w-[1.5px] h-3 bg-[#C0B283] ml-1 animate-pulse"></span>
          </span>
        </Link>

        {/* --- BOUTON BURGER --- */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="lg:hidden text-white hover:text-[#C0B283] transition-colors p-1 flex items-center justify-center cursor-pointer pointer-events-auto"
          aria-label="Ouvrir le menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* --- DESKTOP : LIENS --- */}
        <div className="hidden lg:flex items-center gap-8">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className={cn(
                "relative text-xs font-bold text-white/90 tracking-widest uppercase transition-all duration-300",
                "cursor-pointer pointer-events-auto",
                "hover:text-[#C0B283] hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(192,178,131,0.6)]"
              )}
            >
              {item.title}
            </a>
          ))}
        </div>
      </nav>

      {/* --- MENU MOBILE --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-4 right-4 z-[99998] lg:hidden"
          >
            <div className="bg-black/95 backdrop-blur-2xl border border-[#C0B283]/30 rounded-2xl overflow-hidden p-2 shadow-2xl flex flex-col gap-1">
              {items.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block text-center text-white py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-200",
                    "border-b border-white/5 last:border-none",
                    "cursor-pointer pointer-events-auto",
                    "hover:bg-[#C0B283]/10 hover:text-[#C0B283]"
                  )}
                >
                  {item.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};