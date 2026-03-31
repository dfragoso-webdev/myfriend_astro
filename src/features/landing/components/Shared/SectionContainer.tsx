// src/features/landing/components/shared/SectionContainer.tsx
import React from 'react';

interface SectionContainerProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  children,
  className = '',
  fullWidth = false,
}) => {
  return (
    <section id={id} className={`relative w-full py-20 px-4 overflow-hidden ${className}`}>
      <div className={`relative z-10 ${fullWidth ? 'w-full' : 'max-w-7xl mx-auto'}`}>
        {children}
      </div>
    </section>
  );
};