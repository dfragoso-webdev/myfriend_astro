// src/features/landing/components/Stores/CityCard.tsx
import React from 'react';
import { ProgressiveImage } from '@/shared/ui/ProgressiveImage/ProgressiveImage';

interface CityCardProps {
  image: string;
  city: string;
  storeId: string;
  lang: string;
  className?: string;
}

export const CityCard: React.FC<CityCardProps> = ({ 
  image, 
  city, 
  storeId, 
  lang, 
  className 
}) => {
  const buttonText = lang === 'es' ? 'Ver sucursales' : 'View branches';
  
  return (
    <div className={`
      relative w-72 h-80 sm:w-80 sm:h-88 md:w-96 md:h-[420px] lg:w-[380px] lg:h-[440px] xl:w-[400px] xl:h-[500px]
      rounded-2xl overflow-hidden shadow-2xl group cursor-pointer 
      transition-all duration-500 hover:shadow-3xl hover:-translate-y-2
      ${className}
    `}>
      <ProgressiveImage
        src={image}
        alt={city}
        width={400}
        height={500}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        placeholderColor="#1a1a1a"
        loading="lazy"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 text-white text-center">
        <h3 className="text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold mb-2 md:mb-3 tracking-tight">
          {city}
        </h3>
        
        <div className="flex items-center justify-center gap-2 text-sm md:text-base lg:text-lg text-white/80">
          <span>{buttonText}</span>
          <svg 
            className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transform group-hover:translate-x-2 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
};