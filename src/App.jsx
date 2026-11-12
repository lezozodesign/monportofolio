import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Moon, Sun, Menu, X, Mail, Code, Palette, Video, Layers,
  ExternalLink, ChevronLeft, ChevronRight, User, Zap, Globe, Search, Rocket, Sparkles,
  Award, GraduationCap, CheckCircle2, Calendar, BookOpen, Headphones, PenTool, Terminal, Upload,
  Diamond, Heart, Play, ShoppingBag
} from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { Icon as Iconify } from '@iconify/react';
import canvaIcon from '@iconify-icons/cib/canva';
import affinityDesignerIcon from '@iconify-icons/thesvg-color/affinity-designer';
import afterEffectsIcon from '@iconify-icons/thesvg-color/after-effects';
import premiereProIcon from '@iconify-icons/thesvg-color/premierepro';
import capCutIcon from '@iconify-icons/thesvg-color/capcut';
import {
  SiReact, SiTailwindcss, SiVite, SiJavascript, SiPhp, SiFigma,
  SiHtml5, SiCss, SiGit, SiMysql, SiLaravel, SiNodedotjs,
  SiBootstrap, SiGithub, SiInstagram, SiTiktok, SiWhatsapp, SiDavinciresolve
} from 'react-icons/si';
import ThreeLogo from './ThreeLogo';
import Hover3DButton from './Hover3DButton';
import AnimatedBadge from './AnimatedBadge';
import ParallaxCard from './ParallaxCard';

const CanvaIcon = ({ size = 24, ...props }) => (
  <Iconify icon={canvaIcon} width={size} height={size} {...props} />
);

const AffinityDesignerIcon = ({ size = 24, ...props }) => (
  <Iconify icon={affinityDesignerIcon} width={size} height={size} {...props} />
);

const AfterEffectsIcon = ({ size = 24, ...props }) => (
  <Iconify icon={afterEffectsIcon} width={size} height={size} {...props} />
);

const PremiereProIcon = ({ size = 24, ...props }) => (
  <Iconify icon={premiereProIcon} width={size} height={size} {...props} />
);

const CapCutIcon = ({ size = 24, ...props }) => (
  <Iconify icon={capCutIcon} width={size} height={size} {...props} />
);

const toolProficiency = {
  React: 85,
  'Tailwind CSS': 92,
  Vite: 85,
  JavaScript: 92,
  PHP: 75,
  Figma: 95,
  HTML5: 92,
  CSS3: 92,
  Git: 60,
  'After Effects': 80,
  'Premiere Pro': 50,
  'Affinity Designer': 78,
  'DaVinci Resolve': 82,
  MySQL: 80,
  Laravel: 75,
  Canva: 95,
  GitHub: 82,
  'Node.js': 72,
  Bootstrap: 90,
  CapCut: 91,
};

