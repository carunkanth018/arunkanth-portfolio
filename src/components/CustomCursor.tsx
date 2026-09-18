import React, { useEffect, useRef } from 'react';

type CursorVariant =
  | 'default'
  | 'link'
  | 'button'
  | 'card'
  | 'image'
  | 'text'
  | 'badge'
  | 'magnetic';

interface VariantStyleConfig {
  width: string;
  height: string;
  borderColor: string;
  borderRadius: string;
  boxShadow: string;
  backgroundColor: string;
}

const VARIANT_DIAMOND_MAP: Record<CursorVariant, VariantStyleConfig> = {
  default: {
    width: '26px',
    height: '26px',
    borderColor: '#00daf3',
    borderRadius: '4px',
    boxShadow: '0 0 12px rgba(0, 218, 243, 0.45), inset 0 0 5px rgba(0, 218, 243, 0.15)',
    backgroundColor: 'rgba(0, 218, 243, 0.02)',
  },
  button: {
    width: '38px',
    height: '38px',
    borderColor: '#38bdf8',
    borderRadius: '8px',
    boxShadow: '0 0 24px rgba(0, 218, 243, 0.85), inset 0 0 10px rgba(0, 218, 243, 0.4)',
    backgroundColor: 'rgba(0, 218, 243, 0.12)',
  },
  magnetic: {
    width: '38px',
    height: '38px',
    borderColor: '#38bdf8',
    borderRadius: '8px',
    boxShadow: '0 0 24px rgba(0, 218, 243, 0.85), inset 0 0 10px rgba(0, 218, 243, 0.4)',
    backgroundColor: 'rgba(0, 218, 243, 0.12)',
  },
  card: {
    width: '44px',
    height: '44px',
    borderColor: '#b366ff',
    borderRadius: '10px',
    boxShadow: '0 0 24px rgba(179, 102, 255, 0.7), inset 0 0 12px rgba(0, 218, 243, 0.35)',
    backgroundColor: 'rgba(179, 102, 255, 0.08)',
  },
  image: {
    width: '48px',
    height: '48px',
    borderColor: '#00daf3',
    borderRadius: '50%',
    boxShadow: '0 0 28px rgba(0, 218, 243, 0.75), inset 0 0 14px rgba(0, 218, 243, 0.3)',
    backgroundColor: 'rgba(0, 218, 243, 0.06)',
  },
  link: {
    width: '34px',
    height: '34px',
    borderColor: '#00daf3',
    borderRadius: '6px',
    boxShadow: '0 0 20px rgba(0, 218, 243, 0.8), inset 0 0 8px rgba(0, 218, 243, 0.3)',
    backgroundColor: 'rgba(0, 218, 243, 0.1)',
  },
  badge: {
    width: '32px',
    height: '32px',
    borderColor: '#a8ffd2',
    borderRadius: '6px',
    boxShadow: '0 0 18px rgba(168, 255, 210, 0.7), inset 0 0 8px rgba(168, 255, 210, 0.3)',
    backgroundColor: 'rgba(168, 255, 210, 0.08)',
  },
  text: {
    width: '24px',
    height: '24px',
    borderColor: '#00daf3',
    borderRadius: '3px',
    boxShadow: '0 0 12px rgba(0, 218, 243, 0.5), inset 0 0 6px rgba(0, 218, 243, 0.2)',
    backgroundColor: 'rgba(0, 218, 243, 0.04)',
  },
};

const PRESSED_DIAMOND_STYLE: VariantStyleConfig = {
  width: '20px',
  height: '20px',
  borderColor: '#00daf3',
  borderRadius: '2px',
  boxShadow: '0 0 16px rgba(0, 218, 243, 0.9), inset 0 0 8px rgba(0, 218, 243, 0.5)',
  backgroundColor: 'rgba(0, 218, 243, 0.2)',
};

