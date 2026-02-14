import { z } from "zod";

export const contactSchema = z.object({
  name: z.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom est trop long")
    .trim(),

  email: z.string()
    .email("Format d'email invalide")
    .trim()
    .toLowerCase(),

  subject: z.string()
    .min(5, "Le sujet doit être plus explicite")
    .max(100, "Sujet trop long"),

  message: z.string()
    .min(10, "Votre message est un peu court")
    .max(1000, "Message limité à 1000 caractères")
    .trim(),

  // CHAMP PIÈGE (Honeypot)
  // Invisible pour l'humain, mais les bots vont essayer de le remplir.
  _honey: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;