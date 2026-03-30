// src/shared/ui/ProgressiveImage/ProgressiveImage.tsx
import { useState, useRef, useEffect } from "react";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
  placeholderColor?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "sync" | "auto";
  objectFit?: "cover" | "contain" | "fill";
}

export const ProgressiveImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  imgClassName = "",
  placeholderColor = "#e5e5e5",
  loading = "lazy",
  fetchPriority = "auto",
  decoding = "async",
  objectFit = "cover",
}: ProgressiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) setIsLoaded(true);
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: placeholderColor }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        onLoad={() => setIsLoaded(true)}
        className={`${imgClassName} transition-all duration-700 ease-in-out`}
        style={{
          objectFit,
          width: "100%",
          height: "100%",
          // MEJORA: Filtro de desenfoque y opacidad combinados
          opacity: isLoaded ? 1 : 0,
          filter: isLoaded ? "blur(0px)" : "blur(10px)",
          willChange: "filter, opacity",
        }}
      />
    </div>
  );
};