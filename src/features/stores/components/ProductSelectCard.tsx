import React, { useState, useRef, useEffect } from "react";

interface ProductSelectCardProps {
  image: string;
  imageType?: 'icon' | 'photo';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export const ProductSelectCard: React.FC<ProductSelectCardProps> = ({
  image,
  imageType = 'icon',
  size = 'medium',
  onClick,
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  const getSizeClasses = () => {
    if (imageType === 'photo') {
      switch (size) {
        case 'small':
          return { container: 'w-full max-w-[200px] mx-auto', imageContainer: 'aspect-[3/4] sm:aspect-[4/5]' };
        case 'large':
          return { container: 'w-full max-w-[400px] mx-auto', imageContainer: 'aspect-[4/5] sm:aspect-square lg:aspect-[3/4]' };
        default: // medium
          return { container: 'w-full max-w-[320px] mx-auto', imageContainer: 'aspect-[3/4] sm:aspect-[4/5] lg:aspect-square' };
      }
    } else {
      switch (size) {
        case 'small':
          return { container: 'w-full max-w-[120px] mx-auto', imageContainer: 'aspect-square' };
        case 'large':
          return { container: 'w-full max-w-[200px] mx-auto', imageContainer: 'aspect-square' };
        default: // medium
          return { container: 'w-full max-w-[160px] mx-auto', imageContainer: 'aspect-square' };
      }
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div 
      className={`w-full ${sizeClasses.container}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()} 
    >
      <div className="relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100">
        <div 
          className={`relative w-full ${sizeClasses.imageContainer} overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100`}
        >
          {/* Skeleton Loader */}
          {!loaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse z-10" />
          )}

          <img
            ref={imgRef}
            src={image}
            alt="Product view"
            className={`
              absolute inset-0 w-full h-full 
              ${imageType === 'photo' ? 'object-cover' : 'object-contain p-6 md:p-8'}
              transition-transform duration-700 group-hover:scale-110
              ${loaded ? "opacity-100" : "opacity-0"}
            `}
            loading="eager"
            onLoad={() => setLoaded(true)}
          />

          {/* Sutil overlay al hacer hover para indicar que es clickable */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 z-20" />
        </div>
      </div>
    </div>
  );
};