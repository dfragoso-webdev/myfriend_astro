// src/shared/components/Navigation/hooks/useSmoothScroll.ts
import { useCallback } from 'react';

interface UseSmoothScrollProps {
  offset?: number;
  behavior?: ScrollBehavior;
}

export const useSmoothScroll = ({ 
  offset = 80, 
  behavior = 'smooth' 
}: UseSmoothScrollProps = {}) => {
  const scrollTo = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior });
    }
  }, [offset, behavior]);

  return { scrollTo };
};