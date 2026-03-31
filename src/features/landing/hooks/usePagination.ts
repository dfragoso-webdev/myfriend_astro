// src/features/landing/hooks/usePagination.ts
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

interface UsePaginationOptions {
  totalItems: number;
  initialPage?: number;
  responsiveBreakpoints?: {
    [key: string]: number;
  };
  animationDuration?: number;
}

export const usePagination = ({
  totalItems,
  initialPage = 0,
  responsiveBreakpoints = {
    '(min-width: 1280px)': 3,
    '(min-width: 1024px)': 3,
    '(min-width: 768px)': 2,
    '(max-width: 767px)': 1,
  },
  animationDuration = 400,
}: UsePaginationOptions) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(1);

  // Detectar responsivamente los cards por vista
  useEffect(() => {
    const mediaQueries = Object.entries(responsiveBreakpoints).map(
      ([query, value]) => ({ query, value })
    );

    const updateCardsPerView = () => {
      const matched = mediaQueries.find(({ query }) => window.matchMedia(query).matches);
      setCardsPerView(matched?.value ?? 1);
    };

    updateCardsPerView();
    
    const listeners = mediaQueries.map(({ query }) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', updateCardsPerView);
      return mql;
    });

    return () => {
      listeners.forEach((mql) => {
        mql.removeEventListener('change', updateCardsPerView);
      });
    };
  }, [responsiveBreakpoints]);

  // Resetear página cuando cambian los items por vista
  useEffect(() => {
    setCurrentPage(0);
  }, [cardsPerView]);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / cardsPerView),
    [totalItems, cardsPerView]
  );

  const goToPage = useCallback(
    (page: number) => {
      if (isAnimating) return;
      
      setIsAnimating(true);
      setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
      
      setTimeout(() => {
        setIsAnimating(false);
      }, animationDuration);
    },
    [isAnimating, totalPages, animationDuration]
  );

  const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  const currentItems = useMemo(() => {
    const start = currentPage * cardsPerView;
    const end = start + cardsPerView;
    return { start, end };
  }, [currentPage, cardsPerView]);

  return {
    currentPage,
    cardsPerView,
    totalPages,
    isAnimating,
    goToPage,
    nextPage,
    prevPage,
    currentItems,
    hasNext: currentPage < totalPages - 1,
    hasPrev: currentPage > 0,
  };
};