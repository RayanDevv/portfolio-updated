'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function ChatBot() {
  // --- 1. SÉCURITÉ ANTI-HYDRATION ---
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- 2. VOS STATES ---
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Bonjour ! Je suis l'IA de Rayane. Je connais son parcours par cœur. Posez-moi une question ! 👇" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Délai d'apparition de la bulle
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isMounted && !isOpen) { // On vérifie isMounted ici aussi
      timer = setTimeout(() => {
        setShowTooltip(true);
      }, 2000);
    } else {
      setShowTooltip(false);
    }
    return () => clearTimeout(timer);
  }, [isOpen, isMounted]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.result }]);

    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Je n'arrive pas à joindre le serveur. Réessayez plus tard !" }]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- 3. SI ON N'EST PAS ENCORE SUR LE NAVIGATEUR, ON N'AFFICHE RIEN ---
  // C'est ça qui corrige ton erreur à 100%
  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      
      {/* BULLE D'INFO */}
      {showTooltip && !isOpen && (
        <div className="pointer-events-auto bg-black border border-[#C0B283] p-4 rounded-xl shadow-lg w-48 text-center relative animate-bounce">
          <p className="text-white text-xs font-medium leading-tight">
            <span className="text-[#C0B283] font-bold block mb-1">Une question ?</span>
            Je peux vous répondre !
          </p>
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-black border-r border-b border-[#C0B283] transform rotate-45"></div>
        </div>
      )}

      {/* BOUTON ROBOT */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto w-20 h-20 bg-black border-2 border-[#C0B283] ring-1 ring-white/50 animate-pulse rounded-full shadow-[inset_0_0_30px_rgba(192,178,131,0.5)] flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer overflow-hidden"
        >
          <img 
            src="/assistantIA.png" 
            alt="Assistant IA" 
            className="w-full h-full object-cover" 
          />
        </button>
      )}

      {/* FENÊTRE DE CHAT */}
      {isOpen && (
        <div className="pointer-events-auto w-[320px] md:w-[380px] h-[500px] bg-black/95 backdrop-blur-md border border-[#C0B283] rounded-xl flex flex-col shadow-2xl overflow-hidden animate-fade-in">
          <div className="h-16 bg-[#C0B283] flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-full p-0.5 border border-black/20 overflow-hidden">
                <img src="/assistantIA.png" alt="IA" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-black font-bold uppercase tracking-widest text-xs">Assistant Virtuel</span>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                  <span className="text-black/70 text-[10px] font-medium">En ligne</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-black font-bold hover:text-white transition-colors text-2xl">×</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#C0B283] scrollbar-track-black">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && (
                   <div className="w-8 h-8 rounded-full bg-black border border-[#C0B283] p-0.5 mr-2 flex-shrink-0 self-end mb-1 overflow-hidden">
                     <img src="/assistantIA.png" className="w-full h-full object-cover" />
                   </div>
                )}
                <div className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed shadow-md ${m.role === 'user' ? 'bg-[#C0B283] text-black font-medium rounded-tr-none' : 'bg-stone-900 border border-stone-700 text-stone-200 rounded-tl-none'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-end">
                <div className="w-8 h-8 rounded-full bg-black border border-[#C0B283] p-0.5 mr-2 flex-shrink-0 overflow-hidden">
                     <img src="/assistantIA.png" className="w-full h-full object-cover opacity-50" />
                </div>
                <div className="bg-stone-900 border border-stone-700 p-3 rounded-lg rounded-tl-none flex gap-1">
                  <span className="w-2 h-2 bg-[#C0B283] rounded-full animate-bounce"></span><span className="w-2 h-2 bg-[#C0B283] rounded-full animate-bounce delay-100"></span><span className="w-2 h-2 bg-[#C0B283] rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="p-3 bg-black border-t border-stone-800 flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Posez une question..." className="flex-1 bg-stone-900 text-white text-xs p-3 rounded border border-stone-700 focus:border-[#C0B283] outline-none transition-colors placeholder:text-stone-600" />
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-[#C0B283] text-black font-bold rounded hover:bg-white transition-colors disabled:opacity-50 cursor-pointer">➤</button>
          </form>
        </div>
      )}
    </div>
  );
}