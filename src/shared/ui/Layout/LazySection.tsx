// src/shared/ui/LazySection.tsx
import React, { useEffect, useRef, useState } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
  className?: string;
  showFallback?: boolean; // Nueva prop para controlar si mostrar fallback
  preload?: boolean; // Nueva prop para cargar inmediatamente
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '200px',
  fallback,
  className = '',
  showFallback = true,
  preload = false
}) => {
  const [isVisible, setIsVisible] = useState(preload);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preload) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, preload]);

  const defaultFallback = (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="animate-pulseSoft">
        <div className="w-12 h-12 border-4 border-primary-color/30 border-t-primary-color rounded-full animate-rotate" />
      </div>
    </div>
  );

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : (showFallback ? (fallback || defaultFallback) : null)}
    </div>
  );
};