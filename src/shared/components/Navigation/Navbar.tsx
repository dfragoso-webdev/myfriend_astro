// src/shared/components/Navigation/Navbar.tsx
import { useScrollDetection } from "./hooks/useScrollDetection";
import { useActiveSection } from "./hooks/useActiveSection";
import { useMobileMenu } from "./hooks/useMobileMenu";
import { useSmartNavigation } from "@/shared/hooks/useSmartNavigation";
import { Logo } from "./components/Logo";
import { NavLinks } from "./components/NavLinks";
import { MobileMenu } from "./components/MobileMenu";
import { useTranslation } from "@/i18n";
import { useMemo, useCallback, useEffect } from "react";
import { MenuButton } from "./components/MenuButton";
import { LanguageSwitcher } from "@/shared/ui/LanguageSwitcher/LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation('navbar');
  const isScrolled = useScrollDetection(20);
  const { isOpen, toggle, close } = useMobileMenu();
  const { navigate, scrollToSection } = useSmartNavigation({ offset: 80, updateUrl: false });
  
  const NAV_ITEMS = useMemo(() => [
    { href: "#home", label: t('home') },
    { href: "#about-us", label: t('about_us') },
    { href: "#stores", label: t('stores') },
    { href: "#premium-select", label: t('premium_select') },
    { href: "#products", label: t('products') },
    { href: "#home-service", label: t('home_service') },
    { href: "#follow-us", label: t('follow_us') },
  ], [t]);

  const { activeItem } = useActiveSection(NAV_ITEMS);

  const handleNavClick = useCallback((href: string) => {
    close();
    navigate(href);
  }, [close, navigate]);

  // Manejar navegación inicial si hay hash en la URL (cuando se carga la página)
  useEffect(() => {
    const handleInitialNavigation = () => {
      if (window.location.hash) {
        const hash = window.location.hash;
        // Pequeño delay para asegurar que todo está renderizado
        setTimeout(() => {
          scrollToSection(hash);
          // Limpiar el hash de la URL después del scroll si estamos en landing
          if (window.location.pathname.match(/^\/[a-z]{2}\/?$/)) {
            window.history.replaceState({}, '', window.location.pathname);
          }
        }, 300);
      }
    };

    // Ejecutar después de que la página esté completamente cargada
    if (document.readyState === 'complete') {
      handleInitialNavigation();
    } else {
      window.addEventListener('load', handleInitialNavigation);
      return () => window.removeEventListener('load', handleInitialNavigation);
    }
  }, [scrollToSection]);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-20 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-xl shadow-lg py-2" 
          : "bg-secondary py-2"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <Logo isScrolled={isScrolled} />

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1">
            <NavLinks 
              items={NAV_ITEMS}
              activeItem={activeItem}
              isScrolled={isScrolled}
              onItemClick={handleNavClick}
            />
          </div>

          {/* Desktop Actions */}
          <div className="hidden xl:flex items-center gap-2 lg:gap-3">
            <LanguageSwitcher />
          </div>

          {/* Mobile Toggle */}
          <MenuButton isOpen={isOpen} onClick={toggle} isScrolled={isScrolled} />
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isOpen}
        onClose={close}
        items={NAV_ITEMS}
        activeItem={activeItem}
        onItemClick={handleNavClick}
        branchLabel={t('branches')}
      />
    </>
  );
}