import React, { useRef, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt angle in degrees, default 3.5 deg
  cursorType?: string; // e.g. 'card' | 'project'
  spotlight?: boolean;
  spotlightColor?: string; // default cyan aura
  as?: React.ElementType;
  [key: string]: any;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 3.5,
  cursorType = 'card',
  spotlight = true,
  spotlightColor = 'rgba(0, 218, 243, 0.12)',
  as: Component = 'div',
  ...rest
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let targetSpotX = 50;
    let targetSpotY = 50;
    let isHovered = false;

    const updateTilt = () => {
      if (!isHovered) {
        currentRotX += (0 - currentRotX) * 0.2;
        currentRotY += (0 - currentRotY) * 0.2;
        if (Math.abs(currentRotX) < 0.05 && Math.abs(currentRotY) < 0.05) {
          currentRotX = 0;
          currentRotY = 0;
          el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
          rafRef.current = null;
          return;
        }
      } else {
        currentRotX += (targetRotX - currentRotX) * 0.3;
        currentRotY += (targetRotY - currentRotY) * 0.3;
      }

      el.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) ${isHovered ? 'translateZ(4px)' : 'translateZ(0px)'}`;

      if (spotlightRef.current && isHovered) {
        spotlightRef.current.style.background = `radial-gradient(450px circle at ${targetSpotX.toFixed(1)}% ${targetSpotY.toFixed(1)}%, ${spotlightColor}, transparent 65%)`;
      }

      rafRef.current = requestAnimationFrame(updateTilt);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return;
      }

      const relativeX = (clientX - rect.left) / rect.width;
      const relativeY = (clientY - rect.top) / rect.height;

      // Normalized coordinates (-1 to 1)
      const normX = (relativeX - 0.5) * 2;
      const normY = (relativeY - 0.5) * 2;

      targetRotX = -normY * maxTilt;
      targetRotY = normX * maxTilt;
      targetSpotX = relativeX * 100;
      targetSpotY = relativeY * 100;

      el.style.setProperty('--card-mx', `${(relativeX * 100).toFixed(1)}%`);
      el.style.setProperty('--card-my', `${(relativeY * 100).toFixed(1)}%`);

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateTilt);
      }
    };

    const handleMouseEnter = () => {
      isHovered = true;
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '1';
      }
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateTilt);
      }
    };

    const handleMouseLeave = () => {
      isHovered = false;
      targetRotX = 0;
      targetRotY = 0;
      el.style.removeProperty('--card-mx');
      el.style.removeProperty('--card-my');
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0';
      }
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateTilt);
      }
    };

    const handleVisibility = () => {
      if (document.hidden && rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [maxTilt, spotlightColor]);

  const Comp = Component as any;

  return (
    <Comp
      ref={cardRef}
      data-cursor={cursorType}
      style={{
        transformStyle: 'preserve-3d',
      }}
      className={`relative will-change-transform ${className}`}
      {...rest}
    >
      {/* Dynamic Cursor Spotlight Sheen */}
      {spotlight && (
        <div
          ref={spotlightRef}
          aria-hidden="true"
          style={{
            opacity: 0,
            transition: 'opacity 0.3s ease-out',
          }}
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-10 will-change-[opacity]"
        />
      )}
      {children}
    </Comp>
  );
};
