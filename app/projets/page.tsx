import React from 'react';
import Link from 'next/link';

export default function Projects() {
  return (
    <div className="min-h-screen bg-black text-white font-serif selection:bg-[#c0b283] selection:text-black overflow-x-hidden relative">
      
      {/* --- ARRIÈRE-PLAN FIXE --- */}
      <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span className="text-[40vw] font-extrabold uppercase leading-none tracking-tighter select-none transform -rotate-12 text-[#C0B283] opacity-50">
          RB
        </span>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* --- CONTENU --- */}
      <div className="relative z-10">

        {/* --- NAVIGATION SIMPLIFIÉE --- */}
        <nav className="fixed top-0 w-full backdrop-blur-md bg-black/60 border-b border-stone-800 z-50">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="text-sm uppercase tracking-[0.2em] text-stone-400 hover:text-[#c0b283] transition-colors flex items-center gap-2">
              ← Retour à l'accueil
            </Link>
            <span className="text-xl tracking-wider text-white font-light uppercase">
              Projets<span className="text-[#c0b283]">.</span>
            </span>
          </div>
        </nav>

        {/* --- HEADER PROJETS --- */}
        <section className="pt-40 pb-16 px-6 text-center">
          <div className="inline-block px-4 py-2 border border-[#c0b283] text-xs font-medium text-[#c0b283] uppercase tracking-[0.2em] mb-4 bg-black/50">
            Portfolio
          </div>
          <h1 className="text-4xl md:text-6xl font-thin text-white uppercase tracking-widest mb-6">
            Réalisations <span className="italic text-[#c0b283]">Clés</span>
          </h1>
          <p className="text-stone-400 max-w-2xl mx-auto font-light">
            Une sélection de projets alliant <strong className="text-white">développement technique</strong> et <strong className="text-white">logique financière</strong>.
          </p>
        </section>

        {/* --- GRILLE DES PROJETS --- */}
        <section className="pb-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

            {/* PROJET 1 */}
            <div className="group relative bg-stone-900/40 border border-stone-800 hover:border-[#c0b283] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#c0b283] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-5xl opacity-20 group-hover:opacity-100 transition-opacity group-hover:text-[#c0b283]">01</div>
                  <span className="px-3 py-1 text-xs border border-white/20 rounded-full text-stone-400">Fullstack & Data</span>
                </div>
                <h3 className="text-2xl text-white font-normal uppercase mb-4 group-hover:text-[#c0b283] transition-colors">Web App Qualité</h3>
                <p className="text-stone-400 font-light text-sm leading-relaxed mb-6">
                  Développement d'une application web pour le suivi qualité chez Oxiproteomics.
                  Connexion directe aux bases de données pour automatiser la remontée des incidents.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#c0b283]">
                  <span>SQL</span> • <span>Power BI</span> • <span>Web Dev</span>
                </div>
              </div>
            </div>

            {/* PROJET 2 */}
            <div className="group relative bg-stone-900/40 border border-stone-800 hover:border-[#c0b283] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#c0b283] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-5xl opacity-20 group-hover:opacity-100 transition-opacity group-hover:text-[#c0b283]">02</div>
                  <span className="px-3 py-1 text-xs border border-white/20 rounded-full text-stone-400">Business Intelligence</span>
                </div>
                <h3 className="text-2xl text-white font-normal uppercase mb-4 group-hover:text-[#c0b283] transition-colors">KPIs Financiers</h3>
                <p className="text-stone-400 font-light text-sm leading-relaxed mb-6">
                  Optimisation des tableaux de bord pour la RATP. Analyse des budgets opérationnels et identification automatique des écarts via Power Query.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#c0b283]">
                  <span>Power BI</span> • <span>Excel Expert</span> • <span>DAX</span>
                </div>
              </div>
            </div>

            {/* PROJET 3 */}
            <div className="group relative bg-stone-900/40 border border-stone-800 hover:border-[#c0b283] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#c0b283] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-5xl opacity-20 group-hover:opacity-100 transition-opacity group-hover:text-[#c0b283]">03</div>
                  <span className="px-3 py-1 text-xs border border-white/20 rounded-full text-stone-400">Freelance</span>
                </div>
                <h3 className="text-2xl text-white font-normal uppercase mb-4 group-hover:text-[#c0b283] transition-colors">Sites Sur-Mesure</h3>
                <p className="text-stone-400 font-light text-sm leading-relaxed mb-6">
                  Création de sites vitrines pour artisans (ex: Plombier). Optimisation SEO complète et campagnes Google Ads pour atteindre la 1ère page.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#c0b283]">
                  <span>Next.js</span> • <span>SEO</span> • <span>Google Ads</span>
                </div>
              </div>
            </div>

            {/* PROJET 4 */}
            <div className="group relative bg-stone-900/40 border border-stone-800 hover:border-[#c0b283] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#c0b283] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-5xl opacity-20 group-hover:opacity-100 transition-opacity group-hover:text-[#c0b283]">04</div>
                  <span className="px-3 py-1 text-xs border border-white/20 rounded-full text-stone-400">Algorithmique</span>
                </div>
                <h3 className="text-2xl text-white font-normal uppercase mb-4 group-hover:text-[#c0b283] transition-colors">Core War & Libft</h3>
                <p className="text-stone-400 font-light text-sm leading-relaxed mb-6">
                  Projets complexes en langage C à l'École 42. Gestion de la mémoire, pointeurs et structures de données avancées.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#c0b283]">
                  <span>C</span> • <span>Unix</span> • <span>Git</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="py-10 bg-black text-center border-t border-stone-900">
          <p className="text-stone-600 text-xs uppercase tracking-widest">© 2026 - Rayane Bouras</p>
        </footer>
      
      </div>
    </div>
  );
}