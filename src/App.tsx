import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Ticket, Film, Calendar, MapPin, ArrowRight, Volume2, MonitorPlay, Users, CheckCircle2, ChevronDown, Popcorn, Instagram, Twitter, HelpCircle, X, Gift, Sparkles, QrCode } from 'lucide-react';

const movies = [
  {
    id: 1,
    title: "SCARFACE & HEAT",
    subtitle: "Ein Tag, zwei Gangster-Epen",
    date: "11. Apr 2026",
    time: "20:00 - 24:00",
    location: "Köln (Große Leinwand)",
    poster: "https://s1.directupload.eu/images/260313/bi33cjz5.webp",
    bg: "https://s1.directupload.eu/images/260313/bi33cjz5.webp",
    color: "from-orange-900/40"
  },
  {
    id: 2,
    title: "GHOSTBUSTERS 1 & 2",
    subtitle: "Die Kult-Doppelvorstellung",
    date: "11. Apr 2026",
    time: "20:00 - 24:00",
    location: "Köln (Große Leinwand)",
    poster: "https://s1.directupload.eu/images/260313/53wlyte8.webp",
    bg: "https://s1.directupload.eu/images/260313/53wlyte8.webp",
    color: "from-blue-900/40"
  },
  {
    id: 3,
    title: "HORROR KLASSIKER",
    subtitle: "Zwei Schocker am Stück",
    date: "11. Apr 2026",
    time: "20:00 - 24:00",
    location: "Köln (Große Leinwand)",
    poster: "https://s1.directupload.eu/images/260313/2wrpgq4c.webp",
    bg: "https://s1.directupload.eu/images/260313/2wrpgq4c.webp",
    color: "from-red-900/40"
  }
];

// --- Premium Spotlight Card Component ---
function SpotlightCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => { setIsFocused(true); setOpacity(1); };
  const handleBlur = () => { setIsFocused(false); setOpacity(0); };
  const handleMouseEnter = () => { setOpacity(1); };
  const handleMouseLeave = () => { setOpacity(0); };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 transition-colors hover:bg-[#111] group"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(212,175,55,.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 group-hover:bg-[var(--color-gold)]/10 transition-colors duration-500">
          <Icon className="w-8 h-8 text-[var(--color-gold)] drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] group-hover:scale-110 transition-transform duration-500" />
        </div>
        <h3 className="text-xl font-bold mb-4 uppercase tracking-widest text-white/90">{title}</h3>
        <p className="text-white/50 leading-relaxed text-lg font-light">{desc}</p>
      </div>
    </div>
  );
}

// --- New Components ---
function ParallaxBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 3000], [0, -800]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -1200]);
  const y3 = useTransform(scrollY, [0, 3000], [0, -500]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute top-[20%] left-[5%] opacity-[0.03] text-[var(--color-gold)]"><Film size={150} /></motion.div>
      <motion.div style={{ y: y2 }} className="absolute top-[60%] right-[10%] opacity-[0.03] text-[var(--color-neon-blue)]"><Popcorn size={120} /></motion.div>
      <motion.div style={{ y: y3 }} className="absolute top-[80%] left-[15%] opacity-[0.03] text-[var(--color-neon-red)]"><Ticket size={100} /></motion.div>
    </div>
  );
}

