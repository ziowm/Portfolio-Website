import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fade-in' | 'fade-in-up' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale-in';
  delay?: number;
  className?: string;
  threshold?: number;
}

/**
 * Wrapper component that animates its children when they enter the viewport
 * Respects user's motion preferences automatically via useIntersectionObserver
 */
export function AnimatedSection({
  children,
  animation = 'fade-in-up',
  delay = 0,
  className = '',
  threshold = 0.1,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref as React.RefObject<Element>, { threshold });

  // Map delay to animation delay class
  const delayClass = delay > 0 ? `animation-delay-${delay}` : '';

  return (
    <div
      ref={ref}
      className={`${className} ${
        isVisible ? `animate-${animation} ${delayClass}` : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
}
