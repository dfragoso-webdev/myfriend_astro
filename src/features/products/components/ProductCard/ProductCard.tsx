// src/features/products/components/ProductCard.tsx
import React from 'react';
import { ProductIcon } from './ProductIcon';
import { ProductName } from './ProductName';

interface ProductCardProps {
  name: string;
  icon: string;
  description?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ name, icon, description }) => {
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-color/20 to-secondary-color/20 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>

      <div>
        <div
          className={`
            absolute inset-0 bg-gradient-to-br
            rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300
          `}
        ></div>

        <div className="relative z-10 flex flex-col items-center p-6">
          <ProductIcon icon={icon} name={name} />
          <ProductName name={name} />
          {description && (
            <p className="text-sm text-gray-600 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};