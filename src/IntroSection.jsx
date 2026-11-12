import React, { useState } from 'react';

// Composant d'introduction avec texte "Lire la suite" et couleur jaune d'accent
export default function IntroSection() {
  const [expanded, setExpanded] = useState(false);

  const shortText = `Bonjour, je suis développeur full‑stack spécialisé en React, Tailwind et Vite. J'aime créer des expériences web rapides et élégantes.`;
  const fullText = `Bonjour, je suis développeur full‑stack spécialisé en React, Tailwind et Vite. J'aime créer des expériences web rapides et élégantes.\n\nJ'ai travaillé sur de nombreux projets couvrant le design UI/UX, le développement front‑end et back‑end, ainsi que la création de contenus vidéo. Mon approche repose sur la clarté, la performance et l'accessibilité, afin de garantir une expérience fluide sur tous les appareils, y compris les mobiles.\n\nN'hésitez pas à explorer mon portfolio, à me contacter via les réseaux sociaux ou à discuter d'une collaboration pour votre prochain projet.`;

  return (
    <section className="max-w-3xl mx-auto py-6 px-4 md:px-8">
      <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-200">
        {expanded ? fullText : shortText}
      </p>
      <Hover3DButton onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Lire moins' : 'Lire la suite'}
      </Hover3DButton>
    </section>
  );
}
