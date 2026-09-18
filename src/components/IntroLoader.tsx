import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

interface IntroLoaderProps {
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isDismissing, setIsDismissing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const isDismissingRef = useRef(false);
  const hasCompletedRef = useRef(false);

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Lock background scrolling during initialization sequence
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const finishIntro = () => {
      if (hasCompletedRef.current) return;
      hasCompletedRef.current = true;
      document.body.style.overflow = '';
      onComplete();
    };

    if (prefersReducedMotion) {
      const quickTimer = setTimeout(() => {
        isDismissingRef.current = true;
        setIsDismissing(true);
        setTimeout(finishIntro, 150);
      }, 400);
      return () => {
        clearTimeout(quickTimer);
        document.body.style.overflow = '';
      };
    }

    // High performance sequential timeline:
    const t2 = setTimeout(() => setPhase(2), 250);
    const t3 = setTimeout(() => setPhase(3), 650);
    const t4 = setTimeout(() => setPhase(4), 1100);
    const t5 = setTimeout(() => {
      setPhase(5);
      isDismissingRef.current = true;
      setIsDismissing(true);
    }, 1850);

    const tEnd = setTimeout(finishIntro, 2250);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(tEnd);
      document.body.style.overflow = '';
    };
  }, [onComplete, prefersReducedMotion]);

  // Digital Constellation Particle Network Simulation (Ultra-lightweight)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 10 : 18;
    const colors = ['#00e5ff', '#3b82f6', '#805ad5', '#c084fc'];
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.4 + 0.7,
        alpha: Math.random() * 0.45 + 0.2,
        color: colors[i % colors.length],
      });
    }

    const render = () => {
      if (isDismissingRef.current || document.hidden) {
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw faint interconnecting data lines
      const maxDistance = isMobile ? 70 : 105;
      const len = particles.length;
      for (let i = 0; i < len; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Render glowing nodes
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }
      } else if (!isDismissingRef.current && !animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [prefersReducedMotion]);

  const telemetryItems = [
    { label: 'AI SYSTEMS', delay: 1.15 },
    { label: 'DATA SYSTEMS', delay: 1.35 },
    { label: 'WEB EXPERIENCE', delay: 1.55 },
  ];

  return (
    <AnimatePresence>
      {!isDismissing ? (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.01,
            transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#02050f] text-white overflow-hidden select-none pointer-events-auto"
        >
          {/* Constellation Canvas Overlay */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
          />

          {/* Atmospheric Ambient Radiant Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-radial from-cyan-500/15 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none will-change-transform" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d2ff05_1px,transparent_1px),linear-gradient(to_bottom,#00d2ff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          {/* Central System Core Container */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg w-full gap-6">
            {/* Signature Diamond Telemetry Node */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -45 }}
              animate={{
                scale: phase >= 1 ? 1 : 0,
                opacity: phase >= 1 ? 1 : 0,
                rotate: 45,
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-12 h-12 flex items-center justify-center will-change-transform"
            >
              {/* Outer Rotating Diamond Ring */}
              <div className="w-10 h-10 border border-cyan-400/60 shadow-[0_0_18px_rgba(0,229,255,0.7)] bg-[#03091a]/80 backdrop-blur-md flex items-center justify-center">
                {/* Center Pulsing Core */}
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#00e5ff] to-[#c084fc] shadow-[0_0_10px_#00e5ff] animate-ping" />
              </div>
            </motion.div>

            {/* Identity Typography (Phase 3+) */}
            <div className="flex flex-col items-center gap-2">
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: phase >= 3 ? 1 : 0,
                  y: phase >= 3 ? 0 : 12,
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans font-black text-3xl sm:text-4xl md:text-5xl tracking-[0.22em] text-white uppercase drop-shadow-[0_0_25px_rgba(0,229,255,0.6)]"
              >
                ARUN KANTH
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{
                  opacity: phase >= 3 ? 1 : 0,
                  y: phase >= 3 ? 0 : 6,
                }}
                transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-cyan-400" />
                <span className="font-mono text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#805ad5] to-[#c084fc] uppercase tracking-[0.35em] font-bold">
                  AI &bull; DATA &bull; WEB
                </span>
                <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-purple-400" />
              </motion.div>
            </div>

            {/* Initialization Telemetry (Phase 4+) */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: phase >= 4 ? 1 : 0,
                y: phase >= 4 ? 0 : 8,
              }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full max-w-xs flex flex-col gap-2 pt-1"
            >
              {/* Telemetry Header */}
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 pb-1.5 border-b border-cyan-500/20">
                <span className="text-[#00e5ff] font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
                  INITIALIZING PORTFOLIO
                </span>
                <span className="text-gray-400 font-semibold">STATUS</span>
              </div>

              {/* Sequential System Telemetry Items */}
              <div className="flex flex-col gap-1.5 pt-1">
                {telemetryItems.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{
                      opacity: phase >= 4 ? 1 : 0,
                      x: phase >= 4 ? 0 : -6,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: 0.05 + idx * 0.1,
                      ease: 'easeOut',
                    }}
                    className="flex items-center justify-between text-xs font-mono text-gray-300 py-0.5"
                  >
                    <span className="tracking-wider">{item.label}</span>
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: item.delay,
                        type: 'spring',
                        stiffness: 400,
                        damping: 20,
                      }}
                      className="inline-flex items-center gap-1 text-[#a8ffd2] font-bold"
                    >
                      <Check className="w-3.5 h-3.5 text-[#00e5ff]" />
                      <span className="text-[11px]">READY</span>
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom System Bar */}
          <div className="absolute bottom-6 flex items-center gap-2 text-[10px] font-mono text-gray-400 tracking-widest uppercase">
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
            <span>AUTHENTICATED DOSSIER // VISAKHAPATNAM &bull; IN</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
