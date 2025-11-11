/**
 * Smoothly scrolls to a section on the page
 * @param sectionId - The ID of the section to scroll to
 * @param offset - Offset from top (default: 80px for header height)
 */
export function smoothScrollToSection(sectionId: string, offset: number = 80): void {
  const element = document.getElementById(sectionId);

  if (!element) {
    console.warn(`Section with id "${sectionId}" not found`);
    return;
  }

  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}

/**
 * Checks if the user prefers reduced motion
 * @returns true if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Scrolls to a section with respect to user's motion preferences
 * @param sectionId - The ID of the section to scroll to
 * @param offset - Offset from top (default: 80px for header height)
 */
export function scrollToSection(sectionId: string, offset: number = 80): void {
  const element = document.getElementById(sectionId);

  if (!element) {
    console.warn(`Section with id "${sectionId}" not found`);
    return;
  }

  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;

  // Respect user's motion preferences
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth';

  window.scrollTo({
    top: offsetPosition,
    behavior,
  });
}
