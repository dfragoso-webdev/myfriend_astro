// src/features/landing/components/sections/AboutSection.tsx
import React from 'react';
import { useTranslation } from '@/i18n';
import { VideoPlayer } from '../ui/VideoPlayer';
import { StatsDisplay } from '../shared/StatsDisplay';
import { SectionContainer } from '../shared/SectionContainer';

interface AboutSectionProps {
  videoSrc: string;
}

type IconType = 'clock' | 'heart' | 'star';

export const AboutSection: React.FC<AboutSectionProps> = ({ videoSrc }) => {
  const { t } = useTranslation('about');

  // Tipado explícito para los stats
  const stats: Array<{
    value: string;
    label: string;
    icon: IconType;
  }> = [
    { value: '15+', label: t('years_experience'), icon: 'clock' },
    { value: '100%', label: t('happy_customers'), icon: 'heart' },
  ];

  return (
    <SectionContainer
      id="about-us"
      className="bg-gradient-to-br from-gray-50 via-white to-gray-50"
    >
      <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-primary">{t('title')}</span>
          </h2>
          <div className="space-y-6">
            <p className="text-gray-600 text-justify text-base md:text-lg leading-relaxed">
              {t('text')}
            </p>
            <blockquote className="relative pl-6 border-l-4 border-primary/30">
              <p className="text-gray-500 italic text-sm md:text-base">
                "{t('commitment_quote')}"
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm text-primary uppercase tracking-[0.2em]">
                  {t('since')}
                </span>
              </div>
            </blockquote>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[300px]">
          <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl aspect-[9/16]">
            <VideoPlayer
              src={videoSrc}
              className="w-full h-full"
              threshold={0.5}
            />
          </div>
        </div>
      </div>

      <div className="mt-12 lg:mt-16 flex justify-center">
        <StatsDisplay stats={stats} />
      </div>
    </SectionContainer>
  );
};