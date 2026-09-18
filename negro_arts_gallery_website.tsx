import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowUpRight, Calendar, MapPin, Clock, ChevronRight, 
  Send, Sparkles, Filter, Eye, Award, Users, Palette, CheckCircle2,
  Mail, Phone, Compass, Info, Heart, Share2, ExternalLink
} from 'lucide-react';

const ARTWORKS_DATA = [
  {
    id: 'art-1',
    title: 'Echoes of Home',
    artist: 'Amara Okafor',
    year: '2025',
    medium: 'Oil and Acrylic on Canvas',
    dimensions: '180 x 140 cm',
    category: 'Painting',
    featured: true,
    size: 'large', // editorial sizing layout
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
    description: 'An evocative exploration of ancestral memory and modern domestic spaces in Lagos, blending traditional indigo textile motifs with contemporary figurative brushwork.'
  },
  {
    id: 'art-2',
    title: 'Fragments of Memory',
    artist: 'Kelechi Nwosu',
    year: '2024',
    medium: 'Mixed Media & Reclaimed Copper',
    dimensions: '120 x 120 cm',
    category: 'Mixed Media',
    featured: true,
    size: 'tall',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=900&auto=format&fit=crop',
    description: 'Constructed from salvaged metal and woven jute from Eastern Nigeria, this piece examines the durability of cultural oral history across generations.'
  },
  {
    id: 'art-3',
    title: 'Red Earth',
    artist: 'Tariq Mensah',
    year: '2025',
    medium: 'Terracotta, Gold Leaf & Wood',
    dimensions: '95 x 60 x 45 cm',
    category: 'Sculptures',
    featured: true,
    size: 'small',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=900&auto=format&fit=crop',
    description: 'Drawing from ancient West African terracotta traditions, Mensah merges raw earth clay with delicate 24k leaf accents representing spiritual resilience.'
  },
  {
    id: 'art-4',
    title: 'Inheritance',
    artist: 'Amina Bello',
    year: '2026',
    medium: 'Digital Render on Metallic Dibond',
    dimensions: '150 x 100 cm',
    category: 'Digital',
    featured: true,
    size: 'wide',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop',
    description: 'A futuristic visual narrative depicting Northern Nigerian architecture illuminated by bioluminescent indigenous flora.'
  },
  {
    id: 'art-5',
    title: 'Between Worlds',
    artist: 'Amara Okafor',
    year: '2024',
    medium: 'Pigment and Charcoal on Linen',
    dimensions: '200 x 160 cm',
    category: 'Painting',
    featured: false,
    size: 'tall',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=900&auto=format&fit=crop',
    description: 'Depicting the dual realities of urban West African youth negotiating tradition amidst globalized digital environments.'
  },
  {
    id: 'art-6',
    title: 'The Last Market',
    artist: 'Kelechi Nwosu',
    year: '2025',
    medium: 'Collage & Found Textiles',
    dimensions: '140 x 180 cm',
    category: 'Mixed Media',
    featured: false,
    size: 'large',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=1200&auto=format&fit=crop',
    description: 'A vibrant tapestry composed of vintage Ankara fabrics, capturing the rhythmic chaos and economic vitality of Balogun Market.'
  },
  {
    id: 'art-7',
    title: 'Ọ̀rọ̀',
    artist: 'Tariq Mensah',
    year: '2025',
    medium: 'Bronze & Ebony Wood',
    dimensions: '110 x 40 x 40 cm',
    category: 'Sculptures',
    featured: false,
    size: 'small',
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=900&auto=format&fit=crop',
    description: 'A tribute to royal Yoruba metal casting, featuring fluid sculptural curves that echo ancient oral performance art.'
  },
  {
    id: 'art-8',
    title: 'Unspoken',
    artist: 'Amina Bello',
    year: '2026',
    medium: 'Generative AI & Sound Resonance',
    dimensions: 'Interactive Installation',
    category: 'Digital',
    featured: false,
    size: 'wide',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    description: 'An interactive digital piece that translates whispered West African proverbs into real-time evolving abstract light forms.'
  }
];

