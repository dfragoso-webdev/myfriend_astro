// src/shared/ui/Loader.tsx
import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  color = 'primary-color',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <div className={`absolute inset-0 border-4 border-${color}/20 rounded-full`} />
        <div className={`absolute inset-0 border-4 border-${color} rounded-full animate-rotate border-t-transparent`} />
      </div>
    </div>
  );
};