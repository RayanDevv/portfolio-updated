import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content.toLowerCase();

    // --- CERVEAU GRATUIT (LOGIQUE SIMPLE) ---
    let botResponse = "Je suis l'assistant virtuel de Rayane. Je peux vous parler de son CV, ses compétences ou ses projets.";

    if (lastMessage.includes('bonjour') || lastMessage.includes('salut') || lastMessage.includes('hello')) {
      botResponse = "Bonjour ! 👋 Je suis l'IA de Rayane. Comment puis-je vous aider aujourd'hui ?";
    } 
    else if (lastMessage.includes('cv') || lastMessage.includes('télécharger')) {
      botResponse = "📄 Vous pouvez télécharger le CV complet en cliquant sur le bouton doré 'TÉLÉCHARGER CV' au milieu de l'écran.";
    }
    else if (lastMessage.includes('contact') || lastMessage.includes('mail')) {
      botResponse = "📧 Vous pouvez contacter Rayane directement à : rayanebouras03@gmail.com";
    }
    else if (lastMessage.includes('compétence') || lastMessage.includes('stack') || lastMessage.includes('techno')) {
      botResponse = "💻 Rayane maîtrise le Code (Next.js, Python, SQL) ET la Finance (Comptabilité, Sage, Odoo). Un profil hybride !";
    }
    else if (lastMessage.includes('projet') || lastMessage.includes('expérience')) {
      botResponse = "🚀 Il a travaillé chez Indigo et Oxiproteomics. Il a développé une Web App pour automatiser les clôtures comptables.";
    }
    else {
      botResponse = "Pour une réponse plus précise, je vous invite à envoyer un mail à Rayane : rayanebouras03@gmail.com (Je suis en mode démo ! 😉)";
    }

    // Petite pause pour faire "réel"
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({ result: botResponse });

  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}