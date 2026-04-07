// src/features/stores/components/ProductSelectCard.tsx
import React from 'react';
import { ProgressiveImage } from '@/shared/ui/ProgressiveImage/ProgressiveImage';

interface ProductSelectCardProps {
  image: string;
  imageType?: 'icon' | 'photo';
  onClick?: () => void;
}

export const ProductSelectCard: React.FC<ProductSelectCardProps> = ({
  image,
  imageType = 'photo',
  onClick,
}) => {
  const isPhoto = imageType === 'photo';
  
  const containerClasses = isPhoto
    ? 'cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl'
    : 'cursor-pointer transform transition-all duration-300 hover:-translate-y-1';

  const imageContainerClasses = isPhoto
    ? 'relative overflow-hidden rounded-2xl bg-gray-100 shadow-md group aspect-[4/3] md:aspect-[16/12] lg:aspect-[4/3] xl:aspect-[3/2]'
    : 'relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 group aspect-[4/3] sm:aspect-square';

  const imageClasses = isPhoto
    ? 'w-full h-full object-cover transition-all duration-700 group-hover:scale-110'
    : 'w-full h-full object-cover transition-all duration-500 group-hover:scale-110';

  return (
    <div className={containerClasses} onClick={onClick}>
      <div className={imageContainerClasses}>
        <ProgressiveImage
          src={image}
          alt="Galería"
          width={600}
          height={450}
          className={imageClasses}
          placeholderColor="#f3f4f6"
          loading="lazy"
        />
      </div>
    </div>
  );
};