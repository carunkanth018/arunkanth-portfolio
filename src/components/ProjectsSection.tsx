import React from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';
import { Sparkles, Code2, Database, BarChart3, Layers } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const focusAreas = [
    { label: 'AI & Machine Learning', icon: Sparkles },
    { label: 'Data Science & Analytics', icon: BarChart3 },
    { label: 'Full-Stack Web Development', icon: Code2 },
    { label: 'Databases & System Architecture', icon: Database },
  ];

  return (
    <section
      id="projects"
      className="relative w-full py-24 md:py-32 bg-[#040814] border-b border-cyan-500/10 overflow-hidden select-none"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-glow-drift" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-glow-drift-reverse" />

      {/* Grid line overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d2ff05_1px,transparent_1px),linear-gradient(to_bottom,#00d2ff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col gap-14">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-3"
        >
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] animate-pulse" />
            <span
              data-cursor="text"
              className="interactive-heading font-mono text-xs sm:text-sm text-[#00e5ff] uppercase tracking-[0.3em] font-bold drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]"
            >
              // 03. PORTFOLIO SHOWCASE
            </span>
          </div>

          <h2
            data-cursor="text"
            className="interactive-heading font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight"
          >
            Projects
          </h2>

          {/* Glowing gradient underline bar */}
          <div className="w-20 h-[3px] rounded-full bg-gradient-to-r from-[#00e5ff] via-[#805ad5] to-[#c084fc] shadow-[0_0_14px_rgba(0,229,255,0.9)]" />

          <p className="font-sans text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mt-1">
            Building something worth showcasing.
          </p>
        </motion.div>

        {/* Centered Premium Coming Soon Experience */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center"
        >
          <TiltCard
            maxTilt={3}
            cursorType="card"
            spotlightColor="rgba(0, 229, 255, 0.16)"
            className="w-full max-w-4xl p-8 sm:p-12 md:p-16 rounded-3xl bg-[#070e1c]/80 border border-cyan-500/25 backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(0,210,255,0.15)] hover:border-cyan-400/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_60px_rgba(0,210,255,0.25),0_0_30px_rgba(168,85,247,0.2)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col items-center text-center gap-8 relative overflow-hidden group"
          >
            {/* Top ambient highlight line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

            {/* Glowing radial backdrop inside card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-cyan-500/15 via-[#805ad5]/15 to-[#c084fc]/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            {/* Futuristic Holographic Visual Ring Element */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
              {/* Outer Rotating Dashed Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/40 animate-[spin_18s_linear_infinite]" />

              {/* Inner Counter-Rotating Gradient Ring */}
              <div className="absolute inset-2 rounded-full border border-purple-400/40 border-t-[#00e5ff] border-r-transparent animate-[spin_10s_linear_infinite_reverse]" />

              {/* Core Glowing Node */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#00d2ff]/30 to-[#805ad5]/30 border border-cyan-400/50 backdrop-blur-md flex items-center justify-center text-[#00e5ff] shadow-[0_0_25px_rgba(0,229,255,0.6)] group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(0,229,255,0.9)] transition-all duration-500">
                <Layers className="w-7 h-7 sm:w-8 sm:h-8 animate-pulse text-[#00e5ff]" />
              </div>
            </div>

            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] animate-pulse" />
              <span>IN ACTIVE DEVELOPMENT</span>
            </div>

            {/* Main Coming Soon Heading */}
            <div className="flex flex-col gap-3 max-w-2xl">
              <h3
                data-cursor="text"
                className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#805ad5] to-[#c084fc] drop-shadow-[0_0_30px_rgba(0,229,255,0.4)] tracking-tight"
              >
                COMING SOON
              </h3>

              <p className="font-sans text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto">
                I’m currently building and refining projects across AI, Data Science, Data Analytics, and Web Development. New projects will be added here soon.
              </p>
            </div>

            {/* Focus Area Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 max-w-2xl">
              {focusAreas.map((area, idx) => {
                const Icon = area.icon;
                return (
                  <div
                    key={idx}
                    data-cursor="badge"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-950/30 text-gray-300 hover:text-white font-sans text-xs sm:text-sm transition-all duration-300"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#00e5ff]" />
                    <span>{area.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Telemetry / Live Status Indicator */}
            <div className="flex items-center gap-2.5 pt-4 text-xs font-mono text-gray-400 border-t border-white/5 w-full justify-center">
              <span className="text-[#00e5ff] font-bold">SYSTEM STATUS:</span>
              <span>Engineering in progress</span>
              <span className="inline-flex gap-1 items-center ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#805ad5] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc] animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};