export const CustomCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const diamondRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) {
      return;
    }

    const container = containerRef.current;
    const dot = dotRef.current;
    const diamond = diamondRef.current;
    const spotlight = spotlightRef.current;
    if (!container || !dot || !diamond || !spotlight) return;

    document.body.classList.add('custom-cursor-active');

    let mouseX = -100;
    let mouseY = -100;
    let diamondX = -100;
    let diamondY = -100;
    let spotX = -200;
    let spotY = -200;
    let animId: number | null = null;
    let isLoopRunning = false;
    let isVisible = false;
    let currentVariant: CursorVariant = 'default';
    let isPressed = false;

    const applyStyles = (variant: CursorVariant, pressed: boolean) => {
      const config = pressed ? PRESSED_DIAMOND_STYLE : VARIANT_DIAMOND_MAP[variant] || VARIANT_DIAMOND_MAP.default;
      diamond.style.width = config.width;
      diamond.style.height = config.height;
      diamond.style.borderColor = config.borderColor;
      diamond.style.borderRadius = config.borderRadius;
      diamond.style.boxShadow = config.boxShadow;
      diamond.style.backgroundColor = config.backgroundColor;

      const isSpecial = variant !== 'default';
      dot.style.width = isSpecial ? '6px' : '4px';
      dot.style.height = isSpecial ? '6px' : '4px';
      dot.style.boxShadow = isSpecial
        ? variant === 'card'
          ? '0 0 12px 2px #b366ff, 0 0 20px 4px rgba(179, 102, 255, 0.8)'
          : '0 0 10px 2px #00daf3, 0 0 18px 4px rgba(0, 218, 243, 0.8)'
        : '0 0 6px 1.5px #00daf3, 0 0 12px 3px rgba(0, 218, 243, 0.6)';

      spotlight.style.background =
        variant === 'card'
          ? 'radial-gradient(circle, rgba(179, 102, 255, 0.07) 0%, rgba(0, 218, 243, 0.04) 40%, transparent 70%)'
          : 'radial-gradient(circle, rgba(0, 218, 243, 0.06) 0%, rgba(99, 102, 241, 0.03) 45%, transparent 70%)';
    };

    // Initialize initial styles
    applyStyles('default', false);

    const showCursor = () => {
      if (!isVisible) {
        isVisible = true;
        container.style.opacity = '1';
      }
    };

    const hideCursor = () => {
      if (isVisible) {
        isVisible = false;
        container.style.opacity = '0';
      }
    };

    const render = () => {
      if (document.hidden) {
        isLoopRunning = false;
        animId = null;
        return;
      }

      const easeDiamond = 0.22;
      diamondX += (mouseX - diamondX) * easeDiamond;
      diamondY += (mouseY - diamondY) * easeDiamond;
      diamond.style.transform = `translate3d(${diamondX.toFixed(1)}px, ${diamondY.toFixed(1)}px, 0) translate(-50%, -50%) rotate(45deg)`;

      const easeSpot = 0.1;
      spotX += (mouseX - spotX) * easeSpot;
      spotY += (mouseY - spotY) * easeSpot;
      spotlight.style.transform = `translate3d(${spotX.toFixed(1)}px, ${spotY.toFixed(1)}px, 0) translate(-50%, -50%)`;

      const diffD = Math.abs(mouseX - diamondX) + Math.abs(mouseY - diamondY);
      const diffS = Math.abs(mouseX - spotX) + Math.abs(mouseY - spotY);

      // Stop RAF when settling is complete to preserve CPU/GPU idle cycles
      if (diffD < 0.15 && diffS < 0.25) {
        isLoopRunning = false;
        animId = null;
        return;
      }

      animId = requestAnimationFrame(render);
    };

    const ensureLoopRunning = () => {
      if (!isLoopRunning && !document.hidden) {
        isLoopRunning = true;
        animId = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      showCursor();
      ensureLoopRunning();
    };

    const handlePointerDown = () => {
      isPressed = true;
      applyStyles(currentVariant, true);
    };

    const handlePointerUp = () => {
      isPressed = false;
      applyStyles(currentVariant, false);
    };

    const getCursorVariantFromElement = (target: HTMLElement | null): CursorVariant => {
      if (!target) return 'default';

      const explicit = target.closest<HTMLElement>('[data-cursor]');
      if (explicit) {
        const val = explicit.getAttribute('data-cursor') as CursorVariant;
        if (val) return val;
      }

      if (target.closest('button, [role="button"], input[type="submit"], input[type="button"]')) {
        return 'button';
      }

      if (target.closest('a, [role="link"]')) {
        return 'link';
      }

      if (target.closest('[data-card], .tilt-card, [data-interactive-card]')) {
        return 'card';
      }

      if (target.closest('img, svg:not(button svg):not(a svg), canvas')) {
        return 'image';
      }

      if (target.closest('input, textarea, select')) {
        return 'text';
      }

      if (target.closest('h1, h2, .font-headline-lg, .font-display-hero')) {
        return 'text';
      }

      if (target.closest('.badge, [data-badge]')) {
        return 'badge';
      }

      return 'default';
    };

    const updateVariant = (target: HTMLElement | null) => {
      const nextVariant = getCursorVariantFromElement(target);
      if (nextVariant !== currentVariant) {
        currentVariant = nextVariant;
        applyStyles(currentVariant, isPressed);
      }
    };

    const handlePointerOver = (e: MouseEvent) => {
      updateVariant(e.target as HTMLElement | null);
    };

    const handlePointerOut = (e: MouseEvent) => {
      updateVariant(e.relatedTarget as HTMLElement | null);
    };

    const handleMouseLeave = () => {
      hideCursor();
    };

    const handleMouseEnter = () => {
      showCursor();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        hideCursor();
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
        isLoopRunning = false;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseover', handlePointerOver, { passive: true });
    document.addEventListener('mouseout', handlePointerOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('mouseout', handlePointerOut);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animId) {
        cancelAnimationFrame(animId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[999999] opacity-0 transition-opacity duration-300"
      aria-hidden="true"
    >
      {/* 1. Global Subtle Ambient Radial Spotlight Follower */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 w-[550px] h-[550px] pointer-events-none will-change-transform opacity-70 transition-opacity duration-500"
      />

      {/* 2. Outer Smooth Inertia Diamond Follower */}
      <div
        ref={diamondRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform transition-[width,height,border-color,box-shadow,border-radius,background-color] duration-200 ease-out"
        style={{
          width: '26px',
          height: '26px',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          borderColor: '#00daf3',
          borderRadius: '4px',
          boxShadow: '0 0 12px rgba(0, 218, 243, 0.45), inset 0 0 5px rgba(0, 218, 243, 0.15)',
          backgroundColor: 'rgba(0, 218, 243, 0.02)',
        }}
      />

      {/* 3. Center Bright Glowing Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform transition-[width,height,box-shadow] duration-150 ease-out"
        style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          boxShadow: '0 0 6px 1.5px #00daf3, 0 0 12px 3px rgba(0, 218, 243, 0.6)',
        }}
      />
    </div>
  );
};
