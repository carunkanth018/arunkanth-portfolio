import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { JourneySection } from './components/JourneySection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CustomCursor } from './components/CustomCursor';
import { Magnetic } from './components/Magnetic';
import { PhoneCall } from 'lucide-react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { scrollToSection } from './utils/scroll';

function PortfolioApp() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { isDark } = useTheme();

  // Guarantee that every page load or refresh starts at (0, 0)
  React.useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isDark
          ? 'bg-[#040814] text-[#f5f5f5] selection:bg-white selection:text-black'
          : 'bg-[#f8fafc] text-slate-900 selection:bg-cyan-500 selection:text-white'
      }`}
    >
      {/* Custom Animated Cursor */}
      <CustomCursor />

      {/* Top Navbar */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col w-full">
        {/* Hero Section with Shader and Role Rotator */}
        <Hero />

        {/* Section 01: Cognitive Architecture & Philosophy */}
        <AboutSection />

        {/* Section 02: Technical Taxonomy & Capability Matrix */}
        <SkillsSection />

        {/* Section 03: High-Impact Production Case Studies */}
        <ProjectsSection />

        {/* Section 04: Career Progression & Milestones */}
        <JourneySection />

        {/* Section 05: Experience & Opportunities */}
        <ExperienceSection />

        {/* Section 06: Contact & Initiation Terminal */}
        <ContactSection />
      </main>

      {/* Global Footer with Live Telemetry */}
      <Footer />

      {/* Floating Call/Chat Action Button fixed in bottom right */}
      <div className="fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8">
        <Magnetic strength={8} cursorType="button">
          <a
            href="#contact"
            data-cursor="button"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            title="Get in touch"
            className="interactive-button-sheen w-14 h-14 rounded-full bg-gradient-to-r from-[#00d2ff] via-[#4f80ff] to-[#a855f7] shadow-[0_0_25px_rgba(0,210,255,0.6),0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(0,210,255,0.9),0_0_55px_rgba(168,85,247,0.5)] hover:scale-110 active:scale-95 flex items-center justify-center text-white transition-all duration-300 cursor-pointer border border-cyan-400/30"
          >
            <PhoneCall className="w-6 h-6 animate-pulse" />
          </a>
        </Magnetic>
      </div>

      {/* Verified Dossier / Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
