import React from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';

// ============================================================================
// EDITABLE SKILLS DATA STRUCTURE & LOGICAL CATEGORIES
// ============================================================================

export interface TechnologySkill {
  name: string;
  level: number; // 0 to 100%
  category: string;
  iconType: 'html' | 'css' | 'javascript' | 'tailwindcss' | 'python' | 'cpp' | 'sql' | 'powerbi' | 'excel' | 'mongodb' | 'postgresql' | 'git' | 'github' | 'datascience';
}

export interface SkillCategoryGroup {
  id: string;
  title: string;
  dotColor: string;
  glowColor: string;
  skills: TechnologySkill[];
}

export interface AdditionalSkill {
  title: string;
  level: number; // 0 to 100%
  description?: string;
}

// 1. FRONTEND DEVELOPMENT (4 skills)
export const CATEGORY_FRONTEND: SkillCategoryGroup = {
  id: 'frontend',
  title: 'FRONTEND DEVELOPMENT',
  dotColor: 'bg-[#00e5ff]',
  glowColor: 'shadow-[0_0_8px_#00e5ff]',
  skills: [
    { name: 'HTML', level: 90, category: 'Frontend Development', iconType: 'html' },
    { name: 'CSS', level: 85, category: 'Frontend Development', iconType: 'css' },
    { name: 'JavaScript', level: 85, category: 'Frontend Development', iconType: 'javascript' },
    { name: 'Tailwind CSS', level: 90, category: 'Frontend Development', iconType: 'tailwindcss' },
  ],
};

// 2. DATA & ANALYTICS (4 skills)
export const CATEGORY_DATA_ANALYTICS: SkillCategoryGroup = {
  id: 'data-analytics',
  title: 'DATA & ANALYTICS',
  dotColor: 'bg-[#805ad5]',
  glowColor: 'shadow-[0_0_8px_#805ad5]',
  skills: [
    { name: 'SQL', level: 80, category: 'Data & Analytics', iconType: 'sql' },
    { name: 'Power BI', level: 80, category: 'Data & Analytics', iconType: 'powerbi' },
    { name: 'Excel', level: 85, category: 'Data & Analytics', iconType: 'excel' },
    { name: 'Data Science', level: 75, category: 'Data & Analytics', iconType: 'datascience' },
  ],
};

// 3. BACKEND DEVELOPMENT (2 skills)
export const CATEGORY_BACKEND: SkillCategoryGroup = {
  id: 'backend',
  title: 'BACKEND DEVELOPMENT',
  dotColor: 'bg-[#38bdf8]',
  glowColor: 'shadow-[0_0_8px_#38bdf8]',
  skills: [
    { name: 'Python', level: 85, category: 'Backend Development', iconType: 'python' },
    { name: 'C++', level: 80, category: 'Backend Development', iconType: 'cpp' },
  ],
};

// 4. DATABASES (2 skills)
export const CATEGORY_DATABASES: SkillCategoryGroup = {
  id: 'databases',
  title: 'DATABASES',
  dotColor: 'bg-[#10AA50]',
  glowColor: 'shadow-[0_0_8px_#10AA50]',
  skills: [
    { name: 'MongoDB', level: 75, category: 'Databases', iconType: 'mongodb' },
    { name: 'PostgreSQL', level: 75, category: 'Databases', iconType: 'postgresql' },
  ],
};

// 5. TOOLS & VERSION CONTROL (2 skills)
export const CATEGORY_TOOLS: SkillCategoryGroup = {
  id: 'tools',
  title: 'TOOLS & VERSION CONTROL',
  dotColor: 'bg-[#F05032]',
  glowColor: 'shadow-[0_0_8px_#F05032]',
  skills: [
    { name: 'Git', level: 80, category: 'Tools & Version Control', iconType: 'git' },
    { name: 'GitHub', level: 85, category: 'Tools & Version Control', iconType: 'github' },
  ],
};

export const ADDITIONAL_SKILLS_DATA: AdditionalSkill[] = [
  { title: 'UI / UX Design', level: 85, description: 'User-centric wireframing & intuitive interface architectures' },
  { title: 'Interaction Design', level: 90, description: 'Fluid micro-interactions, spring physics & responsive feedback' },
  { title: '3D Web Assets', level: 75, description: 'Spatial visual depth, lighting shaders & modern asset workflows' },
];