function LiveCountdown() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  
  useEffect(() => {
    // Target date: April 11, 2026, 20:00:00
    const targetDate = new Date('2026-04-11T20:00:00+02:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference / (1000 * 60 * 60)) % 24),
          m: Math.floor((difference / 1000 / 60) % 60),
          s: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center md:items-end gap-4 bg-black/60 p-6 sm:p-8 rounded-2xl border-2 border-[var(--color-neon-red)]/40 shadow-[0_0_50px_rgba(255,0,60,0.2)] backdrop-blur-md relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[var(--color-neon-red)]/5 blur-3xl"></div>
      
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-3 h-3 rounded-full bg-[var(--color-neon-red)] animate-ping shadow-[0_0_10px_rgba(255,0,60,1)]"></div>
        <div className="text-[var(--color-neon-red)] font-black tracking-[0.2em] uppercase text-sm sm:text-lg drop-shadow-[0_0_8px_rgba(255,0,60,0.8)]">
          Nächstes Event: 11. April 2026
        </div>
      </div>
      
      <div className="flex gap-3 sm:gap-5 relative z-10">
        {[
          { label: 'Tage', value: timeLeft.d },
          { label: 'Std', value: timeLeft.h },
          { label: 'Min', value: timeLeft.m },
          { label: 'Sek', value: timeLeft.s }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="relative w-16 h-20 sm:w-24 sm:h-28 bg-[#0a0a0a] border-2 border-[var(--color-neon-red)]/60 rounded-xl flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(255,0,60,0.4)] group hover:border-[var(--color-neon-red)] hover:shadow-[0_0_40px_rgba(255,0,60,0.8)] transition-all duration-300">
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.6)_50%)] bg-[length:100%_4px] z-10 pointer-events-none"></div>
              
              <span className="relative z-20 text-4xl sm:text-6xl font-mono font-black text-white drop-shadow-[0_0_15px_rgba(255,0,60,1)]">
                {item.value.toString().padStart(2, '0')}
              </span>
              
              {/* Glare effect */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
            </div>
            <span className="text-xs sm:text-sm text-[var(--color-neon-red)] mt-3 uppercase tracking-[0.2em] font-bold">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const reviews = [
  "Beste Filmnacht meines Lebens. Der Sound war unfassbar!",
  "Endlich Terminator 2 auf der großen Leinwand gesehen. Gänsehaut.",
  "Die Stimmung im Saal war magisch. Nächstes Mal wieder!"
];

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentReview = reviews[index];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentReview.substring(0, text.length + 1));
        if (text === currentReview) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(currentReview.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % reviews.length);
        }
      }
    }, isDeleting ? 30 : 80);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
    <div className="h-32 flex flex-col items-center justify-center px-4 text-center">
      <p className="text-sm text-white/40 uppercase tracking-widest mb-4">Was unsere Gäste sagen</p>
      <p className="text-xl md:text-3xl font-mono text-[var(--color-neon-blue)]">
        "{text}<span className="cursor-blink">_</span>"
      </p>
    </div>
  );
}

