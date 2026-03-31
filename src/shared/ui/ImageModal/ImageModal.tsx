// src/shared/ui/ImageModal/ImageModal.tsx
import React, { useEffect } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageSrc }) => {
  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-sm transition-all p-0 md:p-10"
      onClick={onClose}
    >
      {/* Botón de cerrar */}
      <button 
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-[1001] p-2"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Contenedor de Imagen */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} // Evita cerrar al tocar la imagen
      >
        <img 
          src={imageSrc} 
          alt="Vista ampliada"
          className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300"
        />
      </div>
    </div>
  );
};