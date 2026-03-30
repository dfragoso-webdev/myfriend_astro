// src/features/landing/components/About/AboutText.tsx
import React from 'react';

interface AboutTextProps {
  title: string;
  text: string;
  since: string;
  commitmentQuote: string;
}

export const AboutText: React.FC<AboutTextProps> = ({
  title,
  text,
  since,
  commitmentQuote,
}) => (
  <div className="relative z-10">
    <h2 className="text-3xl text-center md:text-left md:text-4xl lg:text-5xl font-bold mb-6">
      <span className="bg-clip-text text-primary">{title}</span>
    </h2>

    <div className="space-y-6">
      <p className="text-gray-600 text-justify text-base md:text-lg leading-relaxed">{text}</p>

      <blockquote className="relative pl-6 border-l-4 border-primary/30">
        <p className="text-gray-500 italic text-sm md:text-base">"{commitmentQuote}"</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-sm text-primary uppercase tracking-[0.2em]">{since}</span>
        </div>
      </blockquote>
    </div>
  </div>
);