import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Magnetic } from './Magnetic';
import { TiltCard } from './TiltCard';

interface TimelineItem {
  id: string;
  type: 'education' | 'certification' | 'role';
  title: string;
  issuer: string;
  period: string;
  location?: string;
  credentialId?: string;
  description: string;
  skills: string[];
  status: 'In Progress' | 'Verified' | 'Completed';
}

export const JourneySection: React.FC = () => {
  const [filter, setFilter] = useState<'current' | 'education' | 'certification'>('current');

  const timelineData: TimelineItem[] = [
    {
      id: 'btech',
      type: 'education',
      title: 'B.Tech in Computer Science & Engineering',
      issuer: 'NxtWave of Innovation in Advanced Technologies (NIAT)',
      period: 'Aug 2025 – Aug 2029',
      location: 'Visakhapatnam, Andhra Pradesh, India',
      description: 'Undergraduate engineering academics focusing on core Computer Science, Data Structures & Algorithms, Relational Database Management Systems (RDBMS), and modern software development.',
      skills: ['HTML5 / CSS3', 'JavaScript', 'Python', 'Data Structures', 'RDBMS', 'SQL Modeling', 'Algorithms'],
      status: 'In Progress',
    },
    {
      id: 'inter-sriviswa',
      type: 'education',
      title: 'Intermediate / Higher Secondary Education (MPC)',
      issuer: 'Sri Viswa Junior College',
      period: 'Apr 2023 – Apr 2025',
      location: 'Visakhapatnam, Andhra Pradesh, India',
      description: 'Completed higher secondary education specializing in Mathematics, Physics, and Chemistry (MPC) with rigorous analytical training and mathematical problem-solving.',
      skills: ['Mathematics', 'Physics', 'Chemistry', 'Analytical Problem Solving', 'Logical Reasoning'],
      status: 'Completed',
    },
    {
      id: 'school-sivasivani',
      type: 'education',
      title: 'Secondary School Certificate (10th Standard)',
      issuer: 'Siva Sivani Public School - Ukkunagaram',
      period: 'Mar 2022 – Mar 2023',
      location: 'Visakhapatnam, Andhra Pradesh, India',
      description: 'Completed secondary school education with academic excellence across Mathematics, Science, foundational computer literacy, and communication.',
      skills: ['Mathematics', 'Science', 'Computer Literacy', 'Foundational Analytics'],
      status: 'Completed',
    },
    {
      id: 'cert-powerbi',
      type: 'certification',
      title: 'Microsoft Certified: Power BI Data Analyst Associate',
      issuer: 'Microsoft / Data Analytics Training',
      period: '2025 – 2026',
      credentialId: 'MS-PL300-VERIFIED',
      description: 'Mastered designing dynamic Power BI reports, DAX calculated measures, cross-filtering parameters, drill-down dashboards, and enterprise data models.',
      skills: ['Power BI', 'DAX Measures', 'Drill-Downs', 'Data Slicers', 'Executive Reporting'],
      status: 'Verified',
    },
    {
      id: 'cert-prompt-eng',
      type: 'certification',
      title: 'Intro to Prompt Engineering with GitHub Copilot',
      issuer: 'Microsoft & Simplilearn',
      period: 'Jul 2026',
      credentialId: 'MS-COPILOT-PROMPT',
      description: 'Advanced prompt engineering techniques, AI-assisted development workflows, and automated test synthesis with GitHub Copilot.',
      skills: ['Prompt Engineering', 'GitHub Copilot', 'Generative AI', 'AI Tooling'],
      status: 'Verified',
    },
    {
      id: 'cert-gcp-genai',
      type: 'certification',
      title: 'Intro to Generative AI Studio & Cloud Analytics',
      issuer: 'Google Cloud & Simplilearn',
      period: 'Oct 2025',
      credentialId: 'GCP-GENAI-STUDIO',
      description: 'Hands-on training in Generative AI Studio, cloud database architectures, scalable analytics infrastructure, and data pipeline fundamentals.',
      skills: ['Generative AI Studio', 'Cloud Databases', 'Data Pipelines', 'GCP Storage'],
      status: 'Verified',
    },
    {
      id: 'cert-genai-mastermind',
      type: 'certification',
      title: 'Generative AI Mastermind',
      issuer: 'Outskill Academy',
      period: '2025',
      credentialId: 'OUTSKILL-GENAI-2025',
      description: 'Mastery in building intelligent AI agents, vibe coding rapid prototypes, LLM integration, and generative AI productivity stacks.',
      skills: ['Gen AI Prototyping', 'Vibe Coding', 'LLM Integration', 'AI Agents'],
      status: 'Verified',
    },
    {
      id: 'cert-sql',
      type: 'certification',
      title: 'SQL Database Management & Advanced Querying',
      issuer: 'Simplilearn SkillUp',
      period: '2025',
      credentialId: 'SL-SQL-ADV-902',
      description: 'Comprehensive certification in database normalization, multi-table JOINs, subqueries, grouping aggregations, and query optimization.',
      skills: ['SQL Joins', 'Aggregations', 'Schema Design', 'Data Integrity', 'MySQL'],
      status: 'Verified',
    },
    {
      id: 'cert-outskill-fs',
      type: 'certification',
      title: 'Full-Stack Web Development & Modern Dev Tools',
      issuer: 'Outskill Academy',
      period: '2025',
      credentialId: 'OUTSKILL-FS-2025',
      description: 'Project-based mastery of HTML5, modern CSS layouts, JavaScript ES6+, version control with Git/GitHub, and cloud deployment pipelines.',
      skills: ['HTML5 / CSS3', 'JavaScript', 'Git / GitHub', 'Vercel / Netlify', 'Responsive UI'],
      status: 'Verified',
    },
  ];

  const filteredItems = filter === 'current'
    ? timelineData.filter(item => item.id === 'btech' || item.status === 'In Progress')
    : timelineData.filter(item => item.type === filter);

  return (
    <section
      id="journey"
      className="relative w-full py-24 md:py-32 bg-[#040814] border-b border-cyan-500/10 overflow-hidden select-none"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-glow-drift" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-glow-drift-reverse" />

      {/* Grid line overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d2ff06_1px,transparent_1px),linear-gradient(to_bottom,#00d2ff06_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col gap-14">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3"
        >
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#b366ff] shadow-[0_0_8px_#b366ff] animate-pulse" />
            <span 
              data-cursor="text"
              className="interactive-heading font-mono text-xs sm:text-sm text-[#b366ff] uppercase tracking-[0.3em] font-bold drop-shadow-[0_0_10px_rgba(179,102,255,0.6)]"
            >
              // 04. MY JOURNEY
            </span>
          </div>

          <h2 
            data-cursor="text"
            className="interactive-heading font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight"
          >
            Journey &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b366ff] via-[#00e5ff] to-[#a8ffd2] drop-shadow-[0_0_25px_rgba(0,229,255,0.6)]">
              Credentials
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed">
            A timeline of my academic journey, certifications, skills, and milestones along the way.
          </p>
        </motion.div>

        {/* Filter Navigation with Magnetic interaction */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5"
        >
          {[
            { id: 'current', label: 'Current' },
            { id: 'education', label: 'Education' },
            { id: 'certification', label: 'Certifications & Credentials' },
          ].map((tab) => (
            <Magnetic key={tab.id} strength={5} cursorType="button">
              <button
                onClick={() => setFilter(tab.id as any)}
                data-cursor="button"
                className={`interactive-button-sheen px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-250 cursor-pointer ${
                  filter === tab.id
                    ? 'bg-gradient-to-r from-[#00d2ff] to-[#b366ff] text-white shadow-[0_0_24px_rgba(0,210,255,0.55)] scale-105'
                    : 'bg-[#091122]/80 text-gray-400 border border-white/10 hover:border-cyan-400/50 hover:text-white hover:shadow-[0_0_16px_rgba(0,210,255,0.2)]'
                }`}
              >
                {tab.label}
              </button>
            </Magnetic>
          ))}
        </motion.div>

        {/* Futuristic Timeline Layout with 3D TiltCards */}
        <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 flex flex-col gap-10">
          {filteredItems.map((item, idx) => {
            const isEdu = item.type === 'education';
            const Icon = isEdu ? GraduationCap : Award;

            return (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Glowing Node on Timeline */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-6 w-6 h-6 rounded-full bg-[#040814] border-2 border-cyan-400 group-hover:border-[#b366ff] group-hover:scale-125 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.7)] group-hover:shadow-[0_0_25px_rgba(179,102,255,0.9)] transition-all duration-300">
                  <span className="w-2 h-2 rounded-full bg-[#00e5ff] group-hover:bg-[#b366ff] animate-pulse" />
                </div>

                {/* Glassmorphic Card with TiltCard */}
                <TiltCard
                  maxTilt={3}
                  cursorType="card"
                  spotlightColor={isEdu ? 'rgba(0, 229, 255, 0.15)' : 'rgba(179, 102, 255, 0.16)'}
                  className="interactive-card p-6 sm:p-8 rounded-2xl bg-[#091122]/75 border border-cyan-500/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(0,229,255,0.22),0_12px_36px_rgba(0,0,0,0.7)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-cyan-500/15">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center text-[#00e5ff] group-hover:scale-115 group-hover:rotate-3 shadow-[0_0_15px_rgba(0,229,255,0.25)] transition-transform duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-sans font-bold text-xl text-white group-hover:text-[#00e5ff] transition-colors">
                          {item.title}
                        </h3>
                        <span className="font-mono text-xs text-gray-300">{item.issuer}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 px-3 py-1 rounded-full group-hover:border-cyan-400 transition-colors">
                        <Calendar className="w-3 h-3" />
                        <span>{item.period}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#a8ffd2] bg-emerald-950/40 border border-emerald-500/40 px-3 py-1 rounded-full group-hover:border-emerald-400 transition-colors">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{item.status}</span>
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-sm text-gray-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        data-cursor="badge"
                        className="interactive-badge font-mono text-[11px] text-gray-300 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

