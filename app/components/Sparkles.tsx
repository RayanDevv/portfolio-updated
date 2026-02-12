'use client';

import React, { useEffect, useState } from 'react';

export default function Sparkles() {
  const [particles, setParticles] = useState<Array<{ style: React.CSSProperties }>>([]);

  useEffect(() => {
    // On génère 120 particules pour une bonne densité
    const newParticles = Array.from({ length: 120 }).map((_, i) => ({
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        // Durée variable pour un effet naturel
        animationDuration: `${Math.random() * 10 + 10}s`, 
        animationDelay: `-${Math.random() * 10}s`, // Le délai négatif fait démarrer l'anim "en cours de route" (pas de temps mort au chargement)
        opacity: Math.random() * 0.6 + 0.4, // Opacité entre 0.4 et 1
        width: `${Math.random() * 3 + 1}px`, 
        height: `${Math.random() * 3 + 1}px`,
      },
    }));
    setParticles(newParticles);
  }, []);

  return (
    // ✅ CORRECTION MAJEURE : z-50 pour passer DEVANT tout le contenu
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50 mix-blend-screen">
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            opacity: 1; /* Brille fort au milieu */
            transform: translateY(-50px) translateX(20px);
          }
          100% {
            transform: translateY(-100px) translateX(-20px);
            opacity: 0.2; /* Ne disparaît jamais complètement (0.2) */
          }
        }
      `}</style>
      
      {particles.map((particle, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#C0B283]"
          style={{
            ...particle.style,
            animationName: 'float',
            animationTimingFunction: 'ease-in-out', // Mouvement plus fluide
            animationIterationCount: 'infinite',
            boxShadow: '0 0 5px #C0B283' // Petit éclat lumineux
          }}
        />
      ))}
    </div>
  );
}