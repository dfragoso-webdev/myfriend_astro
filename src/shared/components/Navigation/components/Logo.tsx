// src/shared/components/Navigation/components/Logo.tsx
import { images } from "@/mediaRoutes";
import { useState, useEffect } from "react";

interface LogoProps {
  isScrolled?: boolean;
  mobileOpen?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Logo = ({ 
  isScrolled = false, 
  mobileOpen = false, 
  onClick, 
  size = 'small',
  className = ""
}: LogoProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Tamaños responsivos basados en scroll y dispositivo
  const getSizeClasses = () => {
    if (size === 'small') return "w-16 sm:w-20 xl:w-20";
    if (size === 'large') return "w-28 sm:w-32 xl:w-36";
    
    // default size con responsive
    return `transition-all duration-700 ease-out transform group-hover:scale-105 ${
      isScrolled ? "w-20 sm:w-24 xl:w-24" : "w-24 sm:w-28 xl:w-32"
    }`;
  };

  return (
    <a 
      href="/es/" 
      onClick={onClick} 
      className={`relative z-50 group flex-shrink-0 ${className}`}
      aria-label="Ir al inicio - MyFriend"
    >
      <img
        src={images.mfLogo}
        alt="MyFriend"
        className={`
          ${getSizeClasses()}
          ${mobileOpen ? "opacity-0 xl:opacity-100" : "opacity-100"}
          transition-all duration-500
          ${isLoaded ? "scale-100" : "scale-95"}
        `}
        onLoad={() => setIsLoaded(true)}
        loading="eager"
      />
      
      {/* Efecto de hover opcional */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent rounded-lg blur-xl" />
      </div>
    </a>
  );
};