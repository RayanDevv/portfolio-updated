'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Surveiller le défilement
  useEffect(() => {
    const toggleVisibility = () => {
      // Si on descend de plus de 300px, on affiche le bouton
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Nettoyage de l'événement
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Fonction pour remonter
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Défilement fluide
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-[9999] p-3 rounded-full bg-stone-900 border border-[#C0B283] text-[#C0B283] shadow-[0_0_15px_rgba(192,178,131,0.3)] hover:bg-[#C0B283] hover:text-black transition-colors duration-300 group"
          aria-label="Remonter en haut"
        >
          {/* Flèche vers le haut (SVG) */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 transform group-hover:-translate-y-1 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}