// src/features/products/components/ProductName.tsx
import React from 'react';

interface ProductNameProps {
  name: string;
}

export const ProductName: React.FC<ProductNameProps> = ({ name }) => (
  <div className="text-center space-y-2">
    <h3 className="text-gray-800 font-semibold text-lg md:text-xl lg:text-2xl">
      {name}
    </h3>
  </div>
);