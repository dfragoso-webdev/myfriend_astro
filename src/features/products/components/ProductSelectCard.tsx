// src/features/products/components/ProductSelectCard.tsx
import React from 'react';

interface ProductSelectCardProps {
  name: string;
  image: string;
}

// src/features/products/components/ProductSelectCard.tsx
export const ProductSelectCard: React.FC<ProductSelectCardProps> = ({ name, image }) => (
  <div className="w-full">
    <div className="relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="aspect-[4/3] sm:aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent 
                    flex items-end p-2 sm:p-4">
        <h3 className="text-white text-[10px] leading-tight sm:text-sm md:text-base font-bold line-clamp-2">
          {name}
        </h3>
      </div>
    </div>
  </div>
);