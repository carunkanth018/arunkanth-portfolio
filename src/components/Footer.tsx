import React, { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { Magnetic } from './Magnetic';
import { scrollToSection } from '../utils/scroll';

// Isolated Telemetry Clock sub-component to eliminate 1-second re-renders of the Footer
const TelemetryClock: React.FC = React.memo(() => {
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    const updateTime = () => {
      if (document.hidden) return;
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };

    updateTime();
    interval = setInterval(updateTime, 1000);

    const handleVisibility = () => {
      if (!document.hidden) {
        updateTime();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (interval) clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return <span className="text-gray-500">{utcTime}</span>;
});

TelemetryClock.displayName = 'TelemetryClock';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#03060f] border-t border-cyan-500/15 py-12 text-gray-400 font-sans text-xs relative overflow-hidden select-none">
      {/* Subtle bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-gradient-to-t from-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col gap-8 relative z-10"
      >
        {/* Top row: Brand + Quick Links + Back to top */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-white/10">
          <Magnetic strength={5} cursorType="link">
            <a href="#home" data-cursor="link" className="flex items-center gap-1.5 group select-none">
              <span className="font-sans font-extrabold text-xl tracking-tight transition-transform group-hover:scale-[1.03] duration-200">
                <span className="text-[#00e5ff] drop-shadow-[0_0_12px_rgba(0,229,255,0.45)] group-hover:drop-shadow-[0_0_18px_rgba(0,229,255,0.8)]">ARUN</span>
                <span className="text-[#b366ff] drop-shadow-[0_0_12px_rgba(179,102,255,0.45)] group-hover:drop-shadow-[0_0_18px_rgba(179,102,255,0.8)]">KANTH</span>
                <span className="text-white ml-1 font-bold">.DEV</span>
              </span>
            </a>
          </Magnetic>

          <div className="flex flex-wrap items-center gap-5 text-xs font-mono uppercase tracking-wider font-medium">
            {[
              { label: 'HOME', id: 'home' },
              { label: 'ABOUT', id: 'about' },
              { label: 'SKILLS', id: 'skills' },
              { label: 'PROJECTS', id: 'projects' },
              { label: 'JOURNEY', id: 'journey' },
              { label: 'EXPERIENCE', id: 'experience' },
              { label: 'CONTACT', id: 'contact' },
            ].map((link) => (
              <Magnetic key={link.id} strength={4} cursorType="link">
                <a
                  href={`#${link.id}`}
                  data-cursor="link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                  className="interactive-link text-gray-400 hover:text-[#00e5ff] hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.6)] transition-all cursor-pointer inline-block"
                >
                  {link.label}
                </a>
              </Magnetic>
            ))}
          </div>

          <Magnetic strength={7} cursorType="button">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="button"
              className="interactive-button-sheen group px-4 py-2 rounded-full bg-[#0a1224] hover:bg-cyan-950/60 text-white border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all flex items-center gap-1.5 font-mono font-bold uppercase tracking-widest text-[11px] cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 text-cyan-400" />
            </motion.button>
          </Magnetic>
        </div>

        {/* Bottom row: Telemetry ticker, Socials & Copyright */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-white font-bold">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] animate-pulse" />
              SYSTEM STATUS: ONLINE
            </span>
            <TelemetryClock />
          </div>

          <div className="flex items-center gap-4">
            <Magnetic strength={6} cursorType="button">
              <motion.a
                href="https://github.com/carunkanth018"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="button"
                className="text-gray-400 hover:text-[#00e5ff] hover:scale-115 transition-all p-1"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </motion.a>
            </Magnetic>
            <Magnetic strength={6} cursorType="button">
              <motion.a
                href="https://www.linkedin.com/in/carunkanth"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="button"
                className="text-gray-400 hover:text-[#00e5ff] hover:scale-115 transition-all p-1"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            </Magnetic>
            <Magnetic strength={6} cursorType="button">
              <motion.a
                href="mailto:carunkanth@gmail.com"
                data-cursor="button"
                className="text-gray-400 hover:text-[#00e5ff] hover:scale-115 transition-all p-1"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            </Magnetic>
          </div>

          <div className="text-gray-400 tracking-wider text-[11px]">
            &copy; {new Date().getFullYear()} CHOWDIVADA ARUN KANTH. ALL RIGHTS RESERVED.
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
