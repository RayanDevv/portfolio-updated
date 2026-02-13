'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// --- 1. LE ROBOT QUI FAIT COUCOU (Ton design validé) ---
const DetailedBotIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGradient" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#F3E5AB" />
        <stop offset="50%" stopColor="#C0B283" />
        <stop offset="100%" stopColor="#8B7D50" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <style jsx>{`
      @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
      @keyframes blink { 0%, 45%, 55%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.1); } }
      @keyframes antenna-pulse { 0% { opacity: 0.6; fill: #ff4444; } 50% { opacity: 1; fill: #ff0000; } 100% { opacity: 0.6; fill: #ff4444; } }
      @keyframes wave { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-25deg); } }
      
      .bot-body { animation: float 4s ease-in-out infinite; transform-origin: center; }
      .bot-eye-left, .bot-eye-right { animation: blink 5s infinite; transform-origin: center 45px; }
      .bot-light { animation: antenna-pulse 2s infinite; }
      .bot-arm-wave { animation: wave 1.5s ease-in-out infinite; transform-origin: 25px 65px; } 
    `}</style>

    <g className="bot-body">
      {/* Bras Coucou 👋 */}
      <g className="bot-arm-wave">
        <path d="M25 65 Q 10 65 5 45" stroke="url(#goldGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="5" cy="45" r="5" fill="#C0B283" stroke="#000" strokeWidth="1" filter="url(#glow)" />
        <path d="M2 42 L1 38 M5 40 L5 36 M8 42 L10 38" stroke="#C0B283" strokeWidth="1" />
      </g>

      {/* Corps */}
      <line x1="50" y1="15" x2="50" y2="5" stroke="url(#goldGradient)" strokeWidth="2" />
      <circle cx="50" cy="5" r="3" className="bot-light" filter="url(#glow)" />
      <rect x="75" y="40" width="10" height="20" rx="2" fill="#1c1917" stroke="url(#goldGradient)" strokeWidth="1" />
      <path d="M85 50 H90" stroke="#C0B283" strokeWidth="1" opacity="0.5" />
      <rect x="25" y="20" width="50" height="45" rx="12" fill="#0c0a09" stroke="url(#goldGradient)" strokeWidth="2" />
      <rect x="32" y="32" width="36" height="22" rx="4" fill="#000" stroke="#333" strokeWidth="0.5" />
      <circle cx="40" cy="42" r="4" fill="#C0B283" className="bot-eye-left" filter="url(#glow)" />
      <circle cx="60" cy="42" r="4" fill="#C0B283" className="bot-eye-right" filter="url(#glow)" />
      <path d="M35 35 L45 35 L40 45 Z" fill="white" opacity="0.1" />
      <rect x="42" y="58" width="16" height="2" rx="1" fill="#C0B283" opacity="0.8" />
      <path d="M40 70 L50 75 L60 70 L50 80 Z" fill="url(#goldGradient)" />
      <path d="M35 80 Q50 90 65 80 V90 H35 Z" fill="#1c1917" stroke="url(#goldGradient)" strokeWidth="1" />
    </g>
  </svg>
);

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Bonjour ! Je suis l'assistant virtuel de Rayane. Je suis connecté à une IA pour répondre à toutes vos questions.", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setShowBubble(false);
  };

  // --- 2. LA LOGIQUE CÉRÉBRALE (Connexion API) ---
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const userText = inputValue;
    
    // Affiche le message de l'utilisateur tout de suite
    setMessages(prev => [...prev, { text: userText, isUser: true }]);
    setInputValue("");
    setIsTyping(true); // Active l'animation de chargement

    try {
      // Envoie le message au serveur (qui parle à Google Gemini)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) throw new Error("Erreur réseau");

      const data = await response.json();
      
      // Affiche la réponse de l'IA
      setMessages(prev => [...prev, { text: data.reply, isUser: false }]);
    } catch (error) {
      console.error(error);
      // Fallback si l'IA plante (ex: pas de clé API)
      setMessages(prev => [...prev, { text: "Désolé, mon cerveau IA ne répond pas (Vérifiez la clé API). Voici mon mail : rayanebouras03@gmail.com", isUser: false }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-4 pointer-events-auto">
      
      {/* BULLE */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="relative bg-white text-black px-4 py-3 rounded-2xl rounded-br-none shadow-[0_0_20px_rgba(192,178,131,0.3)] max-w-[200px]"
          >
            <button onClick={() => setShowBubble(false)} className="absolute -top-2 -right-2 bg-stone-900 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center border border-[#C0B283]">✕</button>
            <p className="text-sm font-medium leading-tight">Une question sur mon parcours ? <span className="text-[#C0B283] font-bold">Je suis là !</span></p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FENÊTRE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[90vw] md:w-80 h-[450px] bg-stone-950/95 backdrop-blur-xl border border-[#C0B283]/50 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#C0B283] p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center p-1 border border-black/20">
                  <DetailedBotIcon />
                </div>
                <div>
                  <h3 className="text-black font-bold uppercase tracking-wider text-xs">AlterIA</h3>
                  <span className="flex items-center gap-1 text-[10px] text-black/70 font-medium">
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span> En ligne
                  </span>
                </div>
              </div>
              <button onClick={toggleChat} className="text-black hover:bg-black/10 rounded-full p-1 transition-colors">✕</button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-[#C0B283]/50 scrollbar-track-transparent">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.isUser 
                      ? 'bg-[#C0B283] text-black rounded-tr-sm' 
                      : 'bg-stone-800 text-stone-200 border border-stone-700 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-stone-800 p-3 rounded-2xl rounded-tl-sm border border-stone-700 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#C0B283] rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-[#C0B283] rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-[#C0B283] rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-black/40 border-t border-stone-800 flex gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Écrivez votre message..." 
                className="flex-1 bg-stone-900 border border-stone-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-[#C0B283] transition-colors placeholder:text-stone-500"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()} 
                className="bg-[#C0B283] text-black w-9 h-9 rounded-full flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ➤
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOUTON D'OUVERTURE */}
      <button 
        onClick={toggleChat}
        className="group relative w-16 h-16 rounded-full bg-[#C0B283] shadow-[0_0_20px_rgba(192,178,131,0.4)] hover:shadow-[0_0_30px_rgba(192,178,131,0.6)] hover:scale-110 transition-all duration-300 flex items-center justify-center border-2 border-white/20"
      >
        <div className="w-12 h-12 relative z-10">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-black p-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <DetailedBotIcon />
          )}
        </div>
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full border border-[#C0B283] opacity-0 group-hover:animate-ping"></span>
        )}
      </button>
    </div>
  );
}