const ARTISTS_DATA = [
  {
    name: 'Amara Okafor',
    role: 'Contemporary Painter',
    origin: 'Lagos, Nigeria',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    bio: 'Amara investigates female sovereignty, matrilineal history, and Yoruba mythology through layered figurative oil painting.',
    notable: 'Exhibited at Venice Biennale 2024'
  },
  {
    name: 'Kelechi Nwosu',
    role: 'Mixed Media Artist',
    origin: 'Enugu, Nigeria',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    bio: 'Kelechi repurposed discarded industrial brass and local woven fibers to reconstruct lost pre-colonial architectural motifs.',
    notable: 'Winner of Dak’Art Grand Prize'
  },
  {
    name: 'Amina Bello',
    role: 'Digital & New Media',
    origin: 'Abuja, Nigeria',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    bio: 'Pioneering new media artist combining spatial computing, generative algorithms, and Hausa geometric symbolism.',
    notable: 'Featured in Art Basel Digital 2025'
  },
  {
    name: 'Tariq Mensah',
    role: 'Sculptor',
    origin: 'Accra, Ghana',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    bio: 'Master sculptor bridging traditional Akan wood carving techniques with modern industrial terracotta molding.',
    notable: 'Permanent collection at Smithsonian'
  }
];

const EXHIBITIONS_UPCOMING = [
  {
    id: 'ex-2',
    title: 'Fluid Belonging',
    curator: 'Dr. Folake Adebayo',
    dates: 'Nov 12, 2026 – Jan 20, 2027',
    tagline: 'Navigating Pan-African migration through contemporary textiles.',
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'ex-3',
    title: 'Modern Benin Bronzes: Reclaiming Narrative',
    curator: 'Oluwaseun King',
    dates: 'Feb 05, 2027 – Apr 18, 2027',
    tagline: 'A dialogue between restored historical bronze masters and young contemporary sculptors.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop'
  }
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Handle Navbar Background Shift on Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      triggerToast("Thank you. You are now subscribed to Negro Arts Gallery updates.");
      setEmailInput('');
    }
  };

  const filteredArtworks = activeCategory === 'All' 
    ? ARTWORKS_DATA 
    : ARTWORKS_DATA.filter(item => item.category === activeCategory);

  return (
    <div className="bg-[#F9F6F0] text-[#121212] font-sans antialiased selection:bg-[#C85A32] selection:text-white min-h-screen flex flex-col relative overflow-x-hidden">
      
      {/* Dynamic Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121212] text-[#F9F6F0] px-6 py-4 rounded-none border-l-4 border-[#D4AF37] shadow-2xl flex items-center gap-3 animate-fade-in">
          <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <p className="text-sm font-medium tracking-wide">{toastMessage}</p>
        </div>
      )}

      {/* Developer Portfolio Demo Badge */}
      <div className="bg-[#121212] text-[#F9F6F0] py-1.5 px-4 text-center text-xs tracking-widest uppercase font-medium flex items-center justify-center gap-2 border-b border-[#3E2723]/40 z-50">
        <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-pulse"></span>
        <span>Portfolio Concept Demo by <strong>Eloghosa</strong> — Web Development Showpiece</span>
      </div>

      {}
      <header className={`fixed top-7 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'bg-[#121212]/90 backdrop-blur-md text-[#F9F6F0] py-4 shadow-lg border-b border-[#3E2723]/30' : 'bg-transparent text-[#F9F6F0] py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" className="group flex flex-col">
            <span className="font-serif text-xl md:text-2xl tracking-[0.25em] font-bold text-[#F9F6F0] group-hover:text-[#D4AF37] transition-colors">
              NEGRO ARTS
            </span>
            <span className="text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] font-semibold -mt-1">
              GALLERY • LAGOS
            </span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs tracking-[0.2em] uppercase font-medium">
            <a href="#home" className="hover:text-[#D4AF37] transition-colors">Home</a>
            <a href="#collection" className="hover:text-[#D4AF37] transition-colors">Collection</a>
            <a href="#artists" className="hover:text-[#D4AF37] transition-colors">Artists</a>
            <a href="#exhibitions" className="hover:text-[#D4AF37] transition-colors">Exhibitions</a>
            <a href="#about" className="hover:text-[#D4AF37] transition-colors">About</a>
            <a href="#visit" className="hover:text-[#D4AF37] transition-colors">Visit</a>
          </nav>

          {/* Quick CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setVisitModalOpen(true)}
              className="hidden lg:inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase px-5 py-2.5 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#121212] transition-all duration-300 font-semibold"
            >
              <span>Book Visit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#F9F6F0] hover:text-[#D4AF37] transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#121212] text-[#F9F6F0] border-b border-[#3E2723] px-6 py-8 space-y-6 animate-fade-in">
            <nav className="flex flex-col space-y-4 text-sm tracking-[0.2em] uppercase font-medium">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37] py-1 border-b border-[#3E2723]/30">Home</a>
              <a href="#collection" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37] py-1 border-b border-[#3E2723]/30">Collection</a>
              <a href="#artists" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37] py-1 border-b border-[#3E2723]/30">Artists</a>
              <a href="#exhibitions" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37] py-1 border-b border-[#3E2723]/30">Exhibitions</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37] py-1 border-b border-[#3E2723]/30">About</a>
              <a href="#visit" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4AF37] py-1 border-b border-[#3E2723]/30">Visit</a>
            </nav>
            <button 
              onClick={() => { setMobileMenuOpen(false); setVisitModalOpen(true); }}
              className="w-full text-center text-xs tracking-[0.2em] uppercase py-3 border border-[#D4AF37] text-[#D4AF37] font-semibold"
            >
              Plan Your Visit
            </button>
          </div>
        )}
      </header>

      {}
      <section id="home" className="relative min-h-screen bg-[#121212] text-[#F9F6F0] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Visual Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero African Contemporary Artwork" 
            className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-10000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/80 via-transparent to-[#121212]/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12 w-full">
          <div className="max-w-3xl space-y-6">
            
            {/* Label */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-[#3E2723]/60 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32]"></span>
              CONTEMPORARY AFRICAN ART
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight">
              African Art. <br />
              <span className="italic font-light text-[#D4AF37]">Living Stories.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#F9F6F0]/80 max-w-xl font-light leading-relaxed tracking-wide">
              Discover contemporary voices shaping the past, present, and future of African creative expression through bold textures, ancestral narratives, and modern media.
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <a 
                href="#collection" 
                className="w-full sm:w-auto text-center px-8 py-4 bg-[#C85A32] text-[#F9F6F0] hover:bg-[#b04b28] transition-colors text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Explore Collection</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a 
                href="#visit" 
                className="w-full sm:w-auto text-center px-8 py-4 border border-[#F9F6F0]/40 text-[#F9F6F0] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors text-xs tracking-[0.2em] uppercase font-semibold"
              >
                Visit the Gallery
              </a>
            </div>
          </div>

          {/* Hero Feature Sub-Card */}
          <div className="hidden lg:block w-72 bg-[#121212]/80 backdrop-blur-md border border-[#3E2723] p-5 space-y-4 shadow-2xl">
            <div className="relative h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop" 
                alt="Spotlight piece" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-2 left-2 bg-[#121212] text-[#D4AF37] text-[9px] uppercase tracking-widest px-2 py-1 font-bold">
                Featured Piece
              </span>
            </div>
            <div>
              <h3 className="font-serif text-lg text-[#F9F6F0]">Fragments of Memory</h3>
              <p className="text-xs text-[#F9F6F0]/60">Kelechi Nwosu • 2024</p>
            </div>
            <a href="#collection" className="text-[10px] tracking-[0.2em] uppercase text-[#C85A32] font-semibold flex items-center gap-1 hover:text-[#D4AF37] transition-colors">
              <span>View details</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#F9F6F0]/60">Scroll</span>
          <div className="w-5 h-8 border border-[#F9F6F0]/40 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-[#D4AF37] rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {}
      <section id="collection" className="py-24 bg-[#F9F6F0] text-[#121212]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#121212]/10 gap-6">
            <div className="space-y-3">
              <span className="text-xs tracking-[0.3em] uppercase text-[#C85A32] font-bold">Curated Works</span>
              <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight">Featured Works</h2>
              <p className="text-sm text-[#121212]/70 max-w-lg font-light">
                A selection of contemporary works exploring identity, memory, culture, and African creative expression.
              </p>
            </div>

            {/* Category Filter Tags */}
            <div className="flex flex-wrap gap-2 text-xs tracking-wider uppercase">
              {['All', 'Painting', 'Mixed Media', 'Sculptures', 'Digital'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 transition-all ${activeCategory === cat ? 'bg-[#121212] text-[#F9F6F0] font-semibold' : 'bg-white text-[#121212]/70 border border-[#121212]/10 hover:border-[#121212]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Asymmetric Editorial Artwork Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtworks.map((art, idx) => (
              <div 
                key={art.id}
                onClick={() => setSelectedArtwork(art)}
                className={`group cursor-pointer bg-white border border-[#121212]/5 hover:border-[#C85A32] transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl ${idx % 3 === 0 ? 'lg:col-span-1' : ''}`}
              >
                <div className="relative overflow-hidden bg-[#121212]/5 aspect-[4/5]">
                  <img 
                    src={art.image} 
                    alt={art.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle Dark Hover Overlay */}
                  <div className="absolute inset-0 bg-[#121212]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-[#F9F6F0] text-[#121212] text-xs uppercase tracking-[0.2em] px-4 py-2.5 font-semibold flex items-center gap-2 shadow-md">
                      <Eye className="w-4 h-4 text-[#C85A32]" />
                      <span>View Artwork</span>
                    </span>
                  </div>

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-[#121212]/80 backdrop-blur-sm text-[#F9F6F0] text-[10px] tracking-widest uppercase px-2.5 py-1 font-medium">
                    {art.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 bg-white flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-serif text-xl group-hover:text-[#C85A32] transition-colors">{art.title}</h3>
                      <span className="text-xs text-[#121212]/50 font-serif italic">{art.year}</span>
                    </div>
                    <p className="text-xs text-[#121212]/70 font-medium mb-3">{art.artist}</p>
                    <p className="text-xs text-[#121212]/60 line-clamp-2 leading-relaxed font-light">{art.description}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#121212]/5 flex justify-between items-center text-[11px] text-[#121212]/50 font-mono">
                    <span>{art.medium}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C85A32] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Collection CTA */}
          <div className="mt-16 text-center">
            <button 
              onClick={() => triggerToast("Loading complete digital gallery archives...")}
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-[#F9F6F0] transition-all text-xs tracking-[0.2em] uppercase font-bold"
            >
              <span>View Full Collection</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {}
      <section id="artists" className="py-24 bg-[#121212] text-[#F9F6F0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="mb-16 space-y-3 text-center md:text-left">
            <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] font-bold">Creative Visionaries</span>
            <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight">Represented Artists</h2>
            <p className="text-sm text-[#F9F6F0]/70 max-w-xl font-light">
              Introducing contemporary African masters and emerging voices pushing stylistic and thematic boundaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ARTISTS_DATA.map((artist, i) => (
              <div 
                key={i} 
                className="group bg-[#1E1E1E] border border-[#3E2723]/50 p-6 flex flex-col justify-between hover:border-[#D4AF37] transition-all duration-500"
              >
                <div>
                  <div className="relative mb-6 overflow-hidden aspect-square">
                    <img 
                      src={artist.image} 
                      alt={artist.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60"></div>
                  </div>

                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold block mb-1">
                    {artist.origin}
                  </span>
                  <h3 className="font-serif text-2xl text-[#F9F6F0] mb-1">{artist.name}</h3>
                  <p className="text-xs text-[#C85A32] font-medium mb-3">{artist.role}</p>
                  <p className="text-xs text-[#F9F6F0]/70 leading-relaxed font-light mb-4">{artist.bio}</p>
                </div>

                <div className="pt-4 border-t border-[#3E2723]/40 text-[11px] text-[#D4AF37]/80 flex items-center gap-1.5 italic font-serif">
                  <Award className="w-3.5 h-3.5 shrink-0 text-[#D4AF37]" />
                  <span>{artist.notable}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {}
      <section id="exhibitions" className="py-24 bg-[#F9F6F0] text-[#121212]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="mb-12 space-y-3">
            <span className="text-xs tracking-[0.3em] uppercase text-[#C85A32] font-bold">Curated Programming</span>
            <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight">Current Exhibition</h2>
          </div>

          {/* Featured Exhibition Feature Banner */}
          <div className="bg-[#121212] text-[#F9F6F0] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl mb-16">
            <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-full">
              <img 
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop" 
                alt="ROOTS REIMAGINED Exhibition" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent lg:hidden"></div>
            </div>

            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#D4AF37] font-semibold">
                  <Calendar className="w-4 h-4 text-[#C85A32]" />
                  <span>OCT 15 – DEC 30, 2026</span>
                </div>

                <h3 className="font-serif text-3xl md:text-4xl text-[#F9F6F0]">ROOTS / REIMAGINED</h3>
                
                <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-medium">
                  Main Gallery Hall • Victoria Island, Lagos
                </p>

                <p className="text-sm text-[#F9F6F0]/80 leading-relaxed font-light">
                  An exploration of how contemporary African artists reinterpret heritage, memory, and identity through new visual languages. Featuring works by 12 leading sculptors, painters, and digital pioneers.
                </p>
              </div>

              <div className="pt-6 border-t border-[#3E2723] flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setVisitModalOpen(true)}
                  className="px-6 py-3.5 bg-[#C85A32] text-[#F9F6F0] hover:bg-[#b04b28] transition-colors text-xs tracking-[0.2em] uppercase font-semibold text-center"
                >
                  Reserve Exhibition Pass
                </button>
                <button 
                  onClick={() => triggerToast("Exhibition catalog PDF downloading...")}
                  className="px-6 py-3.5 border border-[#F9F6F0]/30 hover:border-[#D4AF37] text-[#F9F6F0] transition-colors text-xs tracking-[0.2em] uppercase font-semibold text-center"
                >
                  Download Catalog
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Exhibitions Row */}
          <div>
            <h3 className="font-serif text-2xl mb-8 flex items-center gap-3">
              <span>Upcoming Exhibitions</span>
              <div className="h-px bg-[#121212]/10 flex-grow"></div>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {EXHIBITIONS_UPCOMING.map((ex) => (
                <div key={ex.id} className="bg-white border border-[#121212]/10 p-6 flex flex-col sm:flex-row gap-6 items-center">
                  <img 
                    src={ex.image} 
                    alt={ex.title} 
                    className="w-full sm:w-32 h-32 object-cover shrink-0"
                  />
                  <div className="space-y-2 text-center sm:text-left">
                    <span className="text-[10px] tracking-widest uppercase text-[#C85A32] font-semibold">{ex.dates}</span>
                    <h4 className="font-serif text-xl">{ex.title}</h4>
                    <p className="text-xs text-[#121212]/60 font-light">{ex.tagline}</p>
                    <p className="text-[11px] text-[#121212]/40 italic">Curated by {ex.curator}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {}
      <section id="about" className="py-24 bg-[#121212] text-[#F9F6F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] font-bold">Our Philosophy</span>
              
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
                "Art is more than what we see. <br />
                <span className="italic text-[#D4AF37]">It is how we remember."</span>
              </h2>

              <p className="text-sm text-[#F9F6F0]/80 leading-relaxed font-light">
                Negro Arts Gallery exists to create a sanctuary where African artists can tell their stories, challenge historic perspectives, preserve cultural memory, and connect with global patrons and institutions.
              </p>

              <p className="text-sm text-[#F9F6F0]/80 leading-relaxed font-light">
                Founded in Victoria Island, Lagos, our space serves as a bridge between age-old traditions and contemporary artistic innovation, fostering dialogues that transcend borders.
              </p>

              {/* Interactive Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[#3E2723]/60">
                <div>
                  <span className="font-serif text-3xl sm:text-4xl text-[#C85A32] block font-bold">25+</span>
                  <span className="text-[11px] uppercase tracking-widest text-[#F9F6F0]/60">Artists Represented</span>
                </div>
                <div>
                  <span className="font-serif text-3xl sm:text-4xl text-[#D4AF37] block font-bold">100+</span>
                  <span className="text-[11px] uppercase tracking-widest text-[#F9F6F0]/60">Works Exhibited</span>
                </div>
                <div>
                  <span className="font-serif text-3xl sm:text-4xl text-[#C85A32] block font-bold">10+</span>
                  <span className="text-[11px] uppercase tracking-widest text-[#F9F6F0]/60">Curated Shows</span>
                </div>
                <div>
                  <span className="font-serif text-3xl sm:text-4xl text-[#D4AF37] block font-bold">5</span>
                  <span className="text-[11px] uppercase tracking-widest text-[#F9F6F0]/60">Years Active</span>
                </div>
              </div>
            </div>

            {/* Gallery Atmosphere Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative border-8 border-[#1E1E1E] shadow-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=900&auto=format&fit=crop" 
                  alt="Gallery Interior Space" 
                  className="w-full h-[450px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#3E2723] text-[#F9F6F0] p-6 hidden sm:block max-w-xs border-l-4 border-[#C85A32]">
                <p className="text-xs italic font-serif leading-relaxed">
                  "Creating space for the stories that shape our collective African legacy."
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {}
      <section id="visit" className="py-24 bg-[#F9F6F0] text-[#121212]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Visit Details */}
            <div className="lg:col-span-6 space-y-8 flex flex-col justify-between">
              <div>
                <span className="text-xs tracking-[0.3em] uppercase text-[#C85A32] font-bold">Plan Your Experience</span>
                <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight mt-2 mb-6">Visit Negro Arts Gallery</h2>
                <p className="text-sm text-[#121212]/70 leading-relaxed font-light mb-8">
                  We welcome art enthusiasts, collectors, students, and curious minds to experience contemporary African art in our tranquil Lagos space.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-[#C85A32] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold text-[#121212]">Location</h4>
                      <p className="text-sm text-[#121212]/80">14 Ahmadu Bello Way, Victoria Island, Lagos, Nigeria</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-[#C85A32] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold text-[#121212]">Opening Hours</h4>
                      <div className="text-sm text-[#121212]/80 space-y-1 mt-1">
                        <p>Tuesday – Saturday: 10:00 AM – 6:00 PM</p>
                        <p>Sunday: 12:00 PM – 5:00 PM</p>
                        <p className="text-xs text-[#C85A32] italic">Mondays: Closed for private collection mounting</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-[#C85A32] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold text-[#121212]">Contact</h4>
                      <p className="text-sm text-[#121212]/80">curator@negroartsgallery.com | +234 (0) 803 000 9988</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => setVisitModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-[#121212] text-[#F9F6F0] hover:bg-[#C85A32] transition-colors text-xs tracking-[0.2em] uppercase font-bold text-center"
                >
                  Book Private Guided Tour
                </button>
              </div>
            </div>

            {/* Interactive Map Visual Placeholder */}
            <div className="lg:col-span-6 bg-[#121212] text-[#F9F6F0] p-8 flex flex-col justify-between relative min-h-[380px] overflow-hidden border border-[#3E2723]">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-[#D4AF37] font-semibold">Interactive Map View</span>
                  <h3 className="font-serif text-2xl">Victoria Island Precinct</h3>
                </div>
                <Compass className="w-8 h-8 text-[#C85A32] animate-spin-slow" />
              </div>

              <div className="relative z-10 bg-[#1E1E1E]/90 backdrop-blur-md p-6 border border-[#3E2723] space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span>Gallery Open Today</span>
                </div>
                <p className="text-xs text-[#F9F6F0]/70">
                  Located 10 minutes from Eko Hotels & Suites with dedicated collector parking and wheelchair access.
                </p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#C85A32] font-bold hover:text-[#D4AF37] transition-colors pt-2"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {}
      <section className="py-20 bg-[#3E2723] text-[#F9F6F0] border-t border-[#D4AF37]/20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] font-bold">Gallery Journal</span>
          <h2 className="font-serif text-3xl md:text-4xl font-normal">Stay close to the art.</h2>
          <p className="text-sm text-[#F9F6F0]/80 font-light max-w-lg mx-auto">
            Receive exclusive exhibition announcements, new collection drops, artist interviews, and invitations to private previews.
          </p>

          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
            <input 
              type="email" 
              required
              placeholder="Your email address" 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="px-5 py-3.5 bg-[#121212]/60 border border-[#F9F6F0]/20 text-[#F9F6F0] placeholder-[#F9F6F0]/40 text-xs tracking-wider flex-grow focus:outline-none focus:border-[#D4AF37]"
            />
            <button 
              type="submit"
              className="px-8 py-3.5 bg-[#C85A32] text-[#F9F6F0] hover:bg-[#b04b28] transition-colors text-xs tracking-[0.2em] uppercase font-bold shrink-0 flex items-center justify-center gap-2"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </section>

      {}
      <footer className="bg-[#121212] text-[#F9F6F0] py-16 border-t border-[#3E2723]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-2xl tracking-[0.2em] font-bold block text-[#F9F6F0]">NEGRO ARTS GALLERY</span>
            <p className="text-xs text-[#F9F6F0]/60 max-w-sm leading-relaxed font-light">
              Celebrating contemporary African creativity, culture, and artistic expression through curated exhibitions and global advocacy.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Navigation</h4>
            <ul className="space-y-2 text-xs text-[#F9F6F0]/70 font-light">
              <li><a href="#collection" className="hover:text-[#D4AF37] transition-colors">Collection Archives</a></li>
              <li><a href="#artists" className="hover:text-[#D4AF37] transition-colors">Represented Artists</a></li>
              <li><a href="#exhibitions" className="hover:text-[#D4AF37] transition-colors">Current Exhibition</a></li>
              <li><a href="#about" className="hover:text-[#D4AF37] transition-colors">Our Philosophy</a></li>
              <li><a href="#visit" className="hover:text-[#D4AF37] transition-colors">Visit & Location</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Connect</h4>
            <p className="text-xs text-[#F9F6F0]/70 font-light">Follow our journey across cultural centers and digital spaces.</p>
            <div className="flex space-x-4 pt-2 text-[#F9F6F0]/80">
              <a href="#instagram" onClick={(e) => { e.preventDefault(); triggerToast("Instagram profile concept loaded"); }} className="hover:text-[#C85A32] transition-colors text-xs uppercase tracking-wider font-semibold">Instagram</a>
              <a href="#facebook" onClick={(e) => { e.preventDefault(); triggerToast("Facebook page concept loaded"); }} className="hover:text-[#C85A32] transition-colors text-xs uppercase tracking-wider font-semibold">Facebook</a>
              <a href="#x" onClick={(e) => { e.preventDefault(); triggerToast("X (Twitter) profile concept loaded"); }} className="hover:text-[#C85A32] transition-colors text-xs uppercase tracking-wider font-semibold">X (Twitter)</a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-[#3E2723]/60 flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#F9F6F0]/40 gap-4">
          <p>© 2026 Negro Arts Gallery. All rights reserved.</p>
          <p className="text-[#D4AF37]">Portfolio Concept Designed & Built by <strong>Eloghosa</strong></p>
        </div>
      </footer>

      {}
      {selectedArtwork && (
        <div className="fixed inset-0 z-50 bg-[#121212]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 overflow-y-auto animate-fade-in">
          <div className="bg-[#1E1E1E] border border-[#3E2723] max-w-4xl w-full text-[#F9F6F0] relative overflow-hidden shadow-2xl my-auto">
            
            <button 
              onClick={() => setSelectedArtwork(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-[#121212] text-[#F9F6F0] hover:text-[#C85A32] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative bg-[#121212] min-h-[300px] md:min-h-[450px]">
                <img 
                  src={selectedArtwork.image} 
                  alt={selectedArtwork.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-[#D4AF37] font-semibold block mb-1">
                      {selectedArtwork.category} • {selectedArtwork.year}
                    </span>
                    <h3 className="font-serif text-3xl text-[#F9F6F0]">{selectedArtwork.title}</h3>
                    <p className="text-xs text-[#C85A32] font-semibold">{selectedArtwork.artist}</p>
                  </div>

                  <div className="space-y-1 text-xs text-[#F9F6F0]/70 border-y border-[#3E2723] py-3">
                    <p><strong className="text-[#F9F6F0]">Medium:</strong> {selectedArtwork.medium}</p>
                    <p><strong className="text-[#F9F6F0]">Dimensions:</strong> {selectedArtwork.dimensions}</p>
                  </div>

                  <p className="text-xs text-[#F9F6F0]/80 leading-relaxed font-light">
                    {selectedArtwork.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#3E2723] flex gap-3">
                  <button 
                    onClick={() => {
                      setSelectedArtwork(null);
                      triggerToast(`Inquiry sent for "${selectedArtwork.title}". Our curator will contact you.`);
                    }}
                    className="flex-grow py-3 bg-[#C85A32] text-[#F9F6F0] text-xs uppercase tracking-widest font-bold hover:bg-[#b04b28] transition-colors"
                  >
                    Inquire for Acquisition
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {}
      {visitModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#121212]/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1E1E1E] border border-[#3E2723] max-w-md w-full p-8 text-[#F9F6F0] relative shadow-2xl">
            <button 
              onClick={() => setVisitModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#F9F6F0]/60 hover:text-[#F9F6F0]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4 mb-6">
              <span className="text-xs tracking-widest uppercase text-[#D4AF37] font-semibold">Reserve Pass</span>
              <h3 className="font-serif text-2xl">Plan Gallery Visit</h3>
              <p className="text-xs text-[#F9F6F0]/70 font-light">
                Schedule your private tour or general admission entry at Negro Arts Gallery, Lagos.
              </p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setVisitModalOpen(false);
              triggerToast("Visit reservation submitted. Confirmation sent to email.");
            }} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#F9F6F0]/60 block mb-1">Full Name</label>
                <input required type="text" placeholder="e.g. Chimamanda Adichie" className="w-full px-4 py-2.5 bg-[#121212] border border-[#3E2723] text-xs text-[#F9F6F0] focus:outline-none focus:border-[#D4AF37]" />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#F9F6F0]/60 block mb-1">Email Address</label>
                <input required type="email" placeholder="name@domain.com" className="w-full px-4 py-2.5 bg-[#121212] border border-[#3E2723] text-xs text-[#F9F6F0] focus:outline-none focus:border-[#D4AF37]" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#F9F6F0]/60 block mb-1">Preferred Date</label>
                  <input required type="date" className="w-full px-3 py-2.5 bg-[#121212] border border-[#3E2723] text-xs text-[#F9F6F0] focus:outline-none focus:border-[#D4AF37]" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#F9F6F0]/60 block mb-1">Visitors</label>
                  <select className="w-full px-3 py-2.5 bg-[#121212] border border-[#3E2723] text-xs text-[#F9F6F0] focus:outline-none focus:border-[#D4AF37]">
                    <option>1 Person</option>
                    <option>2 People</option>
                    <option>Group (5+)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full py-3.5 bg-[#C85A32] text-[#F9F6F0] text-xs uppercase tracking-widest font-bold hover:bg-[#b04b28] transition-colors mt-2">
                Confirm Reservation
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}