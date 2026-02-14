"use client";

import React, { useState } from "react";
import { Send, User, Mail, MessageSquare, ChevronDown, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormValues } from "@/lib/validation";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isSubmitting } 
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: "Développement Web",
      _honey: "" // Initialisé vide
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    // 🛡️ SÉCURITÉ HONEYPOT : Si ce champ est rempli, c'est un robot.
    if (data._honey) {
      console.warn("Bot détecté et bloqué 🤖");
      // On simule un succès pour que le robot pense avoir réussi et parte
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000);
      return; 
    }

    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // ✅ Clé sécurisée
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // ✅ Clé sécurisée
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!   // ✅ Clé sécurisée
      );

      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Erreur d'envoi:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl bg-stone-900/40 border border-stone-800 backdrop-blur-xl shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* 🛡️ CHAMP CACHÉ (HONEYPOT) */}
        <input 
          type="text" 
          {...register("_honey")} 
          className="hidden" 
          style={{ display: 'none' }} 
          tabIndex={-1} 
          autoComplete="off" 
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* NOM */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#C0B283] ml-1">Nom Complet</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input 
                {...register("name")}
                placeholder="Jean Dupont"
                className={`w-full bg-black/50 border rounded-xl py-3 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-stone-700
                  ${errors.name ? "border-red-500 focus:border-red-500" : "border-stone-800 focus:border-[#C0B283] focus:ring-1 focus:ring-[#C0B283]"}
                `}
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-xs flex items-center gap-1 ml-1">
                <AlertCircle className="w-3 h-3" /> {errors.name.message}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#C0B283] ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input 
                {...register("email")}
                placeholder="jean@exemple.com"
                className={`w-full bg-black/50 border rounded-xl py-3 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-stone-700
                  ${errors.email ? "border-red-500 focus:border-red-500" : "border-stone-800 focus:border-[#C0B283] focus:ring-1 focus:ring-[#C0B283]"}
                `}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs flex items-center gap-1 ml-1">
                <AlertCircle className="w-3 h-3" /> {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* SUJET */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#C0B283] ml-1">Type de Projet</label>
          <div className="relative">
            <select 
              {...register("subject")}
              className="w-full bg-black/50 border border-stone-800 rounded-xl py-3 px-4 text-sm focus:border-[#C0B283] outline-none transition-all appearance-none cursor-pointer text-stone-300"
            >
              <option value="Développement Web">Développement Web</option>
              <option value="Mission Audit Data Base">Mission Audit Data Base</option>
              <option value="Automatisation Agent IA">Automatisation Agent IA</option>
              <option value="Alternance/Stage">Alternance/Stage</option>
              <option value="Autre demande">Autre demande</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
          </div>
        </div>

        {/* MESSAGE */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#C0B283] ml-1">Votre Message</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-stone-500" />
            <textarea 
              {...register("message")}
              rows={5}
              placeholder="Décrivez votre besoin..."
              className={`w-full bg-black/50 border rounded-xl py-3 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-stone-700 resize-none
                ${errors.message ? "border-red-500 focus:border-red-500" : "border-stone-800 focus:border-[#C0B283] focus:ring-1 focus:ring-[#C0B283]"}
              `}
            />
          </div>
          {errors.message && (
            <p className="text-red-400 text-xs flex items-center gap-1 ml-1">
              <AlertCircle className="w-3 h-3" /> {errors.message.message}
            </p>
          )}
        </div>

        {/* BOUTON */}
        <button 
          disabled={status === "sending" || isSubmitting}
          type="submit"
          className="w-full py-4 rounded-xl bg-[#C0B283] text-black font-bold text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#C0B283]/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "sending" ? (
            "Vérification & Envoi..."
          ) : status === "success" ? (
            "Message Reçu 5/5 !"
          ) : status === "error" ? (
            "Erreur Technique"
          ) : (
            <>Envoyer la demande <Send className="w-4 h-4" /></>
          )}
        </button>
      </form>
    </div>
  );
}