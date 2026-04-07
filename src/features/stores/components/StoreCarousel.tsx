// src/features/stores/components/StoreCarousel.tsx
import React, { useState, useEffect, useMemo } from "react";
import { useSwipeable } from "react-swipeable";
import { useResponsive } from "@/shared/hooks/useResponsive";
import { useCarousel } from "@/shared/hooks/useCarousel";
import { CarouselDots } from "@/features/products/components/Carousel/CarouselDots";
import { ProductSelectCard } from "@/features/stores/components/ProductSelectCard";
import { getStoreProducts } from "../config/storeProducts";
import { ImageModal } from "@/shared/ui/ImageModal/ImageModal";
import { useTranslation } from "@/i18n";

interface StoreCarouselProps {
  storeId: string;
  lang?: string;
}

const StoreCarousel: React.FC<StoreCarouselProps> = ({
  storeId,
  lang = "es",
}) => {
  const { t } = useTranslation("branches");
  const { visibleItems } = useResponsive();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const products = useMemo(() => getStoreProducts(storeId), [storeId]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const {
    currentIndex,
    isSliding,
    totalPages,
    handlePrev,
    handleNext,
    handleGoTo,
    transformValue,
  } = useCarousel({
    totalItems: products.length,
    visibleItems,
  });

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // Si no hay productos, no mostrar nada
  if (!products.length) {
    return null;
  }

  const itemWidth = isMounted ? `${100 / visibleItems}%` : "100%";

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      <h2 className="text-primary text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
        {t("gallery")}
      </h2>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div
          className={`relative transition-opacity duration-500 ${isMounted ? "opacity-100" : "opacity-0"}`}
        >
          {/* Navegación Desktop */}
          {totalPages > 1 && visibleItems >= 2 && (
            <>
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0 || isSliding}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all disabled:opacity-30 hover:bg-primary hover:text-white hidden md:flex"
                aria-label="Anterior"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex >= totalPages - 1 || isSliding}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all disabled:opacity-30 hover:bg-primary hover:text-white hidden md:flex"
                aria-label="Siguiente"
              >
                <svg
                  className="w-6 h-6"
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
              </button>
            </>
          )}

          {/* Carrusel */}
          <div className="relative overflow-hidden">
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
                {products.map((product, index) => (
                  <div
                    key={`${product.key}-${index}`}
                    className="flex-shrink-0 px-2 sm:px-4"
                    style={{ width: itemWidth }}
                  >
                    <ProductSelectCard
                      image={product.image}
                      imageType={product.imageType}
                      onClick={() => setSelectedImage(product.image)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Indicadores */}
        {totalPages > 1 && (
          <div className="mt-8 md:mt-12">
            <CarouselDots
              totalPages={totalPages}
              currentIndex={currentIndex}
              onDotClick={handleGoTo}
              isSliding={isSliding}
            />
          </div>
        )}
      </div>

      {/* Modal de Imagen */}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage || ""}
      />
    </section>
  );
};

export default StoreCarousel;