// ============================================================================
// CUSTOM TECH ICONS (Vector Branding Assets)
// ============================================================================

const TechIcon: React.FC<{ type: TechnologySkill['iconType']; className?: string }> = ({ type, className = "w-7 h-7" }) => {
  switch (type) {
    case 'html':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2L6 20L12 22L18 20L20 2H4Z" fill="#E44D26" />
          <path d="M12 3.8V20.1L16.4 18.6L18 3.8H12Z" fill="#F16529" />
          <path d="M7.7 6.8H16.3L16 9.8H12V10.2H15.9L15.4 14.8L12 15.8V16.8L15.3 15.7L15.5 13.2H8.3L7.7 6.8Z" fill="#EBEBEB" />
          <path d="M12 6.8H7.7L8.3 13.2H12V10.2H9.2L9 8.2H12V6.8ZM12 15.8L8.6 14.8L8.4 12.8H7.2L7.5 15.7L12 16.8V15.8Z" fill="#FFFFFF" />
        </svg>
      );
    case 'css':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2L6 20L12 22L18 20L20 2H4Z" fill="#1572B6" />
          <path d="M12 3.8V20.1L16.4 18.6L18 3.8H12Z" fill="#33A9DC" />
          <path d="M12 6.8H7.7L8 10.2H12V6.8ZM12 13.2H9.2L9.4 14.8L12 15.8V16.8L7.5 15.7L7.2 11.8H12V13.2ZM12 6.8V8.2H15.9L15.7 10.2H12V11.8H15.5L15.2 15.7L12 16.8V15.8L14.6 14.8L14.8 13.2H16.3L16 6.8H12Z" fill="#FFFFFF" />
        </svg>
      );
    case 'javascript':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path d="M7 17.5C7.5 18.3 8.3 18.8 9.5 18.8C10.7 18.8 11.5 18.1 11.5 16.8V11.5H9.8V16.8C9.8 17.3 9.4 17.5 9 17.5C8.6 17.5 8.2 17.2 8 16.7L7 17.5ZM13.2 17.2C13.8 18.2 14.9 18.8 16.4 18.8C18.2 18.8 19.3 17.8 19.3 16.2C19.3 14.7 18.4 14.1 16.8 13.4L16.1 13.1C15.2 12.7 14.7 12.3 14.7 11.7C14.7 11 15.3 10.5 16.2 10.5C17 10.5 17.6 10.8 18.1 11.6L19.4 10.7C18.6 9.4 17.5 8.9 16.2 8.9C14.4 8.9 13.2 10 13.2 11.7C13.2 13.1 14.1 13.8 15.5 14.4L16.2 14.7C17.2 15.1 17.8 15.6 17.8 16.3C17.8 17.1 17.1 17.6 16.2 17.6C15.1 17.6 14.4 17 14 16.2L13.2 17.2Z" fill="#000000" />
        </svg>
      );
    case 'tailwindcss':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#38BDF8" />
        </svg>
      );
    case 'python':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.9 2C8.6 2 8.8 3.4 8.8 3.4L8.8 4.9H12.1V5.4H5.3C5.3 5.4 2 5 2 8.4C2 11.8 4.9 11.6 4.9 11.6H6.1V10C6.1 8.2 7.7 8.2 7.7 8.2H12.1C13.7 8.2 13.7 6.8 13.7 6.8V3.4C13.7 3.4 13.9 2 11.9 2ZM10.4 3.1C10.8 3.1 11.1 3.4 11.1 3.8C11.1 4.2 10.8 4.5 10.4 4.5C10 4.5 9.7 4.2 9.7 3.8C9.7 3.4 10 3.1 10.4 3.1Z" fill="#3776AB" />
          <path d="M12.1 22C15.4 22 15.2 20.6 15.2 20.6L15.2 19.1H11.9V18.6H18.7C18.7 18.6 22 19 22 15.6C22 12.2 19.1 12.4 19.1 12.4H17.9V14C17.9 15.8 16.3 15.8 16.3 15.8H11.9C10.3 15.8 10.3 17.2 10.3 17.2V20.6C10.3 20.6 10.1 22 12.1 22ZM13.6 20.9C13.2 20.9 12.9 20.6 12.9 20.2C12.9 19.8 13.2 19.5 13.6 19.5C14 19.5 14.3 19.8 14.3 20.2C14.3 20.6 14 20.9 13.6 20.9Z" fill="#FFD43B" />
        </svg>
      );
    case 'cpp':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z" fill="#00599C" />
          <path d="M12 4.2L18.8 8.1V15.9L12 19.8L5.2 15.9V8.1L12 4.2Z" fill="#004482" />
          <path d="M11 9C9.9 9 9 9.9 9 11V13C9 14.1 9.9 15 11 15C11.7 15 12.3 14.6 12.7 14L14 15C13.3 16.2 12.2 17 11 17C8.8 17 7 15.2 7 13V11C7 8.8 8.8 7 11 7C12.2 7 13.3 7.8 14 9L12.7 10C12.3 9.4 11.7 9 11 9Z" fill="#FFFFFF" />
          <path d="M15 11.5H16.5V10H17.5V11.5H19V12.5H17.5V14H16.5V12.5H15V11.5ZM18.5 11.5H20V10H21V11.5H22.5V12.5H21V14H20V12.5H18.5V11.5Z" fill="#00e5ff" />
        </svg>
      );
    case 'sql':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="6" rx="9" ry="3" fill="#00e5ff" fillOpacity="0.25" stroke="#00e5ff" strokeWidth="1.8" />
          <path d="M3 6V12C3 13.66 7.03 15 12 15C16.97 15 21 13.66 21 12V6" stroke="#00d2ff" strokeWidth="1.8" />
          <path d="M3 12V18C3 19.66 7.03 21 12 21C16.97 21 21 19.66 21 18V12" stroke="#805ad5" strokeWidth="1.8" />
          <path d="M12 9V15M8 12H16" stroke="#a8ffd2" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        </svg>
      );
    case 'powerbi':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="12" width="4" height="9" rx="1.5" fill="#E8B000" />
          <rect x="10" y="8" width="4" height="13" rx="1.5" fill="#F2C811" />
          <rect x="17" y="3" width="4" height="18" rx="1.5" fill="#F9DE5A" />
        </svg>
      );
    case 'excel':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="20" height="18" rx="3" fill="#107C41" />
          <path d="M7 7.5L11 12L7 16.5H9.5L12 13.5L14.5 16.5H17L13 12L17 7.5H14.5L12 10.5L9.5 7.5H7Z" fill="#FFFFFF" />
        </svg>
      );
    case 'mongodb':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1.5C12 1.5 6 7.5 6 13.5C6 17.5 9 20.8 12 22.5C15 20.8 18 17.5 18 13.5C18 7.5 12 1.5 12 1.5Z" fill="#13AA52" />
          <path d="M12 2V22C12 22 12.2 21.9 12.5 21.6C14.8 19.8 17 16.5 17 13.5C17 8.2 12 2 12 2Z" fill="#10AA50" fillOpacity="0.8" />
          <path d="M12 22V1.5C12 1.5 11.8 1.6 11.5 2C7 6.5 7 13.5 7 13.5C7 16.5 9.2 19.8 11.5 21.6C11.8 21.9 12 22 12 22Z" fill="#47A248" />
          <path d="M12 22.5V17" stroke="#FFE9A7" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case 'postgresql':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#336791" fillOpacity="0.2" />
          <path d="M12 3C7.5 3 4 6.5 4 11C4 13.5 5.2 15.7 7 17.1V21L10.5 19.5C11 19.7 11.5 19.8 12 19.8C16.5 19.8 20 16.3 20 11.8C20 7.3 16.5 3 12 3Z" fill="#336791" />
          <path d="M10 8.5C9.2 8.5 8.5 9.2 8.5 10C8.5 10.8 9.2 11.5 10 11.5C10.8 11.5 11.5 10.8 11.5 10C11.5 9.2 10.8 8.5 10 8.5ZM14 8.5C13.2 8.5 12.5 9.2 12.5 10C12.5 10.8 13.2 11.5 14 11.5C14.8 11.5 15.5 10.8 15.5 10C15.5 9.2 14.8 8.5 14 8.5Z" fill="#FFFFFF" />
          <path d="M9 14.5C10 16 14 16 15 14.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'git':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.7 10.7L13.3 2.3C12.9 1.9 12.3 1.9 11.9 2.3L9.6 4.6L12.3 7.3C13.1 7 14 7.2 14.6 7.8C15.2 8.4 15.4 9.3 15.1 10.1L17.7 12.7C18.5 12.4 19.4 12.6 20 13.2C20.8 14 20.8 15.2 20 16C19.2 16.8 18 16.8 17.2 16C16.6 15.4 16.4 14.5 16.7 13.7L14.3 11.3V16.3C14.5 16.6 14.6 17 14.6 17.4C14.6 18.6 13.6 19.6 12.4 19.6C11.2 19.6 10.2 18.6 10.2 17.4C10.2 16.5 10.7 15.8 11.4 15.4V10.4L8.8 13C8.5 13.3 8.1 13.5 7.7 13.5C7.3 13.5 6.9 13.3 6.6 13L2.3 8.7C1.9 8.3 1.9 7.7 2.3 7.3L6.9 2.7C7.3 2.3 7.9 2.3 8.3 2.7L10.6 5L7.9 7.7C7.1 8 6.9 8.9 7.5 9.5C8.1 10.1 9 10 9.4 9.2L12 6.6L2.3 16.3C1.9 16.7 1.9 17.3 2.3 17.7L10.7 26.1C11.1 26.5 11.7 26.5 12.1 26.1" fill="#F05032" />
          <path d="M21.7 10.7L13.3 2.3C12.9 1.9 12.3 1.9 11.9 2.3L2.3 11.9C1.9 12.3 1.9 12.9 2.3 13.3L10.7 21.7C11.1 22.1 11.7 22.1 12.1 21.7L21.7 12.1C22.1 11.7 22.1 11.1 21.7 10.7Z" fill="#F05032" />
          <circle cx="15.8" cy="14.6" r="1.6" fill="#FFFFFF" />
          <circle cx="12.4" cy="17.4" r="1.6" fill="#FFFFFF" />
          <circle cx="12.4" cy="8.2" r="1.6" fill="#FFFFFF" />
          <path d="M12.4 9.8V15.8" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M12.4 12L14.6 14.2" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      );
    case 'github':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#181717" stroke="#ffffff" strokeOpacity="0.2" />
          <path fillRule="evenodd" clipRule="evenodd" d="M12 4C7.58 4 4 7.58 4 12C4 15.54 6.29 18.53 9.47 19.59C9.87 19.66 10.02 19.42 10.02 19.21C10.02 19.02 10.01 18.39 10.01 17.72C8 18.09 7.47 17.21 7.31 16.76C7.22 16.53 6.83 15.82 6.49 15.63C6.21 15.48 5.81 15.11 6.48 15.1C7.11 15.09 7.56 15.68 7.71 15.92C8.43 17.13 9.58 16.79 9.97 16.61C10.04 16.09 10.25 15.74 10.48 15.54C8.73 15.34 6.9 14.66 6.9 11.64C6.9 10.78 7.21 10.08 7.71 9.53C7.63 9.33 7.36 8.52 7.79 7.44C7.79 7.44 8.45 7.23 9.97 8.26C10.6 8.08 11.27 7.99 11.94 7.99C12.61 7.99 13.28 8.08 13.91 8.26C15.43 7.22 16.09 7.44 16.09 7.44C16.52 8.52 16.25 9.33 16.17 9.53C16.67 10.08 16.98 10.77 16.98 11.64C16.98 14.68 15.14 15.34 13.39 15.54C13.68 15.79 13.93 16.27 13.93 17.02C13.93 18.09 13.92 18.95 13.92 19.21C13.92 19.42 14.07 19.67 14.47 19.59C17.65 18.52 19.94 15.53 19.94 12C19.94 7.58 16.36 4 12 4Z" fill="#FFFFFF" />
        </svg>
      );
    case 'datascience':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" fill="#00e5ff" />
          <circle cx="5" cy="7" r="2.2" fill="#805ad5" />
          <circle cx="19" cy="7" r="2.2" fill="#00d2ff" />
          <circle cx="5" cy="17" r="2.2" fill="#c084fc" />
          <circle cx="19" cy="17" r="2.2" fill="#00e5ff" />
          <path d="M5 7L12 12M19 7L12 12M5 17L12 12M19 17L12 12M5 7V17M19 7V17" stroke="#00e5ff" strokeWidth="1.4" strokeOpacity="0.6" />
        </svg>
      );
    default:
      return (
        <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-mono text-xs font-bold">
          &lt;/&gt;
        </div>
      );
  }
};

