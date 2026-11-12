import React, { useState } from 'react';
import { Heart, Play, ArrowRight, Smartphone, Monitor, X } from 'lucide-react';

export default function FormationShowcase() {
  const [activeCategory, setActiveCategory] = useState('toutes');
  const [selectedFormation, setSelectedFormation] = useState(4); // Lumières Makeup (2)
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('pc'); // 'pc' | 'phone'
  const [favorites, setFavorites] = useState([0]);

  const categories = [
    { id: 'toutes', label: 'Toutes les formations' },
    { id: 'camera', label: 'camera' },
    { id: 'cadrage', label: 'cadrage' },
    { id: 'materiel', label: 'materiel' },
    { id: 'lumieres', label: 'lumières' },
    { id: 'audio', label: 'audio' },
  ];

  // Les 7 formations exactes de la capture PC
  const formations = [
    {
      id: 0,
      title: "Bases de l'iPhone",
      bannerTitle: "BASES",
      bannerSubtitle: "Iphone",
      category: 'camera',
      count: '12 modules vidéo',
      desc: "Domine l'ensemble des réglages secrets de ton iPhone, les cadences d'images (24fps vs 60fps), l'exposition manuelle et le profil ProRes/Log.",
      price: '45 000 FCFA',
      oldPrice: '80 000 FCFA',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=650&auto=format&fit=crop',
      color: 'text-[#E3B04A]',
      position: 'center',
    },
    {
      id: 1,
      title: "L'art de la composition",
      bannerTitle: "COMPOSITION",
      bannerSubtitle: "Art",
      category: 'cadrage',
      count: '8 formations pratiques',
      desc: "Règle des tiers, lignes de fuite, symétrie et perspective : transforme chaque plan banal en une œuvre visuelle captivante digne du cinéma.",
      price: '55 000 FCFA',
      oldPrice: '95 000 FCFA',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=650&auto=format&fit=crop',
      color: 'text-red-600',
      frameRed: true,
      position: 'center',
    },
    {
      id: 2,
      title: "Le Go-To Matériel",
      bannerTitle: "MATERIELS",
      bannerSubtitle: "Go-To Kit",
      category: 'materiel',
      count: '6 cours complets',
      desc: "Choisis les bons micros, trépieds, gimbals et optiques smartphone pour un rendu studio sans exploser ton budget équipement.",
      price: '50 000 FCFA',
      oldPrice: '85 000 FCFA',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=650&auto=format&fit=crop',
      color: 'text-amber-400',
      position: 'top',
    },
    {
      id: 3,
      title: "Lumières Face Caméra (1)",
      bannerTitle: "LUMIÈRES 1",
      bannerSubtitle: "Bases - Interview-Art",
      category: 'lumieres',
      count: '7 sessions complètes',
      desc: "Apprends à maîtriser la lumière principale (Key Light), le remplissage (Fill) et la séparation d'arrière-plan pour un éclairage visage impeccable.",
      price: '50 000 FCFA',
      oldPrice: '90 000 FCFA',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=650&auto=format&fit=crop',
      color: 'text-amber-400',
      position: 'bottom',
    },
    {
      id: 4,
      title: "Lumières Makeup (2)",
      bannerTitle: "LUMIÈRES 2",
      bannerSubtitle: "Makeup-Art",
      category: 'lumieres',
      count: '5 formations',
      desc: "Apprends à filmer tes prestations, maîtriser tes cadrages et construire des setups lumière adaptés au maquillage.",
      price: '60 000 FCFA',
      oldPrice: '105 000 FCFA',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=650&auto=format&fit=crop',
      color: 'text-orange-500',
      position: 'top',
    },
    {
      id: 5,
      title: "Lumières Beauté-Event (3)",
      bannerTitle: "LUMIÈRES 3",
      bannerSubtitle: "Beauty & Event",
      category: 'lumieres',
      count: '9 masterclasses',
      desc: "Techniques d'éclairage pour défilés, soirées, mariages et shootings beauté haute définition en environnement dynamique et basse lumière.",
      price: '65 000 FCFA',
      oldPrice: '115 000 FCFA',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=650&auto=format&fit=crop',
      color: 'text-cyan-300',
      position: 'top',
    },
    {
      id: 6,
      title: "Le Son",
      bannerTitle: "LE SON",
      bannerSubtitle: "Généralités",
      category: 'audio',
      count: '6 cours audio studio',
      desc: "Micro cravate sans fil, micro canon, traitement acoustique et réduction du bruit en post-production pour une voix claire et percutante.",
      price: '40 000 FCFA',
      oldPrice: '75 000 FCFA',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=650&auto=format&fit=crop',
      color: 'text-amber-400',
      position: 'top',
    },
  ];

  const filtered = activeCategory === 'toutes'
    ? formations
    : formations.filter(f => f.category === activeCategory);

  const activeData = formations[selectedFormation] || formations[0];

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleCardClick = (id) => {
    setSelectedFormation(id);
    setModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#070709] text-zinc-100 flex flex-col items-center py-8 px-4 sm:px-8 lg:px-14">
      
      {/* Barre d'outils & sélecteur de mode */}
      <header className="w-full max-w-[1520px] mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>✨</span> Modèle Catalogue Vidéo &amp; Formations
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Catalogue Formations <span className="font-bebas text-amber-400 text-3xl tracking-wider">VERSION PC 5 COLONNES</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Même forme verticale smartphone (9:14), disposée en 5 colonnes sur PC avec typographies <strong className="text-white">Bebas Neue</strong> &amp; <strong className="text-white">Space Mono</strong>.
          </p>
        </div>

        {/* Bascule vue PC / Mobile */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-2xl shadow-lg">
            <button
              onClick={() => setViewMode('pc')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'pc' ? 'bg-white text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Monitor size={15} /> Vue PC (5 colonnes)
            </button>
            <button
              onClick={() => setViewMode('phone')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'phone' ? 'bg-white text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Smartphone size={15} /> Vue Mobile (2 colonnes)
            </button>
          </div>
        </div>
      </header>

      {/* Barre de filtres en pilules */}
      <div className="w-full max-w-[1520px] mb-6 flex items-center justify-between gap-4 flex-wrap">
        <nav className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs uppercase transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-black font-black shadow-md shadow-white/10'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white font-semibold'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>

        <span className="font-bebas text-base text-zinc-400 tracking-wider">
          {filtered.length} FORMATION{filtered.length > 1 ? 'S' : ''} DISPONIBLE{filtered.length > 1 ? 'S' : ''}
        </span>
      </div>

      {/* Conteneur de grille selon le mode */}
      <div className={`w-full transition-all duration-500 ${
        viewMode === 'phone' ? 'max-w-[390px] border-4 border-zinc-800 rounded-[44px] p-4 bg-black shadow-2xl' : 'max-w-[1520px]'
      }`}>
        <div className={`grid gap-4 sm:gap-5 ${
          viewMode === 'phone' ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
        }`}>
          {filtered.map((item) => {
            const isFav = favorites.includes(item.id);
            return (
              <article
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                className="group cursor-pointer flex flex-col select-none"
              >
                {/* Carte vidéo vertical smartphone */}
                <div className="relative w-full aspect-[9/13.8] rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800/90 group-hover:border-amber-400/80 transition-all duration-300 shadow-xl group-hover:shadow-2xl group-hover:shadow-amber-500/10 group-hover:-translate-y-1">
                  
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/35" />

                  {/* Bouton Favori */}
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(e, item.id)}
                    className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 text-black flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition-transform z-10"
                  >
                    <Heart
                      size={14}
                      className={isFav ? 'fill-red-600 text-red-600' : 'fill-black text-black'}
                    />
                  </button>

                  {/* Badge Jaune NOUVEAU */}
                  <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 px-2 sm:px-2.5 py-0.5 rounded-full bg-[#F5B738] text-black font-bebas text-[10px] sm:text-xs tracking-wider shadow-md z-10">
                    NOUVEAU
                  </div>

                  {/* Cadre rouge pour la composition */}
                  {item.frameRed && (
                    <div className="absolute inset-2.5 sm:inset-3 border-2 border-red-600/80 pointer-events-none" />
                  )}

                  {/* Typographie de l'affiche */}
                  <div className={`absolute inset-x-2 pointer-events-none text-center ${
                    item.position === 'top' ? 'top-4 sm:top-6' : item.position === 'bottom' ? 'bottom-3 sm:bottom-4' : 'top-1/2 -translate-y-1/2'
                  }`}>
                    {item.position !== 'bottom' && (
                      <p className="text-[10px] sm:text-xs font-serif italic text-amber-200/90 tracking-wide drop-shadow">
                        {item.bannerSubtitle}
                      </p>
                    )}
                    <p className={`font-bebas text-2xl sm:text-3xl ${item.color} font-extrabold tracking-wider leading-none drop-shadow-md`}>
                      {item.bannerTitle}
                    </p>
                    {item.position === 'bottom' && (
                      <p className="text-[9px] sm:text-[10px] text-zinc-300 font-medium tracking-wide mt-0.5">
                        {item.bannerSubtitle}
                      </p>
                    )}
                  </div>

                  {/* Bouton Play blanc */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#F5B738] transition-all duration-300">
                      <Play size={18} className="fill-black ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Titre sous la carte */}
                <h3 className="mt-2 text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-amber-400 transition-colors line-clamp-1">
                  {item.title}
                </h3>
              </article>
            );
          })}
        </div>
      </div>

      {/* Modal interactif quand on clique sur une carte */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0F0F13] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-all"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="font-bebas text-sm sm:text-base text-zinc-400 uppercase tracking-widest">
                {activeData.count}
              </span>
              <span className="text-[10px] font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 uppercase tracking-wider">
                Édition Masterclass
              </span>
            </div>

            <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide leading-none mt-1">
              {activeData.bannerTitle}
            </h2>

            <p className="font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed mt-4 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/80">
              {activeData.desc}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-zinc-400 font-mono">
              <div className="flex items-center gap-2">✓ Accès vidéo illimité 4K</div>
              <div className="flex items-center gap-2">✓ Fichiers de réglages inclus</div>
              <div className="flex items-center gap-2">✓ Support WhatsApp direct</div>
              <div className="flex items-center gap-2">✓ Certificat de complétion</div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="block text-[11px] font-mono uppercase text-zinc-500">Tarif promotionnel</span>
                <div className="flex items-baseline gap-3">
                  <span className="font-bebas text-3xl sm:text-4xl text-[#F5B738] font-extrabold tracking-wide">
                    {activeData.price}
                  </span>
                  <span className="font-bebas text-lg sm:text-xl text-zinc-500 line-through">
                    {activeData.oldPrice}
                  </span>
                </div>
              </div>

              <button className="px-8 py-4 bg-[#F5B738] hover:bg-amber-300 active:scale-95 text-black font-bebas text-xl rounded-2xl tracking-wider transition-all duration-200 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2">
                <span>DÉMARRER LA FORMATION</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
