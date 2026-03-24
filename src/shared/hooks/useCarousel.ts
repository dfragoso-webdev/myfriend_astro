// src/features/products/hooks/useCarousel.ts
import { useState, useCallback, useEffect } from 'react';

interface UseCarouselProps {
  totalItems: number;
  visibleItems: number;
  autoPlayInterval?: number;
}

export const useCarousel = ({ totalItems, visibleItems, autoPlayInterval = 5000 }: UseCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const totalPages = Math.max(0, totalItems - visibleItems + 1);

  const handlePrev = useCallback(() => {
    if (isSliding || totalPages <= 1) return;
    
    setIsSliding(true);
    setCurrentIndex(prev => prev === 0 ? totalPages - 1 : prev - 1);
    setIsAutoPlaying(false);
    
    setTimeout(() => {
      setIsSliding(false);
      setIsAutoPlaying(true);
    }, 500);
  }, [isSliding, totalPages]);

  const handleNext = useCallback(() => {
    if (isSliding || totalPages <= 1) return;
    
    setIsSliding(true);
    setCurrentIndex(prev => (prev + 1) % totalPages);
    setIsAutoPlaying(false);
    
    setTimeout(() => {
      setIsSliding(false);
      setIsAutoPlaying(true);
    }, 500);
  }, [isSliding, totalPages]);

  const handleGoTo = useCallback((index: number) => {
    if (isSliding || totalPages <= 1 || index === currentIndex) return;
    
    setIsSliding(true);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    
    setTimeout(() => {
      setIsSliding(false);
      setIsAutoPlaying(true);
    }, 500);
  }, [isSliding, currentIndex, totalPages]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || totalPages <= 1) return;
    
    const interval = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, handleNext, totalPages, autoPlayInterval]);

  return {
    currentIndex,
    isSliding,
    totalPages,
    handlePrev,
    handleNext,
    handleGoTo,
    transformValue: `translateX(-${currentIndex * (100 / visibleItems)}%)`
  };
};