// src/features/landing/About.tsx
import React from 'react';
import { useTranslation } from '@/i18n';
import { AboutText } from '@/features/landing/components/About/AboutText';
import { AboutVideo } from '@/features/landing/components/About/AboutVideo';
import { AboutStatsMobile } from '@/features/landing/components/About/AboutStatsMobile';
import { useVideoPlayback } from '@/features/landing/hooks/useVideoPlayback';

interface AboutProps {
  videoSrc: string;
  bg: string;
}

const About: React.FC<AboutProps> = ({ videoSrc, bg }) => {
  const { t } = useTranslation('about');
  const { videoRef, isVisible: isVideoVisible } = useVideoPlayback({ threshold: 0.3 });


  const stats = {
    number: '15+',
    label: t('years_experience'),
    percentage: '100%',
    happyLabel: t('happy_customers'),
  };

  return (
    <section className="relative w-full py-20 px-4 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(169, 29, 58, 0.08) 0%, transparent 60%)',
          }}
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          <AboutText
            title={t('title')}
            text={t('text')}
            since={t('since')}
            commitmentQuote={t('commitment_quote')}
          />

          <AboutVideo
            videoRef={videoRef}
            videoSrc={videoSrc}
            isVisible={isVideoVisible}
            stats={stats}
          />
        </div>

        <div className="mt-12 lg:hidden">
          <AboutStatsMobile stats={stats} happyCustomers={t('happy_customers')} />
        </div>

        {/* Stats desktop */}
        <div className="hidden lg:block mt-16 text-center">
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-white rounded-full shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">{stats.number}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{stats.label}</div>
              </div>
            </div>
            <div className="w-px h-10 bg-gray-200" aria-hidden="true" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">{stats.percentage}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{stats.happyLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;