import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Film, VolumeX, Sparkles, Image as ImageIcon } from 'lucide-react';

const SHOWREEL_ITEMS = [
  {
    id: 1,
    type: 'video',
    title: 'Visual Identity & Motion ADN',
    category: 'Motion Design',
    src: '/ADN.mp4',
    poster: '/thumbnails/adn.jpg',
    badge: 'Clip 01',
    description: 'Animation dynamique & branding immersif'
  },
  {
    id: 2,
    type: 'image',
    title: 'DAYAL — Identité visuelle',
    category: 'Branding',
    src: '/Dayal.png',
    badge: 'Visuel 01',
    description: 'Une identité graphique pensée pour marquer les esprits'
  },
  {
    id: 3,
    type: 'video',
    title: 'Spot Publicitaire Chronos',
    category: 'Commercial Cut',
    src: '/chronos.mp4',
    poster: '/thumbnails/chronos.jpg',
    badge: 'Clip 02',
    description: 'Rythme percutant & transition rapide'
  },
  {
    id: 4,
    type: 'image',
    title: 'AGRILIFE — Brand board',
    category: 'Direction artistique',
    src: '/agrilife.png',
    badge: 'Visuel 02',
    description: 'Couleurs, formes et univers de marque en harmonie'
  },
  {
    id: 5,
    type: 'video',
    title: 'Showreel Événement Fic-RC',
    category: 'Aftermovie',
    src: '/fic-rc.mp4',
    poster: '/thumbnails/fic-rc.jpg',
    badge: 'Clip 03',
    description: 'Captation vidéo & étalonnage cinématique'
  },
  {
    id: 6,
    type: 'image',
    title: 'PADNOVE — Identité de marque',
    category: 'Branding',
    src: '/PADNOVE.png',
    badge: 'Visuel 03',
    description: 'Une identité singulière pour une startup ambitieuse'
  },
  {
    id: 7,
    type: 'video',
    title: 'Teaser Institutionnel Sichem',
    category: 'Corporate Cut',
    src: '/sichem.mp4',
    poster: '/thumbnails/sichem.jpg',
    badge: 'Clip 04',
    description: 'Storytelling visuel & graphisme sobre'
  },
  {
    id: 8,
    type: 'image',
    title: 'Prayer Moment — Visuel événementiel',
    category: 'Design graphique',
    src: '/Visuel évènementielle chrétienne.png',
    badge: 'Visuel 04',
    description: 'Une composition visuelle pour un moment de partage'
  },
  {
    id: 9,
    type: 'video',
    title: 'YMCA Visual Session 01',
    category: 'Creative Cut',
    src: '/ymca1.mp4',
    poster: '/thumbnails/ymca1.jpg',
    badge: 'Clip 05',
    description: 'Montage créatif & séquençage punchy'
  },
  {
    id: 10,
    type: 'video',
    title: 'YMCA Visual Session 02',
    category: 'Highlight Reel',
    src: '/ymca2.mp4',
    poster: '/thumbnails/ymca2.jpg',
    badge: 'Clip 06',
    description: 'Plans dynamiques sans artifice sonore'
  }
];

