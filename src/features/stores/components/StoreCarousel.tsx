// src/features/stores/components/StoreCarousel.tsx
import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useResponsive } from "@/shared/hooks/useResponsive";
import { useCarousel } from "@/shared/hooks/useCarousel";
import { CarouselDots } from "@/features/products/components/Carousel/CarouselDots";
import { SectionHeader } from "@/shared/ui/Layout/SectionHeader";
import { ProductSelectCard } from "@/features/products/components/ProductSelectCard";

// Mapeo de productos por tienda
const storeProductsMap: Record<
  string,
  Array<{ key: string; label: string; labelEn: string; image: string }>
> = {
  "marina-del-rey": [
    {
      key: "pharmacy",
      label: "Farmacia",
      labelEn: "Pharmacy",
      image: "/svg/producto/Pharmacy.svg",
    },
    {
      key: "beverages",
      label: "Bebidas",
      labelEn: "Beverages",
      image: "/svg/producto/Beverages.svg",
    },
    {
      key: "grocery",
      label: "Abarrotes",
      labelEn: "Groceries",
      image: "/svg/producto/Grocery.svg",
    },
    {
      key: "souvenirs",
      label: "Recuerdos",
      labelEn: "Souvenirs",
      image: "/svg/producto/HandCraft.svg",
    },
  ],
  nautilus: [
    {
      key: "pharmacy",
      label: "Farmacia",
      labelEn: "Pharmacy",
      image: "/svg/producto/Pharmacy.svg",
    },
    {
      key: "clothes",
      label: "Ropa",
      labelEn: "Clothes",
      image: "/svg/producto/Clothes.svg",
    },
    {
      key: "beverages",
      label: "Bebidas",
      labelEn: "Beverages",
      image: "/svg/producto/Beverages.svg",
    },
  ],
  caribe: [
    {
      key: "pharmacy",
      label: "Farmacia",
      labelEn: "Pharmacy",
      image: "/svg/producto/Pharmacy.svg",
    },
    {
      key: "beverages",
      label: "Bebidas",
      labelEn: "Beverages",
      image: "/svg/producto/Beverages.svg",
    },
    {
      key: "grocery",
      label: "Abarrotes",
      labelEn: "Groceries",
      image: "/svg/producto/Grocery.svg",
    },
    {
      key: "sunscreens",
      label: "Protectores solares",
      labelEn: "Sunscreens",
      image: "/svg/producto/Sunscreens.svg",
    },
  ],
  "royal-hideaway": [
    {
      key: "pharmacy",
      label: "Farmacia",
      labelEn: "Pharmacy",
      image: "/svg/producto/Pharmacy.svg",
    },
    {
      key: "clothes",
      label: "Ropa",
      labelEn: "Clothes",
      image: "/svg/producto/Clothes.svg",
    },
    {
      key: "beverages",
      label: "Bebidas",
      labelEn: "Beverages",
      image: "/svg/producto/Beverages.svg",
    },
    {
      key: "hcraft",
      label: "Artesanías",
      labelEn: "Handicrafts",
      image: "/svg/producto/HandCraft.svg",
    },
    {
      key: "grocery",
      label: "Abarrotes",
      labelEn: "Groceries",
      image: "/svg/producto/Grocery.svg",
    },
    {
      key: "deli",
      label: "Deli",
      labelEn: "Deli",
      image: "/svg/producto/Deli.svg",
    },
    {
      key: "kids",
      label: "Niños",
      labelEn: "Kids",
      image: "/svg/producto/Kids.svg",
    },
    {
      key: "sunscreens",
      label: "Protectores solares",
      labelEn: "Sunscreens",
      image: "/svg/producto/Sunscreens.svg",
    },
  ],
  yucatan: [
    {
      key: "pharmacy",
      label: "Farmacia",
      labelEn: "Pharmacy",
      image: "/svg/producto/Pharmacy.svg",
    },
    {
      key: "beverages",
      label: "Bebidas",
      labelEn: "Beverages",
      image: "/svg/producto/Beverages.svg",
    },
    {
      key: "grocery",
      label: "Abarrotes",
      labelEn: "Groceries",
      image: "/svg/producto/Grocery.svg",
    },
    {
      key: "deli",
      label: "Deli",
      labelEn: "Deli",
      image: "/svg/producto/Deli.svg",
    },
  ],
  galerias: [
    {
      key: "pharmacy",
      label: "Farmacia",
      labelEn: "Pharmacy",
      image: "/svg/producto/Pharmacy.svg",
    },
    {
      key: "clothes",
      label: "Ropa",
      labelEn: "Clothes",
      image: "/svg/producto/Clothes.svg",
    },
    {
      key: "beverages",
      label: "Bebidas",
      labelEn: "Beverages",
      image: "/svg/producto/Beverages.svg",
    },
    {
      key: "grocery",
      label: "Abarrotes",
      labelEn: "Groceries",
      image: "/svg/producto/Grocery.svg",
    },
  ],
  allegro: [
    {
      key: "pharmacy",
      label: "Farmacia",
      labelEn: "Pharmacy",
      image: "/svg/producto/Pharmacy.svg",
    },
    {
      key: "beverages",
      label: "Bebidas",
      labelEn: "Beverages",
      image: "/svg/producto/Beverages.svg",
    },
    {
      key: "grocery",
      label: "Abarrotes",
      labelEn: "Groceries",
      image: "/svg/producto/Grocery.svg",
    },
  ],
  riviera: [
    {
      key: "pharmacy",
      label: "Farmacia",
      labelEn: "Pharmacy",
      image: "/svg/producto/Pharmacy.svg",
    },
    {
      key: "beverages",
      label: "Bebidas",
      labelEn: "Beverages",
      image: "/svg/producto/Beverages.svg",
    },
    {
      key: "grocery",
      label: "Abarrotes",
      labelEn: "Groceries",
      image: "/svg/producto/Grocery.svg",
    },
    {
      key: "sunscreens",
      label: "Protectores solares",
      labelEn: "Sunscreens",
      image: "/svg/producto/Sunscreens.svg",
    },
  ],
};

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
  const isSpanish = lang === "es";

  const products =
    storeProductsMap[storeId] || storeProductsMap["royal-hideaway"];

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
    totalItems: products.length,
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

  if (!products.length) return null;

  // Calcular el ancho de cada item
  // En móvil (visibleItems === 1), el ancho debe ser 100%
  const itemWidth = isMounted ? `${100 / visibleItems}%` : "100%";

  return (
    <section
      id="products"
      className="w-full py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-8 md:mb-12">
          <SectionHeader
            title={isSpanish ? title : titleEn}
            subtitle={
              isSpanish
                ? "Encuentra todo lo que necesitas"
                : "Find everything you need"
            }
          />
        </div>

        <div
          className={`relative transition-opacity duration-500 ${
            isMounted ? "opacity-100" : "opacity-0"
          }`}
        >
          {totalPages > 1 && visibleItems >= 2 && (
            <>
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0 || isSliding}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg  items-center justify-center transition-all duration-300 hidden md:flex disabled:opacity-50 hover:bg-primary hover:text-white hover:scale-110"
                aria-label={isSpanish ? "Anterior" : "Previous"}
              >
                <svg
                  className="w-5 h-5"
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
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg  items-center justify-center transition-all duration-300 hidden md:flex disabled:opacity-50 hover:bg-primary hover:text-white hover:scale-110"
                aria-label={isSpanish ? "Siguiente" : "Next"}
              >
                <svg
                  className="w-5 h-5"
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

          {/* Carrusel - centrado correctamente */}
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
                    className="flex-shrink-0 px-2 sm:px-3 transition-all duration-300"
                    style={{ width: itemWidth }}
                  >
                    <div
                      className={`
                      mx-auto
                      ${visibleItems === 1 ? "max-w-[280px]" : "max-w-full"}
                    `}
                    >
                      <ProductSelectCard
                        name={isSpanish ? product.label : product.labelEn}
                        image={product.image}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Indicadores */}
          <div className="mt-8">
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

export default StoreCarousel;
