"use client";

import React, { useState, useEffect } from "react";
import { FloatingTextNavbar } from "./FloatingTextNavbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarWrapper() {
  const [typedName, setTypedName] = useState("B");
  const pathname = usePathname();

  const navItems = [
    { title: "HISTOIRE", href: "/#histoire" },
    { title: "PARCOURS", href: "/#expertise" },
    { title: "COMPÉTENCES", href: "/#competences" },
    { title: "PROJETS", href: "/projets" },
    { title: "FORMATION", href: "/#formation" },
    { title: "CONTACT", href: "/#contact" },
  ];

  // LOGIQUE MACHINE À ÉCRIRE
  useEffect(() => {
    const text = "BOURAS";
    let index = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const animate = () => {
      setTypedName(text.substring(0, index));

      if (!isDeleting && index < text.length) {
        index++;
        timeout = setTimeout(animate, 200);
      } else if (!isDeleting && index === text.length) {
        isDeleting = true;
        timeout = setTimeout(animate, 3000);
      } else if (isDeleting && index > 0) {
        index--;
        timeout = setTimeout(animate, 100);
      } else {
        isDeleting = false;
        timeout = setTimeout(animate, 500);
      }
    };

    animate();
    return () => clearTimeout(timeout);
  }, []);

  // ✅ FONCTION DE RETOUR EN HAUT (SCROLL)
  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault(); // Empêche le rechargement si on est déjà sur l'accueil
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* --- LOGO GLOBAL PC (Fixé en haut à gauche) --- */}
      <Link 
        href="/" 
        onClick={handleScrollTop} // 👈 AJOUTÉ ICI
        className="hidden lg:flex fixed top-8 left-10 z-[50] items-center gap-4 group cursor-pointer pointer-events-auto"
      >
         <svg width="40" height="40" viewBox="0 0 100 100" fill="none" className="transition-transform duration-700 ease-in-out group-hover:rotate-90">
            <defs><filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#C0B283" floodOpacity="0.5"/></filter></defs>
            <path d="M50 10V20 M50 80V90 M10 50H20 M80 50H90 M21.7 21.7L28.8 28.8 M71.2 71.2L78.3 78.3 M21.7 78.3L28.8 71.2 M71.2 28.8L78.3 21.7" stroke="#C0B283" strokeWidth="4" strokeLinecap="round" filter="url(#goldGlow)"/>
            <circle cx="50" cy="50" r="30" stroke="#C0B283" strokeWidth="2" filter="url(#goldGlow)"/>
            <circle cx="50" cy="50" r="18" stroke="#C0B283" strokeWidth="1" strokeDasharray="4 4" opacity="0.8"/>
            <circle cx="50" cy="50" r="6" fill="#C0B283"/>
          </svg>
          <span className="text-xl tracking-wider text-white font-light uppercase group-hover:text-[#C0B283] transition-colors">
            RAYANE <span className="text-[#C0B283] font-serif italic font-medium tracking-wide inline-flex items-center" style={{ fontFamily: 'Georgia, serif' }}>
              {typedName}
              <span className="inline-block w-[2px] h-6 bg-[#C0B283] ml-1 animate-pulse"></span>
            </span>
          </span>
      </Link>

      {/* --- BARRE CENTRALE --- */}
      <FloatingTextNavbar items={navItems} typedName={typedName} />
    </>
  );
}