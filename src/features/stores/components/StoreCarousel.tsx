import React, { useState, useEffect, useMemo } from "react";
import { useSwipeable } from "react-swipeable";
import { useResponsive } from "@/shared/hooks/useResponsive";
import { useCarousel } from "@/shared/hooks/useCarousel";
import { CarouselDots } from "@/features/products/components/Carousel/CarouselDots";
import { SectionHeader } from "@/shared/ui/Layout/SectionHeader";
import { ProductSelectCard } from "@/features/stores/components/ProductSelectCard";
import { getStoreProducts } from "../config/storeProducts";
import { ImageModal } from "@/shared/ui/ImageModal/ImageModal";

interface StoreCarouselProps {
  storeId: string;
  title?: string;
  titleEn?: string;
  lang?: string;
}

const StoreCarousel: React.FC<StoreCarouselProps> = ({
  storeId,
  title = "Productos disponibles",
  titleEn = "Available products",
  lang = "es",
}) => {
  const { visibleItems } = useResponsive();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const isSpanish = lang === "es";
  const products = useMemo(() => getStoreProducts(storeId), [storeId]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
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

  if (!products.length) return null;

  const itemWidth = isMounted ? `${100 / visibleItems}%` : "100%";

  return (
    <section id="products" className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-8 md:mb-12 lg:mb-16">
          <SectionHeader
            title={isSpanish ? title : titleEn}
            subtitle={isSpanish ? "Encuentra todo lo que necesitas" : "Find everything you need"}
          />
        </div>

        <div className={`relative transition-opacity duration-500 ${isMounted ? "opacity-100" : "opacity-0"}`}>
          {/* Navegación Desktop */}
          {totalPages > 1 && visibleItems >= 2 && (
            <>
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0 || isSliding}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center transition-all disabled:opacity-30 hover:bg-primary hover:text-white hidden md:flex"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex >= totalPages - 1 || isSliding}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center transition-all disabled:opacity-30 hover:bg-primary hover:text-white hidden md:flex"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Carrusel */}
          <div className="relative overflow-hidden">
            <div {...swipeHandlers} className="touch-pan-y cursor-grab active:cursor-grabbing">
              <div
                className="flex transition-transform duration-500 ease-out will-change-transform"
                style={{ transform: isMounted ? transformValue : "translateX(0)" }}
              >
                {products.map((product, index) => (
                  <div key={`${product.key}-${index}`} className="flex-shrink-0 px-2 sm:px-4" style={{ width: itemWidth }}>
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
      </div>

      {/* Modal de Imagen */}
      <ImageModal 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage || ''}
      />
    </section>
  );
};

export default StoreCarousel;