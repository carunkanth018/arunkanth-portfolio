/**
 * Dynamically scrolls smoothly to a target section accounting for
 * floating navbar height, responsive spacing, and heading clearance.
 */
export const scrollToSection = (targetId: string) => {
  if (targetId === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const element = document.getElementById(targetId);
  if (!element) return;

  // Measure dynamic navbar dimensions and position
  const headerEl = document.querySelector('header');
  const navbarRect = headerEl ? headerEl.getBoundingClientRect() : null;
  const navbarBottom = navbarRect ? Math.round(navbarRect.bottom) : 75;

  const sectionRect = element.getBoundingClientRect();
  const sectionTop = sectionRect.top + window.scrollY;

  // Locate the inner content heading or container to ensure optimal visual placement
  const contentHeading = element.querySelector('h2') || element.querySelector('h3') || element.querySelector('.z-10');

  if (contentHeading) {
    const headingRect = contentHeading.getBoundingClientRect();
    const headingTop = headingRect.top + window.scrollY;

    // Desired visual breathing space below the floating capsule navbar
    const desiredClearance = window.innerWidth < 640 ? 20 : 32;
    const targetScroll = headingTop - navbarBottom - desiredClearance;

    // Keep within logical section bounds (never scroll past the section top)
    const scrollYTarget = Math.max(0, Math.min(sectionTop, targetScroll));
    window.scrollTo({
      top: scrollYTarget,
      behavior: 'smooth',
    });
  } else {
    // Fallback: section top with navbar clearance
    const fallbackScroll = sectionTop - (navbarBottom + 16);
    window.scrollTo({
      top: Math.max(0, fallbackScroll),
      behavior: 'smooth',
    });
  }
};
