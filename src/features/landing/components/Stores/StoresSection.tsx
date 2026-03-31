// src/features/landing/components/Stores/StoresSection.tsx
import React from 'react';
import { useTranslation } from '@/i18n';
import { useStores } from '../../hooks/useStores';
import  BranchCarousel  from '../Branches/BranchesCarousel';
import { CityCard } from './CityCard';

interface StoresSectionProps {
  lang: string;
}

const BackButton: React.FC<{ onClick: () => void; lang: string }> = ({ onClick, lang }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 text-white hover:text-white transition-colors font-semibold group text-lg mb-4"
  >
    <svg
      className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
    <span>{lang === 'es' ? 'REGRESAR' : 'BACK'}</span>
  </button>
);

export const StoresSection: React.FC<StoresSectionProps> = ({ lang }) => {
  const { t } = useTranslation('stores');
  const { cities, selectedCity, branches, currentCity, selectCity, resetSelection } = useStores(lang);

  const handleCardClick = (url: string) => {
    window.location.href = url;
  };

  if (selectedCity && branches.length > 0) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <BackButton onClick={resetSelection} lang={lang} />
        
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {currentCity?.name}
          </h3>
        </div>

        <BranchCarousel 
          branches={branches}
          cityId={selectedCity}
          lang={lang}
        />
      </div>
    );
  }

  return (
    <>
      <div className="mb-16 md:mb-20 space-y-6 animate-fadeIn">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
          {t('find_us_near_you')}
        </h2>
        <p className="text-white/90 text-lg md:text-xl lg:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
          {t('choose_city')}
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-12 lg:gap-16">
        {cities.map((city, index) => (
          <div
            key={city.id}
            className="animate-slideUp cursor-pointer flex justify-center"
            style={{ animationDelay: `${index * 200}ms` }}
            onClick={() => selectCity(city.id)}
          >
            <CityCard
              image={city.image}
              city={city.name}
              storeId={city.id}
              lang={lang}
              className={city.className}
            />
          </div>
        ))}
      </div>
    </>
  );
};