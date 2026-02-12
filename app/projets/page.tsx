'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// ❌ PLUS AUCUN IMPORT DE CHATBOT OU SPARKLES ICI
// Ils sont gérés automatiquement par le layout.tsx

// --- COMPOSANT SPOTLIGHT CARD (Gère l'effet de lumière sur les cartes) ---
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => setOpacity(1);
  const handleBlur = () => setOpacity(0);
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl border border-stone-800 bg-stone-900/40 px-8 py-8 shadow-2xl ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(192, 178, 131, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// --- PAGE PRINCIPALE ---
export default function Projets() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const projects = [
    {
      title: "Automatisation Comptable",
      desc: "Web App permettant de traiter les flux de clôture mensuels et d'automatiser les provisions FNP/CCA.",
      tech: ["Next.js", "SQL", "Tailwind"],
      link: "#"
    },
    {
      title: "Dashboard Power BI",
      desc: "Analyse prédictive des flux de trésorerie et suivi des indicateurs de performance (KPI) financiers.",
      tech: ["Power BI", "DAX", "Excel"],
      link: "#"
    },
    {
      title: "RYN Services",
      desc: "Plateforme vitrine optimisée pour le SEO dédiée aux services de dépannage et artisanat.",
      tech: ["React", "Node.js", "Framer Motion"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-white font-serif p-8 md:p-24 relative overflow-hidden">
      
      {/* BOUTON RETOUR */}
      <button 
        onClick={() => router.push('/')}
        className="relative z-10 mb-12 flex items-center gap-2 text-[#C0B283] hover:text-white transition-colors uppercase tracking-widest text-sm group cursor-pointer"
      >
        <span className="group-hover:-translate-x-2 transition-transform">←</span> Retour au Portfolio
      </button>

      {/* TITRE */}
      <h1 className="relative z-10 text-5xl md:text-7xl font-thin mb-16 uppercase tracking-tighter animate-fade-in">
        Projets <span className="text-[#C0B283] italic">&</span> Réalisations
      </h1>

      {/* GRILLE DES PROJETS AVEC SPOTLIGHT */}
      <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <SpotlightCard key={index} className="flex flex-col justify-between h-[350px] group transition-all duration-300 hover:border-[#C0B283]/50">
            <div>
              <h3 className="text-2xl text-[#C0B283] mb-4 uppercase tracking-wide group-hover:text-white transition-colors">
                {project.title}
              </h3>
              <p className="text-stone-400 font-sans font-light leading-relaxed mb-6 text-sm">
                {project.desc}
              </p>
            </div>
            
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 border border-stone-700 rounded text-stone-500 uppercase bg-black/50">
                    {t}
                  </span>
                ))}
              </div>
              <a href={project.link} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-white group-hover:text-[#C0B283] transition-colors">
                Voir le projet <span className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* PAS DE <ChatBot /> ICI 
         PAS DE <Sparkles /> ICI
         PAS DE RB EN FOND
      */}

      {/* Juste une petite déco lumineuse en bas pour l'ambiance */}
      <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-[#C0B283] opacity-10 blur-[120px] pointer-events-none"></div>
    </div>
  );
}