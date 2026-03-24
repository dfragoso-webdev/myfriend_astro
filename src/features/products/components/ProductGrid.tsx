// src/features/products/components/ProductGrid.tsx
import React from 'react';
import type { CategoryProduct } from '../../../shared/types';
import { ProductCard } from './ProductCard/ProductCard';
import { FadeInItem } from '../../../shared/ui/Animation/FadeInItem';

interface ProductGridProps {
  products: CategoryProduct[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
    {products.map((product, index) => (
      <FadeInItem key={product.key} delay={index * 100}>
        <ProductCard
          name={product.name}
          icon={product.icon}
          description={product.description}
        />
      </FadeInItem>
    ))}
  </div>
);