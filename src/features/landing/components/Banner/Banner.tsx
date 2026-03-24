import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next"; // 1. Importar hook
import { svgs } from "@/mediaRoutes";

interface BannerProps {
  images: string[];
  imagesMobile: string[];
  autoPlayInterval?: number;
  transitionDuration?: number;
}

// 2. Definir interfaz para el contenido del JSON
interface BannerSlideContent {
  subtitle: string;
  title: string;
}

const Banner = ({
  images,
  imagesMobile,
  autoPlayInterval = 5000,
  transitionDuration = 700,
}: BannerProps) => {
  // 3. Inicializar traducción apuntando al namespace "banner"
  const { t } = useTranslation("banner");

  // 4. Obtener el array de slides desde el JSON
  const slidesContent = t("slides", {
    returnObjects: true,
  }) as BannerSlideContent[];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const totalSlides = images.length;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!autoPlayInterval || isHovered) return;
    setProgress(0);

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (autoPlayInterval / 100);
      });
    }, 100);

    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, autoPlayInterval, isHovered]);

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

  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      diff > 0 ? handleNext() : handlePrev();
    }
    setTouchStart(null);
  };

  const displayImages = useMemo(() => {
    return images.map((img, index) => ({
      desktop: img,
      mobile: imagesMobile[index] || img,
    }));
  }, [images, imagesMobile]);

  if (!images.length) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "clamp(400px, 70vh, 85vh)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Carousel"
    >
      <div
        className="flex h-full w-full transition-transform will-change-transform"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transitionDuration: `${transitionDuration}ms`,
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {displayImages.map((img, i) => (
          <div key={i} className="relative h-full w-full flex-shrink-0">
            <picture>
              <source media="(max-width: 768px)" srcSet={img.mobile} />
              <img
                src={img.desktop}
                alt={slidesContent[i]?.title || ""}
                className="h-full w-full object-cover select-none"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </picture>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* 5. TEXTO RENDERIZADO DESDE i18n */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20 text-white">
              <div className="max-w-7xl mx-auto">
                {i === currentIndex && (
                  <div className="overflow-hidden">
                    <p className="text-md md:text-lg uppercase tracking-widest text-white/80 mb-3 animate-fadeInUp">
                      {slidesContent[i]?.subtitle}
                    </p>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold max-w-3xl leading-tight animate-fadeInUp animation-delay-200">
                      {slidesContent[i]?.title}
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navegación y Otros Controles (Se mantienen igual) */}
      <div className="hidden md:block">
        <button
          onClick={handlePrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all opacity-0 group-hover/banner:opacity-100"
        >
          <img src={svgs.prevButtonLI} className="w-6 h-6 invert" alt="" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all opacity-0 group-hover/banner:opacity-100"
        >
          <img src={svgs.nextButtonLI} className="w-6 h-6 invert" alt="" />
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => !isTransitioning && setCurrentIndex(i)}
            className="group relative h-1.5 transition-all duration-500 overflow-hidden rounded-full bg-white/30"
            style={{ width: currentIndex === i ? "3rem" : "1.5rem" }}
          >
            {currentIndex === i && (
              <div
                className="absolute inset-0 bg-white"
                style={{
                  transform: `scaleX(${progress / 100})`,
                  transformOrigin: "left",
                }}
              />
            )}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
      `}</style>
    </section>
  );
};

export default Banner;
