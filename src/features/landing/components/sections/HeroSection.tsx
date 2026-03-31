// src/features/landing/components/sections/HeroSection.tsx
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from '@/i18n';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { svgs } from '@/mediaRoutes';

interface HeroSectionProps {
  images: string[];
  imagesMobile: string[];
  autoPlayInterval?: number;
}

interface SlideContent {
  subtitle: string;
  title: string;
}

const HeroSlide: React.FC<{
  src: string;
  alt: string;
  isActive: boolean;
  subtitle: string;
  title: string;
}> = ({ src, alt, isActive, subtitle, title }) => (
  <div className="relative h-full w-full flex-shrink-0">
    <picture>
      <source media="(max-width: 768px)" srcSet={src} />
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover select-none"
        width={1920}
        height={800}
        loading={isActive ? "eager" : "lazy"}
        fetchPriority={isActive ? "high" : "auto"}
        decoding="async"
      />
    </picture>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
    {isActive && (
      <div className="absolute inset-x-0 bottom-[12%] text-white px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-md md:text-xl uppercase tracking-widest text-white/80 mb-2 animate-fadeIn">
            {subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold max-w-4xl leading-tight animate-fadeInUp">
            {title}
          </h2>
        </div>
      </div>
    )}
  </div>
);

export const HeroSection: React.FC<HeroSectionProps> = ({
  images,
  imagesMobile,
  autoPlayInterval = 5000,
}) => {
  const { t } = useTranslation('banner');
  const slidesContent = t('slides', { returnObjects: true }) as SlideContent[];
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const totalSlides = images.length;

  const getImageUrl = useCallback(
    (index: number) => (isMobile ? imagesMobile[index] ?? images[index] : images[index]),
    [images, imagesMobile, isMobile]
  );

  const handleNext = useCallback(() => {
    if (isTransitioning || totalSlides === 0) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    
    // Limpiar timeout anterior si existe
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  }, [isTransitioning, totalSlides]);

  const handlePrev = useCallback(() => {
    if (isTransitioning || totalSlides === 0) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  }, [isTransitioning, totalSlides]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  }, [isTransitioning, currentIndex]);

  // Auto-play logic
  useEffect(() => {
    if (!autoPlayInterval || isHovered || totalSlides <= 1) return;
    
    autoPlayRef.current = setInterval(handleNext, autoPlayInterval);
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [handleNext, autoPlayInterval, isHovered, totalSlides]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Early return if no images
  if (!images.length) return null;

  return (
    <section
      className="relative w-full overflow-hidden group/hero h-[600px] md:h-[720px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex h-full w-full transition-transform duration-700 ease-out will-change-transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((_, i) => (
          <HeroSlide
            key={i}
            src={getImageUrl(i)}
            alt={slidesContent[i]?.title ?? `Slide ${i + 1}`}
            isActive={i === currentIndex}
            subtitle={slidesContent[i]?.subtitle ?? ''}
            title={slidesContent[i]?.title ?? ''}
          />
        ))}
      </div>

      {/* Navigation Buttons - Solo mostrar si hay más de 1 slide */}
      {totalSlides > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
            <button
              onClick={handlePrev}
              disabled={isTransitioning}
              className="pointer-events-auto p-3 md:p-4 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300 opacity-0 group-hover/hero:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous slide"
            >
              <img src={svgs.prevButtonLI} className="w-5 h-5 invert" alt="" />
            </button>
            <button
              onClick={handleNext}
              disabled={isTransitioning}
              className="pointer-events-auto p-3 md:p-4 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300 opacity-0 group-hover/hero:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next slide"
            >
              <img src={svgs.nextButtonLI} className="w-5 h-5 invert" alt="" />
            </button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                disabled={isTransitioning}
                className={`h-1.5 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  currentIndex === i 
                    ? "w-12 bg-white" 
                    : "w-6 bg-white/40 hover:bg-white/60"
                } ${isTransitioning ? 'cursor-wait' : 'cursor-pointer'}`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={currentIndex === i ? 'true' : 'false'}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};