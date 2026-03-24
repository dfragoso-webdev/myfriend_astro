// src/shared/ui/GradientText.tsx
import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  from = 'from-gray-900',
  via = 'via-blue-900',
  to = 'to-purple-900'
}) => (
  <span className={`bg-gradient-to-r ${from} ${via} ${to} bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);