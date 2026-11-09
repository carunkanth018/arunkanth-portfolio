import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { scrollToSection } from '../utils/scroll';
import { Magnetic } from './Magnetic';

interface NavbarProps {
  onOpenResume: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Journey', href: '#journey', id: 'journey' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavbarHovered, setIsNavbarHovered] = useState(false);

  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;

  const isScrolledRef = useRef(isScrolled);
  isScrolledRef.current = isScrolled;

  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<number | null>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setActiveSection(targetId);
    setMobileMenuOpen(false);

    // Temporarily prioritize clicked target during smooth scroll animation
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) {
      window.clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = window.setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    scrollToSection(targetId);
  };

  useEffect(() => {
    let ticking = false;

    // Cache elements to avoid repeated DOM queries
    const sectionElements = NAV_LINKS.map((link) => ({
      id: link.id,
      el: document.getElementById(link.id),
    })).filter((item) => item.el !== null) as { id: string; el: HTMLElement }[];

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const newScrolled = scrollY > 20;
          if (newScrolled !== isScrolledRef.current) {
            setIsScrolled(newScrolled);
          }

          if (!isClickScrollingRef.current) {
            if (scrollY < 80) {
              if (activeSectionRef.current !== 'home') {
                setActiveSection('home');
              }
            } else if (scrollY + window.innerHeight >= document.documentElement.scrollHeight - 60) {
              if (activeSectionRef.current !== 'contact') {
                setActiveSection('contact');
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();

    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isClickScrollingRef.current) return;
      const scrollY = window.scrollY;
      if (scrollY < 80) return;

      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
        // Pick the entry with the highest intersection ratio
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const bestTarget = visibleEntries[0].target.id;
        if (bestTarget && bestTarget !== activeSectionRef.current) {
          setActiveSection(bestTarget);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-80px 0px -40% 0px',
      threshold: [0.1, 0.25, 0.5, 0.75],
    });

    sectionElements.forEach((item) => {
      observer.observe(item.el);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      observer.disconnect();
      if (clickTimeoutRef.current) {
        window.clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[94%] max-w-[1280px] z-50 pointer-events-auto"
    >
      {/* Floating Pill Capsule Bar */}
      <div 
        onMouseEnter={() => setIsNavbarHovered(true)}
        onMouseLeave={() => setIsNavbarHovered(false)}
        className={`w-full px-5 sm:px-8 py-2.5 sm:py-3 rounded-full flex items-center justify-between gap-4 transition-all duration-500 ease-out will-change-transform ${
          isNavbarHovered ? 'scale-[1.008]' : 'scale-100'
        } ${
          isDark
            ? isScrolled 
              ? isNavbarHovered
                ? 'bg-[#070e1c]/92 backdrop-blur-2xl border border-cyan-400/50 shadow-[0_16px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(0,218,243,0.18)]'
                : 'bg-[#070e1c]/85 backdrop-blur-xl border border-cyan-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_15px_rgba(0,229,255,0.06)]' 
              : isNavbarHovered
                ? 'bg-[#070e1c]/90 backdrop-blur-2xl border border-cyan-400/45 shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_22px_rgba(0,218,243,0.15)]'
                : 'bg-[#070e1c]/85 backdrop-blur-xl border border-cyan-500/25 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : isScrolled
              ? isNavbarHovered
                ? 'bg-white/95 backdrop-blur-2xl border border-cyan-400/60 shadow-[0_14px_40px_rgba(0,0,0,0.1),0_0_20px_rgba(0,180,216,0.22)]'
                : 'bg-white/90 backdrop-blur-xl border border-slate-300/80 shadow-[0_12px_35px_rgba(0,0,0,0.08),0_0_15px_rgba(0,180,216,0.1)]'
              : isNavbarHovered
                ? 'bg-white/92 backdrop-blur-2xl border border-cyan-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.07),0_0_18px_rgba(0,180,216,0.16)]'
                : 'bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_25px_rgba(0,0,0,0.05)]'
        }`}
      >
        
        {/* Brand Logo - AK Neon Futuristic Logo with Magnetic interaction */}
        <Magnetic strength={5} cursorType="link">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, 'home')}
            data-cursor="link"
            className="flex items-center justify-center group select-none py-1 px-1.5 focus:outline-none rounded-lg transition-transform duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer"
            aria-label="AK Logo - Home"
          >
            <img 
              src="/assets/ak-logo.png" 
              alt="AK"
              width="100"
              height="28"
              decoding="async"
              fetchPriority="high"
              className="h-6 sm:h-6.5 md:h-7 w-auto object-contain transition-all duration-200 group-hover:opacity-95 drop-shadow-[0_0_6px_rgba(0,229,255,0.3)] group-hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.55)]"
            />
          </a>
        </Magnetic>

        {/* Center Desktop Navigation Links with Sibling Dimming & Magnetic Pull */}
        <nav className="nav-links-container hidden lg:flex items-center gap-5 xl:gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Magnetic key={link.id} strength={5} cursorType="link" className="nav-link-item transition-opacity duration-200">
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  data-cursor="link"
                  className={`relative py-1.5 px-2.5 text-[0.9375rem] font-medium tracking-wide rounded-full transition-all duration-250 inline-block cursor-pointer active:scale-95 ${
                    isActive
                      ? 'text-[#00e5ff] font-semibold drop-shadow-[0_0_12px_rgba(0,229,255,0.7)]'
                      : isDark
                        ? 'text-gray-300 hover:text-white hover:drop-shadow-[0_0_12px_rgba(0,229,255,0.5)] hover:bg-cyan-500/10'
                        : 'text-slate-600 hover:text-slate-950 hover:drop-shadow-[0_0_10px_rgba(0,180,216,0.35)] hover:bg-cyan-500/10'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="absolute -bottom-1 left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-[#00e5ff] via-[#805ad5] to-[#c084fc] shadow-[0_0_12px_rgba(0,229,255,0.8)]" 
                    />
                  )}
                </a>
              </Magnetic>
            );
          })}
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-3">
          {/* Hire Me Action Button with Magnetic Pull & Radial Sheen */}
          <Magnetic strength={8} cursorType="button">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              data-cursor="button"
              className="interactive-button-sheen inline-flex items-center justify-center px-5 sm:px-6 py-2 rounded-full bg-gradient-to-r from-[#00d2ff] via-[#6366f1] to-[#a855f7] text-white font-sans text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:shadow-[0_0_28px_rgba(0,210,255,0.65)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer select-none"
            >
              HIRE ME
            </a>
          </Magnetic>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-cursor="button"
            className={`lg:hidden p-1.5 rounded-full border transition-transform active:scale-90 cursor-pointer ${
              isDark
                ? 'text-gray-300 hover:text-white bg-white/5 border-white/10'
                : 'text-slate-800 hover:text-slate-950 bg-white border-slate-300 shadow-sm'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="lg:hidden mt-2 bg-[#070c18]/95 backdrop-blur-2xl border border-cyan-500/25 rounded-2xl px-6 py-5 flex flex-col gap-3 shadow-2xl"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`px-3 py-2 text-sm tracking-wide font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-cyan-500/15 text-[#00e5ff] font-semibold border-l-2 border-[#00e5ff]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex items-center gap-2 text-xs text-[#00e5ff] font-mono tracking-wider py-1.5 cursor-pointer hover:underline"
              >
                <Download className="w-4 h-4" />
                VIEW RESUME / CV
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
