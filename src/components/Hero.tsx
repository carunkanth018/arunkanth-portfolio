import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { ShaderBackground } from './ShaderBackground';
import { scrollToSection } from '../utils/scroll';
import { Magnetic } from './Magnetic';

// Floating 3D keycaps with artistic jumbled rotations & skill labels
const FLOATING_CUBES = [
  { label: 'HTML', title: 'HTML5', top: '14%', left: '4%', size: 'w-12 h-12', delay: '0s', duration: '7s', rotDeg: '-22deg', animName: 'float-keycap-1' },
  { label: 'CSS', title: 'CSS3', top: '28%', left: '4%', size: 'w-11 h-11', delay: '2.5s', duration: '8s', rotDeg: '28deg', animName: 'float-keycap-3' },
  { label: 'JS', title: 'JavaScript', top: '16%', left: '18%', size: 'w-10 h-10', delay: '1.2s', duration: '9s', rotDeg: '-18deg', animName: 'float-keycap-2' },
  { label: 'PBI', title: 'Power BI', top: '16%', right: '12%', size: 'w-16 h-16', delay: '0.5s', duration: '9.5s', rotDeg: '24deg', animName: 'float-keycap-4' },
  { label: 'SQL', title: 'SQL', top: '34%', right: '8%', size: 'w-12 h-12', delay: '2.1s', duration: '8s', rotDeg: '-32deg', animName: 'float-keycap-2' },
  { label: 'PY', title: 'Python', top: '56%', right: '16%', size: 'w-11 h-11', delay: '1.8s', duration: '7.8s', rotDeg: '36deg', animName: 'float-keycap-5' },
  { label: 'MDB', title: 'MongoDB', top: '78%', left: '6%', size: 'w-12 h-12', delay: '0.8s', duration: '7.5s', rotDeg: '-28deg', animName: 'float-keycap-1' },
  { label: 'XL', title: 'Microsoft Excel', top: '84%', left: '16%', size: 'w-9 h-9', delay: '1.5s', duration: '10s', rotDeg: '22deg', animName: 'float-keycap-3' },
  { label: 'PD', title: 'Pandas / PostgreSQL', top: '76%', right: '28%', size: 'w-10 h-10', delay: '3s', duration: '8.5s', rotDeg: '-34deg', animName: 'float-keycap-2' },
  { label: 'NP', title: 'NumPy', top: '82%', right: '10%', size: 'w-9 h-9', delay: '2.8s', duration: '9.2s', rotDeg: '38deg', animName: 'float-keycap-4' },
  { label: 'GIT', title: 'Git Version Control', top: '90%', right: '22%', size: 'w-11 h-11', delay: '0.2s', duration: '8.2s', rotDeg: '-20deg', animName: 'float-keycap-5' },
];

const WORDS = [
  'modern websites and web applications',
  'Data Science and data-driven projects',
  'interactive dashboards and visualizations',
  'AI-integrated web experiences',
  'creative projects using AI and modern tools',
  'modern digital experiences and interfaces',
];

// Motion animation variants for cinematic sequenced entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const buttonGroupVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      staggerChildren: 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const buttonItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const scrollVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.1,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Isolated Typewriter sub-component to eliminate continuous re-renders of the parent Hero
const HeroTypewriter: React.FC = React.memo(() => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (document.hidden) return;
    const fullText = WORDS[currentWordIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText !== fullText) {
      timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 55);
    } else if (!isDeleting && displayedText === fullText) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && displayedText !== '') {
      timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length - 1));
      }, 30);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <span className="font-bold text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
      {displayedText}
      <span className="inline-block w-[3px] h-6 sm:h-7 md:h-8 bg-[#00e5ff] ml-1.5 align-middle shadow-[0_0_10px_#00e5ff] animate-pulse" />
    </span>
  );
});

