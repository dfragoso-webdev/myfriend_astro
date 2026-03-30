// src/shared/components/Navigation/components/MobileMenu.tsx
import { useEffect, useRef } from "react";
import { images } from "@/mediaRoutes";
import { LanguageSwitcher } from "@/shared/ui/LanguageSwitcher/LanguageSwitcher";
import { NavLinks } from "./NavLinks";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{ href: string; label: string }>;
  activeItem: string;
  onItemClick: (href: string) => void;
  branchLabel?: string;
  lang?: string;
}

export const MobileMenu = ({
  isOpen,
  onClose,
  items,
  activeItem,
  onItemClick,
  branchLabel = "Sucursales",
  lang = "es"
}: MobileMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number>(0);

  // Cerrar con tecla Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Detectar swipe para cerrar
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const handleTouchStart = (e: TouchEvent) => {
      startYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!menuRef.current) return;
      
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startYRef.current;
      
      // Si el usuario hace swipe hacia abajo desde el borde superior
      if (deltaY > 50 && menuRef.current.scrollTop === 0) {
        onClose();
      }
    };

    const menuElement = menuRef.current;
    menuElement.addEventListener('touchstart', handleTouchStart);
    menuElement.addEventListener('touchmove', handleTouchMove);

    return () => {
      menuElement.removeEventListener('touchstart', handleTouchStart);
      menuElement.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isOpen, onClose]);

  return (
    <div 
      className={`fixed inset-0 z-40 xl:hidden transition-all duration-500 ${
        isOpen ? "visible" : "invisible"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Overlay con animación */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`} 
        onClick={onClose}
        aria-label="Cerrar menú"
      />
      
      {/* Panel del menú */}
      <div
        ref={menuRef}
        data-mobile-menu
        className={`
          absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl 
          transition-transform duration-500 ease-out flex flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación móvil"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 flex justify-between items-center border-b border-gray-100">
          <img 
            src={images.mfLogo} 
            alt="MyFriend" 
            className="w-24 sm:w-28"
            loading="eager"
          />
          
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            
            <button 
              onClick={onClose} 
              className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/50"
              aria-label="Cerrar menú"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-4">
          <NavLinks
            items={items}
            activeItem={activeItem}
            isScrolled={false}
            onItemClick={(href) => {
              onItemClick(href);
              onClose(); // Cerrar menú después de hacer clic
            }}
            orientation="vertical"
          />
        </div>

        {/* Footer con selector de sucursal */}
        <div className="p-5 sm:p-6 bg-gray-50 border-t border-gray-100">
          
          {/* Información adicional opcional */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} MyFriend. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};