export default function VideoShowcaseCarousel({ darkMode = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mediaError, setMediaError] = useState(false);
  const videoRef = useRef(null);
  const currentItem = SHOWREEL_ITEMS[currentIndex];

  // Enchaîne les séquences du showreel sans interruption.
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SHOWREEL_ITEMS.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [currentIndex, isPlaying]);

  // Seule la vidéo actuellement affichée est chargée et lue.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || currentItem.type !== 'video') return;

    if (!isPlaying) {
      video.pause();
      return;
    }

    video.muted = true;
    video.play().catch(() => setMediaError(true));
  }, [currentIndex, currentItem.type, isPlaying]);

  useEffect(() => {
    setMediaError(false);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SHOWREEL_ITEMS.length) % SHOWREEL_ITEMS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SHOWREEL_ITEMS.length);
  };

  return (
    <section id="showreel" className={`relative overflow-hidden border-y py-20 sm:py-24 ${
      darkMode ? 'border-violet-500/15 bg-[#0E1120]' : 'border-slate-200 bg-slate-100/70'
    }`}>
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-violet-300">
              <Sparkles size={13} /> Portfolio en mouvement
            </div>
            <h2 className={`text-3xl font-black leading-tight sm:text-4xl lg:text-5xl ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Vidéo, image &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-400">motion design.</span>
            </h2>
            <p className={`mt-3 max-w-xl text-sm leading-relaxed sm:text-base ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Un aperçu vivant de mes créations : clips vidéo muets, identités visuelles et créations graphiques.
            </p>
          </div>

          <div className={`flex w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold ${
            darkMode ? 'border-white/10 bg-white/5 text-slate-300' : 'border-slate-200 bg-white text-slate-600'
          }`}>
            <VolumeX size={15} className="text-violet-400" /> Vidéos toujours sans son
          </div>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="showreel-stage group relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-[0_30px_90px_rgba(0,0,0,0.4)] lg:col-span-8">
            {!mediaError ? (
              currentItem.type === 'video' ? (
                <video
                  key={currentItem.src}
                  ref={videoRef}
                  src={currentItem.src}
                  poster={currentItem.poster}
                  muted
                  playsInline
                  loop
                  autoPlay={isPlaying}
                  preload="metadata"
                  onError={() => setMediaError(true)}
                  aria-label={`Extrait vidéo muet : ${currentItem.title}`}
                  className="showreel-media-enter absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <img
                  key={currentItem.src}
                  src={currentItem.src}
                  alt={currentItem.title}
                  onError={() => setMediaError(true)}
                  className="showreel-media-enter showreel-image-motion absolute inset-0 h-full w-full object-cover"
                />
              )
            ) : (
              currentItem.type === 'video' ? (
                <div className="absolute inset-0 bg-slate-950">
                  <img src={currentItem.poster} alt={`Aperçu : ${currentItem.title}`} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                      <Film size={14} /> Aperçu vidéo
                    </span>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950 text-white">
                  <ImageIcon size={36} className="text-violet-400" />
                  <p className="text-sm font-bold">Impossible d’afficher ce visuel</p>
                </div>
              )
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/25" />
            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md">
              {currentItem.type === 'video' ? <Film size={13} /> : <ImageIcon size={13} />}
              {currentItem.type === 'video' ? 'Extrait vidéo' : 'Création visuelle'}
            </span>

            <div className="absolute bottom-6 left-6 right-16 z-10 sm:bottom-8 sm:left-8">
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-violet-600 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-lg shadow-violet-900/30">
                <Sparkles size={12} /> {currentItem.category}
              </span>
              <h3 key={`${currentItem.id}-title`} className="showreel-caption-enter max-w-2xl text-2xl font-black leading-tight text-white drop-shadow-lg sm:text-3xl lg:text-4xl">
                {currentItem.title}
              </h3>
              <p key={`${currentItem.id}-description`} className="showreel-caption-enter mt-2 max-w-xl text-xs leading-relaxed text-white/75 drop-shadow sm:text-sm">
                {currentItem.description}
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/15">
              <span
                key={`${currentIndex}-${isPlaying}`}
                className={`showreel-progress block h-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 ${!isPlaying ? 'is-paused' : ''}`}
              />
            </div>

        <button
          type="button"
          onClick={handlePrev}
          aria-label="Média précédent"
          className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white opacity-100 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-violet-600 lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100 sm:left-5 sm:h-12 sm:w-12"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Média suivant"
          className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white opacity-100 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-violet-600 lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100 sm:right-5 sm:h-12 sm:w-12"
        >
          <ChevronRight size={20} />
        </button>
          </div>

          <aside className={`flex flex-col justify-between rounded-2xl border p-5 sm:p-6 lg:col-span-4 ${
            darkMode ? 'border-white/10 bg-white/[0.035]' : 'border-slate-200 bg-white'
          }`}>
            <div>
              <div className="mb-5 flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-[0.16em] ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>Lezozo Studio</span>
                <span className={`font-mono text-xs ${darkMode ? 'text-violet-300' : 'text-violet-700'}`}>
                  {String(currentIndex + 1).padStart(2, '0')} <span className="text-slate-500">/ {String(SHOWREEL_ITEMS.length).padStart(2, '0')}</span>
                </span>
              </div>
              <div className="mb-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying((playing) => !playing)}
                  aria-label={isPlaying ? 'Mettre le diaporama en pause' : 'Reprendre le diaporama'}
                  aria-pressed={isPlaying}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-900/30 transition hover:scale-105 hover:bg-violet-500"
                >
                  {isPlaying ? <Pause size={17} /> : <Play size={17} />}
                </button>
                <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {isPlaying ? 'Défilement automatique' : 'Diaporama en pause'}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2.5">
                {SHOWREEL_ITEMS.map((item, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setCurrentIndex(idx);
                        setIsPlaying(false);
                      }}
                      aria-label={`Afficher ${item.type === 'video' ? 'la vidéo' : 'le visuel'} : ${item.title}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={`showreel-thumb group/thumb relative aspect-[4/3] overflow-hidden rounded-lg border transition-all ${
                        isActive
                          ? 'border-violet-400 ring-2 ring-violet-500/40'
                          : darkMode ? 'border-white/10 opacity-65 hover:border-violet-400/60 hover:opacity-100' : 'border-slate-200 opacity-70 hover:border-violet-400 hover:opacity-100'
                      }`}
                    >
                      {item.type === 'image' ? (
                        <img src={item.src} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-110" />
                      ) : (
                        <img src={item.poster} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-110" />
                      )}
                      {item.type === 'video' && (
                        <span className="absolute bottom-1 right-1 rounded bg-black/65 p-1 text-white">
                          <Play size={9} fill="currentColor" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className={`mt-6 border-t pt-4 ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
              <div className="mb-2 flex items-center justify-between">
                <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{currentItem.title}</p>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  currentItem.type === 'video' ? 'text-cyan-400' : 'text-fuchsia-400'
                }`}>{currentItem.type === 'video' ? 'Vidéo' : 'Visuel'}</span>
              </div>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {currentItem.description}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