// ============================================================================
// SKILL ROW COMPONENT
// ============================================================================

const SkillRow: React.FC<{ skill: TechnologySkill; index: number }> = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="card"
      className="group relative flex flex-col gap-2 p-3 sm:p-3.5 rounded-xl bg-[#060b17]/60 hover:bg-[#081329]/95 border border-white/5 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(0,210,255,0.22),0_4px_12px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-250 select-none cursor-default"
    >
      {/* Top row: Icon + Name + Percentage */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="shrink-0 transition-transform duration-250 group-hover:scale-115 group-hover:rotate-2 drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
            <TechIcon type={skill.iconType} className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <span className="font-sans font-semibold text-sm sm:text-base text-gray-100 group-hover:text-white truncate transition-colors">
            {skill.name}
          </span>
        </div>

        <div className="shrink-0 font-mono text-xs sm:text-sm font-bold text-gray-400 group-hover:text-[#00e5ff] transition-colors drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
          {skill.level}%
        </div>
      </div>

      {/* Progress Track & Fill */}
      <div className="w-full h-2 rounded-full bg-[#0c1427] border border-white/5 overflow-hidden relative p-[1px]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.15 + index * 0.04, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7] group-hover:from-[#00e5ff] group-hover:via-[#6366f1] group-hover:to-[#c084fc] shadow-[0_0_12px_rgba(99,102,241,0.6)] group-hover:shadow-[0_0_18px_rgba(0,229,255,0.9)] transition-all duration-500"
        />
      </div>
    </motion.div>
  );
};

