// src/features/landing/components/HomeService/HomeService.tsx
import React from 'react';
import { useTranslation } from '@/i18n';
import { svgs } from '@/mediaRoutes';

export const HomeService: React.FC = () => {
  const { t } = useTranslation('homeService');

  return (
    <section className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-10000 hover:scale-110"
        style={{ backgroundImage: `url(${svgs.contactBg})` }}
      />
      <div className="absolute inset-0 backdrop-blur-[1px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center px-2 sm:px-4">
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              {t('title')}
            </h2>
          </div>

          <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-white/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-500 hidden lg:block" />

              <div className="relative bg-secondary backdrop-blur-md rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-12 lg:px-16 py-4 sm:py-6 md:py-8 lg:py-6 border border-white/20 shadow-xl sm:shadow-2xl">
                <div className="absolute -left-8 md:-left-12 lg:-left-10 top-1/2 -translate-y-1/2 hidden lg:block">
                  <img
                    src={svgs.telefono}
                    alt=""
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 filter brightness-0 invert group-hover:opacity-30 transition-opacity duration-300"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-wider break-all sm:break-normal">
                    {t('phone')}
                  </span>
                </div>

                <div className="absolute -right-8 md:-right-12 lg:-right-12 top-1/2 -translate-y-1/2 hidden lg:block">
                  <img
                    src={svgs.motocicleta}
                    alt=""
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 filter brightness-0 invert group-hover:opacity-30 transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 md:mt-12">
            <a
              href="tel:018009990241"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg sm:rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300 border border-white/30 hover:border-white/50 shadow-lg group text-sm sm:text-base"
            >
              <span>{t('contact_now')}</span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .duration-10000 { transition-duration: 10000ms; }
      `}</style>
    </section>
  );
};

export default HomeService;