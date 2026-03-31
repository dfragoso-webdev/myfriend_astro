// src/shared/hooks/useSmartNavigation.ts
import { useCallback, useEffect, useRef } from 'react';

interface UseSmartNavigationOptions {
  offset?: number;
  basePath?: string;
  updateUrl?: boolean;
}

export const useSmartNavigation = (options: UseSmartNavigationOptions = {}) => {
  const { offset = 80, basePath = '', updateUrl = false } = options;
  const pendingHashRef = useRef<string | null>(null);
  const isNavigatingRef = useRef(false);
  const hasScrolledRef = useRef(false);

  // Detectar si estamos en la landing page
  const isLandingPage = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    
    const pathname = window.location.pathname;
    
    const landingPatterns = [
      '/',
      '/es',
      '/en',
      '/es/',
      '/en/',
      `/${basePath}`,
      `/${basePath}/es`,
      `/${basePath}/en`,
    ];
    
    const isLanding = landingPatterns.some(pattern => 
      pathname === pattern || pathname === `${pattern}/`
    );
    
    const segments = pathname.split('/').filter(Boolean);
    const isDeepPath = segments.length > (basePath ? 2 : 1);
    
    return isLanding && !isDeepPath;
  }, [basePath]);

  // Scroll suave a una sección
  const scrollToSection = useCallback((elementId: string) => {
    const cleanId = elementId.replace('#', '');
    const element = document.getElementById(cleanId);
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      return true;
    }
    return false;
  }, [offset]);

  // Función para intentar hacer scroll hasta que el elemento exista
  const attemptScroll = useCallback((hash: string, maxAttempts = 30, delay = 100): Promise<boolean> => {
    return new Promise((resolve) => {
      let attempts = 0;
      
      const tryScroll = () => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          scrollToSection(hash);
          pendingHashRef.current = null;
          isNavigatingRef.current = false;
          resolve(true);
          return;
        }
        
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(tryScroll, delay);
        } else {
          console.warn(`Elemento ${hash} no encontrado después de ${maxAttempts} intentos`);
          isNavigatingRef.current = false;
          pendingHashRef.current = null;
          resolve(false);
        }
      };
      
      tryScroll();
    });
  }, [scrollToSection]);

  // Navegar a landing con hash y hacer scroll después de cargar
  const navigateToLanding = useCallback((hash: string) => {
    const currentLang = window.location.pathname.split('/')[1] || 'es';
    // Mantener el hash en la URL para que al cargar la página sepamos a dónde ir
    const landingUrl = `/${currentLang}${hash}`;
    
    // Guardar el hash pendiente
    pendingHashRef.current = hash;
    isNavigatingRef.current = true;
    hasScrolledRef.current = false;
    
    // Navegar a la landing CON el hash
    window.location.href = landingUrl;
  }, []);

  // Navegación principal
  const navigate = useCallback((href: string) => {
    if (isLandingPage()) {
      // Si estamos en landing, hacer scroll suave sin actualizar URL
      scrollToSection(href);
      
      // Solo actualizar URL si está explícitamente habilitado
      if (updateUrl) {
        window.history.pushState({}, '', href);
      }
    } else {
      // Si estamos en otra página, navegar a landing con el hash
      navigateToLanding(href);
    }
  }, [isLandingPage, scrollToSection, navigateToLanding, updateUrl]);

  // Efecto para manejar el scroll después de navegación desde otra página
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Si estamos en landing y hay un hash pendiente (viniendo de otra página)
    if (isLandingPage() && pendingHashRef.current && !hasScrolledRef.current) {
      hasScrolledRef.current = true;
      attemptScroll(pendingHashRef.current).then(() => {
        // Después de hacer scroll, limpiar el hash de la URL si no queremos mostrarlo
        if (!updateUrl && window.location.hash) {
          window.history.replaceState({}, '', window.location.pathname);
        }
      });
    }
    
    // Si hay hash en la URL al cargar la landing (por navegación directa)
    if (isLandingPage() && window.location.hash && !isNavigatingRef.current && !hasScrolledRef.current) {
      const hash = window.location.hash;
      hasScrolledRef.current = true;
      attemptScroll(hash).then(() => {
        // Limpiar el hash de la URL después del scroll si no queremos mostrarlo
        if (!updateUrl) {
          window.history.replaceState({}, '', window.location.pathname);
        }
      });
    }
  }, [isLandingPage, attemptScroll, updateUrl]);

  // Resetear el flag cuando cambia la página
  useEffect(() => {
    hasScrolledRef.current = false;
  }, [typeof window !== 'undefined' ? window.location.pathname : '']);

  return { 
    navigate, 
    isLandingPage: isLandingPage(),
    scrollToSection 
  };
};