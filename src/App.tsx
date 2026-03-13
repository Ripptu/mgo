import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Ticket, Film, Calendar, MapPin, ArrowRight, Volume2, MonitorPlay, Users, CheckCircle2, ChevronDown, Camera } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Environment, Float, ContactShadows, RoundedBox } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const movies = [
  {
    id: 1,
    title: "SCARFACE & HEAT",
    subtitle: "Ein Tag, zwei Gangster-Epen",
    date: "11. Apr 2026",
    time: "20:00 - 24:00",
    location: "Köln (Große Leinwand)",
    poster: "https://s1.directupload.eu/images/260313/peurefzt.png",
    bg: "https://s1.directupload.eu/images/260313/peurefzt.png",
    color: "from-orange-900/40"
  },
  {
    id: 2,
    title: "GHOSTBUSTERS 1 & 2",
    subtitle: "Die Kult-Doppelvorstellung",
    date: "11. Apr 2026",
    time: "20:00 - 24:00",
    location: "Köln (Große Leinwand)",
    poster: "https://s1.directupload.eu/images/260313/nz7eqmwy.png",
    bg: "https://s1.directupload.eu/images/260313/nz7eqmwy.png",
    color: "from-blue-900/40"
  },
  {
    id: 3,
    title: "HORROR KLASSIKER",
    subtitle: "Zwei Schocker am Stück",
    date: "11. Apr 2026",
    time: "20:00 - 24:00",
    location: "Köln (Große Leinwand)",
    poster: "https://s1.directupload.eu/images/260313/a4rxuthl.png",
    bg: "https://s1.directupload.eu/images/260313/a4rxuthl.png",
    color: "from-red-900/40"
  }
];

// --- Premium 3D Cyber Helmet (80s/90s Synthwave) ---
function CyberHelmet() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Main Helmet Shell - Glossy Black/Purple */}
      <RoundedBox args={[2, 2.4, 2.2]} radius={0.4} smoothness={4} position={[0, 0, 0]}>
        <meshPhysicalMaterial 
          color="#0a0a0a" 
          metalness={0.9} 
          roughness={0.1} 
          clearcoat={1} 
          clearcoatRoughness={0.1}
          envMapIntensity={2}
        />
      </RoundedBox>
      
      {/* Glowing Neon Visor (Pink) */}
      <RoundedBox args={[2.1, 0.6, 1.8]} radius={0.1} smoothness={4} position={[0, 0.3, 0.4]}>
        <meshStandardMaterial 
          color="#ff0055" 
          emissive="#ff0055" 
          emissiveIntensity={4} 
          toneMapped={false} 
        />
      </RoundedBox>

      {/* Side Details (Cyan) */}
      <Cylinder args={[0.4, 0.4, 2.3]} rotation={[0, 0, Math.PI / 2]} position={[0, 0, -0.2]}>
        <meshStandardMaterial 
          color="#00f3ff" 
          emissive="#00f3ff" 
          emissiveIntensity={2} 
          toneMapped={false} 
        />
      </Cylinder>

      {/* Ear pieces */}
      <Cylinder args={[0.6, 0.6, 2.4]} rotation={[0, 0, Math.PI / 2]} position={[0, -0.4, 0]}>
        <meshPhysicalMaterial color="#222" metalness={0.8} roughness={0.4} />
      </Cylinder>
    </group>
  );
}

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

