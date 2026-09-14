import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Send, 
  Copy, 
  Check, 
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Magnetic } from './Magnetic';
import { TiltCard } from './TiltCard';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSentSuccess(false), 5000);
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 bg-[#040814] border-b border-cyan-500/10 overflow-hidden select-none"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-glow-drift" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-glow-drift-reverse" />

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
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] animate-pulse" />
            <span 
              data-cursor="text"
              className="interactive-heading font-mono text-xs sm:text-sm text-[#00e5ff] uppercase tracking-[0.3em] font-bold drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]"
            >
              // 06. SECURE TRANSMISSION &bull; CONTACT
            </span>
          </div>

          <h2 
            data-cursor="text"
            className="interactive-heading font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight"
          >
            Let&apos;s Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] via-[#b366ff] to-[#a8ffd2] drop-shadow-[0_0_25px_rgba(179,102,255,0.6)]">
              Remarkable Together
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed">
            Interested in data analyst internships, dashboard development, or collaborative projects? Get in touch and let&apos;s connect.
          </p>
        </motion.div>

        {/* Contact Grid: Info Cards (Left 5) + Form (Right 7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Direct Email Card with TiltCard */}
            <TiltCard 
              maxTilt={3}
              cursorType="card"
              className="interactive-card p-6 rounded-2xl bg-[#091122]/75 border border-cyan-500/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-cyan-400/60 hover:shadow-[0_0_35px_rgba(0,229,255,0.25)] hover:-translate-y-1.5 transition-all duration-300 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#00e5ff] group-hover:scale-115 group-hover:rotate-3 shadow-[0_0_15px_rgba(0,229,255,0.25)] transition-transform duration-250">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block mb-0.5">EMAIL TRANSMISSION</span>
                  <a href="mailto:carunkanth@gmail.com" data-cursor="link" className="interactive-link block font-sans font-bold text-base text-white hover:text-[#00e5ff] transition-colors">
                    carunkanth@gmail.com
                  </a>
                </div>
              </div>

              <Magnetic strength={5} cursorType="button">
                <button
                  onClick={() => handleCopy('carunkanth@gmail.com', 'email')}
                  title="Copy Email Address"
                  data-cursor="button"
                  className="interactive-button-sheen w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400 hover:text-[#00e5ff] hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center justify-center text-gray-400 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </Magnetic>
            </TiltCard>

            {/* Direct Phone Card with TiltCard */}
            <TiltCard 
              maxTilt={3}
              cursorType="card"
              spotlightColor="rgba(179, 102, 255, 0.16)"
              className="interactive-card p-6 rounded-2xl bg-[#091122]/75 border border-purple-500/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-purple-400/60 hover:shadow-[0_0_35px_rgba(179,102,255,0.25)] hover:-translate-y-1.5 transition-all duration-300 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-[#b366ff] group-hover:scale-115 group-hover:rotate-3 shadow-[0_0_15px_rgba(179,102,255,0.25)] transition-transform duration-250">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block mb-0.5">DIRECT LINE</span>
                  <a href="tel:+919515021303" data-cursor="link" className="interactive-link block font-sans font-bold text-base text-white hover:text-[#b366ff] transition-colors">
                    +91 95150 21303
                  </a>
                </div>
              </div>

              <Magnetic strength={5} cursorType="button">
                <button
                  onClick={() => handleCopy('+91 95150 21303', 'phone')}
                  title="Copy Phone Number"
                  data-cursor="button"
                  className="interactive-button-sheen w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-purple-400 hover:text-[#b366ff] hover:shadow-[0_0_15px_rgba(179,102,255,0.4)] flex items-center justify-center text-gray-400 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </Magnetic>
            </TiltCard>

            {/* Location Card with TiltCard */}
            <TiltCard 
              maxTilt={3}
              cursorType="card"
              className="interactive-card p-6 rounded-2xl bg-[#091122]/75 border border-cyan-500/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#00e5ff] group-hover:scale-115 group-hover:rotate-3 shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-transform duration-250">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block mb-0.5">BASE LOCATION</span>
                <div className="font-sans font-bold text-base text-white group-hover:text-cyan-100 transition-colors">Visakhapatnam, Andhra Pradesh, India</div>
              </div>
            </TiltCard>

            {/* Social Buttons Card with Magnetic Pull */}
            <div className="grid grid-cols-2 gap-3">
              <Magnetic strength={6} cursorType="button">
                <a
                  href="https://www.linkedin.com/in/carunkanth"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="button"
                  className="interactive-button-sheen p-4 rounded-xl bg-[#091122]/85 border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_24px_rgba(0,229,255,0.4)] hover:-translate-y-1 flex items-center justify-between text-white transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-[#00e5ff] group-hover:scale-110 transition-transform" />
                    <span className="font-sans font-bold text-xs group-hover:text-[#00e5ff] transition-colors">LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#00e5ff] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Magnetic>

              <Magnetic strength={6} cursorType="button">
                <a
                  href="https://github.com/Arunkanth018"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="button"
                  className="interactive-button-sheen p-4 rounded-xl bg-[#091122]/85 border border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_24px_rgba(179,102,255,0.4)] hover:-translate-y-1 flex items-center justify-between text-white transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-[#b366ff] group-hover:scale-110 transition-transform" />
                    <span className="font-sans font-bold text-xs group-hover:text-[#b366ff] transition-colors">GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#b366ff] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Magnetic>
            </div>
          </motion.div>

          {/* Right Contact Form (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="p-7 sm:p-9 rounded-2xl bg-[#091122]/80 border border-cyan-500/25 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.7)] flex flex-col gap-5 relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
                <span className="font-mono text-xs text-white uppercase tracking-wider font-bold">
                  DIRECT MESSAGE CONSOLE
                </span>
                <span className="font-mono text-[10px] text-[#00e5ff] bg-cyan-950/60 border border-cyan-500/40 px-2.5 py-0.5 rounded-full uppercase">
                  ENCRYPTED 256-BIT
                </span>
              </div>

              {sentSuccess && (
                <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>TRANSMISSION CONFIRMED: Thank you for reaching out! I will respond promptly.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] text-gray-300 uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    data-cursor="text"
                    className="w-full px-4 py-3 rounded-xl bg-[#050a16] border border-cyan-500/20 text-white placeholder-gray-500 font-sans text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,229,255,0.25)] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] text-gray-300 uppercase tracking-wider">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    data-cursor="text"
                    className="w-full px-4 py-3 rounded-xl bg-[#050a16] border border-cyan-500/20 text-white placeholder-gray-500 font-sans text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,229,255,0.25)] transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-gray-300 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Data Analyst Internship / Dashboard Inquiry"
                  data-cursor="text"
                  className="w-full px-4 py-3 rounded-xl bg-[#050a16] border border-cyan-500/20 text-white placeholder-gray-500 font-sans text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,229,255,0.25)] transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-gray-300 uppercase tracking-wider">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, role, or collaboration idea..."
                  data-cursor="text"
                  className="w-full px-4 py-3 rounded-xl bg-[#050a16] border border-cyan-500/20 text-white placeholder-gray-500 font-sans text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,229,255,0.25)] transition-all resize-none"
                />
              </div>

              <Magnetic strength={8} cursorType="button">
                <button
                  type="submit"
                  disabled={isSending}
                  data-cursor="button"
                  className="interactive-button-sheen w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00d2ff] via-[#6366f1] to-[#a855f7] text-white font-sans text-sm font-bold tracking-wider uppercase shadow-[0_0_25px_rgba(0,210,255,0.4)] hover:shadow-[0_0_35px_rgba(0,210,255,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <span>{isSending ? 'DISPATCHING...' : 'TRANSMIT MESSAGE'}</span>
                </button>
              </Magnetic>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

