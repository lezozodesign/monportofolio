import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Mail, Code, Palette, Video, Layers, Github, Linkedin, Instagram, ExternalLink, ChevronRight, User, Zap, Globe, Search } from 'lucide-react';

// Composant SVG pour TikTok
const TikTokIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

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

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      desc: 'FORMATION EN ENTREPRENEURIAT PAR LE YCMA Togo repportage sur la formation Yao Hervé Mawunyo AMEGNISSE',
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
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const borderColor = darkMode ? 'border-fuchsia-800' : 'border-gray-200';

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
          <div className="flex items-center space-x-2">
            <Palette className="text-fuchsia-600" size={28} />
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-pink-700 to-purple-600">
              LEZOZO
            </span>
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

      {menuOpen && (
        <div className={`fixed inset-0 ${bgClass} z-30 pt-20 md:hidden`}>
          <div className="flex flex-col items-center gap-8 text-2xl">
            {['Accueil', 'Services', 'Projets', 'Compétences', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  scrollToSection(item.toLowerCase());
                  setMenuOpen(false);
                }}
                className="hover:text-fuchsia-600 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <section id="accueil" className="min-h-screen flex items-center relative pt-24 pb-12 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-12 items-center">

          <div className="space-y-6 lg:space-y-8 animate-fade-in-up delay-200">

            <p className={`text-xl font-bold text-fuchsia-600 animate-fade-in-up delay-400`}>
              Salut, je suis Lezozo
            </p>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight" translate='no'>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-pink-700 to-purple-600 drop-shadow-lg">
                DESIGNER, VIDEASTE
              </span>
              <br />
              & DEV WEB
            </h1>

            <p className={`${textSecondary} text-lg max-w-lg leading-relaxed pt-2`}>
              Basé à **Lomé, Togo**, je façonne des expériences numériques complètes : du design d'interface intuitif au développement web performant, en passant par la narration vidéo.
            </p>

            <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-up delay-800">
              <button
                onClick={() => scrollToSection('projets')}
                className="px-8 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 rounded-lg font-bold shadow-xl shadow-fuchsia-700/50 transform hover:scale-[1.03] transition-all duration-300 flex items-center gap-2 text-white border border-fuchsia-400"
              >
                Voir mes projets <ChevronRight size={20} />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`px-8 py-3 ${cardBg} rounded-lg font-bold hover:scale-[1.03] transform transition-all duration-300 border-2 ${darkMode ? 'border-fuchsia-500 text-fuchsia-400 hover:text-white hover:bg-fuchsia-600' : 'border-gray-300 text-gray-700 hover:border-fuchsia-500 hover:text-fuchsia-600'} flex items-center gap-2 shadow-lg`}
              >
                Me contacter <Mail size={20} />
              </button>
            </div>

            <p className={`${textSecondary} text-sm italic pt-4 flex items-center gap-2`}>
              <Globe size={18} className="text-fuchsia-500" /> Disponible pour des missions depuis le Togo et l'international.
            </p>
          </div>

          <div className="relative flex justify-center lg:justify-end animate-fade-in-up delay-600">
            <div className={`absolute w-[120%] h-[120%] -top-10 -right-10 rounded-full opacity-30 blur-3xl ${darkMode ? 'bg-fuchsia-800' : 'bg-fuchsia-200'} animate-pulse-slow`}></div>

            <div className="relative w-full max-w-sm h-[32rem] sm:h-[36rem] rounded-2xl overflow-hidden shadow-2xl shadow-fuchsia-900/50 group transition-all duration-500 transform hover:scale-[1.02]">

              <img
                src="IN.png"
                alt="LezozoDesign Photo"
                className="w-full h-full object-cover"
              />

              <div className={`absolute bottom-4 left-4 p-3 rounded-xl backdrop-blur-sm ${darkMode ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-gray-900'} shadow-lg border border-fuchsia-400`}>
                <p className="text-xl mx-auto font-bold animate-fade-in-up delay-400" translate='no'>Lezozo</p>
                <p className="text-xs text-fuchsia-500">Designer & Dev Web</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-pink-700 to-purple-600 animate-fade-in">
            Mes Services Clés
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => {
              const ServiceIcon = service.icon;
              return (
                <div
                  key={idx}
                  className={`${cardBg} p-8 rounded-2xl border ${borderColor} hover:border-fuchsia-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-fuchsia-700/40 group cursor-pointer transform`}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                    <ServiceIcon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-fuchsia-400 to-purple-400 transition-all">{service.title}</h3>
                  <p className={textSecondary}>{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projets" className={`py-20 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} border-t border-b ${darkMode ? 'border-fuchsia-900' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-orange-400 animate-fade-in">
            Études de Cas Récents
          </h2>

          <div className="mb-8 space-y-4">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Rechercher un projet, tag ou mot-clé..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-6 py-4 rounded-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border-2 ${darkMode ? 'border-gray-700 focus:border-fuchsia-500' : 'border-gray-300 focus:border-fuchsia-500'} focus:outline-none focus:ring-4 focus:ring-fuchsia-500/20 transition-all duration-300 pl-14 text-lg shadow-lg`}
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
                      : `${darkMode ? 'bg-gray-800 text-gray-300 hover:text-fuchsia-400 border-2 border-gray-700' : 'bg-white text-gray-700 hover:text-fuchsia-600 border-2 border-gray-300'}`
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
            <div className={`${cardBg} rounded-2xl p-12 text-center border-2 border-dashed ${borderColor}`}>
              <Search size={64} className="mx-auto mb-4 text-fuchsia-500 opacity-50" />
              <h3 className="text-2xl font-bold mb-2">Aucun projet trouvé</h3>
              <p className={textSecondary}>
                Essayez de modifier votre recherche ou sélectionnez une autre catégorie
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects.map((project, idx) => (
                <div
                  key={idx}
                  className={`${cardBg} rounded-2xl overflow-hidden border ${borderColor} hover:border-fuchsia-500 hover:shadow-2xl hover:shadow-fuchsia-700/60 transform hover:scale-[1.02] transition-all duration-500 group cursor-pointer`}
                >
                  <div
                    className="h-56 relative overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(project)}
                  >
                    {project.type === 'video' ? (
                      <>
                        <video
                          src={project.video}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                        />
                        <div className="absolute top-3 right-3 bg-fuchsia-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Video size={14} /> VIDÉO
                        </div>
                      </>
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex flex-col items-center gap-2">
                        {project.type === 'video' ? (
                          <>
                            <Video size={48} className="text-white drop-shadow-2xl" />
                            <span className="text-white font-bold text-sm">Cliquez pour lire</span>
                          </>
                        ) : (
                          <>
                            <ExternalLink size={48} className="text-white drop-shadow-2xl" />
                            <span className="text-white font-bold text-sm">Cliquez pour agrandir</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag, tagIdx) => (
                        <span key={tagIdx} className={`px-3 py-1 text-xs font-bold rounded-full ${darkMode ? 'bg-fuchsia-900/50 text-fuchsia-300 border border-fuchsia-700' : 'bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-300'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-fuchsia-500 font-bold">{project.category}</span>
                    <h3 className="text-2xl font-black mt-2 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-fuchsia-400 to-purple-400 transition-all">{project.title}</h3>
                    <p className={`${textSecondary} leading-relaxed`}>{project.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="skills" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-pink-700 to-purple-600 animate-fade-in">
            Mon Expertise Technique
          </h2>

          <div className="space-y-6">
            {skills.map((skill, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold text-lg">{skill.name}</span>
                  <span className="text-fuchsia-600 font-bold">{skill.level}%</span>
                </div>
                <div className={`h-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-full overflow-hidden shadow-inner`}>
                  <div
                    className="h-full bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full transition-all duration-1000 shadow-lg shadow-fuchsia-500/50"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={`py-20 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} border-t ${darkMode ? 'border-fuchsia-900' : 'border-gray-200'}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-pink-700 to-purple-600 animate-fade-in">
            Lancez Votre Prochain Projet
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit}>
              <div className={`${cardBg} p-8 rounded-2xl border ${borderColor} shadow-xl ${darkMode ? 'shadow-fuchsia-900/40' : 'shadow-gray-300/40'}`}>
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 font-bold text-lg">Nom complet *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Votre nom"
                      required
                      className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 transition-all duration-300`}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-bold text-lg">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre@email.com"
                      required
                      className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 transition-all duration-300`}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-bold text-lg">Type de projet</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 transition-all duration-300`}
                    >
                      <option value="">Sélectionnez un type</option>
                      <option value="uiux">UI/UX Design</option>
                      <option value="video">Vidéo & Motion</option>
                      <option value="web">Développement Web</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-bold text-lg">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      placeholder="Décrivez votre projet..."
                      required
                      className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 transition-all duration-300 resize-none`}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 rounded-lg font-black text-xl shadow-xl shadow-fuchsia-700/50 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 text-white border border-fuchsia-400"
                  >
                    <Mail size={24} /> Envoyer la Proposition
                  </button>
                </div>
              </div>
            </form>

            <div className="space-y-6">
              <div className={`${cardBg} p-6 rounded-2xl border ${borderColor} hover:border-fuchsia-500 transition-all duration-300 shadow-xl`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Mail className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Email</h3>
                    <p className="text-fuchsia-600">zsundayabell@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className={`${cardBg} p-6 rounded-2xl border ${borderColor} hover:border-fuchsia-500 transition-all duration-300 shadow-xl`}>
                <h3 className="font-bold text-xl mb-4">Connectons-nous</h3>
                <div className="flex gap-4">
                  {[
                    { icon: Github, href: '#', label: 'Github', isCustom: false },
                    { icon: Linkedin, href: '#', label: 'LinkedIn', isCustom: false },
                    { icon: Instagram, href: '#', label: 'Instagram', isCustom: false },
                    { icon: TikTokIcon, href: '#', label: 'TikTok', isCustom: true },
                  ].map((social, idx) => {
                    const SocialIcon = social.icon;
                    return (
                      <a
                        key={idx}
                        href={social.href}
                        title={social.label}
                        className={`w-14 h-14 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg flex items-center justify-center hover:bg-fuchsia-600 hover:text-white transition-all duration-300 transform hover:scale-110 border ${borderColor} shadow-lg`}
                      >
                        {social.isCustom ? <SocialIcon size={24} /> : <SocialIcon size={24} />}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className={`${cardBg} p-6 rounded-2xl border-2 ${darkMode ? 'border-fuchsia-700 bg-gradient-to-br from-fuchsia-900/20 to-purple-900/20' : 'border-fuchsia-300 bg-fuchsia-50'} shadow-xl`}>
                <h3 className="font-bold text-xl mb-3 text-fuchsia-600">Conseil Pro</h3>
                <p className={textSecondary}>
                  Plus votre brief est détaillé (objectifs, budget, délais), mieux je pourrai vous proposer une solution sur mesure !
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={`${darkMode ? 'bg-black' : 'bg-gray-900'} py-8 px-6 text-center border-t border-fuchsia-900`}>
        <p className="text-gray-400">
          © 2025 LezozoDesign. Basé au Togo. Propulsé par la créativité.
        </p>
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