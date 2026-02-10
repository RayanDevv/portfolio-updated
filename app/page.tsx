'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const [gears, setGears] = useState<Array<{ left: string; delay: string; duration: string; size: string }>>([]);

 // --- DONNÉES COMPÉTENCES CORRIGÉES (Liens Stables) ---
  const skills = [
    // DEVELOPPEMENT
    { name: "Python", level: "Avancé", url: "https://www.svgrepo.com/show/452091/python.svg" },
    { name: "Node.js", level: "Avancé", url: "https://www.svgrepo.com/show/452075/node-js.svg" },
    { name: "CSS 3", level: "Avancé", url: "https://www.svgrepo.com/show/452185/css-3.svg" },
    { name: "Git", level: "Avancé", url: "https://www.svgrepo.com/show/452210/git.svg" },
    { name: "Langage C", level: "Débutant (Algo)", url: "https://www.svgrepo.com/show/353602/c-1.svg" },
    
    // DATA & BASES DE DONNÉES
    { name: "SQL", level: "Intermédiaire", url: "https://www.svgrepo.com/show/331760/sql-database-generic.svg" },
    { name: "Access", level: "Avancé", url: "https://www.svgrepo.com/show/373809/access-2013.svg" },
    { name: "Excel", level: "Avancé", url: "https://www.svgrepo.com/show/452196/excel.svg" },
    { name: "Power BI", level: "Intermédiaire", url: "https://www.svgrepo.com/show/354228/microsoft-power-bi.svg" },
    
    // ERP
    { name: "Odoo", level: "Débutant", url: "https://www.svgrepo.com/show/330992/odoo.svg" },
    { name: "Sage", level: "Débutant", url: "https://asset.brandfetch.io/idJ2H5Lp9b/id5g4jJd-X.svg" }, 
  ];

  // Génération des engrenages pour l'animation
  useEffect(() => {
    const newGears = Array.from({ length: 12 }).map(() => ({
      left: `${Math.random() * 80 + 10}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${Math.random() * 1 + 1}s`,
      size: `${Math.random() * 10 + 10}px`
    }));
    setGears(newGears);
  }, []);

  const handleProjectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      router.push('/projets');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white font-serif selection:bg-[#c0b283] selection:text-black overflow-x-hidden relative">
      
      {/* --- ARRIÈRE-PLAN FIXE --- */}
      <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span className="text-[40vw] font-extrabold uppercase leading-none tracking-tighter select-none transform -rotate-12 text-[#C0B283] opacity-50">
          RB
        </span>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* --- STYLES CSS --- */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        html { scroll-behavior: smooth; }

        @keyframes gear-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(60px) rotate(360deg); opacity: 0; }
        }
        .animate-gear-fall {
          animation-name: gear-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>

      {/* --- CONTENU --- */}
      <div className={`relative z-10 transition-all duration-500 ${isAnimating ? 'opacity-0 scale-105' : 'opacity-100'}`}>

        {/* --- NAVIGATION --- */}
        <nav className="fixed top-0 w-full backdrop-blur-md bg-black/60 border-b border-stone-800 z-50 transition-all duration-300">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <span className="text-xl tracking-wider text-white font-light uppercase hover:text-[#c0b283] transition-colors cursor-pointer">
              Rayane Bouras<span className="text-[#c0b283]">.</span>
            </span>
            
            <div className="hidden md:flex gap-10 text-xs uppercase tracking-[0.2em] text-stone-400 items-center">
              <a href="#histoire" className="hover:text-[#c0b283] transition-colors h-full flex items-center">Histoire</a>
              <a href="#expertise" className="hover:text-[#c0b283] transition-colors h-full flex items-center">Parcours</a>
              {/* LIEN VERS COMPÉTENCES AJOUTÉ */}
              <a href="#competences" className="hover:text-[#c0b283] transition-colors h-full flex items-center">Compétences</a>
              
              {/* BOUTON PROJETS */}
              <div className="relative group">
                {/* Engrenages */}
                <div className="absolute top-full left-0 w-full h-20 overflow-visible pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {gears.map((gear, i) => (
                    <span
                      key={i}
                      className="absolute text-[#C0B283] animate-gear-fall"
                      style={{
                        left: gear.left,
                        animationDelay: gear.delay,
                        animationDuration: gear.duration,
                        fontSize: gear.size,
                        top: '-10px'
                      }}
                    >
                      ⚙️
                    </span>
                  ))}
                </div>
                {/* Bouton */}
                <a 
                  href="/projets" 
                  onClick={handleProjectClick}
                  className={`
                    relative z-20 block px-8 py-2 border border-[#C0B283] rounded 
                    text-white font-bold transition-all duration-300 bg-black
                    group-hover:bg-[#C0B283] group-hover:text-black 
                    group-hover:shadow-[0_0_30px_rgba(192,178,131,0.6)] group-hover:scale-105
                    ${isAnimating ? 'bg-[#C0B283] text-black scale-110' : ''}
                  `}
                >
                  PROJETS
                </a>
              </div>

              <a href="#formation" className="hover:text-[#c0b283] transition-colors h-full flex items-center">Formation</a>
              <a href="#contact" className="hover:text-[#c0b283] transition-colors h-full flex items-center">Contact</a>
            </div>
          </div>
        </nav>

        {/* --- HERO SECTION --- */}
        <section className="pt-40 pb-20 px-6 flex flex-col items-center justify-center min-h-[85vh]">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <div className="inline-block px-4 py-2 border border-[#c0b283] text-xs font-medium text-[#c0b283] uppercase tracking-[0.2em] mb-4 animate-fade-in bg-black/50 backdrop-blur-md">
              Licence Comptabilité & Développement Web
            </div>
            <h1 className="text-5xl md:text-8xl font-thin text-white tracking-wide leading-tight uppercase animate-fade-in delay-100">
              L'Architecte <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c0b283] to-[#e6d5a8] font-normal">Financier.</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed font-light font-sans mt-8 animate-fade-in delay-200 bg-black/30 p-4 rounded-xl backdrop-blur-sm">
              Étudiant en <strong>Licence de Comptabilité</strong> le jour, Développeur Freelance la nuit.
              Je fusionne la rigueur des chiffres avec la puissance de l'IA.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center pt-12 animate-fade-in delay-300">
              <a href="#histoire" className="px-10 py-4 bg-[#c0b283] hover:bg-[#a89b70] hover:scale-105 text-black font-medium text-xs uppercase tracking-[0.2em] transition-all shadow-[0_0_15px_rgba(192,178,131,0.3)]">
                Lire mon histoire
              </a>
              <a href="mailto:rayanebouras03@gmail.com" className="px-10 py-4 bg-transparent hover:bg-stone-900/80 text-white font-medium text-xs uppercase tracking-[0.2em] border border-stone-600 hover:border-[#c0b283] transition-all backdrop-blur-sm">
                Me contacter
              </a>
            </div>
          </div>
        </section>

        {/* SECTION HISTOIRE */}
        <section id="histoire" className="py-32 bg-black/40 backdrop-blur-md border-y border-stone-900 relative">
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h2 className="text-3xl font-thin text-[#c0b283] mb-12 text-center uppercase tracking-[0.2em]">La Genèse</h2>
            <div className="text-stone-300 font-sans font-light text-lg leading-loose text-justify space-y-8 bg-black/50 p-8 rounded-lg border border-white/5">
              <p>
                <span className="text-4xl float-left mr-4 mt-[-10px] text-[#c0b283] font-serif">2</span>
                021. Après le bac, c'est le vide. Pas de formation, pas de travail, et une question obsédante : <em>"Qu'est-ce que je vais faire ?"</em>. Plutôt que d'attendre, je suis revenu à ma première passion. Dès l'âge de 15 ans, je bidouillais déjà des programmes de triche pour modifier mes jeux vidéo. J'ai décidé de transformer ce passe-temps en métier en me confrontant à la rigueur de la <strong>Piscine de l'école 42</strong>.
              </p>
              <p>
                C'est le déclic. Je me lance en freelance. Mon premier client ? Un plombier de mon réseau qui avait besoin d'un site vitrine en 2022. De là, le bouche-à-oreille a tout fait. J'ai tout appris sur le terrain, "à la dure", à une époque où l'IA n'était pas encore là pour écrire le code à notre place. C'était l'école de la débrouillardise.
              </p>
              <p>
                Mais la vie est faite de détours. J'ai eu l'opportunité de reprendre mes études et je suis "tombé" dans la comptabilité. Contre toute attente, j'y ai découvert un monde de logique fascinant, mais terriblement archaïque dans ses outils.
              </p>
              <p className="border-l-2 border-[#c0b283] pl-6 italic text-white text-xl bg-black/40 p-4 rounded-r-lg">
                C'est là que ma vision est née : devenir le Contrôleur de Gestion 2.0. Celui qui ne se contente pas de constater les écarts, mais qui code les outils pour les prédire.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION VALEURS */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-stone-800 bg-black/70 hover:border-[#c0b283] transition-all duration-500 hover:-translate-y-2 group cursor-default backdrop-blur-sm">
              <div className="text-[#c0b283] text-4xl mb-6 opacity-80 group-hover:opacity-100 transition-opacity">⚙️</div>
              <h3 className="text-white text-lg uppercase tracking-widest mb-4 group-hover:text-[#c0b283] transition-colors">Autodidacte</h3>
              <p className="text-stone-500 font-light text-sm leading-relaxed group-hover:text-stone-400 transition-colors">
                Formé sur le terrain avant l'ère de l'IA générative. Je comprends la structure du code, je ne fais pas que le copier.
              </p>
            </div>
            <div className="p-8 border border-stone-800 bg-black/70 hover:border-[#c0b283] transition-all duration-500 hover:-translate-y-2 group cursor-default backdrop-blur-sm">
              <div className="text-[#c0b283] text-4xl mb-6 opacity-80 group-hover:opacity-100 transition-opacity">💡</div>
              <h3 className="text-white text-lg uppercase tracking-widest mb-4 group-hover:text-[#c0b283] transition-colors">Visionnaire</h3>
              <p className="text-stone-500 font-light text-sm leading-relaxed group-hover:text-stone-400 transition-colors">
                Intégration de modèles LLM pour automatiser l'audit et la gestion financière de demain.
              </p>
            </div>
            <div className="p-8 border border-stone-800 bg-black/70 hover:border-[#c0b283] transition-all duration-500 hover:-translate-y-2 group cursor-default backdrop-blur-sm">
              <div className="text-[#c0b283] text-4xl mb-6 opacity-80 group-hover:opacity-100 transition-opacity">⚖️</div>
              <h3 className="text-white text-lg uppercase tracking-widest mb-4 group-hover:text-[#c0b283] transition-colors">Rigueur</h3>
              <p className="text-stone-500 font-light text-sm leading-relaxed group-hover:text-stone-400 transition-colors">
                L'alliance de la précision comptable et de la logique algorithmique.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION PARCOURS */}
        <section id="expertise" className="py-24 bg-black/60 border-t border-stone-900 px-6 backdrop-blur-md">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-thin text-white mb-16 text-center uppercase tracking-[0.2em]">Mon Parcours</h2>
            <div className="space-y-16 border-l border-stone-800 ml-6 pl-12 relative">
              <div className="relative group">
                <span className="absolute -left-[53px] top-2 h-3 w-3 rounded-full bg-[#c0b283] ring-4 ring-black shadow-[0_0_10px_#c0b283]"></span>
                <h3 className="text-xl text-white font-normal uppercase tracking-wide group-hover:text-[#c0b283] transition-colors">Comptable Fournisseurs <span className="text-[#c0b283] text-sm lowercase ml-2">/ Alternance</span></h3>
                <p className="text-stone-500 text-xs uppercase tracking-widest mb-4">Actuel • Indigo</p>
                <p className="text-stone-400 font-light leading-relaxed">
                  Gestion des flux, calcul des provisions (FNP/CCA) et analyse des comptes tiers.
                </p>
              </div>
              <div className="relative group">
                <span className="absolute -left-[53px] top-2 h-3 w-3 rounded-full bg-stone-800 group-hover:bg-[#c0b283] transition-colors ring-4 ring-black"></span>
                <h3 className="text-xl text-white font-normal uppercase tracking-wide group-hover:text-[#c0b283] transition-colors">Assistant Comptable & Data <span className="text-[#c0b283] text-sm lowercase ml-2">/ Alternance</span></h3>
                <p className="text-stone-500 text-xs uppercase tracking-widest mb-4">2024 - 2025 • Oxiproteomics</p>
                <p className="text-stone-400 font-light leading-relaxed">
                  Développement d'une <strong className="text-white">Web App (SQL/Power BI)</strong> pour le suivi qualité et travaux de clôture.
                </p>
              </div>
              <div className="relative group">
                <span className="absolute -left-[53px] top-2 h-3 w-3 rounded-full bg-stone-800 group-hover:bg-[#c0b283] transition-colors ring-4 ring-black"></span>
                <h3 className="text-xl text-white font-normal uppercase tracking-wide group-hover:text-[#c0b283] transition-colors">Développeur Freelance <span className="text-[#c0b283] text-sm lowercase ml-2">/ RYN</span></h3>
                <p className="text-stone-500 text-xs uppercase tracking-widest mb-4">Depuis 2021 • RYN</p>
                <p className="text-stone-400 font-light leading-relaxed">
                  Création de sites sur-mesure (Premier client : Artisan Plombier) et optimisation SEO.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- NOUVELLE SECTION : COMPÉTENCES AVEC LOGOS --- */}
        <section id="competences" className="py-24 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-thin text-white mb-16 text-center uppercase tracking-[0.2em]">Compétences</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-stone-900/40 border border-stone-800 hover:border-[#c0b283] p-6 flex flex-col items-center justify-center gap-4 group transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                >
                  {/* Container Logo (Fond blanc léger pour lisibilité si nécessaire) */}
                  <div className="w-16 h-16 flex items-center justify-center p-2 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                    {/* Utilisation de 'img' pour charger les SVG externes */}
                    <img 
                      src={skill.url} 
                      alt={skill.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-white font-medium uppercase tracking-wide text-sm mb-1">{skill.name}</h3>
                    <p className="text-[#c0b283] text-xs font-serif italic">{skill.level}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION FORMATION */}
        <section id="formation" className="py-24 bg-black/50 border-t border-stone-900 px-6 backdrop-blur-md">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-thin text-white mb-16 text-center uppercase tracking-[0.2em]">Formation</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 border border-stone-800 bg-black/40 hover:border-[#c0b283] transition-all group hover:-translate-y-1 backdrop-blur-sm md:col-span-2">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl text-white font-normal uppercase tracking-wide group-hover:text-[#c0b283] transition-colors">
                    Licence Pro Métiers de la Gestion <br/>
                    <span className="text-sm text-stone-500 normal-case">Université de Lorraine</span>
                  </h3>
                  <span className="text-[#c0b283] font-serif text-2xl italic">2025-2026</span>
                </div>
                <p className="text-stone-400 font-light text-sm leading-relaxed">
                  Spécialisation : Révision comptable, contrôle de gestion, fiscalité approfondie et gestion prévisionnelle.
                </p>
              </div>
              <div className="p-8 border border-stone-800 bg-black/40 hover:border-[#c0b283] transition-all group hover:-translate-y-1 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl text-white font-normal uppercase tracking-wide group-hover:text-[#c0b283] transition-colors">
                    DUT GEA <br/>
                    <span className="text-sm text-stone-500 normal-case">UPEC</span>
                  </h3>
                  <span className="text-[#c0b283] font-serif text-2xl italic">2023-2025</span>
                </div>
                <p className="text-stone-400 font-light text-sm leading-relaxed">
                  Parcours Gestion comptable, Fiscale et Financière. Fondamentaux de la comptabilité analytique et analyse financière.
                </p>
              </div>
              <div className="p-8 border border-stone-800 bg-black/40 hover:border-[#c0b283] transition-all group hover:-translate-y-1 backdrop-blur-sm">
                 <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl text-white font-normal uppercase tracking-wide group-hover:text-[#c0b283] transition-colors">
                    Licence AES <br/>
                    <span className="text-sm text-stone-500 normal-case">Université Paris Nanterre</span>
                  </h3>
                  <span className="text-[#c0b283] font-serif text-2xl italic">2022-2023</span>
                </div>
                 <p className="text-stone-400 font-light text-sm leading-relaxed">
                  Administration Économique et Sociale. Analyse macro/micro-économique, introduction comptabilité et droit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="py-16 bg-black/90 text-center text-stone-600 text-xs uppercase tracking-widest font-light border-t border-stone-900">
          <p className="text-white text-lg mb-6 tracking-[0.3em] hover:text-[#c0b283] transition-colors cursor-default">Rayane Bouras</p>
          <a href="mailto:rayanebouras03@gmail.com" className="hover:text-[#c0b283] transition-colors border-b border-transparent hover:border-[#c0b283] pb-1">
            rayanebouras03@gmail.com
          </a>
          <p className="mt-8">© 2026 - Code & Finance.</p>
        </footer>

      </div>
    </div>
  );
}