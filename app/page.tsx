'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, Variants } from "framer-motion";
import ContactForm from './components/ui/ContactForm'; // ✅ Import du nouveau formulaire

export default function Home() {
  const router = useRouter();
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [stars, setStars] = useState<Array<{ left: string; delay: string; duration: string; size: number }>>([]);
  const [isMounted, setIsMounted] = useState(false);

  const skills = [
    { name: "Python", level: "Avancé", url: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
    { name: "Node.js", level: "Avancé", url: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
    { name: "CSS 3", level: "Avancé", url: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" },
    { name: "Git", level: "Avancé", url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg" },
    { name: "Langage C", level: "Débutant (Algo)", url: "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg" },
    { name: "SQL", level: "Intermédiaire", url: "https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png" },
    { name: "Access", level: "Avancé", url: "/logos/logo_access.png" },
    { name: "Excel", level: "Avancé", url: "/logos/logo_excel.png" },
    { name: "Power BI", level: "Intermédiaire", url: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
    { name: "Odoo", level: "Débutant", url: "/logos/logo_odoo.png" },
    { name: "Sage", level: "Intermédiaire", url: "/logos/logo_sage.png" },
    { name: "Docker", level: "Intermédiaire", url: "/logos/logo_docker.png" }, 
  ];

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut"
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  useEffect(() => {
    setIsMounted(true);
    setStars(Array.from({ length: 30 }).map(() => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${Math.random() * 2 + 1}s`,
      size: Math.random() * 6 + 3 
    })));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-serif selection:bg-[#c0b283] selection:text-black overflow-x-hidden relative">
      
      <style jsx global>{`
        @keyframes star-fall { 0% { transform: translateY(-10px) scale(0.5); opacity: 0; } 30% { opacity: 1; transform: scale(1); } 80% { opacity: 1; transform: scale(1); } 100% { transform: translateY(50px) scale(0.5); opacity: 0; } }
        .animate-star-fall { animation-name: star-fall; animation-timing-function: linear; animation-iteration-count: infinite; }
        .cursor-blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>

      <div className={`relative z-10 transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0 scale-105 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
        
        {/* HERO SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeInUp}
          className="relative pt-40 pb-20 px-6 flex flex-col items-center justify-center min-h-[85vh] overflow-hidden"
        >
           <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
            
            <div className="inline-block px-4 py-2 border border-[#c0b283] text-xs font-medium text-[#c0b283] uppercase tracking-[0.2em] mb-8 bg-black/50 backdrop-blur-md">
              Licence Comptabilité & Développement Web
            </div>

            <h1 className="text-5xl md:text-8xl font-thin text-white tracking-wide leading-tight uppercase mb-8">
              L'Architecte <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c0b283] to-[#e6d5a8] font-normal">Financier.</span>
            </h1>

            <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed font-light font-sans mt-4 bg-black/30 p-4 rounded-xl backdrop-blur-sm border border-white/5">
              Étudiant en <strong>Licence de Comptabilité</strong> le jour, Développeur Freelance la nuit. Je fusionne la rigueur des chiffres avec la puissance de l'IA.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center pt-8 items-center w-full">
              <a href="#histoire" className="w-full md:w-auto text-center px-8 py-4 bg-[#c0b283] hover:bg-[#a89b70] hover:scale-105 text-black font-medium text-xs uppercase tracking-[0.2em] transition-all shadow-[0_0_15px_rgba(192,178,131,0.3)]">Lire mon histoire</a>
              
              <div className="relative group overflow-hidden rounded w-full md:w-auto bg-[#C0B283] hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(192,178,131,0.4)] hover:scale-105">
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  {isMounted && stars.map((star, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="absolute animate-star-fall opacity-90" style={{ left: star.left, top: '-10px', width: star.size, height: star.size, animationDelay: star.delay, animationDuration: star.duration }}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <a href="/CV_Rayane_Bouras.pdf" download="CV_Rayane_Bouras.pdf" className="relative z-10 w-full md:w-auto text-center px-8 py-4 bg-transparent text-black font-medium text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>Télécharger CV
                </a>
              </div>
              
              <a href="mailto:rayanebouras42@gmail.com" className="w-full md:w-auto text-center px-8 py-4 bg-transparent hover:bg-stone-900/80 text-white font-medium text-xs uppercase tracking-[0.2em] border border-stone-600 hover:border-[#c0b283] transition-all backdrop-blur-sm">Me contacter</a>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
              className="flex gap-6 justify-center mt-8"
            >
              <a href="https://github.com/RayanDevv" target="_blank" rel="noopener noreferrer" className="group p-4 border border-stone-800 rounded-full bg-black/50 hover:border-[#c0b283] hover:shadow-[0_0_20px_rgba(192,178,131,0.4)] transition-all duration-300 hover:-translate-y-2">
                <svg className="w-6 h-6 fill-stone-400 group-hover:fill-[#c0b283] transition-colors" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.065 1.815 2.805 1.29 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="group p-4 border border-stone-800 rounded-full bg-black/50 hover:border-[#c0b283] hover:shadow-[0_0_20px_rgba(192,178,131,0.4)] transition-all duration-300 hover:-translate-y-2">
                <svg className="w-6 h-6 fill-stone-400 group-hover:fill-[#c0b283] transition-colors" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* CITATION */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false, margin: "-100px" }} 
          variants={fadeInUp}
          className="py-16 sm:py-20 md:py-24 bg-black border-t border-stone-900/50 relative overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-5 gap-8 md:gap-12 items-center relative z-10">
            
            <div className="md:col-span-2 relative h-[200px] sm:h-[300px] md:h-[400px] order-first md:order-none">
              <img 
                src="/machiavel.png" 
                alt="Statue Machiavel" 
                className="w-full h-full object-cover opacity-100 grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-110" 
                style={{ 
                  filter: 'grayscale(100%) sepia(80%) hue-rotate(5deg) brightness(1.0) contrast(1.2)', 
                  maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                  objectPosition: 'center top'
                }} 
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-[#C0B283] opacity-20 blur-[60px] md:blur-[100px] -z-10 pointer-events-none"></div>
            </div>
            
            <div className="md:col-span-3 text-left space-y-6 sm:space-y-8 group cursor-default relative px-2 sm:px-0">
              <div className="text-6xl sm:text-7xl md:text-8xl text-[#C0B283] opacity-20 font-serif leading-none absolute -top-4 sm:-top-6 md:-top-8 -left-2 sm:-left-4 md:-left-8 select-none">❝</div>
              
              <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-stone-300 font-serif italic leading-snug relative z-10">
                "Il n'est rien de plus difficile à prendre en main, ni de plus périlleux à conduire, que de prendre l'initiative d'introduire un <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0B283] to-[#F3E5AB] font-semibold">nouvel ordre de choses</span>."
              </p>
              
              <div className="flex items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                <span className="h-[2px] w-10 sm:w-12 md:w-16 bg-[#C0B283]"></span>
                <div>
                  <p className="text-white text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold">Nicolas Machiavel</p>
                  <p className="text-[#C0B283] text-[10px] sm:text-xs tracking-[0.08em] sm:tracking-[0.1em] font-light italic">Le Prince, Chapitre VI</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* HISTOIRE */}
        <motion.section 
          id="histoire"
          initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }} variants={fadeInUp}
          className="py-32 bg-black/40 backdrop-blur-md border-y border-stone-900 relative"
        >
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h2 className="text-3xl font-thin text-[#c0b283] mb-12 text-center uppercase tracking-[0.2em]">La Genèse</h2>
            <div className="text-stone-300 font-sans font-light text-lg leading-loose text-justify space-y-8 bg-black/50 p-8 rounded-lg border border-white/5">
              <p><span className="text-4xl float-left mr-4 mt-[-10px] text-[#c0b283] font-serif">2</span>021. Après le bac, c'est le vide. Pas de formation, pas de travail, et une question obsédante : <em>"Qu'est-ce que je vais faire ?"</em>. Plutôt que d'attendre, je suis revenu à ma première passion. Dès l'âge de 15 ans, je bidouillais déjà des programmes de triche pour modifier mes jeux vidéo. J'ai décidé de transformer ce passe-temps en métier en me confrontant à la rigueur de la <strong>Piscine de l'école 42</strong>.</p>
              <p>C'est le déclic. Je me lance en freelance. Mon premier client ? Un plombier de mon réseau qui avait besoin d'un site vitrine en 2022. De là, le bouche-à-oreille a tout fait. J'ai tout appris sur le terrain, "à la dure", à une époque où l'IA n'était pas encore là pour écrire le code à notre place. C'était l'école de la débrouillardise.</p>
              <p>Mais la vie est faite de détours. J'ai eu l'opportunité de reprendre mes études et je suis "tombé" dans la comptabilité. Contre toute attente, j'y ai découvert un monde de logique fascinant, mais terriblement archaïque dans ses outils.</p>
              <p className="border-l-2 border-[#c0b283] pl-6 italic text-white text-xl bg-black/40 p-4 rounded-r-lg">C'est là que ma vision est née : devenir le Contrôleur de Gestion 2.0. Celui qui ne se contente pas de constater les écarts, mais qui code les outils pour les prédire.</p>
            </div>
          </div>
        </motion.section>

        {/* VALEURS */}
        <section className="py-24 px-6">
          <motion.div 
            className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
          >
            <motion.div variants={fadeInUp} className="p-8 border border-stone-800 bg-black/70 hover:border-[#c0b283] transition-all duration-500 hover:-translate-y-2 group cursor-default backdrop-blur-sm"><div className="text-[#c0b283] text-4xl mb-6 opacity-80 group-hover:opacity-100 transition-opacity">⚙️</div><h3 className="text-white text-lg uppercase tracking-widest mb-4 group-hover:text-[#c0b283] transition-colors">Autodidacte</h3><p className="text-stone-500 font-light text-sm leading-relaxed group-hover:text-stone-400 transition-colors">Formé sur le terrain avant l'ère de l'IA générative. Je comprends la structure du code, je ne fais pas que le copier.</p></motion.div>
            <motion.div variants={fadeInUp} className="p-8 border border-stone-800 bg-black/70 hover:border-[#c0b283] transition-all duration-500 hover:-translate-y-2 group cursor-default backdrop-blur-sm"><div className="text-[#c0b283] text-4xl mb-6 opacity-80 group-hover:opacity-100 transition-opacity">💡</div><h3 className="text-white text-lg uppercase tracking-widest mb-4 group-hover:text-[#c0b283] transition-colors">Visionnaire</h3><p className="text-stone-500 font-light text-sm leading-relaxed group-hover:text-stone-400 transition-colors">Intégration de modèles LLM pour automatiser l'audit et la gestion financière de demain.</p></motion.div>
            <motion.div variants={fadeInUp} className="p-8 border border-stone-800 bg-black/70 hover:border-[#c0b283] transition-all duration-500 hover:-translate-y-2 group cursor-default backdrop-blur-sm"><div className="text-[#c0b283] text-4xl mb-6 opacity-80 group-hover:opacity-100 transition-opacity">⚖️</div><h3 className="text-white text-lg uppercase tracking-widest mb-4 group-hover:text-[#c0b283] transition-colors">Rigueur</h3><p className="text-stone-500 font-light text-sm leading-relaxed group-hover:text-stone-400 transition-colors">L'alliance de la précision comptable et de la logique algorithmique.</p></motion.div>
          </motion.div>
        </section>

        {/* PARCOURS */}
        <section id="expertise" className="py-24 bg-black/60 border-t border-stone-900 px-6 backdrop-blur-md">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-thin text-white mb-16 text-center uppercase tracking-[0.2em]">Mon Parcours</h2>
            <motion.div 
              className="space-y-16 border-l border-stone-800 ml-6 pl-12 relative"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
            >
              <motion.div variants={fadeInUp} className="relative group"><span className="absolute -left-[53px] top-2 h-3 w-3 rounded-full bg-[#c0b283] ring-4 ring-black shadow-[0_0_10px_#c0b283]"></span><h3 className="text-xl text-white font-normal uppercase tracking-wide group-hover:text-[#c0b283] transition-colors">Comptable Fournisseurs <span className="text-[#c0b283] text-sm lowercase ml-2">/ Alternance</span></h3><p className="text-stone-500 text-xs uppercase tracking-widest mb-4">Actuel • Indigo</p><p className="text-stone-400 font-light leading-relaxed">Gestion des flux, calcul des provisions (FNP/CCA) et analyse des comptes tiers.</p></motion.div>
              <motion.div variants={fadeInUp} className="relative group"><span className="absolute -left-[53px] top-2 h-3 w-3 rounded-full bg-stone-800 group-hover:bg-[#c0b283] transition-colors ring-4 ring-black"></span><h3 className="text-xl text-white font-normal uppercase tracking-wide group-hover:text-[#c0b283] transition-colors">Assistant Comptable & Data <span className="text-[#c0b283] text-sm lowercase ml-2">/ Alternance</span></h3><p className="text-stone-500 text-xs uppercase tracking-widest mb-4">2024 - 2025 • Oxiproteomics</p><p className="text-stone-400 font-light leading-relaxed">Développement d'une <strong className="text-white">Web App (SQL/Power BI)</strong> pour le suivi qualité et travaux de clôture.</p></motion.div>
              <motion.div variants={fadeInUp} className="relative group"><span className="absolute -left-[53px] top-2 h-3 w-3 rounded-full bg-stone-800 group-hover:bg-[#c0b283] transition-colors ring-4 ring-black"></span><h3 className="text-xl text-white font-normal uppercase tracking-wide group-hover:text-[#c0b283] transition-colors">Développeur Freelance <span className="text-[#c0b283] text-sm lowercase ml-2">/ RYN</span></h3><p className="text-stone-500 text-xs uppercase tracking-widest mb-4">Depuis 2021 • RYN</p><p className="text-stone-400 font-light leading-relaxed">Création de sites sur-mesure (Premier client : Artisan Plombier) et optimisation SEO.</p></motion.div>
            </motion.div>
          </div>
        </section>

        {/* COMPÉTENCES */}
        <section id="competences" className="py-24 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-thin text-white mb-16 text-center uppercase tracking-[0.2em]">Compétences</h2>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px" }}
            >
              {skills.map((skill, index) => (
                <motion.div variants={fadeInUp} key={index} className="bg-stone-900/40 border border-stone-800 hover:border-[#c0b283] p-6 flex flex-col items-center justify-center gap-4 group transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
                  <div className="w-16 h-16 flex items-center justify-center p-2 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors"><img src={skill.url} alt={skill.name} className="w-full h-full object-contain"/></div>
                  <div className="text-center"><h3 className="text-white font-medium uppercase tracking-wide text-sm mb-1">{skill.name}</h3><p className="text-[#c0b283] text-xs font-serif italic">{skill.level}</p></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FORMATION */}
        <section id="formation" className="py-24 bg-black/50 border-t border-stone-900 px-6 backdrop-blur-md">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-thin text-white mb-16 text-center uppercase tracking-[0.2em]">Formation</h2>
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
            >
              <motion.div variants={fadeInUp} className="p-8 border border-stone-800 bg-black/40 hover:border-[#c0b283] transition-all group hover:-translate-y-1 backdrop-blur-sm md:col-span-2"><div className="flex justify-between items-start mb-4"><h3 className="text-xl text-white font-normal uppercase tracking-wide group-hover:text-[#c0b283] transition-colors">Licence Pro Métiers de la Gestion <br/><span className="text-sm text-stone-500 normal-case">Université de Lorraine</span></h3><span className="text-[#c0b283] font-serif text-2xl italic">2025-2026</span></div><p className="text-stone-400 font-light text-sm leading-relaxed">Spécialisation : Révision comptable, contrôle de gestion, fiscalité approfondie et gestion prévisionnelle.</p></motion.div>
              <motion.div variants={fadeInUp} className="p-8 border border-stone-800 bg-black/40 hover:border-[#c0b283] transition-all group hover:-translate-y-1 backdrop-blur-sm"><div className="flex justify-between items-start mb-4"><h3 className="text-xl text-white font-normal uppercase tracking-wide group-hover:text-[#c0b283] transition-colors">DUT GEA <br/><span className="text-sm text-stone-500 normal-case">UPEC</span></h3><span className="text-[#c0b283] font-serif text-2xl italic">2023-2025</span></div><p className="text-stone-400 font-light text-sm leading-relaxed">Parcours Gestion comptable, Fiscale et Financière. Fondamentaux de la comptabilité analytique et analyse financière.</p></motion.div>
              <motion.div variants={fadeInUp} className="p-8 border border-stone-800 bg-black/40 hover:border-[#c0b283] transition-all group hover:-translate-y-1 backdrop-blur-sm"><div className="flex justify-between items-start mb-4"><h3 className="text-xl text-white font-normal uppercase tracking-wide group-hover:text-[#c0b283] transition-colors">Licence AES <br/><span className="text-sm text-stone-500 normal-case">Université Paris Nanterre</span></h3><span className="text-[#c0b283] font-serif text-2xl italic">2022-2023</span></div><p className="text-stone-400 font-light text-sm leading-relaxed">Administration Économique et Sociale. Analyse macro/micro-économique, introduction comptabilité et droit.</p></motion.div>
            </motion.div>
          </div>
        </section>

        {/* SECTION CONTACT */}
        <section id="contact" className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-thin text-[#C0B283] uppercase tracking-[0.3em] mb-4">Initialisons le Contact</h2>
            <p className="text-stone-500 font-sans text-sm">Une question ? Un projet ? Je vous réponds sous 24h.</p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>

          {/* Déco en arrière-plan */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C0B283] opacity-[0.03] blur-[120px] pointer-events-none -z-10"></div>
        </section>

        {/* FOOTER */}
        <footer className="py-16 bg-black/90 text-center text-stone-600 text-xs uppercase tracking-widest font-light border-t border-stone-900">
          <p className="text-white text-lg mb-6 tracking-[0.3em] hover:text-[#c0b283] transition-colors cursor-default">Rayane Bouras</p>
          <a href="mailto:rayanebouras42@gmail.com" className="hover:text-[#c0b283] transition-colors border-b border-transparent hover:border-[#c0b283] pb-1">rayanebouras42@gmail.com</a>
          <p className="mt-8">© 2026 - Code & Finance.</p>
        </footer>

      </div>
    </div>
  );
}