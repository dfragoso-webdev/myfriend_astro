// src/shared/components/Navigation/hooks/useScrollDetection.ts
import { useState, useEffect } from "react";
export const useScrollDetection = (threshold: number = 20) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
};