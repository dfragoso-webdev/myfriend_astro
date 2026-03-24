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

// Hook simple para detectar mobile SIN romper SSR
function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

const Banner = ({
  images,
  imagesMobile,
  autoPlayInterval = 5000,
  transitionDuration = 700,
}: BannerProps) => {
  const { t } = useTranslation("banner");
  const slidesContent = t("slides", { returnObjects: true }) as BannerSlideContent[];

  const isMobile = useIsMobile();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const totalSlides = images.length;

  // 🔥 Imagen segura (evita flicker de picture)
  const getImage = (i: number) => {
    if (isMobile === null) return images[i]; // SSR fallback
    return isMobile ? imagesMobile[i] || images[i] : images[i];
  };

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

  // 🔥 Autoplay estable
  useEffect(() => {
    if (!autoPlayInterval || isHovered) return;

    autoPlayRef.current = setInterval(handleNext, autoPlayInterval);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [handleNext, autoPlayInterval, isHovered]);

  // 🔥 Touch
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const diff = touchStart - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? handleNext() : handlePrev();
    }

    setTouchStart(null);
  };

  if (!images.length) return null;

  return (
    <section
      className="
        relative w-full overflow-hidden group/banner
        h-[420px] md:h-[520px] lg:h-[620px]
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SLIDER */}
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
          const src = getImage(i);

          return (
            <div key={i} className="relative h-full w-full flex-shrink-0">
              
              <img
                src={src}
                alt={slidesContent[i]?.title || ""}
                className="h-full w-full object-cover select-none"
                width={1920}
                height={800}
                loading="eager"
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* TEXTO */}
              {i === currentIndex && (
                <div className="absolute inset-x-0 bottom-[12%] text-white px-6 md:px-20">
                  <div className="max-w-7xl mx-auto">
                    <p className="text-md md:text-xl uppercase tracking-widest text-white/80 mb-2 animate-fadeInUp">
                      {slidesContent[i]?.subtitle}
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold max-w-4xl leading-tight animate-fadeInUp delay-200">
                      {slidesContent[i]?.title}
                    </h2>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* BOTONES */}
      <div className="absolute inset-0 flex items-center justify-between p-4 z-30 pointer-events-none">
        <button
          onClick={handlePrev}
          className="pointer-events-auto p-3 md:p-4 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-white/20 transition opacity-0 group-hover/banner:opacity-100"
        >
          <img src={svgs.prevButtonLI} className="w-5 h-5 invert" />
        </button>

        <button
          onClick={handleNext}
          className="pointer-events-auto p-3 md:p-4 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-white/20 transition opacity-0 group-hover/banner:opacity-100"
        >
          <img src={svgs.nextButtonLI} className="w-5 h-5 invert" />
        </button>
      </div>

      {/* INDICADORES */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => !isTransitioning && setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              currentIndex === i ? "w-12 bg-white" : "w-6 bg-white/40"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default Banner;