// src/features/landing/components/Shared/StrikingText.tsx
import React from 'react';
import { useTranslation } from '@/i18n';
import { svgs } from '@/mediaRoutes';

const StrikingText = () => {
  const { t } = useTranslation('common');

  return (
    <div className="relative w-full min-h-[25vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white" id="home">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxe-island/30 rounded-full blur-3xl"></div>
      </div>

      <img
        src={svgs.navBeachArticles}
        alt=""
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-auto opacity-5 pointer-events-none animate-float-slow"
        loading="lazy"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="space-y-4 md:space-y-6">
          <h1 className="space-y-3 md:space-y-4">
            <span className="block text-2xl md:text-7xl lg:text-5xl font-semibold text-gray-900 leading-tight animate-slideUp">
              {t('find_everything_part1')}
            </span>
            <span className="block text-5xl md:text-8xl lg:text-6xl font-bold text-primary bg-clip-text animate-slideUp animation-delay-200">
              {t('find_everything_part2')}
            </span>
          </h1>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { 
            transform: translate(-50%, 0);
          }
          50% { 
            transform: translate(-50%, -15px);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default StrikingText;