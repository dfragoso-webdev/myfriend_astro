// src/features/landing/components/About/AboutText.tsx
import React from 'react';

interface AboutTextProps {
  title: string;
  text: string;
  since: string;
  commitmentQuote: string;
  isVisible: boolean;
}

export const AboutText: React.FC<AboutTextProps> = ({
  title,
  text,
  since,
  commitmentQuote,
  isVisible
}) => (
  <div className="relative z-10">
    {/* Título principal con gradiente - estilo FollowUs */}
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
      <span className="bg-clip-text text-primary">
        {title}
      </span>
    </h2>


    {/* Descripción */}
    <div className="space-y-6">
      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
        {text}
      </p>

      {/* Cita con estilo mejorado */}
      <blockquote className="relative pl-6 border-l-4 border-primary/30">
        <p className="text-gray-500 italic text-sm md:text-base">
          "{commitmentQuote}"
        </p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-sm text-primary uppercase tracking-[0.2em]">
            {since}
          </span>
        </div>
      </blockquote>
    </div>

    <style>
      {`
        @keyframes slide {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        
        .animate-slide {
          animation: slide 2s ease-in-out infinite;
        }
      `}
    </style>
  </div>
);