function FilmQuiz() {
  const [step, setStep] = useState(0);
  const [won, setWon] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  
  const questions = [
    { q: "In welchem Jahr erschien 'Jurassic Park'?", a: ["1991", "1993", "1995"], correct: 1 },
    { q: "Wie heißt der Computer in '2001: A Space Odyssey'?", a: ["HAL 9000", "Skynet", "Mother"], correct: 0 },
    { q: "Welche Pille nimmt Neo in 'Matrix'?", a: ["Die Blaue", "Die Rote", "Die Grüne"], correct: 1 }
  ];

  const handleAnswer = (idx: number) => {
    if (isWrong) return; // Prevent clicking while animating
    
    if (idx === questions[step].correct) {
      if (step === questions.length - 1) setWon(true);
      else setStep(s => s + 1);
    } else {
      setIsWrong(true);
      setTimeout(() => {
        setStep(0);
        setIsWrong(false);
      }, 800);
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden h-full flex flex-col justify-center">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-pink)]"></div>
      
      {!won ? (
        <motion.div
          animate={isWrong ? { 
            x: [-10, 10, -10, 10, -5, 5, 0], 
            scale: [1, 0.95, 1],
            color: ["#ffffff", "#ff003c", "#ffffff"]
          } : {}}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <HelpCircle className={`w-12 h-12 mx-auto mb-6 transition-colors duration-300 ${isWrong ? 'text-[var(--color-neon-red)]' : 'text-[var(--color-neon-pink)]'}`} />
          <p className="text-white/60 mb-8">Beantworte 3 Fragen richtig und gewinne einen 20% Rabattcode!</p>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg font-medium mb-6">{questions[step].q}</p>
              <div className="grid grid-cols-1 gap-3">
                {questions[step].a.map((ans, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleAnswer(i)} 
                    className={`py-3 px-4 border rounded-xl transition-colors ${
                      isWrong 
                        ? 'border-[var(--color-neon-red)] bg-[var(--color-neon-red)]/10 text-[var(--color-neon-red)]' 
                        : 'border-white/20 hover:bg-white/10'
                    }`}
                  >
                    {ans}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="mt-6 text-sm text-white/40">
            {isWrong ? <span className="text-[var(--color-neon-red)]">Falsch! Zurück zum Start...</span> : `Frage ${step + 1} von 3`}
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Gift className="w-16 h-16 text-[var(--color-gold)] mx-auto mb-4" />
          <p className="text-xl mb-2">Glückwunsch! Dein Code:</p>
          <div className="text-3xl font-mono font-bold text-[var(--color-gold)] tracking-widest bg-white/5 py-4 rounded-xl border border-[var(--color-gold)]/30">RETRO20</div>
        </motion.div>
      )}
    </div>
  );
}

const socialPosts = [
  { user: "@kino_fan89", platform: "twitter", text: "Die Atmosphäre gestern war der Wahnsinn! #MGORetro" },
  { user: "@sarah_loves_movies", platform: "instagram", text: "Popcorn, Neonlicht und Pulp Fiction. Perfekter Abend. 🍿✨ #MGORetro" },
  { user: "@retro_gamer_cgn", platform: "twitter", text: "Wann startet der Vorverkauf für Blade Runner?! Take my money! 💸 #MGORetro" },
  { user: "@cineast_max", platform: "instagram", text: "Endlich echte 70mm Projektion. Ein Traum wird wahr. 🎥 #MGORetro" }
];

function SocialWall() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {socialPosts.map((post, i) => (
        <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500"></div>
            <div>
              <div className="font-bold text-sm">{post.user}</div>
              <div className="text-xs text-white/40 flex items-center gap-1">
                {post.platform === 'twitter' ? <Twitter size={12} /> : <Instagram size={12} />}
                {post.platform}
              </div>
            </div>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">{post.text}</p>
        </div>
      ))}
    </div>
  );
}

function TicketModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState<'buy' | 'tearing' | 'nft'>('buy');

  useEffect(() => {
    if (isOpen) {
      setStep('buy');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBuy = () => {
    setStep('tearing');
    setTimeout(() => setStep('nft'), 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md">
            {step === 'buy' && (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#111] border border-white/10 p-8 rounded-3xl text-center shadow-2xl">
                <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white"><X /></button>
                <Ticket className="w-16 h-16 text-[var(--color-gold)] mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-2">Digitales Ticket</h3>
                <p className="text-white/60 mb-8">Sichere dir dein digitales Ticket zur Erinnerung und erhalte zusätzlich 10% Rabatt auf Snacks & Drinks beim nächsten Event.</p>
                <button onClick={handleBuy} className="w-full py-4 bg-[var(--color-gold)] text-black font-bold rounded-full hover:bg-yellow-500 transition-colors">
                  Kostenlos sichern
                </button>
              </motion.div>
            )}
            {step === 'tearing' && (
              <div className="relative h-64 flex flex-col items-center justify-center">
                <div className="ticket-tear-top bg-[var(--color-gold)] w-64 h-24 rounded-t-xl border-b-2 border-dashed border-black flex items-center justify-center text-black font-bold text-xl">ADMIT ONE</div>
                <div className="ticket-tear-bottom bg-[var(--color-gold)] w-64 h-24 rounded-b-xl flex items-center justify-center text-black font-bold text-xl">RETRO KLASSIKER</div>
              </div>
            )}
            {step === 'nft' && (
              <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="perspective-1000">
                <div className="nft-card relative w-72 h-auto mx-auto bg-gradient-to-br from-[#1a1a1a] to-black rounded-2xl border border-[var(--color-gold)] p-6 shadow-[0_0_30px_rgba(212,175,55,0.2)] flex flex-col items-center justify-center text-center">
                  <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white"><X /></button>
                  <Gift className="w-12 h-12 text-[var(--color-gold)] mb-4" />
                  <h4 className="text-xl font-bold text-[var(--color-gold)] mb-2">10% Rabatt Gutschein</h4>
                  <p className="text-xs text-white/60 mb-6">Gültig für Popcorn & Drinks am 11. April 2026</p>
                  <div className="w-full bg-white rounded-xl mb-6 p-4 flex flex-col items-center justify-center border border-white/10">
                    <QrCode className="w-24 h-24 text-black" />
                    <span className="text-black font-mono text-xs mt-2 font-bold tracking-widest">RETRO-10-PCT</span>
                  </div>
                  <p className="text-xs text-white/40 mb-4">Mache einen Screenshot von diesem Ticket und zeige ihn an der Kasse vor.</p>
                  <button onClick={onClose} className="px-6 py-2 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors">
                    Schließen
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

function MenuOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-4 text-white/50 hover:text-white hover:rotate-90 transition-all duration-300"
          >
            <X size={40} />
          </button>
          
          <nav className="flex flex-col items-center gap-8">
            {['Programm', 'Erlebnis', 'Quiz', 'FAQ'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={onClose}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className="text-4xl md:text-6xl font-bold uppercase tracking-widest text-white/70 hover:text-[var(--color-gold)] hover:scale-110 transition-all duration-300"
              >
                {item}
              </motion.a>
            ))}
          </nav>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-12 flex gap-8 text-white/40"
          >
            <a href="#" className="hover:text-[var(--color-neon-blue)] transition-colors"><Twitter /></a>
            <a href="#" className="hover:text-[var(--color-neon-pink)] transition-colors"><Instagram /></a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [activeBg, setActiveBg] = useState(movies[0].bg);
  const [activeColor, setActiveColor] = useState(movies[0].color);
  const [voted, setVoted] = useState<number | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour <= 6;
  const neonOpacity = isNight ? 1 : 0.4;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[var(--color-gold)] selection:text-black" style={{ '--neon-opacity': neonOpacity } as React.CSSProperties}>
      <ParallaxBackground />
      <TicketModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <div className="film-grain"></div>
      
      {/* Dynamic Background for Program Section */}
      <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeBg}
            src={activeBg}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        <div className={`absolute inset-0 bg-gradient-to-b ${activeColor} to-[#050505] opacity-80 mix-blend-multiply transition-colors duration-1000`}></div>
        <div className="absolute inset-0 bg-[#050505]/80"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 p-6 flex justify-between items-center mix-blend-difference">
        <img 
          src="https://s1.directupload.eu/images/260313/5v68fa39.jpg" 
          alt="MGO Retro Klassiker Logo"
          className="h-12 md:h-16 w-auto object-contain"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)'
          }}
          referrerPolicy="no-referrer"
        />
        <button onClick={() => setIsMenuOpen(true)} className="projector-hover px-6 py-2 border border-white/20 rounded-full text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors">
          Menü
        </button>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 pt-20">
          <div className="max-w-5xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8"
            >
              KÖLN, MACH <span className="font-serif italic font-normal text-[var(--color-gold)]">dich bereit</span><br />
              <span className="font-serif italic font-normal text-[var(--color-gold)]">für die große</span> LEINWAND.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-lg md:text-xl text-white/70 max-w-2xl mb-12 font-light"
            >
              Die 90er sind zurück. Keine Streaming-Kompromisse. Nur echtes Zelluloid-Gefühl, massiver Sound und 800 Gleichgesinnte im Dunkeln.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <button
                onClick={() => setIsTicketModalOpen(true)}
                className="group relative inline-flex items-center gap-4 px-8 py-4 bg-[#110e00] border border-[var(--color-gold)] text-[var(--color-gold)] rounded-full uppercase tracking-widest font-semibold overflow-hidden"
              >
                <div className="absolute inset-0 bg-[var(--color-gold)]/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative z-10">Digitales Ticket zur Erinnerung sichern</span>
                <Ticket className="relative z-10 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Program Section */}
        <section id="programm" className="py-32 px-6 md:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20">
              <div className="flex items-center gap-4 flex-1">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">PROGRAMM <span className="font-serif italic text-white/50">2026</span></h2>
                <div className="h-[1px] flex-1 bg-white/20"></div>
              </div>
              <LiveCountdown />
            </div>

            <div className="space-y-48">
              {movies.map((movie, index) => (
                <MovieItem 
                  key={movie.id} 
                  movie={movie} 
                  index={index} 
                  onInView={() => {
                    setActiveBg(movie.bg);
                    setActiveColor(movie.color);
                  }}
                  onTicketClick={() => setIsTicketModalOpen(true)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* The Experience Section (Premium Spotlight Cards) */}
        <section id="erlebnis" className="py-32 px-6 md:px-20 bg-black/95 border-t border-white/10 relative z-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.05)_0%,transparent_50%)]"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">DAS <span className="font-serif italic text-[var(--color-gold)]">Erlebnis</span></h2>
              <p className="text-white/60 max-w-2xl mx-auto text-lg">Warum wir das machen? Weil ein Laptop-Bildschirm kein Kino ist. Wir bringen die Magie zurück.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SpotlightCard 
                icon={MonitorPlay}
                title="4K & 70mm"
                desc="Gestochen scharfe Restaurationen oder echtes analoges Filmmaterial. Wir zeigen die Filme so, wie die Regisseure es vorgesehen haben."
              />
              <SpotlightCard 
                icon={Volume2}
                title="Massiver Sound"
                desc="Dolby Atmos und THX-zertifizierte Säle. Spüre den Bass von legendären Soundtracks tief in der Magengrube."
              />
              <SpotlightCard 
                icon={Users}
                title="800 Fans"
                desc="Das kollektive Lachen, das gemeinsame Erschrecken. Kino ist ein Gemeinschaftserlebnis. Sei Teil der Crowd."
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-6 md:px-20 bg-[#050505] relative z-20 border-t border-white/10">
          <Testimonials />
        </section>

        {/* Film Quiz & Social Wall */}
        <section id="quiz" className="py-32 px-6 md:px-20 bg-[#0a0a0a] relative z-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-12">FILM <span className="font-serif italic text-[var(--color-neon-pink)]">Quiz</span></h2>
              <FilmQuiz />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-12">SOCIAL <span className="font-serif italic text-[var(--color-neon-blue)]">Wall</span></h2>
              <SocialWall />
            </div>
          </div>
        </section>

        {/* Community Voting Section */}
        <section className="py-32 px-6 md:px-20 bg-black relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">DEIN <span className="font-serif italic text-[var(--color-gold)]">Wunschfilm</span></h2>
              <p className="text-white/60 mb-12 text-lg">Welchen Klassiker sollen wir als nächstes auf die 800-Mann-Leinwand bringen? Stimme jetzt ab!</p>
            </motion.div>
            
            <div className="flex flex-col gap-4">
              {['JURASSIC PARK (1993)', 'THE MATRIX (1999)', 'ALIEN (1979)'].map((film, idx) => (
                <motion.button 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setVoted(idx)}
                  className={`relative overflow-hidden p-6 border rounded-xl text-left transition-all duration-300 ${
                    voted === idx 
                      ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10' 
                      : 'border-white/20 hover:border-white/50 bg-white/5'
                  }`}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <span className="font-bold tracking-wider text-lg">{film}</span>
                    {voted === idx && <CheckCircle2 className="w-6 h-6 text-[var(--color-gold)]" />}
                  </div>
                  {/* Progress bar simulation for voted state */}
                  {voted !== null && (
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: voted === idx ? '65%' : idx === 1 ? '20%' : '15%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute left-0 top-0 bottom-0 bg-[var(--color-gold)]/10 z-0"
                    />
                  )}
                </motion.button>
              ))}
            </div>
            <AnimatePresence>
              {voted !== null && (
                <motion.p 
                  initial={{ opacity: 0, height: 0, mt: 0 }}
                  animate={{ opacity: 1, height: 'auto', mt: 32 }}
                  exit={{ opacity: 0, height: 0, mt: 0 }}
                  className="text-[var(--color-gold)] font-medium text-lg"
                >
                  Danke für deine Stimme! Melde dich unten an, um das Ergebnis nicht zu verpassen.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* FAQ Section (NEW) */}
        <section id="faq" className="py-32 px-6 md:px-20 bg-[#050505] relative z-20 border-t border-white/10">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-16 text-center"
            >
              HÄUFIGE <span className="font-serif italic text-[var(--color-gold)]">Fragen</span>
            </motion.h2>
            <div className="space-y-2">
              <FAQItem 
                question="Gibt es freie Platzwahl?" 
                answer="Nein, die Plätze werden bei der Ticketbuchung sitzplatzgenau vergeben. Wer zuerst bucht, sichert sich die besten Plätze in der Mitte!" 
              />
              <FAQItem 
                question="Wann ist Einlass?" 
                answer="Der Einlass beginnt um 19:00 Uhr. Kommt frühzeitig, um euch an der Bar mit Popcorn und Drinks zu versorgen und coole Erinnerungsfotos an unserer 90s-Fotowand zu machen." 
              />
              <FAQItem 
                question="Gibt es eine Pause zwischen den Filmen?" 
                answer="Ja! Da wir Doppelvorstellungen zeigen, gibt es eine 20-minütige Pause zwischen den Filmen zum Durchatmen, Diskutieren und für einen Refill an der Bar." 
              />
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-32 px-6 md:px-20 relative overflow-hidden z-20 bg-black border-t border-white/10">
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-gold)]/5 to-transparent"></div>
          <div className="max-w-3xl mx-auto relative z-10 bg-[#0a0a0a] p-8 md:p-16 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">NICHTS <span className="font-serif italic text-[var(--color-gold)]">verpassen</span></h2>
            <p className="text-white/70 mb-8">
              Trag dich ein und erfahre als Erstes, wenn neue Klassiker in Köln angekündigt werden. Hilf uns zu zeigen, dass die Nachfrage für großes Kino da ist!
            </p>
            <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Deine E-Mail Adresse" 
                className="flex-1 bg-white/5 border border-white/20 rounded-full px-6 py-4 focus:outline-none focus:border-[var(--color-gold)] transition-colors"
              />
              <button className="projector-hover bg-white text-black px-8 py-4 rounded-full font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[var(--color-gold)] transition-colors">
                Dabei sein <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 md:px-20 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40 bg-black relative z-20">
          <p>&copy; 2026 MGO Retro Klassiker. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Impressum</a>
            <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

function MovieItem({ movie, index, onInView, onTicketClick }: { movie: any, index: number, onInView: () => void, onTicketClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest > 0.3 && latest < 0.7) {
        onInView();
      }
    });
  }, [scrollYProgress, onInView]);

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 1, 1, 0.1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(10px)", "blur(0px)", "blur(10px)"]);

  const isEven = index % 2 === 0;

  return (
    <motion.div 
      ref={ref}
      style={{ opacity }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
    >
      <motion.div 
        style={{ y, scale, filter: blur }}
        className="w-full md:w-1/2 aspect-[2/3] relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
      >
        <img 
          src={movie.poster} 
          alt={movie.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-2xl"></div>
      </motion.div>

      <div className="w-full md:w-1/2 space-y-6">
        <div>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-2">
            {movie.title.split(' ').map((word: string, i: number) => (
              <span key={i} className={word === '&' || word === '2' || word === 'KLASSIKER' ? "font-serif italic text-[var(--color-gold)] font-normal" : ""}>
                {word}{' '}
              </span>
            ))}
          </h3>
          <p className="text-lg md:text-xl text-[var(--color-gold)] font-sans font-medium tracking-widest uppercase">{movie.subtitle}</p>
        </div>
        
        <div className="space-y-4 text-lg text-white/80 font-mono py-4 border-y border-white/10">
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-[var(--color-gold)]" />
            <span>{movie.date} • {movie.time}</span>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="w-5 h-5 text-[var(--color-gold)]" />
            <span>{movie.location}</span>
          </div>
        </div>

        <button onClick={onTicketClick} className="projector-hover inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full uppercase tracking-widest font-semibold transition-colors backdrop-blur-sm">
          Tickets <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex justify-between items-center w-full py-6 text-left hover:text-[var(--color-gold)] transition-colors"
      >
        <span className="text-xl font-bold tracking-wide pr-8">{question}</span>
        <ChevronDown className={`w-6 h-6 shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--color-gold)]' : 'text-white/50'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/60 leading-relaxed text-lg">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
