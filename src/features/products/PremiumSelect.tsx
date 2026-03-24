import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useTranslation } from "@/i18n";
import productImages from "../../data/productImages.json";
import { useResponsive } from "../../shared/hooks/useResponsive";
import { useCarousel } from "../../shared/hooks/useCarousel";
import { ProductSelectCard } from "./components/ProductSelectCard";
import { CarouselDots } from "./components/Carousel/CarouselDots";
import { SectionHeader } from "../../shared/ui/Layout/SectionHeader";

const PremiumSelect: React.FC = () => {
  const { t } = useTranslation("premiumSelect");
  const { visibleItems } = useResponsive();
  const [isMounted, setIsMounted] = useState(false);

  // Sincronización de hidratación
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    currentIndex,
    isSliding,
    totalPages,
    handlePrev,
    handleNext,
    handleGoTo,
    transformValue,
  } = useCarousel({
    totalItems: productImages.length,
    visibleItems,
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

  const dynamicWidth = isMounted ? `${100 / visibleItems}%` : "";

  return (
    <section className="w-full py-8 sm:py-12 bg-gray-50 overflow-hidden min-h-[450px]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="min-h-[40px] mb-6">
          <SectionHeader title={t("premium_select_title")} />
        </div>

        <div
          className={`relative transition-opacity duration-500 ${
            isMounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div
              {...swipeHandlers}
              className="touch-pan-y cursor-grab active:cursor-grabbing"
            >
              <div
                className="flex transition-transform duration-500 ease-out will-change-transform"
                style={{
                  transform: isMounted ? transformValue : "translateX(0)",
                }}
              >
                {productImages.map((product, index) => (
                  <div
                    key={`${product.key}-${index}`}
                    className="flex-shrink-0 px-1 sm:px-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 transition-all duration-300"
                    style={{ width: dynamicWidth }}
                  >
                    <ProductSelectCard
                      name={t(product.key)}
                      image={product.image}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reservamos espacio para los dots siempre (evita saltos verticales) */}
          <div className="mt-8 min-h-[20px]">
            {totalPages > 1 && (
              <CarouselDots
                totalPages={totalPages}
                currentIndex={currentIndex}
                onDotClick={handleGoTo}
                isSliding={isSliding}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSelect;
