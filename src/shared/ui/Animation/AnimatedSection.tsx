// src/shared/ui/AnimatedSection.tsx
import React from 'react';
import { useVisibility } from '../../hooks/useVisibility';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  direction?: 'left' | 'right' | 'up';
  delay?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  threshold = 0.1,
  direction = 'up',
  delay = 0
}) => {
  const { ref, isVisible } = useVisibility(threshold);

  const getTransform = () => {
    switch (direction) {
      case 'left': return '-translate-x-10';
      case 'right': return 'translate-x-10';
      case 'up': return 'translate-y-10';
      default: return 'translate-y-10';
    }
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement | null>}
      className={`
        transition-all duration-1000 transform
        ${isVisible ? 'translate-x-0 translate-y-0 opacity-100' : `${getTransform()} opacity-0`}
        ${className}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};