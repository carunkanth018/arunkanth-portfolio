import React, { useEffect, useRef, useState } from 'react';

type CursorVariant =
  | 'default'
  | 'link'
  | 'button'
  | 'card'
  | 'image'
  | 'text'
  | 'badge'
  | 'magnetic';

export const CustomCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const diamondRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [isPressed, setIsPressed] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const variantRef = useRef<CursorVariant>('default');
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad) and not reduced motion
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) {
      return;
    }

    setIsFinePointer(true);
    document.body.classList.add('custom-cursor-active');

    let mouseX = -100;
    let mouseY = -100;
    let diamondX = -100;
    let diamondY = -100;
    let spotX = -200;
    let spotY = -200;
    let animationFrameId: number;

    const showCursor = () => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        if (containerRef.current) {
          containerRef.current.style.opacity = '1';
        }
      }
    };

    const hideCursor = () => {
      if (isVisibleRef.current) {
        isVisibleRef.current = false;
        if (containerRef.current) {
          containerRef.current.style.opacity = '0';
        }
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      showCursor();
    };

    const handlePointerDown = () => setIsPressed(true);
    const handlePointerUp = () => setIsPressed(false);

    const getCursorVariantFromElement = (target: HTMLElement | null): CursorVariant => {
      if (!target) return 'default';

      // 1. Explicit data-cursor override
      const explicit = target.closest<HTMLElement>('[data-cursor]');
      if (explicit) {
        const val = explicit.getAttribute('data-cursor') as CursorVariant;
        if (val) return val;
      }

      // 2. Buttons and CTA triggers
      if (
        target.closest('button, [role="button"], input[type="submit"], input[type="button"]')
      ) {
        return 'button';
      }

      // 3. Links
      if (target.closest('a, [role="link"]')) {
        return 'link';
      }

      // 4. Cards and project containers
      if (target.closest('[data-card], .tilt-card, [data-interactive-card]')) {
        return 'card';
      }

      // 5. Images and graphics
      if (target.closest('img, svg:not(button svg):not(a svg), canvas')) {
        return 'image';
      }

      // 6. Form inputs and editable text
      if (target.closest('input, textarea, select')) {
        return 'text';
      }

      // 7. Prominent Headings
      if (target.closest('h1, h2, .font-headline-lg, .font-display-hero')) {
        return 'text';
      }

      // 8. Badges, tags, chips
      if (target.closest('.badge, [data-badge]')) {
        return 'badge';
      }

      return 'default';
    };

    const updateVariant = (target: HTMLElement | null) => {
      const nextVariant = getCursorVariantFromElement(target);
      if (nextVariant !== variantRef.current) {
        variantRef.current = nextVariant;
        setCursorVariant(nextVariant);
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

    // Smooth inertia render loop for the outer diamond & ambient spotlight
    const render = () => {
      const easeDiamond = 0.22;
      diamondX += (mouseX - diamondX) * easeDiamond;
      diamondY += (mouseY - diamondY) * easeDiamond;

      if (diamondRef.current) {
        diamondRef.current.style.transform = `translate3d(${diamondX.toFixed(1)}px, ${diamondY.toFixed(1)}px, 0) translate(-50%, -50%) rotate(45deg)`;
      }

      const easeSpot = 0.1;
      spotX += (mouseX - spotX) * easeSpot;
      spotY += (mouseY - spotY) * easeSpot;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${spotX.toFixed(1)}px, ${spotY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseover', handlePointerOver, { passive: true });
    document.addEventListener('mouseout', handlePointerOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('mouseout', handlePointerOut);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isFinePointer) {
    return null;
  }

  // Dynamic styling properties based on variant state
  const getDiamondStyles = () => {
    if (isPressed) {
      return {
        width: '20px',
        height: '20px',
        borderColor: '#00daf3',
        borderRadius: '2px',
        boxShadow: '0 0 16px rgba(0, 218, 243, 0.9), inset 0 0 8px rgba(0, 218, 243, 0.5)',
        backgroundColor: 'rgba(0, 218, 243, 0.2)',
      };
    }

    switch (cursorVariant) {
      case 'button':
      case 'magnetic':
        return {
          width: '38px',
          height: '38px',
          borderColor: '#38bdf8',
          borderRadius: '8px',
          boxShadow: '0 0 24px rgba(0, 218, 243, 0.85), inset 0 0 10px rgba(0, 218, 243, 0.4)',
          backgroundColor: 'rgba(0, 218, 243, 0.12)',
        };
      case 'card':
        return {
          width: '44px',
          height: '44px',
          borderColor: '#b366ff',
          borderRadius: '10px',
          boxShadow: '0 0 24px rgba(179, 102, 255, 0.7), inset 0 0 12px rgba(0, 218, 243, 0.35)',
          backgroundColor: 'rgba(179, 102, 255, 0.08)',
        };
      case 'image':
        return {
          width: '48px',
          height: '48px',
          borderColor: '#00daf3',
          borderRadius: '50%',
          boxShadow: '0 0 28px rgba(0, 218, 243, 0.75), inset 0 0 14px rgba(0, 218, 243, 0.3)',
          backgroundColor: 'rgba(0, 218, 243, 0.06)',
        };
      case 'link':
        return {
          width: '34px',
          height: '34px',
          borderColor: '#00daf3',
          borderRadius: '6px',
          boxShadow: '0 0 20px rgba(0, 218, 243, 0.8), inset 0 0 8px rgba(0, 218, 243, 0.3)',
          backgroundColor: 'rgba(0, 218, 243, 0.1)',
        };
      case 'badge':
        return {
          width: '32px',
          height: '32px',
          borderColor: '#a8ffd2',
          borderRadius: '6px',
          boxShadow: '0 0 18px rgba(168, 255, 210, 0.7), inset 0 0 8px rgba(168, 255, 210, 0.3)',
          backgroundColor: 'rgba(168, 255, 210, 0.08)',
        };
      case 'text':
        return {
          width: '24px',
          height: '24px',
          borderColor: '#00daf3',
          borderRadius: '3px',
          boxShadow: '0 0 12px rgba(0, 218, 243, 0.5), inset 0 0 6px rgba(0, 218, 243, 0.2)',
          backgroundColor: 'rgba(0, 218, 243, 0.04)',
        };
      case 'default':
      default:
        return {
          width: '26px',
          height: '26px',
          borderColor: '#00daf3',
          borderRadius: '4px',
          boxShadow: '0 0 12px rgba(0, 218, 243, 0.45), inset 0 0 5px rgba(0, 218, 243, 0.15)',
          backgroundColor: 'rgba(0, 218, 243, 0.02)',
        };
    }
  };

  const getDotStyles = () => {
    const isSpecial = cursorVariant !== 'default';
    return {
      width: isSpecial ? '6px' : '4px',
      height: isSpecial ? '6px' : '4px',
      boxShadow: isSpecial
        ? cursorVariant === 'card'
          ? '0 0 12px 2px #b366ff, 0 0 20px 4px rgba(179, 102, 255, 0.8)'
          : '0 0 10px 2px #00daf3, 0 0 18px 4px rgba(0, 218, 243, 0.8)'
        : '0 0 6px 1.5px #00daf3, 0 0 12px 3px rgba(0, 218, 243, 0.6)',
    };
  };

  const diamondStyles = getDiamondStyles();
  const dotStyles = getDotStyles();

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
        style={{
          background:
            cursorVariant === 'card'
              ? 'radial-gradient(circle, rgba(179, 102, 255, 0.07) 0%, rgba(0, 218, 243, 0.04) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0, 218, 243, 0.06) 0%, rgba(99, 102, 241, 0.03) 45%, transparent 70%)',
        }}
      />

      {/* 2. Outer Smooth Inertia Diamond Follower */}
      <div
        ref={diamondRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform transition-[width,height,border-color,box-shadow,border-radius,background-color] duration-200 ease-out"
        style={{
          width: diamondStyles.width,
          height: diamondStyles.height,
          borderWidth: '1.5px',
          borderStyle: 'solid',
          borderColor: diamondStyles.borderColor,
          borderRadius: diamondStyles.borderRadius,
          boxShadow: diamondStyles.boxShadow,
          backgroundColor: diamondStyles.backgroundColor,
        }}
      />

      {/* 3. Center Bright Glowing Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform transition-[width,height,box-shadow] duration-150 ease-out"
        style={{
          width: dotStyles.width,
          height: dotStyles.height,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          boxShadow: dotStyles.boxShadow,
        }}
      />
    </div>
  );
};
