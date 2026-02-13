"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const FloatingTextNavbar = ({
  items,
  className,
}: {
  items: { title: string; href: string }[];
  className?: string;
}) => {
  return (
    // ✅ "fixed top-6" assure que la barre reste collée en haut même quand on scroll
    <nav
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 w-fit z-[100] hidden md:flex items-center gap-6 rounded-full bg-black/80 border border-[#C0B283]/30 px-8 py-3 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {items.map((item) => (
        <a
          key={item.title}
          href={item.href}
          className="relative text-sm font-medium text-white transition-all duration-300 hover:text-[#C0B283] hover:scale-105"
        >
          {/* Texte simple sans effet de loupe bizarre */}
          {item.title}
        </a>
      ))}
    </nav>
  );
};