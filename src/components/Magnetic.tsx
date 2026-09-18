import React, { useRef, useEffect } from 'react';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // max offset in px, default 7
  cursorType?: string; // e.g. 'button' | 'link' | 'magnetic'
  as?: React.ElementType;
  [key: string]: any;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  className = '',
  strength = 7,
  cursorType = 'magnetic',
  as: Component = 'div',
  ...rest
}) => {
  const elementRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check if device is touch / fine pointer or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isInside = false;

    const updatePosition = () => {
      if (!isInside) {
        // Fast snap back to zero
        currentX += (0 - currentX) * 0.25;
        currentY += (0 - currentY) * 0.25;
        if (Math.abs(currentX) < 0.1 && Math.abs(currentY) < 0.1) {
          currentX = 0;
          currentY = 0;
          el.style.transform = 'translate3d(0px, 0px, 0px)';
          rafRef.current = null;
          return;
        }
      } else {
        currentX += (targetX - currentX) * 0.35;
        currentY += (targetY - currentY) * 0.35;
      }

      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0px)`;
      rafRef.current = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center normalized (-1 to 1)
      const distX = (e.clientX - centerX) / (rect.width / 2);
      const distY = (e.clientY - centerY) / (rect.height / 2);

      const clampedX = Math.max(-1, Math.min(1, distX));
      const clampedY = Math.max(-1, Math.min(1, distY));

      targetX = clampedX * strength;
      targetY = clampedY * strength;

      // Update dynamic sheen custom properties
      const relX = ((e.clientX - rect.left) / rect.width) * 100;
      const relY = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mouse-x', `${relX.toFixed(1)}%`);
      el.style.setProperty('--mouse-y', `${relY.toFixed(1)}%`);

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseEnter = () => {
      isInside = true;
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseLeave = () => {
      isInside = false;
      targetX = 0;
      targetY = 0;
      el.style.removeProperty('--mouse-x');
      el.style.removeProperty('--mouse-y');
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updatePosition);
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
  }, [strength]);

  const Comp = Component as any;

  return (
    <Comp
      ref={elementRef}
      data-cursor={cursorType}
      className={`relative will-change-transform ${className}`}
      {...rest}
    >
      {children}
    </Comp>
  );
};
