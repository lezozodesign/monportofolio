import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Mail, Code, Palette, Video, Layers, Github, Linkedin, Instagram, ExternalLink, ChevronLeft, ChevronRight, User, Zap, Globe, Search, Rocket, Sparkles, Award } from 'lucide-react';

// Composant SVG pour TikTok
const TikTokIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.02 1.72.01 2.58.01v3.9c-.84-.02-1.68-.01-2.52-.02-.13 1.87.52 3.73 1.83 5.07v3.97a7.923 7.923 0 0 1-5.11-2.12c-.19 2.27-1.89 4.29-4.18 4.79a7.927 7.927 0 0 1-8.15-4.47 7.915 7.915 0 0 1 1.94-8.87 7.9 7.9 0 0 1 6.84-1.63c.02-1.6.01-3.2.02-4.8 0-.02 0-.04.01-.06.75-.02 1.49-.01 2.24-.01zm-3.08 8.87a4.004 4.004 0 0 0-3.32 4.67 4.008 4.008 0 0 0 6.64 2.2c.43-.88.42-1.92.01-2.8-.02-2.13-.01-4.27-.02-6.4 0-.04.05-.07.08-.09.68.46 1.47.74 2.3.8v.03c.01.69.01 1.38.01 2.07-.36.02-.72.01-1.07.02-.72.48-1.28 1.2-1.57 2.03-.4.89-.34 1.91.13 2.76.01-.01.01-.02.02-.03-.02-.85-.01-1.7-.02-2.55v-.72H9.44z" />
  </svg>
);

