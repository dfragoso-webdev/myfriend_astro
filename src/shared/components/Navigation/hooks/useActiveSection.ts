// src/shared/components/Navigation/hooks/useActiveSection.ts
import { useState, useEffect, useCallback } from "react";

export const useActiveSection = (items: Array<{ href: string }>) => {
  const [activeItem, setActiveItem] = useState(items[0]?.href || "");

  const updateActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + 120;
    
    let currentSection = "";
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      const el = document.querySelector(item.href) as HTMLElement;
      if (el && scrollPosition >= el.offsetTop) {
        currentSection = item.href;
        break;
      }
    }
    
    setActiveItem(currentSection || items[0]?.href || "");
  }, [items]);

  useEffect(() => {
    updateActiveSection();
    
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });
    
    // También escuchar cambios de scroll programados
    const observer = new MutationObserver(() => {
      updateActiveSection();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      observer.disconnect();
    };
  }, [updateActiveSection]);

  return { activeItem, updateActiveSection };
};