HeroTypewriter.displayName = 'HeroTypewriter';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  // Subtle, high-performance desktop-only mouse parallax on atmospheric ambient background
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let rafId: number | null = null;
    let heroRect: DOMRect | null = null;

    const updateRect = () => {
      if (heroRef.current) {
        heroRect = heroRef.current.getBoundingClientRect();
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId || document.hidden) return;
      if (!heroRect || heroRect.width === 0 || heroRect.height === 0) {
        updateRect();
      }
      if (!heroRect) return;

      const clientX = e.clientX;
      const clientY = e.clientY;
      const rect = heroRect;

      rafId = requestAnimationFrame(() => {
        if (heroRef.current && rect) {
          const normX = ((clientX - rect.left) / rect.width - 0.5) * 2;
          const normY = ((clientY - rect.top) / rect.height - 0.5) * 2;
          heroRef.current.style.setProperty('--hero-mx', `${(normX * 12).toFixed(1)}px`);
          heroRef.current.style.setProperty('--hero-my', `${(normY * 12).toFixed(1)}px`);
        }
        rafId = null;
      });
    };

    const handleVisibility = () => {
      if (document.hidden && rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      } else if (!document.hidden) {
        updateRect();
      }
    };

    const section = heroRef.current;
    section?.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      section?.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#040814] pt-28 pb-16 px-4 md:px-8 border-b border-white/5 select-none"
    >
      {/* WebGL Procedural Glow Shader Background */}
      <ShaderBackground />

      {/* Atmospheric space radial gradients with subtle responsive parallax */}
      <div
        style={{
          transform: 'translate3d(var(--hero-mx, 0px), var(--hero-my, 0px), 0)',
          transition: 'transform 0.25s ease-out',
        }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_35%,_rgba(0,210,255,0.12)_0%,_rgba(168,85,247,0.08)_35%,_rgba(4,8,20,0.95)_75%)] animate-glow-drift will-change-transform"
      />

      {/* Floating 3D Keycap Cubes with Smooth Floating Keyframe Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {FLOATING_CUBES.map((cube, idx) => (
          <div
            key={idx}
            style={{
              top: cube.top,
              left: cube.left,
              right: cube.right,
              animation: `${cube.animName} ${cube.duration} ease-in-out ${cube.delay} infinite`,
            }}
            className="absolute pointer-events-auto hidden sm:flex will-change-transform"
          >
            <div
              data-cursor="badge"
              title={cube.title}
              style={{
                transform: `rotate(${cube.rotDeg})`,
              }}
              className={`${cube.size} flex items-center justify-center rounded-xl bg-gradient-to-br from-white/90 via-slate-100/70 to-slate-300/40 text-slate-800 font-mono font-extrabold ${cube.label.length >= 4 ? 'text-[11px]' : cube.label.length === 3 ? 'text-xs' : 'text-xs md:text-sm'} shadow-[0_12px_25px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-3px_6px_rgba(0,0,0,0.3)] backdrop-blur-md border-t border-l border-white/80 border-r-2 border-b-4 border-slate-700/60 opacity-85 hover:opacity-100 hover:scale-115 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(0,229,255,0.4)] hover:border-cyan-400 transition-all duration-300 ease-out cursor-default select-none`}
            >
              {cube.label}
            </div>
          </div>
        ))}
      </div>

      {/* Hero Content Container - Positioned with optimal right offset and balanced left alignment */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-start text-left gap-6 md:gap-7 mt-6 px-6 sm:px-12 md:px-16 lg:pl-24 lg:pr-8"
      >
        {/* 1. Eyebrow */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
          <span 
            data-cursor="text"
            className="interactive-heading font-mono text-xs sm:text-sm text-[#00e5ff] uppercase tracking-[0.3em] font-bold drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]"
          >
            WELCOME TO MY WORLD
          </span>
        </motion.div>

        {/* 2. Main Title: Hi, I'm Arun Kanth with Cyan-to-Teal/Mint Gradient Name */}
        <motion.h1
          variants={itemVariants}
          data-cursor="text"
          className="interactive-heading font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-white tracking-tight leading-[1.08] drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          Hi, I&apos;m{' '}
          <span className="interactive-name-glow bg-gradient-to-r from-[#00daf3] via-[#00f5d4] to-[#2ee59d] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,218,243,0.5)] cursor-default">
            Arun Kanth
          </span>
        </motion.h1>

        {/* 3. Typewriter Line */}
        <motion.div
          variants={itemVariants}
          data-cursor="text"
          className="flex items-baseline gap-3 text-xl sm:text-2xl md:text-3xl font-sans font-normal text-gray-200 min-h-[36px] sm:min-h-[44px]"
        >
          <span className="text-gray-400 font-light shrink-0">I build</span>
          <HeroTypewriter />
        </motion.div>

        {/* 4. Subtitle Bio */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-base sm:text-lg text-gray-300/90 font-normal leading-relaxed max-w-2xl text-left"
        >
          An <span className="text-white font-medium hover:text-[#00daf3] transition-colors cursor-default drop-shadow-[0_0_8px_rgba(0,218,243,0.3)]">AI Vibe Coder</span> and <span className="text-white font-medium hover:text-[#00f5d4] transition-colors cursor-default drop-shadow-[0_0_8px_rgba(0,245,212,0.3)]">Web Developer</span> exploring the world of <span className="text-white font-medium hover:text-[#c084fc] transition-colors cursor-default drop-shadow-[0_0_8px_rgba(192,132,252,0.3)]">Data Science</span>, building intelligent solutions and modern digital experiences. Open to internships.
        </motion.p>

        {/* 5. Pill Action Buttons with Magnetic Pull & Radial Sheen */}
        <motion.div variants={buttonGroupVariants} className="flex flex-wrap items-center gap-4 pt-3">
          <Magnetic strength={8} cursorType="button">
            <motion.a
              variants={buttonItemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              href="#projects"
              data-cursor="button"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}
              className="interactive-button-sheen group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#8b5cf6] text-white font-sans text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_0_25px_rgba(0,198,255,0.45)] hover:shadow-[0_0_35px_rgba(0,198,255,0.75)] active:scale-95 transition-all duration-250 cursor-pointer"
            >
              <span>VIEW MY WORK</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1.5" />
            </motion.a>
          </Magnetic>

          <Magnetic strength={8} cursorType="button">
            <motion.a
              variants={buttonItemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              href="#contact"
              data-cursor="button"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="interactive-button-sheen group inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#0a1224]/80 border border-[#00daf3] hover:border-cyan-300 text-white font-sans text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(0,218,243,0.25)] hover:shadow-[0_0_28px_rgba(0,218,243,0.55)] hover:bg-cyan-950/50 active:scale-95 transition-all duration-250 cursor-pointer"
            >
              <span>LET&apos;S CONNECT</span>
            </motion.a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* 6. Scroll Down Indicator with Magnetic Hover Pull */}
      <Magnetic strength={6} cursorType="link">
        <motion.a
          variants={scrollVariants}
          initial="hidden"
          animate="visible"
          href="#about"
          data-cursor="link"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('about');
          }}
          className="mt-16 sm:mt-24 flex flex-col items-center gap-1.5 text-gray-400 hover:text-[#00e5ff] transition-colors duration-200 z-10 group cursor-pointer"
        >
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-medium group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]">
            SCROLL DOWN
          </span>
          <ChevronDown className="w-4 h-4 animate-subtle-scroll text-gray-400 group-hover:text-[#00e5ff] transition-colors" />
        </motion.a>
      </Magnetic>
    </section>
  );
};

