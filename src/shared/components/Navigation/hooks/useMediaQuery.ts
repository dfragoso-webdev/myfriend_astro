// src/shared/hooks/useMediaQuery.ts
import { useEffect, useState } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

export const useMediaQuery = (breakpoint: Breakpoint | string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = breakpoints[breakpoint as Breakpoint] || breakpoint;
    const media = window.matchMedia(query);
    
    const update = () => setMatches(media.matches);
    update();
    
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [breakpoint]);

  return matches;
};

// Convenience hooks
export const useIsMobile = () => !useMediaQuery('md');
export const useIsTablet = () => useMediaQuery('md') && !useMediaQuery('lg');
export const useIsDesktop = () => useMediaQuery('lg');