// Composant SVG pour WhatsApp
const WhatsAppIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Composant de Carrousel réutilisable pour cartes de projet
function ProjectCarousel({ project, darkMode, onSelect }) {
  const [index, setIndex] = useState(0);

  // Garantit la présence d'un tableau d'images ou d'images génériques
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
              className="w-9 h-9 rounded-xl bg-slate-900/90 text-white flex items-center justify-center transition-all hover:bg-fuchsia-600 shadow-lg transform hover:scale-110 active:scale-95 border border-slate-800"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-xl bg-slate-900/90 text-white flex items-center justify-center transition-all hover:bg-fuchsia-600 shadow-lg transform hover:scale-110 active:scale-95 border border-slate-800"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Video Indicator */}
      {currentMedia.type === 'video' && (
        <div className="absolute top-3 right-3 bg-fuchsia-600 text-white px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-md">
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
              className={`h-2 rounded-full transition-all duration-300 ${index === idx ? 'w-5 bg-fuchsia-500 shadow-md shadow-fuchsia-500/50' : 'w-2 bg-white/50 hover:bg-white'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [lomeTime, setLomeTime] = useState('');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      } catch (e) {
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
    const sections = ['accueil', 'services', 'projets', 'skills', 'contact'];

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

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    });

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => revealObserver.observe(el));

    return () => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) spyObserver.unobserve(el);
      });
      revealElements.forEach(el => revealObserver.unobserve(el));
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Fonction de soumission du formulaire avec Formspree en JSON
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation basique
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
        alert('✅ Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
        // Réinitialiser le formulaire
        setFormData({
          name: '',
          email: '',
          projectType: '',
          message: ''
        });
      } else {
        if (data.errors) {
          const errorMessages = data.errors.map(err => err.message).join(', ');
          alert(`❌ Erreur: ${errorMessages}`);
        } else {
          alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
        }
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      alert('❌ Erreur de connexion. Vérifiez votre connexion internet et réessayez.');
    }
  };

  const services = [
    { icon: Layers, title: 'UI/UX Design', desc: 'Interfaces intuitives et expériences utilisateur exceptionnelles' },
    { icon: Code, title: 'Développement Web', desc: 'Sites web modernes, performants et optimisés pour toutes les plateformes.' },
    { icon: Video, title: 'Vidéo & Motion', desc: 'Animations dynamiques et contenus vidéo captivants pour les marques.' },
    { icon: Globe, title: 'Identité Numérique Africaine', desc: 'Conception de plateformes adaptées aux réalités du marché ouest-africain.' },
  ];

  const projects = [
    {
      category: 'Vidéo',
      title: 'YMCA Togo - Formation en Entrepreneuriat',
      desc: 'FORMATION EN ENTREPRENEURIAT PAR LE YCMA Togo repportage sur la formation Yao Hervé Mawunyo AMEGNISSE',
      video: 'ymca1.mp4',
      type: 'video',
      tags: ['After Effects', 'Animation', 'Direction Artistique']
    },
    {
      category: 'Vidéo',
      title: 'YMCA Togo - Formation en Entrepreneuriat',
      desc: 'FORMATION EN ENTREPRENEURIAT PAR LE YCMA Togo repportage sur la formation Marceline Abla NOUKOUNOU',
      video: 'ymca2.mp4',
      type: 'video',
      tags: ['After Effects', 'Animation', 'Direction Artistique']
    },
    {
      category: 'Vidéo',
      title: 'l\'Académie Digital Numérique (ADN)',
      desc: 'Remise de diplôme à la première promotion de l\'Académie Digital Numérique (ADN)',
      video: 'ADN.mp4',
      type: 'video',
      tags: ['After Effects', 'Animation', 'Direction Artistique']
    },
    {
      category: 'Visuel',
      title: 'TOGOVIANDE VISUEL ANNONCE PRIX',
      desc: 'Création d\'un visuel pour annoncer la nouvelle grille tarifaire de Togoviande',
      image: 'FLYERS-TOGOVIANDE-10CM14CM.png',
      type: 'image',
      tags: ['Affinity Designer', 'Logotype', 'Charte Graphique']
    },
    {
      category: 'Visuel',
      title: 'TOGOVIANDE VISUEL ETIQUETTE BOEUF',
      desc: 'Création d\'un visuel pour l\'étiquette de viande de bœuf de Togoviande',
      image: 'TOGOVIANDE-ETIQUETTE-BOEUF (8.57 x 12 cm).png',
      type: 'image',
      tags: ['Affinity Designer', 'Logotype', 'Charte Graphique']
    },
    {
      category: 'Visuel',
      title: 'TOGOVIANDE VISUEL ETIQUETTE CHEVRE',
      desc: 'Création d\'un visuel pour l\'étiquette de viande de chèvre de Togoviande',
      image: 'TOGOVIANDE-ETIQUETTE-CHEVRE (8.57 x 12 cm).png',
      type: 'image',
      tags: ['Affinity Designer', 'Logotype', 'Charte Graphique']
    },
    {
      category: 'Visuel',
      title: 'TOGOVIANDE VISUEL ETIQUETTE POULET GRAND FORMAT',
      desc: 'Création d\'un visuel pour l\'étiquette de viande de poule de Togoviande',
      image: 'TOGOVIANDE-ETIQUETTE-POULE-GRAND-FORMAT (8.57 x 12 cm).png',
      type: 'image',
      tags: ['Affinity Designer', 'Logotype', 'Charte Graphique']
    },
    {
      category: 'Visuel',
      title: 'TOGOVIANDE VISUEL ETIQUETTE POULET PETIT FORMAT',
      desc: 'Création d\'un visuel pour l\'étiquette de viande de poule de Togoviande',
      image: 'TOGOVIANDE-ETIQUETTE-POULE-PETIT-FORMAT (8.57 x 12 cm).png',
      type: 'image',
      tags: ['Affinity Designer', 'Logotype', 'Charte Graphique']
    },
    {
      category: 'Visuel',
      title: 'TOGOVIANDE VISUEL ETIQUETTE POULET MAXI FORMAT',
      desc: 'Création d\'un visuel pour l\'étiquette de viande de poule de Togoviande',
      image: 'TOGOVIANDE-ETIQUETTE-POULE-MAXI-FORMAT (8.57 x 12 cm).png',
      type: 'image',
      tags: ['Affinity Designer', 'Logotype', 'Charte Graphique']
    },
    {
      category: 'Visuel',
      title: 'TOGOVIANDE VISUEL ETIQUETTE SAUCISSE DE BOEUF',
      desc: 'Création d\'un visuel pour annoncer la nouvelle grille tarifaire de Togoviande',
      image: 'TOGOVIANDE-ETIQUETTE-SAUCISSE-DE BOEUF (8.57 x 12 cm).png',
      type: 'image',
      tags: ['Affinity Designer', 'Logotype', 'Charte Graphique']
    },
    {
      category: 'Visuel',
      title: 'PRAYER MOMENT',
      desc: 'Création d\'un visuel pour un événement de prière et de louange',
      image: 'Visuel évènementielle chrétienne.png',
      type: 'image',
      tags: ['Branding', 'Logotype', 'Charte Graphique']
    },
    {
      category: 'Vidéo',
      title: 'Vidéo Promotielle pour le centre de formation Sichem',
      desc: 'vidéo vlog promotielle qui parle d\'une école qui forme les jeunes a l\'élevage et l\'agriculture qui se localise à Zéglé(Togo)',
      image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop',
      video: 'sichem.mp4',
      type: 'video',
      tags: ['DaVinci Resolve', 'Animation', 'Direction Artistique']
    },
    {
      category: 'Vidéo',
      title: 'vidéo promotielle pour Chronos228',
      desc: 'vidéo promotielle pour une cave a vin nomée Chronos228 a Lomé(Togo)',
      image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop',
      video: 'chronos.mp4',
      type: 'video',
      tags: ['After Effects', 'Animation', 'Direction Artistique']
    },
    {
      category: 'Vidéo',
      title: 'Motion pour Fic-rc Togo',
      desc: 'Animations pour un projet de fic-rc togo dont j\'ai été appelé à réaliser la vidéo ',
      image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop',
      video: 'fic-rc.mp4',
      type: 'video',
      tags: ['Capcut', 'Canva', 'Animation']
    },
    {
      category: 'logo et brand board',
      title: 'DAYAL ENTREPRISE',
      desc: 'Création d\'une brand board et d\'une identité visuelle complète pour DAYAL ENTREPRISE.',
      image: 'Dayal.png',
      type: 'image',
      tags: ['Affinity Designer', 'Canva', 'Charte Graphique']
    },
    {
      category: 'logo et brand board',
      title: 'AGRILIFE',
      desc: 'Création d\'une brand board et d\'une identité visuelle complète pour AGRILIFE.',
      image: 'agrilife.png',
      type: 'image',
      tags: ['Affinity Designer', 'Canva', 'Charte Graphique']
    },
    {
      category: 'logo et brand board',
      title: 'PADNOVE Startup',
      desc: 'Création d\'une brand board et d\'une identité visuelle complète pour la startup PADNOVE.',
      image: 'PADNOVE.png',
      type: 'image',
      tags: ['Branding', 'Logotype', 'Charte Graphique']
    },
    {
      category: 'logo et brand board',
      title: 'AGRIPRO',
      desc: 'Création d\'une brand board et d\'une identité visuelle complète pour AGRI.',
      image: 'AGRIPRO.png',
      type: 'image',
      tags: ['Branding', 'Logotype', 'Charte Graphique']
    },
  ];

  const skills = [
    { name: 'Figma (UI/UX)', level: 95 },
    { name: 'React (Développement)', level: 85 },
    { name: 'Laravel (Développement)', level: 72 },
    { name: 'HTML/CSS/JS', level: 90 },
    { name: 'DaVinci Resolve (Vidéo)', level: 80 },
    { name: 'Design Systems', level: 92 },
    { name: 'Prototyping', level: 88 },
    { name: 'Canva', level: 96 },
    { name: 'Affinity Designer 2', level: 75 },
    { name: 'Affinity Publisher 2', level: 75 },
    { name: 'Capcut (Vidéo)', level: 82 },
  ];

  const categories = ['Tous', 'Visuel', 'Vidéo', 'logo et brand board', 'Site Web'];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'Tous' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const bgClass = darkMode ? 'bg-gray-950' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-300' : 'text-gray-700';
  const cardBg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const borderColor = darkMode ? 'border-fuchsia-900/60' : 'border-gray-200';

  // Ticker items
  const tickerItems = ['LEZOZO DESIGN', 'UI/UX', 'VIDÉO MOTION', 'DEV WEB', 'BRANDING', 'IDENTITÉ VISUELLE', 'TOGO 🇹🇬'];

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-500 scroll-smooth`}>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10"
          >
            <X size={28} className="text-white" />
          </button>
          <div className="max-w-6xl max-h-[90vh] w-full">
            {selectedImage.type === 'video' ? (
              <video
                src={selectedImage.video}
                controls
                autoPlay
                className="w-full h-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            ) : (
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            )}
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.desc}</p>
            </div>
          </div>
        </div>
      )}

      <div
        className="hidden md:block fixed w-6 h-6 rounded-full border-2 border-fuchsia-500 pointer-events-none z-50 transition-transform duration-100"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: darkMode ? 'difference' : 'normal'
        }}
      />

      <nav className={`fixed w-full ${bgClass} bg-opacity-95 backdrop-blur-md z-40 border-b ${darkMode ? 'border-fuchsia-900' : 'border-gray-100'} transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollToSection('accueil')}>
            <img
              src="logo-icon.png"
              alt="Lezozo Logo"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(217,70,239,0.5)]"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 tracking-wider leading-none">
                LEZOZO
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.28em] text-fuchsia-400/90 mt-0.5">
                DESIGN
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {[
              { id: 'accueil', label: 'Accueil', icon: User },
              { id: 'services', label: 'Services', icon: Code },
              { id: 'projets', label: 'Projets', icon: Layers },
              { id: 'skills', label: 'Compétences', icon: Zap },
              { id: 'contact', label: 'Contact', icon: Mail }
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${activeSection === item.id
                    ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/40'
                    : `${darkMode ? 'text-gray-400 hover:text-fuchsia-400 hover:bg-gray-800' : 'text-gray-700 hover:text-fuchsia-600 hover:bg-gray-100'}`
                    }`}
                >
                  <IconComponent size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${cardBg} hover:bg-fuchsia-600 hover:text-white transition-all duration-300 transform hover:scale-110 border ${borderColor}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2"
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
            className="absolute top-6 right-6 p-3 rounded-full hover:bg-fuchsia-600/20 text-fuchsia-400 transition-colors"
          >
            <X size={28} />
          </button>
          
          <div className="flex flex-col items-center gap-4 w-full max-w-xs">
            {[
              { id: 'accueil', label: 'Accueil', icon: User },
              { id: 'services', label: 'Services', icon: Code },
              { id: 'projets', label: 'Projets', icon: Layers },
              { id: 'skills', label: 'Compétences', icon: Zap },
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
                  className={`w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl text-lg font-black transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-xl shadow-fuchsia-600/40' 
                      : 'text-gray-300 hover:text-fuchsia-400 hover:bg-slate-900/50'
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

      {/* ========== HERO SECTION — SIGNATURE CYBER-LUXURY ========== */}
      <section id="accueil" className="min-h-[100svh] flex items-center relative pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden">
        {/* Subtle Ambient Radial Glows */}
        <div className={`absolute top-1/4 -left-20 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full opacity-25 blur-[100px] sm:blur-[140px] pointer-events-none transition-colors duration-500 ${darkMode ? 'bg-fuchsia-700' : 'bg-fuchsia-200'}`} />
        <div className={`absolute bottom-1/4 -right-20 w-[280px] sm:w-[550px] h-[280px] sm:h-[550px] rounded-full opacity-20 blur-[100px] sm:blur-[140px] pointer-events-none transition-colors duration-500 ${darkMode ? 'bg-purple-700' : 'bg-purple-200'}`} />

        {/* Decorative subtle ambient particles */}
        <div className="absolute top-1/4 left-6 w-2 h-2 rounded-full bg-fuchsia-400 opacity-60 animate-pulse-slow pointer-events-none hidden sm:block" />
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 rounded-full bg-purple-400 opacity-40 animate-pulse-slow pointer-events-none hidden sm:block" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-pink-400 opacity-50 animate-pulse-slow pointer-events-none hidden sm:block" style={{ animationDelay: '0.8s' }} />

        {/* Vertical subtle edge ribbon on large screens */}
        <div
          className="absolute right-0 top-0 h-full hidden xl:flex items-center justify-center pointer-events-none overflow-hidden opacity-30 select-none"
          style={{ width: '45px' }}
        >
          <span
            className={`text-[9px] font-black uppercase tracking-[0.45em] ${darkMode ? 'text-fuchsia-400' : 'text-gray-400'}`}
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              whiteSpace: 'nowrap',
            }}
          >
            DESIGNER · VIDEASTE · DEV WEB · TOGO 🇹🇬
          </span>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column: Content (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 animate-fade-in-up text-center lg:text-left">
            
            {/* Top pill & Greeting */}
            <div className="space-y-2.5 sm:space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] sm:text-xs font-black uppercase tracking-wider backdrop-blur-md transition-all shadow-sm ${darkMode ? 'bg-fuchsia-950/60 border-fuchsia-800/80 text-fuchsia-300' : 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700'}">
                <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-ping" />
                🇹🇬 WOEZON (Bienvenue)
              </div>
              
              <p className="text-base sm:text-lg md:text-xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-pink-500">
                Salut, je suis Lezozo
              </p>
            </div>

            {/* Giant Signature Typography */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight uppercase break-words" translate='no'>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 glow-text-fuchsia">
                DESIGNER, VIDEASTE
              </span>
              <br />
              <span className={`${darkMode ? 'text-white' : 'text-gray-950'}`}>
                &amp; DEV WEB
              </span>
            </h1>

            {/* Clean Description */}
            <p className={`${textSecondary} text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0`}>
              Basé à <strong className="text-fuchsia-400 font-extrabold">Lomé, Togo</strong>, je façonne des expériences numériques complètes : du design d'interface intuitif au développement web performant, en passant par la narration vidéo.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2 w-full">
              <button
                onClick={() => scrollToSection('projets')}
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 rounded-xl font-black text-white shadow-xl shadow-fuchsia-600/30 hover:shadow-fuchsia-600/50 transform hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 border border-fuchsia-400/30 text-sm sm:text-base"
              >
                Voir mes projets <ChevronRight size={18} />
              </button>
              
              <button
                onClick={() => scrollToSection('contact')}
                className={`w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-xl font-extrabold transition-all duration-300 transform hover:scale-[1.03] active:scale-95 border-2 flex items-center justify-center gap-2.5 backdrop-blur-md text-sm sm:text-base ${darkMode ? 'border-fuchsia-800/80 bg-slate-900/60 text-fuchsia-300 hover:text-white hover:border-fuchsia-500 hover:bg-fuchsia-950/50 shadow-lg shadow-fuchsia-950/40' : 'border-gray-300 bg-white text-gray-700 hover:border-fuchsia-500 hover:text-fuchsia-600 shadow-md'}`}
              >
                Me contacter <Mail size={18} />
              </button>
            </div>

            {/* Live Location, Time & Status Capsule */}
            <div className={`p-3 px-4 sm:px-5 rounded-2xl flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-3 sm:gap-x-5 border backdrop-blur-xl max-w-fit mx-auto lg:mx-0 ${darkMode ? 'bg-slate-900/70 border-slate-800/90 shadow-xl shadow-black/40' : 'bg-white/80 border-gray-200 shadow-lg'}`}>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Globe size={15} className="text-fuchsia-500 animate-pulse" />
                <span className="font-bold text-xs uppercase tracking-wide">Lomé, Togo</span>
              </div>

              <div className={`h-3.5 w-[1px] ${darkMode ? 'bg-slate-800' : 'bg-gray-300'} hidden sm:block`} />

              <div className="text-[11px] sm:text-xs font-mono font-bold tracking-wider">
                {lomeTime ? `Heure : ${lomeTime}` : 'Heure : 20:46'}
              </div>

              <div className={`h-3.5 w-[1px] ${darkMode ? 'bg-slate-800' : 'bg-gray-300'} hidden sm:block`} />

              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] sm:text-[11px] font-black text-emerald-400 uppercase tracking-widest">Disponible</span>
              </div>
            </div>

            {/* Interactive Service Pills */}
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
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold border cursor-pointer transition-all duration-300 hover:scale-105 hover:border-fuchsia-500 hover:text-fuchsia-400 ${darkMode ? 'bg-slate-900/50 border-slate-800/80 text-gray-400 shadow-sm' : 'bg-gray-100 border-gray-200 text-gray-700'}`}
                  >
                    <PillIcon size={12} className="text-fuchsia-500" />
                    {pill.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: High-End Portrait Showcase (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-in-up delay-300">
            <div className="relative w-full max-w-xs sm:max-w-sm px-2 sm:px-0">
              
              {/* Floating Stat Badge 1: Top-Left */}
              <div className={`absolute -left-2 sm:-left-6 top-6 sm:top-8 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-2xl border backdrop-blur-xl z-20 animate-float transition-all duration-300 hover:scale-110 ${darkMode ? 'bg-slate-900/90 border-fuchsia-600/40 shadow-fuchsia-950/60' : 'bg-white/95 border-gray-200 shadow-xl'}`}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                    <Zap size={15} className="fill-amber-400/30 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-base sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500 leading-none">+3 ans</p>
                    <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>d'expérience</p>
                  </div>
                </div>
              </div>

              {/* Floating Stat Badge 2: Bottom-Right */}
              <div className={`absolute -right-2 sm:-right-6 bottom-14 sm:bottom-16 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-2xl border backdrop-blur-xl z-20 animate-float-delayed transition-all duration-300 hover:scale-110 ${darkMode ? 'bg-slate-900/90 border-purple-600/40 shadow-purple-950/60' : 'bg-white/95 border-gray-200 shadow-xl'}`}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400 shadow-inner">
                    <Rocket size={15} className="fill-fuchsia-400/30 text-fuchsia-400" />
                  </div>
                  <div>
                    <p className="text-base sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 leading-none">+50</p>
                    <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>projets livrés</p>
                  </div>
                </div>
              </div>

              {/* Halo Glow behind Photo */}
              <div className={`absolute inset-0 rounded-3xl opacity-40 blur-3xl ${darkMode ? 'bg-gradient-to-tr from-fuchsia-600 via-pink-600 to-purple-600' : 'bg-fuchsia-200'} animate-pulse-slow pointer-events-none`} />

              {/* Luxury Frame Container */}
              <div className={`relative h-[26rem] sm:h-[32rem] md:h-[34rem] lg:h-[36rem] rounded-3xl overflow-hidden border-2 transition-all duration-500 group shadow-2xl ${darkMode ? 'border-fuchsia-500/30 bg-slate-950 shadow-fuchsia-950/50' : 'border-fuchsia-300 bg-white shadow-xl'}`}>
                <img
                  src="profile.jpg"
                  alt="Lezozo Portrait"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Soft gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                {/* Verified Identity Glass Card */}
                <div className={`absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-3 sm:p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${darkMode ? 'bg-slate-900/85 border-fuchsia-800/40 text-white' : 'bg-white/90 border-gray-200 text-gray-900'}`}>
                  <div className="flex items-center gap-1.5">
                    <p className="text-base sm:text-lg font-black tracking-wide" translate='no'>Lezozo</p>
                    <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-fuchsia-400 font-bold tracking-wider mt-0.5">Designer, Vidéaste &amp; Dev Web</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========== NEW: TICKER BAND 1 — fuchsia gradient ========== */}
      <div className="overflow-hidden py-3.5 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-700 relative z-10 shadow-lg shadow-fuchsia-900/40">
        <div className="ticker-track flex">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="flex-shrink-0 flex items-center text-white text-sm font-black uppercase tracking-[0.18em] mx-5"
            >
              {item}
              <span className="ml-5 text-white/40 text-xs">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ========== SERVICES SECTION ========== */}
      <section id="services" className="py-28 px-6 relative overflow-hidden">
        {/* Glow Mesh Background Highlights */}
        <div className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-15 blur-[140px] pointer-events-none transition-colors duration-500 ${darkMode ? 'bg-fuchsia-800' : 'bg-fuchsia-200'}`} />
        <div className={`absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-15 blur-[140px] pointer-events-none transition-colors duration-500 ${darkMode ? 'bg-purple-800' : 'bg-purple-200'}`} />

        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-fuchsia-500 block animate-pulse">
              Expertise &amp; Solutions
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 uppercase tracking-tight">
              Mes Services Clés
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-fuchsia-600 to-purple-600 mx-auto rounded-full shadow-lg shadow-fuchsia-500/50" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => {
              const ServiceIcon = service.icon;
              const indexFormatted = `0${idx + 1}`;
              return (
                <div
                  key={idx}
                  className={`p-8 rounded-3xl border ${borderColor} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-fuchsia-600/20 group cursor-pointer relative overflow-hidden flex flex-col justify-between ${darkMode ? 'glass-card-dark' : 'glass-card-light'}`}
                >
                  {/* Subtle top corner gradient accent */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-fuchsia-600/10 via-transparent to-transparent pointer-events-none" />

                  <div>
                    {/* Header: Icon + Number */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl shadow-fuchsia-600/30">
                        <ServiceIcon size={28} className="text-white" />
                      </div>
                      <span className={`text-2xl font-black font-mono select-none ${darkMode ? 'text-fuchsia-500/30 group-hover:text-fuchsia-400' : 'text-gray-300 group-hover:text-fuchsia-600'} transition-colors`}>
                        {indexFormatted}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-fuchsia-400 to-purple-400 transition-all leading-tight">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className={`${textSecondary} text-sm leading-relaxed`}>
                      {service.desc}
                    </p>
                  </div>

                  {/* Micro indicator line */}
                  <div className="mt-8 pt-4 border-t border-fuchsia-900/20 flex items-center justify-between text-xs font-bold text-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>En savoir plus</span>
                    <span>→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== PROJECTS SECTION — UNCHANGED ========== */}
      <section id="projets" className={`py-24 px-6 relative overflow-hidden ${darkMode ? 'bg-gray-950' : 'bg-gray-50'} border-t border-b ${darkMode ? 'border-fuchsia-950/60' : 'border-gray-200'} transition-colors duration-500`}>
        {/* Mesh Gradient Backgrounds */}
        <div className={`absolute top-1/3 right-0 w-[500px] h-[550px] rounded-full opacity-10 blur-[130px] pointer-events-none transition-colors duration-500 ${darkMode ? 'bg-fuchsia-800' : 'bg-fuchsia-100'}`} />
        <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-[120px] pointer-events-none transition-colors duration-500 ${darkMode ? 'bg-purple-800' : 'bg-purple-100'}`} />

        <div className="max-w-7xl mx-auto reveal-on-scroll">
          <div className="text-center relative max-w-4xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-fuchsia-500 block mb-3 animate-pulse">
              Portfolio &amp; Réalisations
            </span>
            <h2 className={`text-5xl sm:text-6.5xl lg:text-7.5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${darkMode ? 'from-white via-fuchsia-100 to-purple-400' : 'from-gray-950 via-fuchsia-900 to-purple-900'} mb-6 tracking-tight leading-none uppercase drop-shadow-sm`}>
              Projets Signés Lezozo
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-fuchsia-600 to-purple-600 mx-auto rounded-full shadow-lg shadow-fuchsia-500/50"></div>
          </div>

          <div className="mb-12 space-y-4">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Rechercher un projet, tag ou mot-clé..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-6 py-4 rounded-full ${darkMode ? 'bg-slate-900/60 text-white' : 'bg-white text-gray-900'} border-2 ${darkMode ? 'border-slate-800 focus:border-fuchsia-500' : 'border-gray-300 focus:border-fuchsia-500'} focus:outline-none focus:ring-4 focus:ring-fuchsia-500/20 transition-all duration-300 pl-14 text-lg shadow-lg backdrop-blur-md`}
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-fuchsia-500" size={24} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-fuchsia-500 hover:text-white rounded-full transition-all duration-300"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${selectedCategory === category
                    ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-600/40 border-2 border-fuchsia-400'
                    : `${darkMode ? 'bg-slate-900/60 text-gray-300 hover:text-fuchsia-400 border-2 border-slate-850' : 'bg-white text-gray-700 hover:text-fuchsia-600 border-2 border-gray-300'}`
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <p className={`text-center ${textSecondary} text-sm`}>
              {filteredProjects.length} projet{filteredProjects.length !== 1 ? 's' : ''} trouvé{filteredProjects.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filteredProjects.length === 0 ? (
            <div className={`rounded-2xl p-12 text-center border-2 border-dashed ${borderColor} ${darkMode ? 'glass-card-dark' : 'glass-card-light'}`}>
              <Search size={64} className="mx-auto mb-4 text-fuchsia-500 opacity-50" />
              <h3 className="text-2xl font-bold mb-2">Aucun projet trouvé</h3>
              <p className={textSecondary}>
                Essayez de modifier votre recherche ou sélectionnez une autre catégorie
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(project)}
                  className={`rounded-2xl overflow-hidden border ${borderColor} transition-all duration-500 group cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-fuchsia-600/30 transform hover:-translate-y-1.5 flex flex-col justify-between ${darkMode ? 'glass-card-dark' : 'glass-card-light'}`}
                >
                  {/* Media preview */}
                  <div className="h-64 relative overflow-hidden bg-black flex items-center justify-center">
                    {project.type === 'video' ? (
                      <>
                        <video
                          src={project.video}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                        />
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-rose-600 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-lg">
                          <Video size={13} /> VIDÉO
                        </div>
                      </>
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}

                    {/* Category tag */}
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-3 py-1 rounded-lg text-xs font-black tracking-wide shadow-lg uppercase">
                      {project.category}
                    </div>

                    {/* Hover overlay with CTA */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="flex flex-col items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {project.type === 'video' ? (
                          <>
                            <div className="w-14 h-14 rounded-full bg-fuchsia-600 text-white flex items-center justify-center shadow-xl">
                              <Video size={28} />
                            </div>
                            <span className="text-white font-black text-sm drop-shadow-md">Lire la vidéo</span>
                          </>
                        ) : (
                          <>
                            <div className="w-14 h-14 rounded-full bg-fuchsia-600 text-white flex items-center justify-center shadow-xl">
                              <ExternalLink size={26} />
                            </div>
                            <span className="text-white font-black text-sm drop-shadow-md">Agrandir le visuel</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className={`px-2.5 py-1 text-xs font-bold rounded-full border ${darkMode ? 'bg-fuchsia-950/70 text-fuchsia-300 border-fuchsia-800/80' : 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200'}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-black mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-fuchsia-400 to-purple-400 transition-all">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className={`${textSecondary} text-sm leading-relaxed mb-4`}>
                        {project.desc}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3 border-t border-fuchsia-900/30 flex items-center justify-between">
                      <span className="text-xs font-bold text-fuchsia-500 uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-500 flex items-center gap-1 group-hover:underline">
                        Découvrir <ChevronRight size={14} className="text-fuchsia-500" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========== SKILLS SECTION — UNCHANGED ========== */}
      <section id="skills" className="py-24 px-6 relative overflow-hidden">
        {/* Glow Mesh Background */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full opacity-[0.08] blur-[120px] pointer-events-none transition-colors duration-500 ${darkMode ? 'bg-fuchsia-800' : 'bg-fuchsia-200'}`} />

        <div className="max-w-4xl mx-auto reveal-on-scroll">
          <h2 className="text-5xl font-black text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-pink-700 to-purple-600">
            Mon Expertise Technique
          </h2>

          <div className={`p-8 sm:p-12 rounded-3xl border ${borderColor} ${darkMode ? 'glass-card-dark' : 'glass-card-light'} shadow-2xl`}>
            <div className="space-y-6">
              {skills.map((skill, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-extrabold text-lg tracking-wide">{skill.name}</span>
                    <span className="text-fuchsia-500 font-extrabold">{skill.level}%</span>
                  </div>
                  <div className={`h-4 ${darkMode ? 'bg-slate-950' : 'bg-slate-200'} rounded-full overflow-hidden shadow-inner`}>
                    <div
                      className="h-full bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full transition-all duration-1000 shadow-md shadow-fuchsia-500/30"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONTACT SECTION — UNCHANGED ========== */}
      <section id="contact" className={`py-24 px-6 relative overflow-hidden ${darkMode ? 'bg-gray-950' : 'bg-gray-50'} border-t ${darkMode ? 'border-fuchsia-950/60' : 'border-gray-200'} transition-colors duration-500`}>
        {/* Glow Mesh Background */}
        <div className={`absolute bottom-0 right-0 w-[500px] h-[550px] rounded-full opacity-[0.08] blur-[130px] pointer-events-none transition-colors duration-500 ${darkMode ? 'bg-fuchsia-800' : 'bg-fuchsia-100'}`} />

        <div className="max-w-5xl mx-auto reveal-on-scroll">
          <h2 className="text-5xl font-black text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-pink-700 to-purple-600">
            Lancez Votre Prochain Projet
          </h2>

          <div className="grid md:grid-cols-2 gap-10 items-stretch">
            <form onSubmit={handleSubmit} className="h-full">
              <div className={`p-8 rounded-3xl border ${borderColor} shadow-2xl h-full flex flex-col justify-between ${darkMode ? 'glass-card-dark' : 'glass-card-light'}`}>
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 font-bold text-lg tracking-wide">Nom complet *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Votre nom"
                      required
                      className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'bg-slate-950 text-white placeholder-gray-500' : 'bg-white text-gray-900'} border ${darkMode ? 'border-slate-800 focus:border-fuchsia-500' : 'border-gray-300 focus:border-fuchsia-500'} focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 transition-all duration-300 shadow-sm`}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-bold text-lg tracking-wide">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre@email.com"
                      required
                      className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'bg-slate-950 text-white placeholder-gray-500' : 'bg-white text-gray-900'} border ${darkMode ? 'border-slate-800 focus:border-fuchsia-500' : 'border-gray-300 focus:border-fuchsia-500'} focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 transition-all duration-300 shadow-sm`}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-bold text-lg tracking-wide">Type de projet</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-slate-800 focus:border-fuchsia-500' : 'border-gray-300 focus:border-fuchsia-500'} focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 transition-all duration-300 shadow-sm`}
                    >
                      <option value="">Sélectionnez un type</option>
                      <option value="uiux">UI/UX Design</option>
                      <option value="video">Vidéo &amp; Motion</option>
                      <option value="web">Développement Web</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-bold text-lg tracking-wide">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      placeholder="Décrivez votre projet..."
                      required
                      className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'bg-slate-950 text-white placeholder-gray-500' : 'bg-white text-gray-900'} border ${darkMode ? 'border-slate-800 focus:border-fuchsia-500' : 'border-gray-300 focus:border-fuchsia-500'} focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 transition-all duration-300 resize-none shadow-sm`}
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 rounded-xl font-black text-xl shadow-xl shadow-fuchsia-700/30 hover:shadow-fuchsia-700/50 transform hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 text-white border border-fuchsia-400/20"
                >
                  <Mail size={24} /> Envoyer la Proposition
                </button>
              </div>
            </form>

            <div className="space-y-6 flex flex-col justify-between">
              {/* WhatsApp direct card */}
              <a
                href="https://wa.me/22899513224"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-6 rounded-2xl border ${borderColor} shadow-xl flex-1 flex flex-col justify-center transition-all duration-300 transform hover:scale-[1.02] hover:border-emerald-500 group ${darkMode ? 'glass-card-dark' : 'glass-card-light'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                    <WhatsAppIcon className="text-white" size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-xl tracking-wide">WhatsApp</h3>
                      <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Direct</span>
                    </div>
                    <p className="text-emerald-400 font-bold text-lg select-all">+228 99 51 32 24</p>
                  </div>
                </div>
              </a>

              {/* Email card */}
              <div className={`p-6 rounded-2xl border ${borderColor} shadow-xl flex-1 flex flex-col justify-center ${darkMode ? 'glass-card-dark' : 'glass-card-light'}`}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-fuchsia-600/20">
                    <Mail className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xl tracking-wide">Email</h3>
                    <p className="text-fuchsia-500 font-bold text-lg select-all">zsundayabell@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Social icons */}
              <div className={`p-6 rounded-2xl border ${borderColor} shadow-xl flex-1 flex flex-col justify-center ${darkMode ? 'glass-card-dark' : 'glass-card-light'}`}>
                <h3 className="font-extrabold text-xl mb-4 tracking-wide">Connectons-nous</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: WhatsAppIcon, href: 'https://wa.me/22899513224', label: 'WhatsApp', isCustom: true, hoverClass: 'hover:bg-emerald-600' },
                    { icon: TikTokIcon, href: 'https://www.tiktok.com/@le_zozodesign?_r=1&_t=ZG-992fHV0Fh8T', label: 'TikTok', isCustom: true, hoverClass: 'hover:bg-fuchsia-600' },
                    { icon: Github, href: '#', label: 'Github', isCustom: false, hoverClass: 'hover:bg-fuchsia-600' },
                    { icon: Linkedin, href: '#', label: 'LinkedIn', isCustom: false, hoverClass: 'hover:bg-fuchsia-600' },
                    { icon: Instagram, href: '#', label: 'Instagram', isCustom: false, hoverClass: 'hover:bg-fuchsia-600' },
                  ].map((social, idx) => {
                    const SocialIcon = social.icon;
                    return (
                      <a
                        key={idx}
                        href={social.href}
                        target={social.href.startsWith('http') ? '_blank' : undefined}
                        rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        title={social.label}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${social.hoverClass} hover:text-white transition-all duration-300 transform hover:scale-110 border ${borderColor} shadow-lg ${darkMode ? 'bg-slate-950 text-gray-300' : 'bg-white text-gray-700'}`}
                      >
                        <SocialIcon size={22} />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className={`p-6 rounded-2xl border-2 shadow-xl flex-1 flex flex-col justify-center ${darkMode ? 'border-fuchsia-900/50 bg-gradient-to-br from-fuchsia-950/20 to-purple-950/20' : 'border-fuchsia-200 bg-fuchsia-50/50'}`}>
                <h3 className="font-extrabold text-xl mb-2 text-fuchsia-500 tracking-wide">Conseil Pro</h3>
                <p className={`${textSecondary} leading-relaxed`}>
                  Plus votre brief est détaillé (objectifs, budget, délais), mieux je pourrai vous proposer une solution sur mesure !
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== NEW: TICKER BAND 2 — before footer, dark/subtle ========== */}
      <div className={`overflow-hidden py-3 border-t ${darkMode ? 'border-fuchsia-950/40 bg-black' : 'border-gray-200 bg-gray-900'}`}>
        <div className="ticker-track flex">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex-shrink-0 text-xs font-black uppercase tracking-[0.3em] mx-8 text-fuchsia-900">
              LEZOZO DESIGN <span className="text-fuchsia-800 mx-3">◆</span>
            </span>
          ))}
        </div>
      </div>

      <footer className={`${darkMode ? 'bg-black' : 'bg-gray-900'} py-12 px-6 text-center border-t border-fuchsia-900/60`}>
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('accueil')}>
            <img
              src="logo-icon.png"
              alt="Lezozo Logo"
              className="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(217,70,239,0.4)]"
            />
            <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400 tracking-wider">
              LEZOZO DESIGN
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 LezozoDesign. Basé au Togo. Propulsé par la créativité.
          </p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap');

        * {
          scroll-behavior: smooth;
          font-family: 'Inter', sans-serif;
        }

        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(40px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes pulseSlow {
          0%, 100% { 
            opacity: 0.2; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.4; 
            transform: scale(1.05);
          }
        }

        /* ====== Ticker / Marquee animations ====== */
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes tickerReverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .ticker-track {
          animation: ticker 30s linear infinite;
          white-space: nowrap;
          min-width: max-content;
        }
        .ticker-track-reverse {
          animation: tickerReverse 25s linear infinite;
          white-space: nowrap;
          min-width: max-content;
          display: flex;
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
        .animate-fade-in-up.delay-1200 { animation-delay: 1.2s; }
        
        .animate-pulse-slow {
          animation: pulseSlow 5s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}