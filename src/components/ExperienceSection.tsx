import React from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';
import { Magnetic } from './Magnetic';
import { scrollToSection } from '../utils/scroll';
import { 
  Sparkles, 
  BarChart3, 
  Code2, 
  Zap, 
  ArrowRight, 
  Briefcase, 
  Compass, 
  Bot
} from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const opportunityAreas = [
    {
      title: 'AI & Generative AI',
      desc: 'Prompt engineering, LLM integration, intelligent tools & AI agent prototypes',
      icon: Sparkles,
      color: 'from-cyan-500/20 to-blue-500/20',
      border: 'hover:border-cyan-400/50',
      glow: 'group-hover:text-[#00e5ff]',
    },
    {
      title: 'Data Science',
      desc: 'Exploratory data analysis, predictive models, Python scripting & data preprocessing',
      icon: Bot,
      color: 'from-purple-500/20 to-indigo-500/20',
      border: 'hover:border-purple-400/50',
      glow: 'group-hover:text-[#c084fc]',
    },
    {
      title: 'Data Analytics',
      desc: 'Interactive Power BI dashboards, SQL querying, KPI metrics & executive reporting',
      icon: BarChart3,
      color: 'from-blue-500/20 to-cyan-500/20',
      border: 'hover:border-blue-400/50',
      glow: 'group-hover:text-[#38bdf8]',
    },
    {
      title: 'Web Development',
      desc: 'Modern responsive interfaces, HTML5, CSS3, JavaScript, Tailwind & full-stack apps',
      icon: Code2,
      color: 'from-emerald-500/20 to-teal-500/20',
      border: 'hover:border-emerald-400/50',
      glow: 'group-hover:text-[#a8ffd2]',
    },
    {
      title: 'Vibe Coding',
      desc: 'AI-assisted rapid prototyping, accelerated delivery & creative problem solving',
      icon: Zap,
      color: 'from-amber-500/20 to-purple-500/20',
      border: 'hover:border-amber-400/50',
      glow: 'group-hover:text-[#fde047]',
    },
  ];

  return (
    <section
      id="experience"
      className="relative w-full py-24 md:py-32 bg-[#040814] border-b border-cyan-500/10 overflow-hidden select-none"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-glow-drift" />
      <div className="absolute bottom-1/3 left-1/4 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-glow-drift-reverse" />

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
              // 05. EXPERIENCE &amp; OPPORTUNITIES
            </span>
          </div>

          <h2
            data-cursor="text"
            className="interactive-heading font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight"
          >
            Building My{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#805ad5] to-[#c084fc] drop-shadow-[0_0_25px_rgba(0,229,255,0.6)]">
              Career
            </span>
          </h2>

          {/* Glowing gradient underline bar */}
          <div className="w-20 h-[3px] rounded-full bg-gradient-to-r from-[#00e5ff] via-[#805ad5] to-[#c084fc] shadow-[0_0_14px_rgba(0,229,255,0.9)] mt-1" />

          <p className="font-sans text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mt-1 leading-relaxed">
            Currently exploring opportunities to learn, contribute, and grow through real-world experience.
          </p>
        </motion.div>

        {/* Main Experience & Opportunity Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center"
        >
          <TiltCard
            maxTilt={2.5}
            cursorType="card"
            spotlightColor="rgba(0, 229, 255, 0.16)"
            className="w-full max-w-5xl p-7 sm:p-10 md:p-14 rounded-3xl bg-[#070e1c]/85 border border-cyan-500/25 backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(0,210,255,0.12)] hover:border-cyan-400/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_60px_rgba(0,210,255,0.22),0_0_30px_rgba(168,85,247,0.18)] hover:-translate-y-1 transition-all duration-500 flex flex-col gap-10 relative overflow-hidden group"
          >
            {/* Top ambient highlight line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

            {/* Glowing radial backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-cyan-500/10 via-[#805ad5]/10 to-[#c084fc]/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            {/* Header & Status Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cyan-500/15">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center text-[#00e5ff] group-hover:scale-110 shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-300">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3
                    data-cursor="text"
                    className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight group-hover:text-[#00e5ff] transition-colors"
                  >
                    Open to Opportunities
                  </h3>
                  <span className="font-mono text-xs text-gray-400">
                    2nd-Year B.Tech Student &bull; Computer Science &amp; Engineering
                  </span>
                </div>
              </div>

              {/* Status Pill Badge */}
              <div className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[#a8ffd2] font-mono text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(168,255,210,0.2)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                <span>OPEN TO OPPORTUNITIES</span>
              </div>
            </div>

            {/* Main Message & Profile Statement */}
            <div className="flex flex-col gap-4 max-w-3xl">
              <p className="font-sans text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed font-normal">
                &ldquo;I’m currently a 2nd-year B.Tech student and have not joined a company yet. I’m actively looking for opportunities where I can apply my skills, gain real-world experience, and contribute to meaningful projects.&rdquo;
              </p>
              <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
                Available for internships, collaborative projects, and opportunities to grow through hands-on experience in fast-paced, innovation-driven environments.
              </p>
            </div>

            {/* Opportunity Areas Grid */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#00e5ff]" />
                <span className="font-mono text-xs font-bold text-gray-300 uppercase tracking-wider">
                  AREAS I AM EXPLORING &amp; TARGETING:
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {opportunityAreas.map((opp, idx) => {
                  const Icon = opp.icon;
                  return (
                    <motion.div
                      key={opp.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 + idx * 0.07 }}
                      data-cursor="card"
                      className={`p-4 rounded-2xl bg-[#060b17]/75 border border-white/5 ${opp.border} hover:bg-[#09142b]/95 hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(0,210,255,0.2),0_8px_20px_rgba(0,0,0,0.5)] transition-all duration-250 flex flex-col gap-2.5 group/opp select-none cursor-default`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${opp.color} border border-white/10 flex items-center justify-center text-white group-hover/opp:scale-115 group-hover/opp:rotate-3 shadow-[0_0_12px_rgba(0,229,255,0.2)] transition-transform duration-250`}>
                          <Icon className="w-4 h-4 text-[#00e5ff]" />
                        </div>
                        <h4 className={`font-sans font-bold text-sm sm:text-base text-white ${opp.glow} transition-colors`}>
                          {opp.title}
                        </h4>
                      </div>
                      <p className="font-sans text-xs text-gray-400 leading-relaxed">
                        {opp.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Call To Action Footer Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-cyan-500/15">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>STATUS: OPEN FOR INTERNSHIPS &bull; 2026</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Secondary CTA: View Skills */}
                <Magnetic strength={5} cursorType="button">
                  <button
                    onClick={() => scrollToSection('skills')}
                    data-cursor="button"
                    className="interactive-button-sheen px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white font-sans text-xs sm:text-sm font-bold tracking-wider uppercase border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_16px_rgba(0,229,255,0.2)] transition-all duration-200 cursor-pointer"
                  >
                    VIEW MY SKILLS &rarr;
                  </button>
                </Magnetic>

                {/* Primary CTA: Let's Connect */}
                <Magnetic strength={6} cursorType="button">
                  <button
                    onClick={() => scrollToSection('contact')}
                    data-cursor="button"
                    className="interactive-button-sheen group/btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00d2ff] via-[#6366f1] to-[#a855f7] text-white font-sans text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(0,210,255,0.45)] hover:shadow-[0_0_32px_rgba(0,210,255,0.75)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    <span>LET&apos;S CONNECT</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
                  </button>
                </Magnetic>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};
