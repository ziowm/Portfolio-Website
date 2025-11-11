import { useState, useEffect } from 'react';

/**
 * Custom hook to track which section is currently active based on scroll position
 * @param sectionIds - Array of section IDs to track
 * @param offset - Offset from top of viewport (default: 100px for header height)
 * @returns The ID of the currently active section
 */
export function useScrollSpy(
  sectionIds: string[],
  offset: number = 100
): string {
  const [activeSection, setActiveSection] = useState<string>(
    sectionIds[0] || ''
  );

  useEffect(() => {
    const handleScroll = () => {
      // Get current scroll position
      const scrollPosition = window.scrollY + offset;

      // Find all sections and their positions
      const sectionPositions = sectionIds
        .map(id => {
          const element = document.getElementById(id);
          if (!element) return null;

          const rect = element.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = top + rect.height;

          return {
            id,
            top,
            bottom,
          };
        })
        .filter(
          (section): section is NonNullable<typeof section> => section !== null
        );

      // Find the section that's currently in view
      // Priority: section that contains the scroll position
      let currentSection = sectionIds[0];

      for (const section of sectionPositions) {
        if (scrollPosition >= section.top && scrollPosition < section.bottom) {
          currentSection = section.id;
          break;
        }
      }

      // If no section contains the scroll position, find the closest one above
      if (currentSection === sectionIds[0]) {
        for (let i = sectionPositions.length - 1; i >= 0; i--) {
          if (scrollPosition >= sectionPositions[i].top) {
            currentSection = sectionPositions[i].id;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    // Initial check
    handleScroll();

    // Add scroll listener with throttling for performance
    let timeoutId: number | null = null;
    const throttledHandleScroll = () => {
      if (timeoutId === null) {
        timeoutId = window.setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 100);
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('resize', handleScroll);
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [sectionIds, offset]);

  return activeSection;
}
