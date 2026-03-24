// src/features/products/components/ProductIcon.tsx
import React from 'react';

interface ProductIconProps {
  icon: string;
  name: string;
}

export const ProductIcon: React.FC<ProductIconProps> = ({ icon, name }) => (
  <div className="relative w-28 h-28 md:w-32 md:h-32 mb-4">
    <div className="absolute inset-0 bg-gray-400/20 rounded-full blur-xl transform scale-90"></div>
    <div className="relative w-full h-full flex items-center justify-center">
      <img
        src={icon}
        alt={name}
        className="w-full h-full object-contain drop-shadow-xl transform group-hover:scale-110 transition-all duration-500 group-hover:rotate-3"
        loading="lazy"
      />
    </div>
  </div>
);