'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* BOUTON ROBOT (Rond doré) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-black border-2 border-[#C0B283] rounded-full shadow-[0_0_20px_rgba(192,178,131,0.4)] flex items-center justify-center hover:scale-110 transition-transform duration-300 group cursor-pointer"
        >
          <span className="text-3xl animate-bounce">🤖</span>
        </button>
      )}

      {/* FENÊTRE DE CHAT */}
      {isOpen && (
        <div className="w-[320px] md:w-[380px] h-[500px] bg-black/95 backdrop-blur-md border border-[#C0B283] rounded-xl flex flex-col shadow-2xl overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="h-14 bg-[#C0B283] flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <span className="text-black font-bold uppercase tracking-widest text-sm">Assistant IA</span>
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-black font-bold hover:text-white transition-colors text-xl">×</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed shadow-md ${
                    m.role === 'user' 
                      ? 'bg-[#C0B283] text-black font-medium rounded-tr-none' 
                      : 'bg-stone-900 border border-stone-700 text-stone-200 rounded-tl-none'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-stone-900 border border-stone-700 p-3 rounded-lg rounded-tl-none flex gap-1">
                  <span className="w-2 h-2 bg-[#C0B283] rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-[#C0B283] rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-[#C0B283] rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-3 bg-black border-t border-stone-800 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez une question..."
              className="flex-1 bg-stone-900 text-white text-xs p-3 rounded border border-stone-700 focus:border-[#C0B283] outline-none transition-colors"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-4 py-2 bg-[#C0B283] text-black font-bold rounded hover:bg-white transition-colors disabled:opacity-50 cursor-pointer"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
}