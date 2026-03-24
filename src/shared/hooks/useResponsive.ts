// src/shared/hooks/useResponsive.ts
import { useState, useEffect } from 'react';

interface ResponsiveConfig {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}

// src/shared/hooks/useResponsive.ts
// src/shared/hooks/useResponsive.ts
export const useResponsive = () => {
  const [visibleItems, setVisibleItems] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false); // Nuevo estado

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscape = width > height && width < 1024;

      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024); // Detecta rango tablet

      if (width < 640) {
        // Móvil: 1 vertical, 2 horizontal (más pequeñas)
        setVisibleItems(isLandscape ? 2 : 1);
      } else if (width < 1024) {
        // Tablet: 3 vertical, 4 horizontal (esto hace las cards más pequeñas)
        setVisibleItems(isLandscape ? 4 : 3);
      } else if (width < 1280) {
        setVisibleItems(4);
      } else {
        setVisibleItems(5); // Desktop wide
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { visibleItems, isMobile, isTablet };
};