// src/features/products/components/CarouselDots.tsx
import React from 'react';

interface CarouselDotsProps {
  totalPages: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
  isSliding: boolean;
}

export const CarouselDots: React.FC<CarouselDotsProps> = ({
  totalPages,
  currentIndex,
  onDotClick,
  isSliding
}) => (
  <div className="flex justify-center items-center gap-2 mt-8">
    {Array.from({ length: totalPages }).map((_, idx) => (
      <button
        key={idx}
        className={`
          transition-all duration-300 rounded-full cursor-pointer
          ${idx === currentIndex
            ? 'w-6 sm:w-8 h-2 bg-primary'
            : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
          }
          ${isSliding ? 'pointer-events-none' : ''}
        `}
        onClick={() => onDotClick(idx)}
        disabled={isSliding}
        aria-label={`Ir a página ${idx + 1}`}
      />
    ))}
  </div>
);