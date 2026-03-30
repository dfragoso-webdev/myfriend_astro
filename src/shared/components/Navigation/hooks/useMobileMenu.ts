// src/shared/components/Navigation/hooks/useMobileMenu.ts
import { useState, useEffect, useCallback } from "react";

interface UseMobileMenuOptions {
  onOpen?: () => void;
  onClose?: () => void;
  disableBodyScroll?: boolean;
}

export const useMobileMenu = (options?: UseMobileMenuOptions) => {
  const [isOpen, setIsOpen] = useState(false);
  const { onOpen, onClose, disableBodyScroll = true } = options || {};

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isOpen, onOpen, onClose]);

  // Control del scroll del body
  useEffect(() => {
    if (!disableBodyScroll) return;
    
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, disableBodyScroll]);

  // Prevenir scroll en touch move cuando está abierto
  useEffect(() => {
    if (!disableBodyScroll || !isOpen) return;

    const preventScroll = (e: TouchEvent) => {
      if (e.target instanceof Element) {
        // Permitir scroll dentro del menú móvil
        const isMenuElement = e.target.closest('[data-mobile-menu]');
        if (!isMenuElement) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener('touchmove', preventScroll, { passive: false });
    return () => document.removeEventListener('touchmove', preventScroll);
  }, [isOpen, disableBodyScroll]);

  return {
    isOpen,
    open,
    close,
    toggle,
    setOpen: setIsOpen
  };
};