import React from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 bg-[#040814] border-b border-cyan-500/10 overflow-hidden select-none"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-glow-drift" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-glow-drift-reverse" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d2ff05_1px,transparent_1px),linear-gradient(to_bottom,#00d2ff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col gap-16">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-3"
        >
          <h2 
            data-cursor="text"
            className="interactive-heading font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight"
          >
            <span className="text-[#00e5ff] drop-shadow-[0_0_20px_rgba(0,229,255,0.7)]">About</span>{' '}
            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]">Me</span>
          </h2>

          {/* Glowing gradient underline bar */}
          <div className="w-20 h-[3px] rounded-full bg-gradient-to-r from-[#00e5ff] via-[#805ad5] to-[#c084fc] shadow-[0_0_12px_rgba(0,229,255,0.9)]" />

          <p className="font-sans text-sm sm:text-base text-gray-400 max-w-lg mt-1">
            A brief glimpse into who I am and what fuels my creative drive.
          </p>
        </motion.div>

        {/* Core Layout: Profile Photo (Left) + Story & Metrics (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Glowing Profile Picture Frame with 3D Tilt */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <TiltCard 
              maxTilt={4.5} 
              cursorType="image"
              spotlightColor="rgba(0, 229, 255, 0.18)"
              className="relative w-full max-w-[380px] sm:max-w-[420px] rounded-3xl p-1 bg-gradient-to-tr from-[#00d2ff] via-[#805ad5] to-[#c084fc] shadow-[0_0_50px_rgba(0,210,255,0.35),0_0_35px_rgba(168,85,247,0.35)] group transition-all duration-500 hover:shadow-[0_0_65px_rgba(0,210,255,0.55),0_0_45px_rgba(168,85,247,0.55)] hover:-translate-y-1"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-[22px] bg-[#070e1c]">
                <img
                  src="/assets/profile.jpg"
                  alt="Chowdivada Arun Kanth"
                  data-cursor="image"
                  className="w-full h-[380px] sm:h-[440px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </TiltCard>
          </motion.div>

          {/* Right Column: Bio Details & 3 Metric Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Headline */}
            <h3 
              data-cursor="text"
              className="interactive-heading font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight"
            >
              AI &amp; Data-Driven Developer
            </h3>

            {/* Narrative Paragraphs */}
            <div className="flex flex-col gap-4 text-gray-300 font-sans text-sm sm:text-base leading-relaxed">
              <p>
                Hi, I&apos;m a 2nd-year B.Tech student and an AI &amp; Data-Driven Developer passionate about building modern digital experiences and exploring AI, Data Science, and Web Development. I enjoy turning ideas into interactive and intelligent applications while continuously learning, experimenting, and working with emerging technologies.
              </p>
              <p>
                I also enjoy vibe coding—using AI-assisted development to quickly turn ideas into functional prototypes, experiment with new concepts, and bring creative projects to life. I love combining AI, data, code, and creativity to build practical solutions and meaningful digital experiences.
              </p>
            </div>

            {/* 3 Metric / Stat Cards with 3D Tilt and Spotlight */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              <TiltCard 
                maxTilt={4}
                cursorType="card"
                className="p-4 sm:p-5 rounded-2xl bg-[#070e1c]/90 border border-cyan-500/20 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:border-cyan-400/50 hover:shadow-[0_12px_30px_rgba(0,229,255,0.2)] hover:-translate-y-1 transition-all duration-300 group cursor-default"
              >
                <span className="font-sans font-extrabold text-2xl sm:text-3xl text-[#00e5ff] drop-shadow-[0_0_10px_rgba(0,229,255,0.6)] transition-transform duration-300 group-hover:scale-110">
                  2nd
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">
                  YEAR B.TECH
                </span>
              </TiltCard>

              <TiltCard 
                maxTilt={4}
                cursorType="card"
                className="p-4 sm:p-5 rounded-2xl bg-[#070e1c]/90 border border-cyan-500/20 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:border-cyan-400/50 hover:shadow-[0_12px_30px_rgba(0,229,255,0.2)] hover:-translate-y-1 transition-all duration-300 group cursor-default"
              >
                <span className="font-sans font-extrabold text-2xl sm:text-3xl text-[#00e5ff] drop-shadow-[0_0_10px_rgba(0,229,255,0.6)] transition-transform duration-300 group-hover:scale-110">
                  100%
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">
                  CURIOSITY
                </span>
              </TiltCard>

              <TiltCard 
                maxTilt={4}
                cursorType="card"
                className="p-4 sm:p-5 rounded-2xl bg-[#070e1c]/90 border border-cyan-500/20 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:border-cyan-400/50 hover:shadow-[0_12px_30px_rgba(0,229,255,0.2)] hover:-translate-y-1 transition-all duration-300 group cursor-default"
              >
                <span className="font-sans font-extrabold text-2xl sm:text-3xl text-[#00e5ff] drop-shadow-[0_0_20px_rgba(0,229,255,0.6)] transition-transform duration-300 group-hover:scale-110">
                  5+
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">
                  CORE SKILLS
                </span>
              </TiltCard>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