// Composant de Carrousel réutilisable pour cartes de projet
function ProjectCarousel({ project, onSelect }) {
  const [index, setIndex] = useState(0);

  const media = project.images && project.images.length > 0
    ? project.images.map(img => ({ type: 'image', path: img }))
    : project.video
      ? [{ type: 'video', path: project.video }]
      : [{ type: 'image', path: project.image }];

  const handleNext = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % media.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const handleDot = (e, idx) => {
    e.stopPropagation();
    setIndex(idx);
  };

  const currentMedia = media[index];

  return (
    <div className="relative w-full h-56 group overflow-hidden bg-black flex items-center justify-center select-none">
      {currentMedia.type === 'video' ? (
        <video
          src={currentMedia.path}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          key={currentMedia.path}
        />
      ) : (
        <img
          src={currentMedia.path}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          key={currentMedia.path}
        />
      )}

      {/* Slide Navigation Overlay */}
      <div
        className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between px-3 cursor-zoom-in"
        onClick={() => onSelect(project, index)}
      >
        {media.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-xl bg-slate-900/90 text-white flex items-center justify-center transition-all hover:bg-violet-600 shadow-lg transform hover:scale-110 active:scale-95 border border-slate-800"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-xl bg-slate-900/90 text-white flex items-center justify-center transition-all hover:bg-violet-600 shadow-lg transform hover:scale-110 active:scale-95 border border-slate-800"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Video Indicator */}
      {currentMedia.type === 'video' && (
        <div className="absolute top-3 right-3 bg-violet-600 text-white px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-md">
          <Video size={12} /> VIDÉO
        </div>
      )}

      {/* Dots indicators */}
      {media.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {media.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => handleDot(e, idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === idx ? 'w-5 bg-violet-500 shadow-md shadow-violet-500/50' : 'w-2 bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ToolBadge({ tool, darkMode, onShow, onHide }) {
  const ToolIcon = tool.Icon;

  return (
    <button
      type="button"
      onMouseEnter={(event) => onShow(tool, event.currentTarget)}
      onMouseLeave={onHide}
      onFocus={(event) => onShow(tool, event.currentTarget)}
      onBlur={onHide}
      onClick={(event) => onShow(tool, event.currentTarget)}
      aria-label={`${tool.label} : maîtrise ${tool.level} %`}
      className={`w-full min-w-0 flex items-center gap-2 px-2.5 py-2 md:w-auto md:flex-shrink-0 md:gap-2.5 md:px-5 md:py-2.5 rounded-full border font-bold text-xs md:text-sm whitespace-nowrap transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-amber-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${
        darkMode ? 'bg-[#11100d]/90 border-amber-400/20 text-slate-200' : 'bg-white border-amber-300/60 text-slate-700'
      }`}
    >
      <ToolIcon size={18} style={{ color: tool.color, flexShrink: 0 }} />
      <span className="min-w-0 truncate">{tool.label}</span>
    </button>
  );
}

function ToolHologram({ tool }) {
  const ToolIcon = tool.Icon;
  const radius = 17;
  const circumference = 2 * Math.PI * radius;

  return createPortal(
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[70] animate-fade-in"
      style={{ left: tool.position.x, top: tool.position.y }}
    >
      <div className="relative flex w-48 items-center gap-3 overflow-hidden rounded-2xl border border-amber-300/50 bg-[#17140e]/95 px-3 py-2.5 shadow-[0_0_24px_rgba(245,183,56,0.22)] backdrop-blur-md">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage: 'linear-gradient(rgba(245,183,56,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(245,183,56,.12) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-amber-200 shadow-[0_0_12px_3px_rgba(245,183,56,0.55)] animate-pulse"
        />
        <ToolIcon className="relative z-10 shrink-0" size={22} style={{ color: tool.color }} aria-hidden="true" />
        <span className="relative z-10 min-w-0 flex-1 truncate text-left text-xs font-bold text-amber-50">
          {tool.label}
        </span>
        <div className="relative z-10 h-10 w-10 shrink-0">
          <svg viewBox="0 0 44 44" className="h-full w-full -rotate-90" aria-hidden="true">
            <defs>
              <linearGradient id="hologram-level-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffca52" />
                <stop offset="100%" stopColor="#F5B738" />
              </linearGradient>
            </defs>
            <circle cx="22" cy="22" r={radius} fill="none" stroke="rgba(245,183,56,0.2)" strokeWidth="3" />
            <circle
              cx="22"
              cy="22"
              r={radius}
              fill="none"
              stroke="url(#hologram-level-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - tool.level / 100)}
              style={{ filter: 'drop-shadow(0 0 3px rgba(245,183,56,0.7))' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-amber-100 drop-shadow-[0_0_6px_rgba(245,183,56,0.65)]">
            {tool.level}%
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [selectedImage, setSelectedImage] = useState(null);
  const [videoNeedsInteraction, setVideoNeedsInteraction] = useState(false);
  const selectedVideoRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [activeModalImgIndex, setActiveModalImgIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [isMobile, setIsMobile] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [lomeTime, setLomeTime] = useState('');
  const [selectedNeeds, setSelectedNeeds] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (projectTitle) => {
    setFavorites(prev =>
      prev.includes(projectTitle)
        ? prev.filter(title => title !== projectTitle)
        : [...prev, projectTitle]
    );
  };

  const projectNeeds = [
    { id: 'vitrine', label: 'Site Vitrine', desc: 'Présentation & PME' },
    { id: 'plateforme', label: 'Plateforme Web', desc: 'Application métier' },
    { id: 'mobile', label: 'App Mobile', desc: 'iOS & Android' },
    { id: 'video', label: 'Vidéo & Motion', desc: 'Clips & Animation' },
    { id: 'branding', label: 'Branding & Logo', desc: 'Charte graphique' },
    { id: 'uiux', label: 'Design UI/UX', desc: 'Maquettes Figma' },
  ];

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const updateMobileLayout = () => setIsMobile(mobileQuery.matches);
    updateMobileLayout();
    mobileQuery.addEventListener('change', updateMobileLayout);

    return () => mobileQuery.removeEventListener('change', updateMobileLayout);
  }, []);

  useEffect(() => {
    setVideoNeedsInteraction(false);
    if (!selectedImage || selectedImage.type !== 'video') return;

    const video = selectedVideoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;
    video.play()
      .then(() => setVideoNeedsInteraction(false))
      .catch(() => setVideoNeedsInteraction(true));
  }, [selectedImage]);

  useEffect(() => {
    const updateTime = () => {
      try {
        const options = {
          timeZone: 'Africa/Lome',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        };
        const formatter = new Intl.DateTimeFormat('fr-FR', options);
        setLomeTime(formatter.format(new Date()));
      } catch {
        const now = new Date();
        const hrs = String(now.getUTCHours()).padStart(2, '0');
        const mins = String(now.getUTCMinutes()).padStart(2, '0');
        setLomeTime(`${hrs}:${mins}`);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sections = ['accueil', 'projets', 'services', 'formations', 'outils', 'contact'];

    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      rootMargin: '-30% 0px -50% 0px'
    });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) spyObserver.observe(el);
    });

    const revealElements = document.querySelectorAll(
      'section:not(#accueil), .glass-card-dark, .glass-card-light, .showreel-stage, .showreel-thumb, .reveal-on-scroll'
    );
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.04,
      rootMargin: '0px 0px -32px 0px'
    });

    revealElements.forEach((el, index) => {
      el.classList.add('site-reveal');
      el.style.setProperty('--reveal-delay', `${el.matches('section') ? 0 : (index % 4) * 65}ms`);
      if (reduceMotion) {
        el.classList.add('is-visible');
      } else {
        revealObserver.observe(el);
      }
    });
    document.documentElement.classList.add('site-motion-ready');

    return () => {
      document.documentElement.classList.remove('site-motion-ready');
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) spyObserver.unobserve(el);
      });
      revealObserver.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const showToolProficiency = (tool, anchor) => {
    const bounds = anchor.getBoundingClientRect();
    const tooltipWidth = 192;
    const tooltipHeight = 60;
    const gap = 10;
    const preferredX = bounds.right + gap + tooltipWidth <= window.innerWidth - 8
      ? bounds.right + gap
      : bounds.left - gap - tooltipWidth;
    const x = Math.max(8, Math.min(preferredX, window.innerWidth - tooltipWidth - 8));
    const y = Math.max(8, Math.min(
      bounds.top + (bounds.height - tooltipHeight) / 2,
      window.innerHeight - tooltipHeight - 8
    ));

    setSelectedTool({ ...tool, position: { x, y } });
  };

  // Formulaire Formspree
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/xvgwbzvq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType || 'Non spécifié',
          message: formData.message,
          _subject: `Nouveau projet de ${formData.name}`
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
        setFormData({
          name: '',
          email: '',
          projectType: '',
          message: ''
        });
      } else {
        if (data.errors) {
          const errorMessages = data.errors.map(err => err.message).join(', ');
          alert(`Erreur: ${errorMessages}`);
        } else {
          alert('Erreur lors de l\'envoi. Veuillez réessayer.');
        }
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      alert('Erreur de connexion. Vérifiez votre connexion internet et réessayez.');
    }
  };

  const services = [
    { icon: Layers, title: 'UI/UX Design', desc: 'Interfaces intuitives, wireframes soignés et expériences utilisateur fluides sur Figma.' },
    { icon: Code, title: 'Développement Web & Mobile', desc: 'Sites web modernes, applications réactives, intégration performante (React, Tailwind, PHP).' },
    { icon: Video, title: 'Vidéo & Motion Design', desc: 'Animations captivantes, montage professionnel et récits visuels pour sublimer les marques.' },
    { icon: Globe, title: 'Identité Numérique & Branding', desc: 'Logotypes, chartes graphiques et solutions taillées pour le marché ouest-africain et international.' },
  ];

  // Section Formations partagée avec KoSam (ADN, Michigan State University, YMCA)
  const formations = [
    {
      school: 'Académie Digitale Numérique (ADN)',
      location: 'Lomé, Togo',
      degree: 'Développeur Web & Mobile — Programme P3 Dev Web 1',
      period: 'Diplôme Certifié',
      badge: 'Promotion Certifiée',
      icon: GraduationCap,
      desc: 'Formation d\'excellence intensive couvrant l\'intégralité du cycle de conception web et mobile : algorithmie, développement front-end moderne, architecture back-end, bases de données relationnelles et pratiques professionnelles du secteur tech.',
      skills: ['HTML5 & CSS3 / Tailwind', 'JavaScript (ES6+) & DOM', 'React & Vite', 'PHP & Laravel', 'SQL & MCD/MLD', 'Git & GitHub']
    },
    {
      school: 'Michigan State University',
      location: 'Formation Internationale',
      degree: 'Certification Spécialisée UI/UX Design & CSS',
      period: 'Certification Internationale',
      badge: 'Excellence UX',
      icon: Award,
      desc: 'Parcours certifiant de haut niveau axé sur l\'expérience utilisateur (UX) et le design d\'interfaces (UI) modernes : de la recherche utilisateur aux wireframes interactifs sur Figma, systèmes de design et intégration CSS avancée.',
      skills: ['Figma & Prototypage', 'Wireframing & Ergonomie', 'Design Systems', 'CSS Avancé & Responsive', 'Hiérarchie Visuelle']
    },
    {
      school: 'YMCA Togo',
      location: 'Lomé, Togo',
      degree: 'Entrepreneuriat Numérique & Production Multimédia',
      period: 'Programme Pratique',
      badge: 'Entrepreneuriat',
      icon: Rocket,
      desc: 'Formation pratique orientée impact et réalisation de projets : structuration de solutions numériques, direction artistique, stratégie de communication visuelle et gestion d\'initiatives à fort potentiel en Afrique de l\'Ouest.',
      skills: ['Gestion de Projet', 'Direction Artistique', 'Communication & Médias', 'Stratégie Numérique']
    }
  ];

  const projects = [
    {
      category: 'Vidéo',
      title: 'ADN Togo — Cérémonie de Remise des Diplômes',
      desc: 'Captation événementielle, montage dynamique et habillage vidéo pour la remise des diplômes de la première promotion de l\'Académie Digitale Numérique. Un film rythmé et émouvant célébrant l\'excellence tech togolaise.',
      image: '/thumbnails/adn.jpg',
      video: 'ADN.mp4',
      type: 'video',
      tags: ['ADN Togo', 'Aftermovie', 'Motion Design', 'Direction Artistique']
    },
    {
      category: 'Vidéo',
      title: 'YMCA Togo — Parcours Entrepreneur : Yao Hervé',
      desc: 'Reportage immersif et portrait inspirant dans le cadre du programme d\'incubation entrepreneuriale de YMCA Togo. Suivi de Yao Hervé Mawunyo AMEGNISSE, avec prises de vue soignées et étalonnage cinématique.',
      image: '/thumbnails/ymca1.jpg',
      video: 'ymca1.mp4',
      type: 'video',
      tags: ['YMCA Togo', 'Reportage', 'Storytelling', 'Direction Artistique']
    },
    {
      category: 'Vidéo',
      title: 'YMCA Togo — Parcours Entrepreneur : Marceline Abla',
      desc: 'Reportage et mise en lumière de l\'entrepreneuriat féminin avec Marceline Abla NOUKOUNOU. Storytelling dynamique, interviews poignantes et valorisation des initiatives locales accompagnées par YMCA Togo.',
      image: '/thumbnails/ymca2.jpg',
      video: 'ymca2.mp4',
      type: 'video',
      tags: ['YMCA Togo', 'Portrait Vidéo', 'Entrepreneuriat', 'Montage Rythmé']
    },
    {
      category: 'Visuel',
      title: 'Mémorial Agbosu Mary — Livret & Faire-Part d\'Obsèques',
      desc: 'Conception graphique et création éditoriale soignée (couverture et programme complet) pour les obsèques d\'AGBOSU Mary (« Schooltor »). Typographie sobre, harmonie florale et mise en page haute définition pour impression.',
      image: 'obseques-agbosu-mary-front.jpg',
      thumbnail: '/thumbnails/projects/obseques-agbosu.webp',
      images: [
        'obseques-agbosu-mary-front.jpg',
        'obseques-agbosu-mary-back.jpg'
      ],
      type: 'image',
      tags: ['Design Éditorial', 'Mise en Page', 'Typographie', 'Print HD']
    },
    {
      category: 'Visuel',
      title: 'Togoviande — Affiche Promotionnelle & Grille Tarifaire',
      desc: 'Création publicitaire percutante (format 10×14 cm) annonçant la nouvelle grille tarifaire de Togoviande. Hiérarchisation claire des prix, mise en valeur des produits et identité visuelle respectée.',
      image: 'FLYERS-TOGOVIANDE-10CM14CM.png',
      thumbnail: '/thumbnails/projects/togoviande-flyer.webp',
      type: 'image',
      tags: ['Affinity Designer', 'Affiche Publicitaire', 'Marketing Print', 'Branding']
    },
    {
      category: 'Visuel',
      title: 'Togoviande — Packaging & Étiquette Viande de Bœuf',
      desc: 'Design de packaging alimentaire (8.57 × 12 cm) pour la viande de bœuf fraîche. Respect des normes d\'étiquetage, codes couleurs attractifs et valorisation premium du produit en rayon.',
      image: 'TOGOVIANDE-ETIQUETTE-BOEUF (8.57 x 12 cm).png',
      thumbnail: '/thumbnails/projects/togoviande-boeuf.webp',
      type: 'image',
      tags: ['Packaging Design', 'Étiquette Produit', 'Affinity Designer', 'Agroalimentaire']
    },
    {
      category: 'Visuel',
      title: 'Togoviande — Packaging & Étiquette Viande de Chèvre',
      desc: 'Conception graphique de l\'étiquette produit (8.57 × 12 cm) pour la viande de chèvre locale. Typographie soignée, pictogrammes explicatifs et design adapté aux exigences de la grande distribution.',
      image: 'TOGOVIANDE-ETIQUETTE-CHEVRE (8.57 x 12 cm).png',
      thumbnail: '/thumbnails/projects/togoviande-chevre.webp',
      type: 'image',
      tags: ['Packaging Design', 'Étiquette Produit', 'Affinity Designer', 'Agroalimentaire']
    },
    {
      category: 'Visuel',
      title: 'Togoviande — Packaging Volaille (Grand Format)',
      desc: 'Habillage d\'emballage grand format (8.57 × 12 cm) pour le poulet fermier local. Composition moderne mettant en avant l\'origine locale, la qualité nutritionnelle et la garantie de fraîcheur.',
      image: 'TOGOVIANDE-ETIQUETTE-POULE-GRAND-FORMAT (8.57 x 12 cm).png',
      thumbnail: '/thumbnails/projects/togoviande-poule-grand.webp',
      type: 'image',
      tags: ['Packaging Design', 'Packaging Volaille', 'Affinity Designer', 'Print']
    },
    {
      category: 'Visuel',
      title: 'Togoviande — Packaging Volaille (Petit Format)',
      desc: 'Déclinaison packaging harmonisée pour le conditionnement petit format (8.57 × 12 cm). Équilibre parfait entre contraintes d\'espace, mentions légales et impact visuel immédiat en boutique.',
      image: 'TOGOVIANDE-ETIQUETTE-POULE-PETIT-FORMAT (8.57 x 12 cm).png',
      thumbnail: '/thumbnails/projects/togoviande-poule-petit.webp',
      type: 'image',
      tags: ['Packaging Design', 'Déclinaison Gamme', 'Affinity Designer', 'Print']
    },
    {
      category: 'Visuel',
      title: 'Togoviande — Packaging Volaille (Maxi Format)',
      desc: 'Création graphique de la version maxi format (8.57 × 12 cm) de la gamme poulet. Palette chromatique énergique, lisibilité optimale et parfaite cohérence avec la charte de la marque.',
      image: 'TOGOVIANDE-ETIQUETTE-POULE-MAXI-FORMAT (8.57 x 12 cm).png',
      thumbnail: '/thumbnails/projects/togoviande-poule-maxi.webp',
      type: 'image',
      tags: ['Packaging Design', 'Packaging Volaille', 'Affinity Designer', 'Print']
    },
    {
      category: 'Visuel',
      title: 'Togoviande — Packaging & Étiquette Saucisse Pur Bœuf',
      desc: 'Design d\'étiquette packaging (8.57 × 12 cm) pour la gamme charcuterie et saucisses pur bœuf de Togoviande. Esthétique appétissante, code couleur gourmand et clarté des informations de conservation.',
      image: 'TOGOVIANDE-ETIQUETTE-SAUCISSE-DE BOEUF (8.57 x 12 cm).png',
      thumbnail: '/thumbnails/projects/togoviande-saucisse.webp',
      type: 'image',
      tags: ['Packaging Design', 'Charcuterie', 'Affinity Designer', 'Agroalimentaire']
    },
    {
      category: 'Visuel',
      title: 'Prayer Moment — Affiche Événementielle Chrétienne',
      desc: 'Conception de l\'affiche officielle pour un temps fort de prière et de louange chrétienne. Jeux de lumières célestes, typographie inspirante et composition percutante pour affichage et réseaux sociaux.',
      image: 'Visuel évènementielle chrétienne.png',
      thumbnail: '/thumbnails/projects/prayer-moment.webp',
      type: 'image',
      tags: ['Affiche Événement', 'Direction Artistique', 'Communication Visuelle', 'Réseaux Sociaux']
    },
    {
      category: 'Vidéo',
      title: 'Centre Agro-Écologique Sichem (Zéglé)',
      desc: 'Vidéo promotionnelle et documentaire immersif au cœur du centre agro-pastoral Sichem à Zéglé. Présentation des formations agricoles durables et de l\'autonomisation économique des jeunes au Togo.',
      image: '/thumbnails/sichem.jpg',
      video: 'sichem.mp4',
      type: 'video',
      tags: ['DaVinci Resolve', 'Reportage Agricole', 'Étalonnage', 'Vlog Cinématique']
    },
    {
      category: 'Vidéo',
      title: 'Chronos228 — Spot Promotionnel Cave & Lounge',
      desc: 'Spot publicitaire rythmé et percutant pour la cave à vin premium & lounge Chronos228 à Lomé. Montage cut, ambiance nocturne feutrée, transitions stylisées et mise en valeur des références exclusives.',
      image: '/thumbnails/chronos.jpg',
      video: 'chronos.mp4',
      type: 'video',
      tags: ['After Effects', 'Publicité Spot', 'Montage Punchy', 'Lomé']
    },
    {
      category: 'Vidéo',
      title: 'Ferme Intégrée Circulaire (FIC-RC Togo)',
      desc: 'Production audiovisuelle et motion design institutionnel pour illustrer les principes d\'économie circulaire et d\'agriculture régénératrice de la FIC-RC. Un message écologique fort et percutant.',
      image: '/thumbnails/fic-rc.jpg',
      video: 'fic-rc.mp4',
      type: 'video',
      tags: ['Motion Design', 'Animation Graphique', 'Storytelling Écologique', 'Direction Artistique']
    },
    {
      category: 'Branding & Logo',
      title: 'DAYAL Entreprise — Identité Visuelle & Brand Board',
      desc: 'Conception complète de l\'identité visuelle pour DAYAL Entreprise : création du logotype, système chromatique, typographies institutionnelles et élaboration du Brand Board pour tous supports.',
      image: 'Dayal.png',
      thumbnail: '/thumbnails/projects/dayal.webp',
      type: 'image',
      tags: ['Brand Board', 'Logotype', 'Charte Graphique', 'Identité de Marque']
    },
    {
      category: 'Branding & Logo',
      title: 'AGRILIFE — Identité de Marque & Éco-Branding',
      desc: 'Univers de marque complet et brand board pour AGRILIFE. Une identité visuelle fraîche et organique inspirée de la terre et de l\'innovation agricole durable, avec logo moderne et déclinaisons.',
      image: 'agrilife.png',
      thumbnail: '/thumbnails/projects/agrilife.webp',
      type: 'image',
      tags: ['Éco-Branding', 'Logotype', 'Affinity Designer', 'Identité Visuelle']
    },
    {
      category: 'Branding & Logo',
      title: 'PADNOVE Startup — Branding & Univers Visuel',
      desc: 'Identité de marque moderne et percutante pensée pour la startup innovante PADNOVE. Logotype distinctif, guide des styles, palettes audacieuses et supports digitaux à fort impact.',
      image: 'PADNOVE.png',
      thumbnail: '/thumbnails/projects/padnove.webp',
      type: 'image',
      tags: ['Startup Branding', 'Brand Board', 'Design Moderne', 'Charte Graphique']
    },
    {
      category: 'Branding & Logo',
      title: 'AGRIPRO — Univers Visuel & Charte Graphique',
      desc: 'Création d\'une identité visuelle solide et crédible pour AGRIPRO. Logotype mémorable, typographies professionnelles et charte complète adaptée aux partenariats B2B et à l\'agro-industrie africaine.',
      image: 'AGRIPRO.png',
      thumbnail: '/thumbnails/projects/agripro.webp',
      type: 'image',
      tags: ['Branding B2B', 'Logotype', 'Agro-Industrie', 'Brand Board']
    },
  ];

  const categories = ['Tous', 'Visuel', 'Vidéo', 'Branding & Logo'];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'Tous' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  const favoriteProjects = projects.filter(project => favorites.includes(project.title));
  const favoritesMessage = `Bonjour Lezozo ! Je souhaite discuter de ces projets :\n\n${favoriteProjects
    .map(project => `- ${project.title}`)
    .join('\n')}\n\nPouvez-vous me donner plus d'informations ?`;
  const favoritesSubject = `Discussion sur ${favoriteProjects.length} projet${favoriteProjects.length > 1 ? 's' : ''} de votre portfolio`;
  const initialProjectCount = isMobile ? 6 : 8;
  const visibleProjects = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, initialProjectCount);

  // Palette Violet Doux (feutrée et reposante pour les yeux)
  const bgClass = darkMode ? 'bg-[#08080A]' : 'bg-slate-50';
  const textClass = darkMode ? 'text-slate-100' : 'text-slate-900';
  const textSecondary = darkMode ? 'text-slate-300' : 'text-slate-600';
  const cardBg = darkMode ? 'bg-[#121526]' : 'bg-white';
  const borderColor = darkMode ? 'border-violet-500/20' : 'border-slate-200';

  // Ticker items
  const tickerItems = ['LEZOZO DESIGN', 'UI/UX DESIGN', 'DEV WEB & MOBILE', 'VIDÉO MOTION', 'BRANDING', 'ADN TOGO CERTIFIÉ', 'MICHIGAN STATE CERTIFIED', 'LOMÉ, TOGO'];

  return (
    <div className={`portfolio-root min-h-screen ${bgClass} ${textClass} transition-colors duration-500 scroll-smooth relative`}>

      <div className={`ambient-background ${darkMode ? 'ambient-background-dark' : 'ambient-background-light'}`} aria-hidden="true" />

      {/* Modal image / vidéo agrandie */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex min-h-full items-start justify-center overflow-y-auto bg-black/90 p-4 backdrop-blur-sm animate-fade-in sm:items-center"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="fixed right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:right-6 sm:top-6"
            aria-label="Fermer le projet"
          >
            <X size={26} />
          </button>

          <div className="my-auto flex w-full max-w-5xl flex-col items-center py-4" onClick={(e) => e.stopPropagation()}>
            {selectedImage.type === 'video' ? (
              <div className="relative w-full">
                <video
                  ref={selectedVideoRef}
                  src={selectedImage.video}
                  poster={selectedImage.image}
                  autoPlay
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full max-h-[70vh] rounded-2xl border border-violet-500/20 object-contain shadow-2xl"
                >
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
                {videoNeedsInteraction && (
                  <button
                    type="button"
                    onClick={() => {
                      const video = selectedVideoRef.current;
                      if (!video) return;
                      video.muted = false;
                      video.volume = 1;
                      video.play()
                        .then(() => setVideoNeedsInteraction(false))
                        .catch(() => setVideoNeedsInteraction(true));
                    }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 px-5 py-3 font-semibold text-black shadow-xl transition hover:bg-amber-300"
                  >
                    Lancer la vidéo avec le son
                  </button>
                )}
              </div>
            ) : (
              <div className="relative w-full flex items-center justify-center">
                <img
                  src={selectedImage.images && selectedImage.images.length > 0 ? selectedImage.images[activeModalImgIndex] : selectedImage.image}
                  alt={selectedImage.title}
                  className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl border border-violet-500/20"
                />

                {selectedImage.images && selectedImage.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalImgIndex((prev) => (prev - 1 + selectedImage.images.length) % selectedImage.images.length);
                      }}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-violet-600 transition-all border border-slate-700 shadow-xl"
                      title="Précédent"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalImgIndex((prev) => (prev + 1) % selectedImage.images.length);
                      }}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-violet-600 transition-all border border-slate-700 shadow-xl"
                      title="Suivant"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
            )}

            {selectedImage.images && selectedImage.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {selectedImage.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveModalImgIndex(idx)}
                    className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border ${
                      activeModalImgIndex === idx
                        ? 'bg-amber-400 text-black border-amber-300 shadow-lg shadow-amber-400/30'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:text-white'
                    }`}
                  >
                    {idx === 0 ? 'Couverture (Recto)' : 'Programme & Annonces (Verso)'}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-5 w-full max-w-3xl bg-zinc-950/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 text-left">
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="font-bebas text-sm sm:text-base text-amber-400 uppercase tracking-widest">
                  {selectedImage.category}
                </span>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {selectedImage.type === 'video' ? 'Production Vidéo' : 'Design Graphique'}
                </span>
              </div>

              <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide uppercase leading-none mb-3">
                {selectedImage.title}
              </h3>

              <p className="font-mono-desc text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                {selectedImage.desc}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800">
                <div className="flex flex-wrap gap-1.5">
                  {selectedImage.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="font-mono-desc text-[11px] px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                      #{tag}
                    </span>
                  ))}
                </div>

                <a
                  href={`https://wa.me/22899513224?text=${encodeURIComponent(`Bonjour Lezozo ! 👋 J'ai vu votre projet "${selectedImage.title}" sur votre portfolio et je souhaite discuter d'une réalisation similaire.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bebas text-sm tracking-wider flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 shadow-md shadow-amber-400/20"
                >
                  <span>COMMANDER UN PROJET SIMILAIRE</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTool && <ToolHologram tool={selectedTool} />}

      {/* Navigation Bar */}
      <nav className={`fixed w-full ${bgClass} bg-opacity-90 backdrop-blur-md z-40 border-b ${darkMode ? 'border-violet-500/15' : 'border-slate-200'} transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollToSection('accueil')}>
            <img
              src="logo.png"
              alt="Lezozo Logo"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(139,92,246,0.4)]"
            />
          </div>

          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {[
              { id: 'accueil', label: 'Accueil', icon: User },
              { id: 'projets', label: 'Projets', icon: Layers },
              { id: 'services', label: 'Services', icon: Code },
              { id: 'formations', label: 'Formations', icon: GraduationCap },
              { id: 'outils', label: 'Outils', icon: Zap },
              { id: 'contact', label: 'Contact', icon: Mail }
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-full transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30 font-semibold'
                      : `${darkMode ? 'text-slate-300 hover:text-violet-300 hover:bg-violet-950/30' : 'text-slate-700 hover:text-violet-600 hover:bg-slate-100'}`
                  }`}
                >
                  <IconComponent size={16} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${cardBg} hover:bg-violet-600 hover:text-white transition-all duration-300 transform hover:scale-105 border ${borderColor}`}
              title={darkMode ? 'Activer le mode clair' : 'Activer le mode sombre'}
            >
              {darkMode ? <Sun size={19} className="text-violet-300" /> : <Moon size={19} className="text-violet-600" />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-violet-300 hover:text-white"
              aria-label="Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div className={`fixed inset-0 ${bgClass} bg-opacity-95 backdrop-blur-2xl z-50 flex flex-col justify-center items-center p-6 md:hidden animate-fade-in`}>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
            className="absolute top-6 right-6 p-3 rounded-full hover:bg-violet-600/20 text-violet-300 transition-colors"
          >
            <X size={28} />
          </button>

          <div className="flex flex-col items-center gap-3 w-full max-w-xs">
            {[
              { id: 'accueil', label: 'Accueil', icon: User },
              { id: 'projets', label: 'Projets', icon: Layers },
              { id: 'services', label: 'Services', icon: Code },
              { id: 'formations', label: 'Formations', icon: GraduationCap },
              { id: 'outils', label: 'Outils', icon: Zap },
              { id: 'contact', label: 'Contact', icon: Mail }
            ].map((item) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl text-base font-black transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl shadow-violet-600/30'
                      : 'text-slate-300 hover:text-violet-300 hover:bg-violet-950/40'
                  }`}
                >
                  <IconComponent size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ========== HERO SECTION ========== */}
      <section id="accueil" className="min-h-[100svh] flex items-center relative pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden">
        {/* Halos lumineux doux et tamisés (confort oculaire) */}
        <div className={`absolute top-1/4 -left-20 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full opacity-20 blur-[130px] pointer-events-none transition-colors duration-500 ${darkMode ? 'bg-violet-700' : 'bg-violet-200'}`} />
        <div className={`absolute bottom-1/4 -right-20 w-[280px] sm:w-[550px] h-[280px] sm:h-[550px] rounded-full opacity-15 blur-[130px] pointer-events-none transition-colors duration-500 ${darkMode ? 'bg-indigo-700' : 'bg-indigo-200'}`} />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Colonne gauche : Contenu */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 animate-fade-in-up text-center lg:text-left">
            <div className="space-y-2.5 sm:space-y-3">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] sm:text-xs font-black uppercase tracking-wider backdrop-blur-md transition-all shadow-sm ${
                darkMode ? 'bg-violet-950/60 border-violet-500/30 text-violet-300' : 'bg-violet-50 border-violet-200 text-violet-700'
              }`}>
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
                WOEZON (Bienvenue)
              </div>

              <p className="text-base sm:text-lg md:text-xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">
                Salut, je suis Lezozo
              </p>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight uppercase break-words" translate="no">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 glow-text-violet">
                DESIGNER, VIDÉASTE
              </span>
              <br />
              <span className={`${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                &amp; DEV WEB
              </span>
            </h1>

            <p className={`${textSecondary} text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0`}>
              Basé à <strong className="text-violet-400 font-extrabold">Lomé, Togo</strong>, diplômé de l'<strong>Académie Digitale Numérique</strong> et certifié par la <strong>Michigan State University</strong>. Je façonne des expériences numériques complètes : du design d'interface intuitif au développement web robuste, en passant par la narration vidéo.
            </p>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2 w-full">
              <button
                onClick={() => scrollToSection('projets')}
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl font-black text-white shadow-xl shadow-violet-600/25 hover:shadow-violet-600/40 transform hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 border border-violet-400/20 text-sm sm:text-base"
              >
                Voir mes projets <ChevronRight size={18} />
              </button>

              <button
                onClick={() => scrollToSection('formations')}
                className={`w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-xl font-extrabold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 border flex items-center justify-center gap-2.5 backdrop-blur-md text-sm sm:text-base ${
                  darkMode
                    ? 'border-violet-500/40 bg-slate-900/60 text-violet-300 hover:text-white hover:border-violet-400 hover:bg-violet-950/40'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-violet-500 hover:text-violet-600 shadow-md'
                }`}
              >
                Mon parcours &amp; Diplômes <GraduationCap size={18} />
              </button>
            </div>

            {/* Localisation et statut */}
            <div className={`p-3 px-4 sm:px-5 rounded-2xl flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-3 sm:gap-x-5 border backdrop-blur-xl max-w-fit mx-auto lg:mx-0 ${
              darkMode ? 'bg-slate-900/70 border-violet-500/20 shadow-xl shadow-black/40' : 'bg-white/80 border-slate-200 shadow-lg'
            }`}>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Globe size={15} className="text-violet-400 animate-pulse" />
                <span className="font-bold text-xs uppercase tracking-wide">Lomé, Togo</span>
              </div>

              <div className={`h-3.5 w-[1px] ${darkMode ? 'bg-slate-800' : 'bg-slate-300'} hidden sm:block`} />

              <div className="text-[11px] sm:text-xs font-mono font-bold tracking-wider">
                {lomeTime ? `Heure : ${lomeTime}` : 'Heure : 20:46'}
              </div>

              <div className={`h-3.5 w-[1px] ${darkMode ? 'bg-slate-800' : 'bg-slate-300'} hidden sm:block`} />

              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] sm:text-[11px] font-black text-emerald-400 uppercase tracking-widest">Disponible</span>
              </div>
            </div>

            {/* Pilules de services */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              {[
                { icon: Layers, label: 'UI/UX Design' },
                { icon: Code, label: 'Dev Web' },
                { icon: Video, label: 'Vidéo Motion' },
                { icon: Globe, label: 'Branding' },
              ].map((pill, i) => {
                const PillIcon = pill.icon;
                return (
                  <button
                    key={i}
                    onClick={() => scrollToSection('services')}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold border cursor-pointer transition-all duration-300 hover:scale-105 hover:border-violet-400 hover:text-violet-300 ${
                      darkMode ? 'bg-slate-900/50 border-violet-500/20 text-slate-300 shadow-sm' : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <PillIcon size={12} className="text-violet-400" />
                    {pill.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colonne droite : Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-in-up delay-300">
            <div className="relative w-full max-w-xs sm:max-w-sm px-2 sm:px-0">
              {/* Badge 1 */}
              <div className={`absolute -left-2 sm:-left-6 top-6 sm:top-8 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-2xl border backdrop-blur-xl z-20 animate-float transition-all duration-300 hover:scale-105 ${
                darkMode ? 'bg-slate-900/90 border-violet-500/30 shadow-violet-950/60' : 'bg-white/95 border-slate-200 shadow-xl'
              }`}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                    <Zap size={15} className="fill-amber-400/30 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-base sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-300 leading-none">+3 ans</p>
                    <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>d'expérience</p>
                  </div>
                </div>
              </div>

              {/* Badge 2 */}
              <div className={`absolute -right-2 sm:-right-6 bottom-14 sm:bottom-16 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-2xl border backdrop-blur-xl z-20 animate-float-delayed transition-all duration-300 hover:scale-105 ${
                darkMode ? 'bg-slate-900/90 border-indigo-500/30 shadow-indigo-950/60' : 'bg-white/95 border-slate-200 shadow-xl'
              }`}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300 shadow-inner">
                    <Rocket size={15} className="fill-violet-400/30 text-violet-300" />
                  </div>
                  <div>
                    <p className="text-base sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300 leading-none">+50</p>
                    <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>projets livrés</p>
                  </div>
                </div>
              </div>

              {/* Halo Glow doux */}
              <div className={`absolute inset-0 rounded-3xl opacity-30 blur-3xl ${darkMode ? 'bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-600' : 'bg-violet-200'} animate-pulse-slow pointer-events-none`} />

              {/* Cadre photo */}
              <div className={`relative h-[26rem] sm:h-[32rem] md:h-[34rem] lg:h-[36rem] rounded-3xl overflow-hidden border-2 transition-all duration-500 group shadow-2xl ${
                darkMode ? 'border-violet-500/30 bg-slate-950 shadow-violet-950/40' : 'border-violet-300 bg-white shadow-xl'
              }`}>
                <img
                  src="profile.jpg"
                  alt="Lezozo Portrait"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                <div className={`absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-3 sm:p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                  darkMode ? 'bg-slate-900/85 border-violet-500/30 text-white' : 'bg-white/90 border-slate-200 text-slate-900'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <p className="text-base sm:text-lg font-black tracking-wide" translate="no">Lezozo</p>
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-violet-300 font-bold tracking-wider mt-0.5">Designer, Vidéaste &amp; Dev Web</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========== TICKER BAND 1 — VIOLET DOUX ========== */}
      <div className="overflow-hidden py-3.5 bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-800 relative z-10 shadow-lg shadow-violet-950/50">
        <div className="ticker-track flex">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="flex-shrink-0 flex items-center text-white text-xs sm:text-sm font-black uppercase tracking-[0.2em] mx-5"
            >
              {item}
              <Diamond className="ml-5 text-white/40" size={12} aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>


      {/* ========== PROJECTS SECTION (STYLE SMARTPHONE 5 COLONNES PC / 2 COLONNES MOBILE) ========== */}
      <section id="projets" className={`py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden ${darkMode ? 'bg-[#08080A]' : 'bg-slate-50'} border-b ${darkMode ? 'border-zinc-800/80' : 'border-slate-200'} transition-colors duration-500`}>

        <div className="max-w-[1520px] mx-auto reveal-on-scroll">
          <div className="text-center relative max-w-4xl mx-auto mb-14 space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#F5B738]/15 border border-[#F5B738]/30 text-[#F5B738] font-bebas text-sm sm:text-base tracking-widest uppercase">
              Portfolio &amp; Réalisations
            </span>
            <h2 className={`font-bebas text-5xl sm:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r ${
              darkMode ? 'from-white via-zinc-100 to-amber-200' : 'from-slate-900 via-zinc-800 to-amber-700'
            } tracking-wide uppercase leading-none`}>
              Projets Signés Lezozo
            </h2>
            <p className="font-mono-desc text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Format smartphone vertical, direction artistique percutante et créations graphiques sur mesure.
            </p>
          </div>

          <div className="mb-10 space-y-5">
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Rechercher un projet, tag ou mot-clé..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowAllProjects(false);
                  setHoveredProjectIndex(null);
                }}
                className={`w-full px-5 py-3.5 rounded-full ${
                  darkMode ? 'bg-zinc-900/90 text-white placeholder-zinc-500 border-zinc-800 focus:border-amber-400' : 'bg-white text-slate-900 border-slate-300 focus:border-amber-500'
                } border-2 focus:outline-none transition-all duration-300 pl-12 text-sm sm:text-base shadow-xl backdrop-blur-md`}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400" size={20} />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setShowAllProjects(false);
                    setHoveredProjectIndex(null);
                  }}
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-all"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {categories.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowAllProjects(false);
                      setHoveredProjectIndex(null);
                    }}
                    className={`px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-200 ${
                      isSelected
                        ? 'bg-white text-black font-black shadow-lg shadow-white/10'
                        : `${darkMode ? 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700' : 'bg-white text-slate-700 hover:text-black border border-slate-300'}`
                    }`}
                  >
                    {category === 'Tous' ? 'Toutes les réalisations' : category}
                  </button>
                );
              })}
            </div>

            <p className="text-center font-bebas text-sm sm:text-base text-zinc-400 tracking-wider">
              {filteredProjects.length} PROJET{filteredProjects.length > 1 ? 'S' : ''} DISPONIBLE{filteredProjects.length > 1 ? 'S' : ''}
            </p>
          </div>

          {filteredProjects.length === 0 ? (
            <div className={`rounded-3xl p-12 text-center border-2 border-dashed ${borderColor} ${darkMode ? 'glass-card-dark' : 'glass-card-light'}`}>
              <Search size={56} className="mx-auto mb-4 text-amber-400 opacity-60" />
              <h3 className="font-bebas text-3xl mb-2 text-white">Aucun projet trouvé</h3>
              <p className="font-mono-desc text-xs text-zinc-400">
                Essayez de modifier votre recherche ou sélectionnez une autre catégorie
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5 lg:gap-6">
              {visibleProjects.map((project, idx) => {
                const isFav = favorites.includes(project.title);
                const isVideoPreview = hoveredProjectIndex === idx && project.type === 'video';
                return (
                  <article
                    key={idx}
                    onMouseEnter={() => {
                      if (project.type === 'video') setHoveredProjectIndex(idx);
                    }}
                    onMouseLeave={() => setHoveredProjectIndex(null)}
                    onClick={() => {
                      setHoveredProjectIndex(null);
                      setSelectedImage(project);
                      setActiveModalImgIndex(0);
                    }}
                    className="group cursor-pointer flex flex-col select-none"
                  >
                    {/* Carte vidéo vertical smartphone (ratio 9:13.8) */}
                    <div className="relative w-full aspect-[9/13.8] rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800/90 group-hover:border-[#F5B738]/80 transition-all duration-300 shadow-xl group-hover:shadow-2xl group-hover:shadow-amber-500/10 group-hover:-translate-y-1.5">
                      <img
                        src={project.thumbnail || project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {isVideoPreview && (
                        <video
                          src={project.video.startsWith('/') ? project.video : `/${project.video}`}
                          poster={project.thumbnail || project.image}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="none"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      )}
                      <div className={`absolute inset-0 bg-gradient-to-t ${
                        isVideoPreview ? 'from-black/65 via-black/10 to-black/25' : 'from-black/95 via-black/20 to-black/35'
                      }`} />

                      {/* Bouton Favori rond en haut à gauche */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(project.title);
                        }}
                        aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                        aria-pressed={isFav}
                        className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/60 bg-black/20 text-white backdrop-blur-md flex items-center justify-center shadow-md hover:bg-black/40 hover:scale-110 active:scale-90 transition-transform z-10"
                        title={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                      >
                        <Heart
                          size={13}
                          className={isFav ? 'fill-red-600 text-red-600' : 'fill-black text-black'}
                        />
                      </button>

                      {/* Badge NOUVEAU / CATÉGORIE doré en haut à droite */}
                      <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 px-2 sm:px-2.5 py-0.5 rounded-full bg-[#F5B738] text-black font-bebas text-[10px] sm:text-xs tracking-wider shadow-md z-10 uppercase">
                        {project.type === 'video' ? 'VIDÉO' : project.category === 'Branding & Logo' ? 'BRANDING' : 'VISUEL'}
                      </div>

                      {/* Typo centrale incrustée */}
                      <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 text-center pointer-events-none px-1">
                        <p className="font-bebas text-lg sm:text-2xl text-white/95 font-extrabold tracking-wider leading-none drop-shadow-lg uppercase line-clamp-2">
                          {project.title.split('—')[0].trim()}
                        </p>
                      </div>

                      {/* Bouton Play ou Zoom blanc central */}
                      <div className="project-card-action absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#F5B738] transition-all duration-300">
                          {project.type === 'video' ? (
                            <Play size={18} className="fill-black ml-0.5" />
                          ) : (
                            <ExternalLink size={18} className="text-black" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Titre & catégorie sous la carte */}
                    <div className="mt-2.5 px-0.5">
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-100 group-hover:text-[#F5B738] transition-colors line-clamp-1 leading-tight">
                        {project.title}
                      </h3>
                      <p className="font-mono-desc text-[10px] sm:text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                        {project.tags.slice(0, 2).join(' • ')}
                      </p>
                    </div>
                  </article>
                );
              })}
              </div>
              {filteredProjects.length > initialProjectCount && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllProjects((showAll) => !showAll)}
                    className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-6 py-3 font-bebas text-base tracking-wider text-amber-300 transition-all hover:bg-amber-400 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                    aria-expanded={showAllProjects}
                  >
                    {showAllProjects ? 'Voir moins' : `Voir plus (${filteredProjects.length - initialProjectCount})`}
                    <ChevronRight className={showAllProjects ? '-rotate-90' : 'rotate-90'} size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>


      {/* ========== SERVICES SECTION ========== */}
      <section id="services" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-violet-400 block animate-pulse">
              Expertise &amp; Solutions
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 uppercase tracking-tight">
              Mes Services Clés
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto rounded-full shadow-lg shadow-violet-500/40" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {services.map((service, idx) => {
              const ServiceIcon = service.icon;
              const indexFormatted = `0${idx + 1}`;
              return (
                <div
                  key={idx}
                  className={`p-4 sm:p-8 rounded-2xl sm:rounded-3xl border ${borderColor} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-600/15 group cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    darkMode ? 'glass-card-dark' : 'glass-card-light'
                  }`}
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-violet-500/10 via-transparent to-transparent pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-4 sm:mb-8">
                      <div className="w-11 h-11 sm:w-16 sm:h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl shadow-violet-600/25">
                        <ServiceIcon size={22} className="text-white sm:hidden" />
                        <ServiceIcon size={28} className="hidden text-white sm:block" />
                      </div>
                      <span className={`text-2xl font-black font-mono select-none ${
                        darkMode ? 'text-violet-500/30 group-hover:text-violet-400' : 'text-slate-300 group-hover:text-violet-600'
                      } transition-colors`}>
                        {indexFormatted}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-xl font-black mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-violet-300 to-indigo-300 transition-all leading-tight">
                      {service.title}
                    </h3>

                    <p className={`${textSecondary} text-xs sm:text-sm leading-relaxed`}>
                      {service.desc}
                    </p>
                  </div>

                  <div className="mt-4 sm:mt-8 pt-3 sm:pt-4 border-t border-violet-500/15 flex items-center justify-between text-[10px] sm:text-xs font-bold text-violet-400 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <span>En savoir plus</span>
                    <span>→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== NOUVELLE SECTION : FORMATIONS & CERTIFICATIONS ========== */}
      <section id="formations" className={`py-24 px-6 relative overflow-hidden ${darkMode ? 'bg-[#0E1120]' : 'bg-slate-100/70'} border-t border-b ${darkMode ? 'border-violet-500/20' : 'border-slate-200'} transition-colors duration-500`}>
        {/* Glow doux */}
        <div className={`absolute top-0 right-1/4 w-[450px] h-[450px] rounded-full opacity-10 blur-[140px] pointer-events-none ${darkMode ? 'bg-violet-600' : 'bg-violet-200'}`} />

        <div className="max-w-7xl mx-auto relative z-10 reveal-on-scroll">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-violet-400 block animate-pulse">
              Cursus &amp; Certifications
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 uppercase tracking-tight">
              Mon Parcours de Formation
            </h2>
            <p className={`${textSecondary} text-sm sm:text-base max-w-2xl mx-auto mt-2`}>
              Une formation technique d'excellence alliant développement web &amp; mobile certifié et design UI/UX international.
            </p>
            <div className="h-1.5 w-24 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto rounded-full shadow-lg shadow-violet-500/40 mt-4" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-8 md:grid-cols-3">
            {formations.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-4 sm:p-8 rounded-2xl sm:rounded-3xl border ${borderColor} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-600/20 flex flex-col justify-between relative overflow-hidden group ${
                    darkMode ? 'glass-card-dark' : 'glass-card-light'
                  }`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-500/10 via-transparent to-transparent pointer-events-none" />

                  <div>
                    {/* Badge top */}
                    <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 shrink-0 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-violet-600/30 group-hover:scale-105 transition-transform">
                        <ItemIcon size={20} className="sm:hidden" />
                        <ItemIcon size={26} className="hidden sm:block" />
                      </div>
                      <span className="min-w-0 px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-wider bg-violet-950/70 text-violet-300 border border-violet-500/30">
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-1">
                      {item.school}
                    </p>
                    <h3 className="text-base sm:text-xl font-black mb-2 sm:mb-3 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-violet-300 to-indigo-300 transition-all">
                      {item.degree}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mb-4 flex items-center gap-1.5">
                      <Globe size={13} className="text-violet-400" /> {item.location} • {item.period}
                    </p>
                    <p className={`${textSecondary} text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6`}>
                      {item.desc}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">
                      Compétences acquises :
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.skills.map((sk, sIdx) => (
                        <span
                          key={sIdx}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                            darkMode
                              ? 'bg-violet-950/50 text-violet-300 border-violet-500/25'
                              : 'bg-violet-50 text-violet-700 border-violet-200'
                          }`}
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== MÉTHODE DE TRAVAIL EN 4 ÉTAPES ========== */}
      <section className={`py-24 px-6 relative overflow-hidden ${darkMode ? 'bg-[#0B0D17]' : 'bg-slate-50'} transition-colors duration-500`}>
        <div className={`absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full opacity-[0.07] blur-[120px] pointer-events-none ${darkMode ? 'bg-indigo-600' : 'bg-indigo-200'}`} />

        <div className="max-w-7xl mx-auto relative z-10 reveal-on-scroll">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-violet-400 block animate-pulse">
              Processus & Rigueur
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 uppercase tracking-tight">
              Ma Méthode de Travail
            </h2>
            <p className={`${textSecondary} text-sm sm:text-base max-w-2xl mx-auto mt-2`}>
              Une approche en 4 phases pour garantir un résultat qui dépasse vos attentes — du brief initial à la mise en production.
            </p>
            <div className="h-1.5 w-24 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto rounded-full shadow-lg shadow-violet-500/40 mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: 'Écoute',
                Icon: Headphones,
                iconColor: 'from-violet-500 to-purple-600',
                desc: 'Je prends le temps de comprendre vos objectifs, votre audience cible et votre identité. Aucun projet ne commence sans une vision claire.',
                tags: ['Brief client', 'Analyse besoins', 'Stratégie']
              },
              {
                num: '02',
                title: 'Maquette',
                Icon: PenTool,
                iconColor: 'from-fuchsia-500 to-violet-600',
                desc: 'Wireframes, prototypes interactifs Figma et validation de l\'UX avant une seule ligne de code. Vous voyez avant de valider.',
                tags: ['Figma', 'Wireframe', 'Prototype UI']
              },
              {
                num: '03',
                title: 'Développement',
                Icon: Terminal,
                iconColor: 'from-indigo-500 to-violet-600',
                desc: 'Code propre, responsive, performant. React, Tailwind, PHP — chaque fonctionnalité est construite avec précision et testée.',
                tags: ['React / Tailwind', 'Responsive', 'Performance']
              },
              {
                num: '04',
                title: 'Déploiement',
                Icon: Upload,
                iconColor: 'from-emerald-500 to-teal-600',
                desc: 'Mise en ligne, tests finaux, formation à l\'utilisation et suivi post-lancement. Je reste disponible après la livraison.',
                tags: ['Mise en prod', 'Tests', 'Support']
              }
            ].map((step, idx) => {
              const StepIcon = step.Icon;
              return (
                <div
                  key={idx}
                  className={`relative p-8 rounded-3xl border ${borderColor} group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-600/20 overflow-hidden ${
                    darkMode ? 'glass-card-dark' : 'glass-card-light'
                  }`}
                >
                  {/* Numéro de fond */}
                  <span className={`absolute -bottom-4 -right-2 text-[8rem] font-black leading-none select-none pointer-events-none transition-all duration-500 ${
                    darkMode ? 'text-violet-500/5 group-hover:text-violet-500/10' : 'text-violet-200/60 group-hover:text-violet-300/80'
                  }`}>
                    {step.num}
                  </span>

                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.iconColor} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <StepIcon size={26} className="text-white" />
                    </div>
                    <span className="text-xs font-black text-violet-400 uppercase tracking-[0.2em] block mb-1">{step.num}</span>
                    <h3 className="text-2xl font-black mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-violet-300 to-indigo-300 transition-all">
                      {step.title}
                    </h3>
                    <p className={`${textSecondary} text-sm leading-relaxed mb-5`}>{step.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {step.tags.map((tag, ti) => (
                        <span key={ti} className={`text-[10px] font-black px-2.5 py-1 rounded-lg border uppercase tracking-wider ${
                          darkMode ? 'bg-violet-950/60 text-violet-300 border-violet-500/25' : 'bg-violet-50 text-violet-700 border-violet-200'
                        }`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== DOUBLE MARQUEE — OUTILS & STACK ========== */}
      <div id="outils" className={`overflow-hidden py-10 relative scroll-mt-24 ${darkMode ? 'bg-[#11100d]' : 'bg-[#fffdf8]'} border-t border-b ${darkMode ? 'border-amber-400/15' : 'border-amber-300/50'}`}>
        <div className="text-center mb-6">
          <span className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">
            Stack & Outils Maîtrisés
          </span>
        </div>

        {/* Piste 1 — sens normal */}
          <div className="mb-4">
          <div className={`${isMobile ? 'grid grid-cols-2 gap-2.5' : 'marquee-track flex gap-5'}`}>
            {[
              { label: 'React', Icon: SiReact, color: '#61DAFB' },
              { label: 'Tailwind CSS', Icon: SiTailwindcss, color: '#38BDF8' },
              { label: 'Vite', Icon: SiVite, color: '#A78BFA' },
              { label: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
              { label: 'PHP', Icon: SiPhp, color: '#777BB4' },
              { label: 'Figma', Icon: SiFigma, color: '#F24E1E' },
              { label: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
              { label: 'CSS3', Icon: SiCss, color: '#264DE4' },
              { label: 'Git', Icon: SiGit, color: '#F05032' },
              { label: 'After Effects', Icon: AfterEffectsIcon, color: '#9999FF' },
              { label: 'Premiere Pro', Icon: PremiereProIcon, color: '#EA77FF' },
              { label: 'Affinity Designer', Icon: AffinityDesignerIcon, color: '#7B61FF' },
              { label: 'DaVinci Resolve', Icon: SiDavinciresolve, color: '#FF6B4A' },
              { label: 'MySQL', Icon: SiMysql, color: '#00758F' },
              { label: 'Laravel', Icon: SiLaravel, color: '#FF2D20' },
              { label: 'Canva', Icon: CanvaIcon, color: '#00C4CC' },
              /* duplicate for infinite loop */
              { label: 'React', Icon: SiReact, color: '#61DAFB' },
              { label: 'Tailwind CSS', Icon: SiTailwindcss, color: '#38BDF8' },
              { label: 'Vite', Icon: SiVite, color: '#A78BFA' },
              { label: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
              { label: 'PHP', Icon: SiPhp, color: '#777BB4' },
              { label: 'Figma', Icon: SiFigma, color: '#F24E1E' },
              { label: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
              { label: 'CSS3', Icon: SiCss, color: '#264DE4' },
              { label: 'Git', Icon: SiGit, color: '#F05032' },
              { label: 'After Effects', Icon: AfterEffectsIcon, color: '#9999FF' },
              { label: 'Premiere Pro', Icon: PremiereProIcon, color: '#EA77FF' },
              { label: 'Affinity Designer', Icon: AffinityDesignerIcon, color: '#7B61FF' },
              { label: 'DaVinci Resolve', Icon: SiDavinciresolve, color: '#FF6B4A' },
              { label: 'MySQL', Icon: SiMysql, color: '#00758F' },
              { label: 'Laravel', Icon: SiLaravel, color: '#FF2D20' },
              { label: 'Canva', Icon: CanvaIcon, color: '#00C4CC' },
            ].map((tool, i) => {
              if (isMobile && i >= 16) return null;
              const ToolIcon = tool.Icon;
              const toolWithLevel = { ...tool, Icon: ToolIcon, level: toolProficiency[tool.label] };
              return (
                <ToolBadge
                  key={i}
                  tool={toolWithLevel}
                  darkMode={darkMode}
                  onShow={showToolProficiency}
                  onHide={() => setSelectedTool(null)}
                />
              );
            })}
          </div>
        </div>

        {/* Piste 2 — sens inverse */}
        <div>
          <div className={`${isMobile ? 'grid grid-cols-2 gap-2.5' : 'marquee-track-rev flex gap-5'}`}>
            {[
              { label: 'GitHub', Icon: SiGithub, color: '#ffffff' },
              { label: 'Node.js', Icon: SiNodedotjs, color: '#68A063' },
              { label: 'Bootstrap', Icon: SiBootstrap, color: '#7952B3' },
              { label: 'Canva', Icon: CanvaIcon, color: '#00C4CC' },
              { label: 'CapCut', Icon: CapCutIcon, color: '#FF3366' },
              { label: 'MySQL', Icon: SiMysql, color: '#00758F' },
              { label: 'Figma', Icon: SiFigma, color: '#F24E1E' },
              { label: 'React', Icon: SiReact, color: '#61DAFB' },
              { label: 'Laravel', Icon: SiLaravel, color: '#FF2D20' },
              { label: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
              { label: 'After Effects', Icon: AfterEffectsIcon, color: '#9999FF' },
              { label: 'Git', Icon: SiGit, color: '#F05032' },
              /* duplicate */
              { label: 'GitHub', Icon: SiGithub, color: '#ffffff' },
              { label: 'Node.js', Icon: SiNodedotjs, color: '#68A063' },
              { label: 'Bootstrap', Icon: SiBootstrap, color: '#7952B3' },
              { label: 'Canva', Icon: CanvaIcon, color: '#00C4CC' },
              { label: 'CapCut', Icon: CapCutIcon, color: '#FF3366' },
              { label: 'MySQL', Icon: SiMysql, color: '#00758F' },
              { label: 'Figma', Icon: SiFigma, color: '#F24E1E' },
              { label: 'React', Icon: SiReact, color: '#61DAFB' },
              { label: 'Laravel', Icon: SiLaravel, color: '#FF2D20' },
              { label: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
              { label: 'After Effects', Icon: AfterEffectsIcon, color: '#9999FF' },
              { label: 'Git', Icon: SiGit, color: '#F05032' },
            ].map((tool, i) => {
              if (isMobile && i >= 12) return null;
              const ToolIcon = tool.Icon;
              const toolWithLevel = { ...tool, Icon: ToolIcon, level: toolProficiency[tool.label] };
              return (
                <ToolBadge
                  key={i}
                  tool={toolWithLevel}
                  darkMode={darkMode}
                  onShow={showToolProficiency}
                  onHide={() => setSelectedTool(null)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ========== CONTACT SECTION ========== */}
      <section id="contact" className={`py-24 px-6 relative overflow-hidden ${darkMode ? 'bg-[#0E1120]' : 'bg-slate-100/70'} border-t ${darkMode ? 'border-violet-500/20' : 'border-slate-200'} transition-colors duration-500`}>
        <div className="max-w-5xl mx-auto reveal-on-scroll">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-violet-400 block animate-pulse">
              Parlons de votre projet
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 uppercase tracking-tight">
              Lancez Votre Prochain Projet
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto rounded-full shadow-lg shadow-violet-500/40" />
          </div>

          {/* Sélecteur de besoins interactif WhatsApp */}
          <div className={`mb-12 p-6 sm:p-8 rounded-3xl border ${borderColor} ${darkMode ? 'glass-card-dark' : 'glass-card-light'} shadow-xl`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300">
                  Quel est votre besoin ?
                </h3>
                <p className={`${textSecondary} text-xs sm:text-sm mt-1`}>
                  Cochez vos besoins pour configurer un message WhatsApp personnalisé prêt à l'envoi.
                </p>
              </div>
              {selectedNeeds.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedNeeds([])}
                  className="text-xs font-bold text-violet-400 hover:text-white underline self-start sm:self-auto"
                >
                  Réinitialiser ({selectedNeeds.length})
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {projectNeeds.map((need) => {
                const isChecked = selectedNeeds.includes(need.label);
                return (
                  <button
                    key={need.id}
                    type="button"
                    onClick={() => {
                      if (isChecked) {
                        setSelectedNeeds(selectedNeeds.filter(n => n !== need.label));
                      } else {
                        setSelectedNeeds([...selectedNeeds, need.label]);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between gap-2 transform hover:scale-[1.02] cursor-pointer ${
                      isChecked
                        ? 'bg-violet-600 border-violet-400 text-white shadow-lg shadow-violet-600/30'
                        : `${darkMode ? 'bg-slate-950/70 border-violet-500/20 text-slate-300 hover:border-violet-400' : 'bg-white border-slate-300 text-slate-700 hover:border-violet-500'}`
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-black uppercase tracking-wider">{need.label}</span>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                        isChecked ? 'bg-white text-violet-600 border-white font-bold' : 'border-slate-500'
                      }`}>
                        {isChecked ? '✓' : ''}
                      </span>
                    </div>
                    <span className={`text-[10px] ${isChecked ? 'text-violet-100' : 'text-slate-400'}`}>
                      {need.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-violet-500/15">
              <p className="text-xs text-slate-400">
                {selectedNeeds.length === 0
                  ? 'Sélectionnez un ou plusieurs types de prestations pour pré-remplir WhatsApp.'
                  : `Projet sélectionné : ${selectedNeeds.join(' + ')}`}
              </p>
              <a
                href={`https://wa.me/22899513224?text=${encodeURIComponent(
                  selectedNeeds.length > 0
                    ? `Bonjour Lezozo ! 👋\n\nJe suis intéressé(e) par vos services pour un projet de : *${selectedNeeds.join(' + ')}*.\n\nPouvez-vous me donner plus d'informations sur vos tarifs et délais ? 🙏`
                    : `Bonjour Lezozo ! 👋\n\nJ'ai visité votre portfolio et j'aimerais discuter d'un projet avec vous. Êtes-vous disponible pour un échange ? 🙏`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all transform hover:scale-105 active:scale-95"
              >
                <SiWhatsapp size={18} className="text-white" />
                <span>Ouvrir sur WhatsApp {selectedNeeds.length > 0 ? `(${selectedNeeds.length})` : ''}</span>
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-stretch min-w-0">
            <form onSubmit={handleSubmit} className="h-full min-w-0">
              <div className={`p-5 sm:p-8 rounded-3xl border ${borderColor} shadow-2xl h-full min-w-0 flex flex-col justify-between ${darkMode ? 'glass-card-dark' : 'glass-card-light'}`}>
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 font-bold text-base tracking-wide">Nom complet *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Votre nom"
                      required
                      className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'bg-slate-950 text-white placeholder-slate-500' : 'bg-white text-slate-900'} border ${darkMode ? 'border-violet-500/20 focus:border-violet-400' : 'border-slate-300 focus:border-violet-500'} focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 shadow-sm`}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-bold text-base tracking-wide">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre@email.com"
                      required
                      className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'bg-slate-950 text-white placeholder-slate-500' : 'bg-white text-slate-900'} border ${darkMode ? 'border-violet-500/20 focus:border-violet-400' : 'border-slate-300 focus:border-violet-500'} focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 shadow-sm`}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-bold text-base tracking-wide">Type de projet</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'} border ${darkMode ? 'border-violet-500/20 focus:border-violet-400' : 'border-slate-300 focus:border-violet-500'} focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 shadow-sm`}
                    >
                      <option value="">Sélectionnez un type</option>
                      <option value="uiux">UI/UX Design</option>
                      <option value="web">Développement Web / Mobile</option>
                      <option value="video">Vidéo &amp; Motion</option>
                      <option value="branding">Branding &amp; Identité</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-bold text-base tracking-wide">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      placeholder="Décrivez votre projet..."
                      required
                      className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'bg-slate-950 text-white placeholder-slate-500' : 'bg-white text-slate-900'} border ${darkMode ? 'border-violet-500/20 focus:border-violet-400' : 'border-slate-300 focus:border-violet-500'} focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 resize-none shadow-sm`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl font-black text-lg shadow-xl shadow-violet-700/30 hover:shadow-violet-700/50 transform hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 text-white border border-violet-400/20"
                >
                  <Mail size={22} /> Envoyer mon message
                </button>
              </div>
            </form>

            <div className="space-y-6 flex min-w-0 flex-col justify-between">
              {/* WhatsApp direct card */}
              <a
                href="https://wa.me/22899513224"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 sm:p-6 rounded-2xl border ${borderColor} shadow-xl flex-1 flex flex-col justify-center transition-all duration-300 transform hover:scale-[1.02] hover:border-emerald-500 group ${
                  darkMode ? 'glass-card-dark' : 'glass-card-light'
                }`}
              >
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                    <SiWhatsapp className="text-white" size={28} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-xl tracking-wide">WhatsApp</h3>
                      <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Direct</span>
                    </div>
                    <p className="text-emerald-400 font-bold text-base sm:text-lg select-all">+228 99 51 32 24</p>
                  </div>
                </div>
              </a>

              {/* Email card */}
              <div               className={`p-4 sm:p-6 rounded-2xl border ${borderColor} shadow-xl flex-1 flex flex-col justify-center ${
                darkMode ? 'glass-card-dark' : 'glass-card-light'
              }`}>
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-600/20">
                    <Mail className="text-white" size={28} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-xl tracking-wide">Email</h3>
                    <p className="break-all text-violet-400 font-bold text-base sm:text-lg select-all">zsundayabell@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Social icons */}
              <div               className={`p-4 sm:p-6 rounded-2xl border ${borderColor} shadow-xl flex-1 flex flex-col justify-center ${
                darkMode ? 'glass-card-dark' : 'glass-card-light'
              }`}>
                <h3 className="font-extrabold text-xl mb-4 tracking-wide">Connectons-nous</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: SiWhatsapp, href: 'https://wa.me/22899513224', label: 'WhatsApp', hoverClass: 'hover:bg-emerald-600' },
                    { icon: SiTiktok, href: 'https://www.tiktok.com/@le_zozodesign?_r=1&_t=ZG-992fHV0Fh8T', label: 'TikTok', hoverClass: 'hover:bg-violet-600' },
                    { icon: SiGithub, href: '#', label: 'Github', hoverClass: 'hover:bg-violet-600' },
                    { icon: FaLinkedin, href: '#', label: 'LinkedIn', hoverClass: 'hover:bg-violet-600' },
                    { icon: SiInstagram, href: '#', label: 'Instagram', hoverClass: 'hover:bg-violet-600' },
                  ].map((social, idx) => {
                    const SocialIcon = social.icon;
                    return (
                      <a
                        key={idx}
                        href={social.href}
                        target={social.href.startsWith('http') ? '_blank' : undefined}
                        rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        title={social.label}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${social.hoverClass} hover:text-white transition-all duration-300 transform hover:scale-110 border ${borderColor} shadow-lg ${
                          darkMode ? 'bg-slate-950 text-slate-300' : 'bg-white text-slate-700'
                        }`}
                      >
                        <SocialIcon size={22} />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className={`p-6 rounded-2xl border shadow-xl flex-1 flex flex-col justify-center ${
                darkMode ? 'border-violet-500/25 bg-gradient-to-br from-violet-950/20 to-indigo-950/20' : 'border-violet-200 bg-violet-50/50'
              }`}>
                <h3 className="font-extrabold text-xl mb-2 text-violet-400 tracking-wide">Conseil Pro</h3>
                <p className={`${textSecondary} leading-relaxed`}>
                  Plus votre brief est détaillé (objectifs, budget, délais), mieux je pourrai vous proposer une solution sur mesure !
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TICKER BAND 2 — DISCRET AVANT LE FOOTER ========== */}
      <div className={`overflow-hidden py-3 border-t ${darkMode ? 'border-violet-500/15 bg-black' : 'border-slate-200 bg-slate-900'}`}>
        <div className="ticker-track flex">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex-shrink-0 text-xs font-black uppercase tracking-[0.3em] mx-8 text-violet-400/40">
              LEZOZO DESIGN <Diamond className="mx-3 inline text-violet-500/30" size={12} aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-black' : 'bg-slate-900'} py-12 px-6 text-center border-t border-violet-500/20`}>
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('accueil')}>
            <img
              src="logo.png"
              alt="Lezozo Logo"
              className="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]"
            />
          </div>
          <p className="text-slate-400 text-sm">
            © 2025-2026 LezozoDesign. Lomé, Togo. Propulsé par la créativité et l'innovation.
          </p>
        </div>
      </footer>

      {/* Bouton Flottant WhatsApp (FAB) */}
      {favoritesOpen && (
        <aside
          className="fixed bottom-24 left-4 z-40 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-amber-300/25 bg-[#11100d]/70 p-4 text-slate-100 shadow-2xl shadow-black/40 backdrop-blur-xl"
          aria-label="Panier de favoris"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bebas text-xl tracking-wider text-amber-300">
              Mes projets favoris ({favoriteProjects.length})
            </h2>
            <button
              type="button"
              onClick={() => setFavoritesOpen(false)}
              className="rounded-full p-1 text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Fermer le panier de favoris"
            >
              <X size={18} />
            </button>
          </div>
          {favoriteProjects.length === 0 ? (
            <p className="py-3 text-sm text-slate-300">
              Appuie sur le cœur d’un projet pour l’ajouter ici.
            </p>
          ) : (
            <>
              <ul className="mb-4 max-h-52 space-y-2 overflow-y-auto">
                {favoriteProjects.map(project => (
                  <li key={project.title} className="flex items-start justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="text-sm leading-snug">{project.title}</span>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(project.title)}
                      className="shrink-0 rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-rose-300"
                      aria-label={`Retirer ${project.title} des favoris`}
                    >
                      <X size={15} />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/22899513224?text=${encodeURIComponent(favoritesMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/90 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-500"
                >
                  <SiWhatsapp size={17} /> WhatsApp
                </a>
                <a
                  href={`mailto:zsundayabell@gmail.com?subject=${encodeURIComponent(favoritesSubject)}&body=${encodeURIComponent(favoritesMessage)}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-amber-400/90 px-3 py-2.5 text-sm font-bold text-black transition hover:bg-amber-300"
                >
                  <Mail size={17} /> E-mail
                </a>
              </div>
            </>
          )}
        </aside>
      )}
      <button
        type="button"
        onClick={() => setFavoritesOpen(open => !open)}
        className="fixed bottom-6 left-6 z-40 flex h-14 items-center gap-2 rounded-full border border-amber-300/40 bg-[#11100d]/55 px-4 text-amber-100 shadow-xl shadow-black/30 backdrop-blur-lg transition hover:bg-[#11100d]/80 hover:scale-105"
        aria-label={`Ouvrir les favoris, ${favoriteProjects.length} projet${favoriteProjects.length > 1 ? 's' : ''}`}
        aria-expanded={favoritesOpen}
      >
        <ShoppingBag size={20} />
        <span className="font-bebas text-sm tracking-wider">Favoris</span>
        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-amber-400 px-1.5 text-xs font-bold text-black">
          {favoriteProjects.length}
        </span>
      </button>
      <a
        href="https://wa.me/22899513224"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-6 z-40 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20 group"
        title="Discuter directement sur WhatsApp"
        aria-label="Écrire sur WhatsApp"
      >
        <SiWhatsapp size={28} className="text-white drop-shadow" />
        <span className="absolute right-16 bg-slate-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl border border-slate-700">
          Discuter sur WhatsApp
        </span>
      </a>

      <style>{`
        * {
          scroll-behavior: smooth;
        }

        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(35px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes pulseSlow {
          0%, 100% { 
            opacity: 0.15; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.35; 
            transform: scale(1.04);
          }
        }

        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .ticker-track {
          animation: ticker 32s linear infinite;
          white-space: nowrap;
          min-width: max-content;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
        }

        .animate-fade-in-up.delay-200 { animation-delay: 0.2s; }
        .animate-fade-in-up.delay-400 { animation-delay: 0.4s; }
        .animate-fade-in-up.delay-600 { animation-delay: 0.6s; }
        .animate-fade-in-up.delay-800 { animation-delay: 0.8s; }
        .animate-fade-in-up.delay-1000 { animation-delay: 1s; }
        
        .animate-pulse-slow {
          animation: pulseSlow 5s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes marquee-scroll-rev {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .marquee-track {
          animation: marquee-scroll 35s linear infinite;
          white-space: nowrap;
          min-width: max-content;
        }

        .marquee-track-rev {
          animation: marquee-scroll-rev 28s linear infinite;
          white-space: nowrap;
          min-width: max-content;
        }

        .marquee-track:hover,
        .marquee-track-rev:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
