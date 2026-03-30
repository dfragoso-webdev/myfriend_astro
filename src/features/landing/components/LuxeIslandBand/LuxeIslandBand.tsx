// src/features/landing/components/LuxeIslandBand/LuxeIslandBand.tsx
import { useTranslation } from '@/i18n';
import { images } from '@/mediaRoutes';

const LuxeIslandBand = () => {
  const { t } = useTranslation('luxeIslandBand');

  return (
    <>
      <div className="w-full bg-gradient-to-r from-amber-50 via-white to-amber-50 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="relative inline-block max-w-[90vw]">
              <div className="relative px-2 sm:px-4">
                <span className="block text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-light tracking-wider text-gray-800">
                  {t('meet_our_brands')}
                </span>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 max-w-[200px] sm:max-w-[250px] h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              </div>
            </h2>
          </div>
        </div>
      </div>

      <div className="relative w-full bg-gradient-to-r from-[#164b67] via-[#164b67] to-primary/80 py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent" />

        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

        <div className="absolute top-1/2 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl transform -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl transform -translate-y-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16 lg:gap-24">
            <a
              href="https://www.myfriend.mx/luxe-island"
              className="group transform transition-all duration-500 hover:scale-105"
              aria-label="Luxe Island Boutique" target="_blank" rel="noopener noreferrer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400/10 group-hover:bg-amber-400/20 blur-2xl transition-all duration-500 rounded-full" />
                <img
                  src={images.li_boutique}
                  alt="Luxe Island Boutique"
                  className="relative w-32 md:w-40 lg:w-48 h-auto opacity-90 group-hover:opacity-100 transition-all duration-500 drop-shadow-lg"
                  loading="lazy"
                />
              </div>
            </a>

            <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />
            <div className="block md:hidden w-16 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

            <a
              href="https://luxeisland.mx/"
              className="group transform transition-all duration-500 hover:scale-105"
              aria-label="Luxe Island Jewelry" target="_blank" rel="noopener noreferrer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400/10 group-hover:bg-amber-400/20 blur-2xl transition-all duration-500 rounded-full" />
                <img
                  src={images.li_jewelry}
                  alt="Luxe Island Jewelry"
                  className="relative w-32 md:w-40 lg:w-48 h-auto opacity-90 group-hover:opacity-100 transition-all duration-500 drop-shadow-lg"
                  loading="lazy"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LuxeIslandBand;