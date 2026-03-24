// src/features/products/components/SwipeIndicator.tsx
import React from 'react';

interface SwipeIndicatorProps {
  isMobile: boolean;
  show: boolean;
  text?: string;
}

export const SwipeIndicator: React.FC<SwipeIndicatorProps> = ({
  isMobile,
  show,
  text = '← Desliza para ver más productos →'
}) => {
  if (!isMobile || !show) return null;
  
  return (
    <p className="text-center text-sm text-gray-400 mt-4 animate-pulse">
      {text}
    </p>
  );
};