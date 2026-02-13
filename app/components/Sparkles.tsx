'use client';

import React, { useEffect, useState } from 'react';

export default function Sparkles() {
  const [particles, setParticles] = useState<Array<{ style: React.CSSProperties }>>([]);
  const [shootingStars, setShootingStars] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  useEffect(() => {
    // 1. Sparkles : Plus grands et plus lents
    const newParticles = Array.from({ length: 150 }).map(() => ({
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 3.5 + 2.5}px`, // 🚀 Encore plus grands (2.5px à 6px)
        height: `${Math.random() * 3.5 + 2.5}px`,
        opacity: Math.random() * 0.7 + 0.3,
        // 🚀 DURÉE TRÈS LONGUE : 20s à 35s pour un mouvement presque imperceptible
        animationDuration: `${Math.random() * 15 + 20}s`,
        animationDelay: `-${Math.random() * 20}s`,
      },
    }));
    setParticles(newParticles);

    // 2. Étoiles filantes (horizontales)
    const interval = setInterval(() => {
      const id = Date.now();
      const newStar = {
        id,
        style: {
          top: `${Math.random() * 50}%`,
          left: `${Math.random() * 70 + 30}%`,
          animationDuration: '2.8s',
        },
      };
      setShootingStars((prev) => [...prev, newStar]);
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((star) => star.id !== id));
      }, 3000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50 mix-blend-screen">
      <style jsx>{`
        /* 🚀 ANIMATION SPARKLES : Mouvement lent et aléatoire (pas juste monter) */
        @keyframes sparkleSlow {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
            opacity: 0.2; 
          }
          33% { 
            transform: translate(15px, -15px) scale(1.3); 
            opacity: 0.8; 
          }
          66% { 
            transform: translate(-15px, 10px) scale(0.8); 
            opacity: 0.5; 
          }
        }

        @keyframes shootingStarAnim {
          0% { transform: rotate(-25deg) translateX(0) scaleX(0); opacity: 0; }
          15% { opacity: 1; transform: rotate(-25deg) translateX(0) scaleX(1); }
          100% { transform: rotate(-25deg) translateX(-700px) scaleX(1); opacity: 0; }
        }

        .sparkle-item {
          position: absolute;
          border-radius: 50%;
          background-color: #C0B283;
          box-shadow: 0 0 10px rgba(192, 178, 131, 0.6);
          /* 🚀 Application de l'animation lente et multidirectionnelle */
          animation: sparkleSlow infinite ease-in-out;
        }

        .shooting-star {
          position: absolute;
          width: 130px;
          height: 2px;
          background: linear-gradient(90deg, #C0B283, transparent);
          transform-origin: right;
          animation: shootingStarAnim 2.8s forwards linear;
          filter: drop-shadow(0 0 6px #C0B283);
        }
      `}</style>

      {particles.map((particle, i) => (
        <div key={`p-${i}`} className="sparkle-item" style={particle.style} />
      ))}

      {shootingStars.map((star) => (
        <div key={star.id} className="shooting-star" style={star.style} />
      ))}
    </div>
  );
}