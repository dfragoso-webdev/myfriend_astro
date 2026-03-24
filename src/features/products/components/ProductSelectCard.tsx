// src/features/products/components/ProductSelectCard.tsx
import React, { useState, useRef, useEffect } from "react";

interface ProductSelectCardProps {
  name: string;
  image: string;
}

export const ProductSelectCard: React.FC<ProductSelectCardProps> = ({
  name,
  image,
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 group">
        <div className="relative w-full aspect-[4/3] sm:aspect-square overflow-hidden bg-gray-100">
          {!loaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
          )}

          <img
            ref={imgRef}
            src={image}
            alt={name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:scale-110 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            loading="eager"
            fetchPriority="low"
            onLoad={() => setLoaded(true)}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-3 sm:p-4 z-20 pointer-events-none">
            <h3 className="text-white text-[11px] leading-tight sm:text-sm md:text-base font-bold line-clamp-2 drop-shadow-md">
              {name}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
