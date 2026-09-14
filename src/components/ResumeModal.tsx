import React from 'react';
import { X, Download, Printer, CheckCircle2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Magnetic } from './Magnetic';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0a1122] border border-cyan-500/30 rounded-2xl p-6 md:p-10 flex flex-col gap-8 shadow-2xl"
          >
            {/* Top Controls */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#a8ffd2] inline-block shadow-[0_0_8px_#a8ffd2]" />
                <span className="font-mono text-xs text-[#00e5ff] uppercase tracking-wider font-semibold">
                  CURRICULUM VITAE // VERIFIED SYSTEM DOSSIER
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Magnetic strength={5} cursorType="button">
                  <button
                    onClick={handlePrint}
                    data-cursor="button"
                    className="px-3 py-1.5 rounded bg-cyan-950/50 hover:bg-cyan-900/60 text-cyan-300 font-mono text-xs flex items-center gap-1.5 transition-colors border border-cyan-500/40 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / PDF</span>
                  </button>
                </Magnetic>
                <Magnetic strength={5} cursorType="button">
                  <button
                    onClick={onClose}
                    data-cursor="button"
                    className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </Magnetic>
              </div>
            </div>

            {/* CV Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#3b494c]/30 pb-6">
              <div>
                <h2 className="font-headline-lg text-2xl md:text-3xl text-[#dfe2ef] uppercase tracking-tight">
                  Chowdivada Arun Kanth
                </h2>
                <p className="font-mono text-sm text-[#00daf3] mt-1">
                  Aspiring Data Analyst &bull; B.Tech Computer Science Engineering (2025 – 2029)
                </p>
              </div>
              <div className="flex flex-col font-mono text-xs text-[#849396] gap-1 md:text-right">
                <span>+91 95150 21303 &bull; carunkanth@gmail.com &bull; Visakhapatnam, India</span>
                <span>linkedin.com/in/carunkanth &bull; github.com/Arunkanth018</span>
                <span>carunkanthdevfolio.vercel.app</span>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-[#89ceff] uppercase tracking-wider font-bold">
                01 // PROFILE &amp; OBJECTIVE
              </span>
              <p className="font-sans text-sm text-[#bac9cc] leading-relaxed">
                Second-year CS student skilled in SQL and Power BI, with hands-on experience building data
                dashboards and full-stack web apps. Looking to apply analytical and technical skills as a
                Data Analyst intern.
              </p>
            </div>

            {/* Technical Competencies Matrix */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs text-[#89ceff] uppercase tracking-wider font-bold">
                02 // TECHNICAL EXPERTISE &amp; SKILLS
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded bg-[#0a0e17] border border-[#3b494c]/30">
                  <span className="text-[#00daf3] font-bold block mb-1">DATA ANALYSIS &amp; VISUALIZATION</span>
                  <span className="text-[#bac9cc] font-sans text-xs">
                    SQL, Microsoft Power BI, Microsoft Excel, Data Visualization (Bar, Pie, Donut, Clustered Bar,
                    Scatter, Line, Area charts), Table Joins &amp; Calculated Fields.
                  </span>
                </div>
                <div className="p-3 rounded bg-[#0a0e17] border border-[#3b494c]/30">
                  <span className="text-[#89ceff] font-bold block mb-1">DEVELOPMENT &amp; AI TOOLS</span>
                  <span className="text-[#bac9cc] font-sans text-xs">
                    Python (basics), HTML5, CSS3, JavaScript, Git / GitHub, Vercel, Netlify, Generative AI Studio,
                    GitHub Copilot Prompt Engineering, Antigravity AI Tool.
                  </span>
                </div>
              </div>
            </div>

            {/* Experience & Projects */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs text-[#89ceff] uppercase tracking-wider font-bold">
                03 // FEATURED PROJECTS
              </span>
              <div className="p-4 rounded-xl bg-[#1c1f29] border border-[#3b494c]/30 flex flex-col gap-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#dfe2ef] font-bold uppercase">
                    Projects Pipeline &bull; Coming Soon
                  </span>
                  <span className="text-[#a8ffd2]">In Progress</span>
                </div>
                <p className="font-sans text-xs text-[#bac9cc]">
                  New interactive data dashboards, Power BI analytics case studies, and full-stack web projects
                  are currently being curated and will be published shortly.
                </p>
              </div>
            </div>

            {/* Education, Certifications & Languages */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs text-[#89ceff] uppercase tracking-wider font-bold">
                04 // EDUCATION, CERTIFICATIONS &amp; LANGUAGES
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-[#1c1f29] border border-[#3b494c]/30 flex flex-col gap-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#dfe2ef] font-bold">
                      B.Tech, Computer Science Engineering
                    </span>
                    <span className="text-[#a8ffd2]">2025 – 2029</span>
                  </div>
                  <p className="font-sans text-xs text-[#bac9cc]">
                    Nxtwave Institute of Advanced Technology (NIAT), affiliated with Chalapathi Institute of Engineering, Visakhapatnam, India
                  </p>
                  <p className="font-sans text-xs text-[#849396]">
                    Relevant coursework: Data Structures, Database Management Systems, Statistics.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#1c1f29] border border-[#3b494c]/30 flex flex-col gap-2 font-mono text-xs">
                  <span className="text-[#dfe2ef] font-bold">CERTIFICATIONS &amp; LANGUAGES</span>
                  <ul className="flex flex-col gap-1 font-sans text-xs text-[#bac9cc]">
                    <li>&bull; Jul 2026 | Intro to Prompt Engineering with GitHub Copilot — Microsoft &amp; Simplilearn</li>
                    <li>&bull; Oct 2025 | Intro to Generative AI Studio — Google Cloud &amp; Simplilearn</li>
                    <li>&bull; Generative AI Mastermind — Outskill</li>
                    <li>&bull; Microsoft AI Skill Fest — Voucher Award</li>
                    <li className="pt-1 text-[#00daf3] font-mono text-xs">&bull; Languages: English, Telugu, Hindi</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-[#3b494c]/40 pt-4 font-mono text-xs">
              <span className="text-[#849396]">PROFILE STATUS: OPEN FOR DATA ANALYST INTERNSHIPS</span>
              <Magnetic strength={6} cursorType="button">
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor="button"
                  className="interactive-button-sheen px-5 py-2 rounded bg-[#00e5ff] text-[#00363d] font-bold uppercase hover:bg-[#c3f5ff] transition-colors cursor-pointer"
                >
                  Close Dossier
                </motion.button>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
