import React from 'react';
import { X, Check, ExternalLink, Code2, Layers, Cpu } from 'lucide-react';
import { CaseStudy } from '../types';

interface ProjectModalProps {
  study: CaseStudy | null;
  mode: 'architecture' | 'repo' | 'notebook' | 'whitepaper';
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ study, mode, onClose }) => {
  if (!study) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-white/20 p-6 md:p-8 flex flex-col gap-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-[0.25em] font-bold">
              {study.number} // {study.tag}
            </span>
            <h3 className="font-headline-md text-xl md:text-2xl text-[#F5F5F5] uppercase">
              {study.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-white/10 hover:border-white/30 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content switch by mode */}
        <div className="flex flex-col gap-5 font-sans text-sm text-gray-400">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#F5F5F5] font-bold block mb-1">
              Executive Context:
            </span>
            <p className="leading-relaxed">{study.summary}</p>
          </div>

          {/* Architecture Details */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-mono text-xs text-white uppercase font-bold tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Architectural Specifications</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {study.specDetails.architecture.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 p-3 bg-white/5 border border-white/10 text-xs text-gray-300"
                >
                  <Check className="w-3.5 h-3.5 text-[#a8ffd2] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-mono text-xs text-white uppercase font-bold tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>Production Stack &amp; Constraints</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {study.specDetails.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-black border border-white/10 font-mono text-xs text-[#F5F5F5]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Simulated Code or Config */}
          {study.specDetails.codeSnippet && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#a8ffd2] uppercase font-bold tracking-wider">
                <Code2 className="w-4 h-4" />
                <span>Production Implementation Sample</span>
              </div>
              <pre className="p-4 bg-black border border-white/10 font-mono text-xs text-gray-200 overflow-x-auto leading-relaxed">
                {study.specDetails.codeSnippet}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs">
          <span className="text-gray-500 uppercase tracking-wider">DEPLOYMENT SPEC: PROD-READY</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white text-black font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors"
          >
            Close Specification
          </button>
        </div>
      </div>
    </div>
  );
};
