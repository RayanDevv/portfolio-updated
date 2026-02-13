"use client";

import React from "react";
import { motion } from "framer-motion";

const tickers = [
  { name: "NEXT.JS", val: "+12.4%", up: true },
  { name: "PYTHON", val: "+8.1%", up: true },
  { name: "POWER BI", val: "+5.3%", up: true },
  { name: "FINANCE", val: "+2.0%", up: true },
  { name: "SAGE", val: "+1.4%", up: true },
  { name: "SQL", val: "+4.7%", up: true },
  { name: "REACT", val: "+9.2%", up: true },
  { name: "EXCEL", val: "+3.5%", up: true },
];

export default function StockTicker() {
  return (
    <div className="w-full bg-black/50 border-y border-[#C0B283]/10 py-3 overflow-hidden relative z-10 backdrop-blur-sm">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-16"
          // Animation infinie de droite à gauche
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 25 // Vitesse du défilement
          }}
        >
          {/* On triple les données pour assurer une boucle fluide et sans saut visuel */}
          {[...tickers, ...tickers, ...tickers].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-[10px] font-mono tracking-[0.2em]">
              <span className="text-white/40 font-bold uppercase">{item.name}</span>
              <span className={item.up ? "text-green-500/80" : "text-red-500/80"}>
                {item.up ? "▲" : "▼"} {item.val}
              </span>
              {/* Petit point de séparation doré entre les items */}
              <span className="ml-4 w-1 h-1 rounded-full bg-[#C0B283]/30"></span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}