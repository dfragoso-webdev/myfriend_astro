// src/features/products/Products.tsx
import React from 'react';
import { useTranslation } from '@/i18n';
import { SectionHeader } from '@/shared/ui/Layout/SectionHeader';
import { ProductGrid } from './components/ProductGrid';
import { useProducts } from './hooks/useProducts';

const Products: React.FC = () => {
  const { t } = useTranslation('products');
  const products = useProducts();

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, gray 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-secondary-color/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <SectionHeader
          title={t('products_title')}
          subtitle={t('products_subtitle')}
        />

        <ProductGrid products={products} />
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out forwards;
          }
        `}
      </style>
    </section>
  );
};

export default Products;