// ============================================================================
// CATEGORY CARD PANEL COMPONENT
// ============================================================================

const CategoryCard: React.FC<{ 
  group: SkillCategoryGroup; 
  delayOffset?: number; 
  className?: string; 
}> = ({ group, delayOffset = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: delayOffset, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl p-5 sm:p-6 bg-[#070e1c]/75 border border-cyan-500/15 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(0,210,255,0.16),0_12px_36px_rgba(0,0,0,0.6)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between gap-4 group ${className}`}
    >
      <div className="flex flex-col gap-3.5">
        {/* Category Header */}
        <div className="flex items-center gap-2.5 pb-2.5 border-b border-white/5">
          <span className={`w-2 h-2 rounded-full ${group.dotColor} ${group.glowColor}`} />
          <h3
            data-cursor="text"
            className="font-mono text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider"
          >
            {group.title}
          </h3>
          <span className="ml-auto font-mono text-[10px] text-gray-400 font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
            {group.skills.length} {group.skills.length === 1 ? 'Skill' : 'Skills'}
          </span>
        </div>

        {/* Skill Rows */}
        <div className="flex flex-col gap-2.5">
          {group.skills.map((skill, index) => (
            <SkillRow key={skill.name} skill={skill} index={index + delayOffset * 6} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// CIRCULAR PROGRESS CARD (Additional Skills)
// ============================================================================

const CircularSkillCard: React.FC<{ skill: AdditionalSkill; index: number }> = ({ skill, index }) => {
  const radius = 48;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <TiltCard
        maxTilt={4}
        cursorType="card"
        spotlightColor="rgba(0, 229, 255, 0.15)"
        className="h-full p-6 sm:p-8 rounded-3xl bg-[#070e1c]/80 border border-cyan-500/20 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.6)] hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(0,229,255,0.22),0_0_20px_rgba(168,85,247,0.22)] hover:-translate-y-1.5 transition-all duration-400 flex flex-col items-center justify-center text-center gap-5 group relative overflow-hidden"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

        {/* Circular SVG Meter */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
            {/* Gradient definition */}
            <defs>
              <linearGradient id={`circle-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00e5ff" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>

            {/* Background Track Circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            {/* Animated Progress Circle */}
            <motion.circle
              cx="60"
              cy="60"
              r={radius}
              stroke={`url(#circle-gradient-${index})`}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.2 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              strokeLinecap="round"
              fill="transparent"
              className="drop-shadow-[0_0_10px_rgba(0,229,255,0.7)] group-hover:drop-shadow-[0_0_16px_rgba(0,229,255,0.9)] transition-all duration-300"
            />
          </svg>

          {/* Center Percentage Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] group-hover:text-[#00e5ff] transition-colors">
              {skill.level}%
            </span>
          </div>
        </div>

        {/* Skill Title */}
        <div className="flex flex-col gap-1.5 z-10">
          <h4 className="font-sans font-extrabold text-lg sm:text-xl text-white tracking-tight group-hover:text-[#00e5ff] transition-colors">
            {skill.title}
          </h4>
          {skill.description && (
            <p className="font-sans text-xs text-gray-400 max-w-[240px] leading-relaxed">
              {skill.description}
            </p>
          )}
        </div>
      </TiltCard>
    </motion.div>
  );
};

// ============================================================================
// MAIN SKILLS SECTION EXPORT
// ============================================================================

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative w-full py-24 md:py-32 bg-[#040814] border-b border-cyan-500/10 overflow-hidden select-none"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-glow-drift" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-glow-drift-reverse" />

      {/* Grid line overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d2ff05_1px,transparent_1px),linear-gradient(to_bottom,#00d2ff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col gap-20">
        {/* ================================================================== */}
        {/* 1. SECTION HEADER */}
        {/* ================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-3"
        >
          {/* Top Category Badge */}
          <span
            data-cursor="text"
            className="interactive-heading font-mono text-xs sm:text-sm text-[#805ad5] uppercase tracking-[0.3em] font-bold drop-shadow-[0_0_12px_rgba(128,90,213,0.7)]"
          >
            MY SKILLS
          </span>

          {/* Main Title */}
          <h2
            data-cursor="text"
            className="interactive-heading font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight"
          >
            Technologies I{' '}
            <span className="text-[#00e5ff] drop-shadow-[0_0_20px_rgba(0,229,255,0.7)]">
              Work With
            </span>
          </h2>

          {/* Glowing Gradient Underline Bar */}
          <div className="w-20 h-[3px] rounded-full bg-gradient-to-r from-[#00e5ff] via-[#805ad5] to-[#c084fc] shadow-[0_0_14px_rgba(0,229,255,0.9)] mt-1" />

          <p className="font-sans text-sm sm:text-base text-gray-400 max-w-xl mt-2 leading-relaxed">
            A comprehensive overview of the core technologies, data platforms, and computational tools I use to build intelligent web applications and modern data solutions.
          </p>
        </motion.div>

        {/* ================================================================== */}
        {/* 2. REORGANIZED LOGICAL CATEGORIES LAYOUT */}
        {/* ================================================================== */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* ROW 1: FRONTEND DEVELOPMENT (4 skills) & DATA & ANALYTICS (4 skills) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <CategoryCard group={CATEGORY_FRONTEND} delayOffset={0.1} />
            <CategoryCard group={CATEGORY_DATA_ANALYTICS} delayOffset={0.2} />
          </div>

          {/* ROW 2: BACKEND DEVELOPMENT (2 skills) | DATABASES (2 skills) | TOOLS & VERSION CONTROL (2 skills) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <CategoryCard group={CATEGORY_BACKEND} delayOffset={0.3} />
            <CategoryCard group={CATEGORY_DATABASES} delayOffset={0.4} />
            <CategoryCard group={CATEGORY_TOOLS} delayOffset={0.5} className="md:col-span-2 lg:col-span-1" />
          </div>
        </div>

        {/* ================================================================== */}
        {/* 3. ADDITIONAL SKILLS SECTION */}
        {/* ================================================================== */}
        <div className="flex flex-col gap-10 pt-4">
          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center gap-2"
          >
            <h3
              data-cursor="text"
              className="interactive-heading font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight"
            >
              Additional{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#805ad5] to-[#c084fc]">
                Skills
              </span>
            </h3>
            <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-md">
              Specialized proficiencies in modern visual design, interaction physics, and spatial digital assets.
            </p>
          </motion.div>

          {/* 3 Glass Cards with Circular Animated Progress */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADDITIONAL_SKILLS_DATA.map((skill, index) => (
              <CircularSkillCard key={skill.title} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
