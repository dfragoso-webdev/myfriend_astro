// src/features/products/PremiumSelect.tsx
import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { useTranslation } from '@/i18n';
import productImages from '../../data/productImages.json';
import { useResponsive } from '../../shared/hooks/useResponsive';
import { useCarousel } from '../../shared/hooks/useCarousel';
import { ProductSelectCard } from './components/ProductSelectCard';
import { CarouselDots } from './components/Carousel/CarouselDots';
import { SectionHeader } from '../../shared/ui/Layout/SectionHeader';

const PremiumSelect: React.FC = () => {
  const { t } = useTranslation('premiumSelect');
  const { visibleItems, isMobile, isTablet } = useResponsive();
  
  const {
    currentIndex,
    isSliding,
    totalPages,
    handlePrev,
    handleNext,
    handleGoTo,
    transformValue
  } = useCarousel({
    totalItems: productImages.length,
    visibleItems
  });

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
    delta: 10,
    swipeDuration: 500,
  });

  if (!productImages?.length) return null;

  return (
    <section className="w-full py-8 sm:py-12 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title={t('premium_select_title')} />

        <div className="relative"> 
          <div className="overflow-hidden">
            <div {...swipeHandlers} className="touch-pan-y cursor-grab active:cursor-grabbing">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: transformValue }}
              >
                {productImages.map((product, index) => (
                  <div
                    key={`${product.key}-${index}`}
                    className="flex-shrink-0 transition-all duration-300"
                    style={{ width: `${100 / visibleItems}%` }}
                  >
                    <div className="px-1 sm:px-2">
                      <ProductSelectCard name={t(product.key)} image={product.image} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="mt-8">
            <CarouselDots
              totalPages={totalPages}
              currentIndex={currentIndex}
              onDotClick={handleGoTo}
              isSliding={isSliding}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PremiumSelect;