'use client';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    // On applique l'animation définie dans le CSS
    <div className="animate-page-enter">
      {children}
    </div>
  );
}