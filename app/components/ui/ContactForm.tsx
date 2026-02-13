"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, MessageSquare, ChevronDown } from "lucide-react";
import emailjs from "@emailjs/browser"; 

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null); 
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");

    // ✅ ENVOI RÉEL VIA EMAILJS
    emailjs.sendForm(
      'service_5t56o06',   // Ton ID Service
      'template_p5uvau7',  // ⚠️ METS ICI L'ID de "Nouveau Contact Portfolio"
      formRef.current,
      'HXj-As-xWCDZogn-T'  // Ta Clé Publique
    )
    .then(() => {
      setStatus("success");
      formRef.current?.reset(); 
      setTimeout(() => setStatus("idle"), 5000);
    })
    .catch((error) => {
      console.error("Erreur d'envoi:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl bg-stone-900/40 border border-stone-800 backdrop-blur-xl shadow-2xl">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#C0B283] ml-1">Nom Complet</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input 
                name="from_name" // ✅ Correspond à {{from_name}} dans tes templates
                required
                type="text"
                placeholder="Jean Dupont"
                className="w-full bg-black/50 border border-stone-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-[#C0B283] focus:ring-1 focus:ring-[#C0B283] outline-none transition-all placeholder:text-stone-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#C0B283] ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input 
                name="from_email" // ✅ Correspond à {{from_email}} dans tes templates
                required
                type="email"
                placeholder="jean@exemple.com"
                className="w-full bg-black/50 border border-stone-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-[#C0B283] focus:ring-1 focus:ring-[#C0B283] outline-none transition-all placeholder:text-stone-700"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#C0B283] ml-1">Type de Projet</label>
          <div className="relative">
            <select name="subject" className="w-full bg-black/50 border border-stone-800 rounded-xl py-3 px-4 text-sm focus:border-[#C0B283] outline-none transition-all appearance-none cursor-pointer text-stone-300">
              <option value="Développement Web">Développement Web</option>
              <option value="Audit Data Base">Mission Audit Data Base</option>
              <option value="Agent IA">Automatisation Agent IA</option>
              <option value="Alternance/Stage">Alternance/Stage</option>
              <option value="Autre">Autre demande</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#C0B283] ml-1">Votre Message</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-stone-500" />
            <textarea 
              name="message" // ✅ Correspond à {{message}} dans tes templates
              required
              rows={5}
              placeholder="Décrivez votre besoin..."
              className="w-full bg-black/50 border border-stone-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-[#C0B283] focus:ring-1 focus:ring-[#C0B283] outline-none transition-all placeholder:text-stone-700 resize-none"
            />
          </div>
        </div>

        <button 
          disabled={status === "sending"}
          type="submit"
          className="w-full py-4 rounded-xl bg-[#C0B283] text-black font-bold text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#C0B283]/10 disabled:opacity-50"
        >
          {status === "sending" ? "Transmission..." : status === "success" ? "Message Envoyé !" : status === "error" ? "Erreur d'envoi" : (
            <>Envoyer la demande <Send className="w-4 h-4" /></>
          )}
        </button>
      </form>
    </div>
  );
}