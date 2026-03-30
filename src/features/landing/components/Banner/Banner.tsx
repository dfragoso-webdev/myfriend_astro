// src/features/landing/components/Banner/Banner.tsx
import { useEffect, useState, useCallback, useRef } from "react";
import { useTranslation } from "@/i18n";
import { svgs } from "@/mediaRoutes";

interface BannerProps {
  images: string[];
  imagesMobile: string[];
  autoPlayInterval?: number;
  transitionDuration?: number;
}

interface BannerSlideContent {
  subtitle: string;
  title: string;
}

// Hook mejorado para mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

// ✅ Hook para lazy loading con preload inteligente
const useLazyBannerImages = (
  images: string[],
  imagesMobile: string[],
  isMobile: boolean,
  totalSlides: number
) => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [preloadedIndexes, setPreloadedIndexes] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const getImageUrl = useCallback(
    (index: number) => (isMobile ? imagesMobile[index] ?? images[index] : images[index]),
    [images, imagesMobile, isMobile]
  );

  // ✅ Preload de imágenes críticas (primera y siguientes)
  const preloadImage = useCallback((index: number) => {
    if (preloadedIndexes.has(index)) return;
    
    const img = new Image();
    img.src = getImageUrl(index);
    img.onload = () => {
      setLoadedImages(prev => new Set(prev).add(index));
      setPreloadedIndexes(prev => new Set(prev).add(index));
    };
  }, [getImageUrl, preloadedIndexes]);

  // ✅ Preload de la primera imagen inmediatamente
  useEffect(() => {
    preloadImage(0);
    if (totalSlides > 1) preloadImage(1); // Preload siguiente también
  }, [preloadImage, totalSlides]);

  // ✅ Usar IntersectionObserver para lazy loading de imágenes no visibles
  useEffect(() => {
    if (!window.IntersectionObserver) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!loadedImages.has(index) && !preloadedIndexes.has(index)) {
              preloadImage(index);
            }
          }
        });
      },
      { rootMargin: '200px' } // Preload cuando esté a 200px de distancia
    );

    return () => observerRef.current?.disconnect();
  }, [loadedImages, preloadedIndexes, preloadImage]);

  const registerElement = useCallback((element: HTMLElement | null, index: number) => {
    if (element && observerRef.current) {
      element.setAttribute('data-index', String(index));
      observerRef.current.observe(element);
    }
  }, []);

  return { loadedImages, preloadImage, registerElement, getImageUrl };
};

const Banner = ({
  images,
  imagesMobile,
  autoPlayInterval = 5000,
  transitionDuration = 700,
}: BannerProps) => {
  const { t } = useTranslation("banner");
  const slidesContent = t("slides", { returnObjects: true }) as BannerSlideContent[];

  const isMobile = useIsMobile();
  const totalSlides = images.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ✅ Lazy loading hook
  const { loadedImages, preloadImage, registerElement, getImageUrl } = useLazyBannerImages(
    images,
    imagesMobile,
    isMobile,
    totalSlides
  );

  // ✅ Preload imágenes adyacentes al cambiar de slide
  useEffect(() => {
    if (currentIndex > 0) preloadImage(currentIndex - 1);
    preloadImage(currentIndex);
    if (currentIndex < totalSlides - 1) preloadImage(currentIndex + 1);
  }, [currentIndex, preloadImage, totalSlides]);

  // ✅ Marcar cliente para evitar problemas de hidratación
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  }, [isTransitioning, totalSlides, transitionDuration]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  }, [isTransitioning, totalSlides, transitionDuration]);

  useEffect(() => {
    if (!autoPlayInterval || isHovered) return;
    autoPlayRef.current = setInterval(handleNext, autoPlayInterval);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [handleNext, autoPlayInterval, isHovered]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? handleNext() : handlePrev();
    setTouchStart(null);
  };

  if (!images.length) return null;

  return (
    <section
      className="
        relative w-full overflow-hidden group/banner
        h-[600px] md:h-[600px] lg:h-[720px]
      "
      style={{ 
        contain: "layout size",
        backgroundColor: "#f3f4f6"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex h-full w-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: `transform ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1)`,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {images.map((_, i) => {
          const src = getImageUrl(i);
          const isLoaded = loadedImages.has(i);
          const isActive = i === currentIndex;

          return (
            <div
              key={i}
              ref={(el) => {
                slideRefs.current[i] = el;
                registerElement(el, i);
              }}
              className="relative h-full w-full flex-shrink-0"
            >
              {/* ✅ Skeleton loader mientras carga */}
              {!isLoaded && (
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
                  style={{
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite'
                  }}
                />
              )}

              {/* ✅ Picture con dimensiones explícitas */}
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet={imagesMobile[i] ?? images[i]}
                />
                <img
                  src={isClient ? src : images[i]} // ✅ SSR con imagen por defecto
                  alt={slidesContent[i]?.title ?? ""}
                  className={`
                    h-full w-full object-cover select-none
                    transition-opacity duration-500 ease-out
                    ${isLoaded ? 'opacity-100' : 'opacity-0'}
                  `}
                  width={1920}
                  height={800}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                  onLoad={() => preloadImage(i)}
                />
              </picture>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* Texto con animación optimizada */}
              {isActive && (
                <div className="absolute inset-x-0 bottom-[12%] text-white px-6 md:px-20">
                  <div className="max-w-7xl mx-auto">
                    <p
                      className="text-md md:text-xl uppercase tracking-widest text-white/80 mb-2"
                      style={{
                        animation: 'fadeIn 0.5s ease forwards',
                        opacity: 0,
                      }}
                    >
                      {slidesContent[i]?.subtitle}
                    </p>
                    <h2
                      className="text-4xl md:text-5xl lg:text-7xl font-bold max-w-4xl leading-tight"
                      style={{
                        animation: 'fadeIn 0.7s ease 0.15s forwards',
                        opacity: 0,
                      }}
                    >
                      {slidesContent[i]?.title}
                    </h2>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Botones de navegación */}
      <div className="absolute inset-0 flex items-center justify-between p-4 z-30 pointer-events-none">
        <button
          onClick={handlePrev}
          className="pointer-events-auto p-3 md:p-4 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-white/20 transition opacity-0 group-hover/banner:opacity-100 focus:opacity-100"
          aria-label="Anterior"
        >
          <img src={svgs.prevButtonLI} className="w-5 h-5 invert" alt="" />
        </button>
        <button
          onClick={handleNext}
          className="pointer-events-auto p-3 md:p-4 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-white/20 transition opacity-0 group-hover/banner:opacity-100 focus:opacity-100"
          aria-label="Siguiente"
        >
          <img src={svgs.nextButtonLI} className="w-5 h-5 invert" alt="" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => !isTransitioning && setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              currentIndex === i ? "w-12 bg-white" : "w-6 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Ir al slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;