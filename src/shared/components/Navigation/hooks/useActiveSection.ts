// src/shared/components/Navigation/hooks/useActiveSection.ts
import { useState, useEffect } from "react";
export const useActiveSection = (items: Array<{ href: string }>) => {
  const [activeItem, setActiveItem] = useState(items[0]?.href || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      const currentSection = [...items].reverse().find((item) => {
        const el = document.querySelector(item.href) as HTMLElement;
        return el && scrollPosition >= el.offsetTop;
      });
      if (currentSection) setActiveItem(currentSection.href);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  return { activeItem };
};