export default function App() {
  const [activeBg, setActiveBg] = useState(movies[0].bg);
  const [activeColor, setActiveColor] = useState(movies[0].color);
  const [voted, setVoted] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[var(--color-gold)] selection:text-black">
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
        <button className="projector-hover px-6 py-2 border border-white/20 rounded-full text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors">
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
              KÖLN, MACH <span className="font-serif italic font-normal text-[var(--color-gold)]">dich bereit für die große</span> LEINWAND.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-lg md:text-xl text-white/70 max-w-2xl mb-12 font-light"
            >
              Die 90er sind zurück. Keine Streaming-Kompromisse. Nur echtes Zelluloid-Gefühl, massiver Sound und 800 Gleichgesinnte im Dunkeln.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="group relative inline-flex items-center gap-4 px-8 py-4 bg-transparent border border-[var(--color-gold)] text-[var(--color-gold)] rounded-full uppercase tracking-widest font-semibold overflow-hidden"
            >
              <div className="absolute inset-0 bg-[var(--color-gold)]/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10">Tickets Sichern</span>
              <Ticket className="relative z-10 w-5 h-5 group-hover:rotate-12 transition-transform" />
              {/* Neon glow effect */}
              <div className="absolute -inset-2 bg-[var(--color-gold)] opacity-20 blur-xl rounded-full group-hover:opacity-40 transition-opacity duration-300"></div>
            </motion.button>
          </div>
        </section>

        {/* Program Section */}
        <section className="py-32 px-6 md:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">PROGRAMM <span className="font-serif italic text-white/50">2026</span></h2>
              <div className="h-[1px] flex-1 bg-white/20"></div>
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
                />
              ))}
            </div>
          </div>
        </section>

        {/* The Experience Section (Premium Spotlight Cards) */}
        <section className="py-32 px-6 md:px-20 bg-black/95 border-t border-white/10 relative z-20 overflow-hidden">
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

        {/* Event Character Section (NEW) */}
        <section className="py-32 px-6 md:px-20 bg-[#0a0a0a] relative z-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-neon-blue)_0%,transparent_50%)] opacity-5"></div>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">DRESSCODE: <span className="font-serif italic text-[var(--color-neon-blue)]">80s & 90s</span></h2>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Holt die Neon-Jacken, Retro-Sneaker und Lederjacken raus! Wir feiern nicht nur die Filme, sondern das gesamte Jahrzehnt des großen Kinos. 
              </p>
              <ul className="space-y-6 text-white/80">
                <li className="flex items-center gap-4 text-lg">
                  <div className="p-2 rounded-full bg-[var(--color-neon-blue)]/10 text-[var(--color-neon-blue)]"><Camera className="w-5 h-5" /></div>
                  Exklusive Retro-Fotowand im Foyer
                </li>
                <li className="flex items-center gap-4 text-lg">
                  <div className="p-2 rounded-full bg-[var(--color-neon-blue)]/10 text-[var(--color-neon-blue)]"><CheckCircle2 className="w-5 h-5" /></div>
                  Best-Dressed Gewinnspiel
                </li>
                <li className="flex items-center gap-4 text-lg">
                  <div className="p-2 rounded-full bg-[var(--color-neon-blue)]/10 text-[var(--color-neon-blue)]"><Volume2 className="w-5 h-5" /></div>
                  90s Mixtape Warm-up vor dem Film
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-full md:w-1/2 aspect-square relative cursor-grab active:cursor-grabbing"
            >
              {/* 3D Canvas */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-tr from-[#0a0a0a] to-[#111] border border-white/10 shadow-2xl shadow-[var(--color-neon-blue)]/10">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                  <color attach="background" args={['#050505']} />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
                  <pointLight position={[-10, -10, -10]} intensity={1} color="#ff003c" />
                  <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
                    <CyberHelmet />
                  </Float>
                  <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
                  <Environment preset="city" />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                  <EffectComposer>
                    <Bloom luminanceThreshold={1} intensity={1.5} mipmapBlur />
                  </EffectComposer>
                </Canvas>
                <div className="absolute bottom-4 left-0 right-0 text-center text-white/30 text-sm font-mono pointer-events-none">
                  [ Drag to rotate ]
                </div>
              </div>
            </motion.div>
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
        <section className="py-32 px-6 md:px-20 bg-[#050505] relative z-20 border-t border-white/10">
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

function MovieItem({ movie, index, onInView }: { movie: any, index: number, onInView: () => void }) {
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

        <button className="projector-hover inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full uppercase tracking-widest font-semibold transition-colors backdrop-blur-sm">
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
