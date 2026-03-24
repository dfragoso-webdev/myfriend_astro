// src/features/products/components/CarouselButton.tsx
import React from 'react';
import { svgs } from '../../../../mediaRoutes';

interface CarouselButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  isMobile: boolean;
  isTablet: boolean; // Añadimos esta prop
  ariaLabel?: string;
}

export const CarouselButton: React.FC<CarouselButtonProps> = ({
  direction,
  onClick,
  isMobile,
  isTablet,
  ariaLabel
}) => {
  // Solo mostramos el botón si no es móvil Y no es tableta
  const shouldShow = !isMobile && !isTablet;

  return (
    <button
      onClick={onClick}
      className={`
        absolute top-1/2 -translate-y-1/2 z-20
        w-10 h-10 lg:w-12 lg:h-12
        bg-gray-700/80 backdrop-blur-sm rounded-full
        shadow-lg hover:shadow-xl
        transition-all hover:scale-110
        items-center justify-center
        ${direction === 'left' 
          ? 'left-2 lg:-left-12' 
          : 'right-2 lg:-right-12'
        }
        ${shouldShow ? 'flex' : 'hidden'} 
      `}
      aria-label={ariaLabel || (direction === 'left' ? 'Anterior' : 'Siguiente')}
    >
      <img 
        src={direction === 'left' ? svgs.pwlarrow : svgs.pwrarrow} 
        alt="" 
        className="w-4 h-4 lg:w-5 lg:h-5 invert" 
      />
    </button>
  );
};