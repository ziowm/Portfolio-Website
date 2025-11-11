import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

/**
 * Custom hook to detect when an element enters the viewport
 * Respects user's motion preferences (prefers-reduced-motion)
 *
 * @param elementRef - React ref to the element to observe
 * @param options - IntersectionObserver options
 * @returns boolean indicating if element is visible
 */
export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  options: UseIntersectionObserverOptions = {}
): boolean {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // If user prefers reduced motion, make element visible immediately
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // If already visible and we should freeze, don't observe
    if (freezeOnceVisible && isVisible) return;

    const observerCallback: IntersectionObserverCallback = entries => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        setIsVisible(true);

        // If we should freeze once visible, disconnect observer
        if (freezeOnceVisible && observer) {
          observer.disconnect();
        }
      } else if (!freezeOnceVisible) {
        setIsVisible(false);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      if (observer && element) {
        observer.unobserve(element);
      }
    };
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible, isVisible]);

  return isVisible;
}
