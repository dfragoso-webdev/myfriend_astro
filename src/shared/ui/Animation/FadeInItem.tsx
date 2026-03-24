// src/shared/ui/FadeInItem.tsx
import React from 'react';

interface FadeInItemProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  animation?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'slideUp' | 'scaleIn' | 'zoomIn';
}

export const FadeInItem: React.FC<FadeInItemProps> = ({ 
  children, 
  delay = 0,
  className = '',
  animation = 'fadeInUp'
}) => (
  <div
    className={`animate-${animation} ${className}`}
    style={{ animationDelay: `${delay}ms`, opacity: 0 }}
  >
    {children}
  </div>
);