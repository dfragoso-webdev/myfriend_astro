// src/features/landing/Stores.tsx
import { useState } from "react";
import { useTranslation } from "@/i18n";
import StoreCard from "./StoreCard";
import BranchesCarousel from "@/features/landing/components/Branches/BranchesCarousel";
import { svgs } from "@/mediaRoutes";
import storeDetails from "@/data/storeDetails.json";

interface StoresProps {
  lang: string;
}

interface City {
  id: string;
  name: string;
  image: string;
  className: string;
  stores: number;
  gradient: string;
}

const Stores = ({ lang = "es" }: StoresProps) => {
  const { t } = useTranslation("stores");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [branches, setBranches] = useState<any[]>([]);

  const cities: City[] = [
    {
      id: "cancun",
      name: lang === "es" ? "CANCÚN" : "CANCUN",
      image: svgs.cun,
      className: "cun-card",
      stores: 3,
      gradient: "from-blue-500/20 to-purple-500/20",
    },
    {
      id: "playa",
      name: "PLAYA DEL CARMEN",
      image: svgs.playa,
      className: "playa-card",
      stores: 2,
      gradient: "from-green-500/20 to-teal-500/20",
    },
  ];

  const handleCitySelect = (cityId: string) => {
    const cityData =
      cityId === "cancun" ? storeDetails.cancun : storeDetails.playa;
    if (cityData?.images) {
      const branchesData = cityData.images.map((branch: any) => ({
        image: branch.image,
        title: branch.title,
        address: branch.address,
        email: branch.email,
        phone: branch.phone,
      }));
      setBranches(branchesData);
      setSelectedCity(cityId);
    }
  };

  const handleBackToCities = () => {
    setSelectedCity(null);
    setBranches([]);
  };

  const renderContent = () => {
    if (selectedCity && branches.length > 0) {
      const cityInfo = cities.find((c) => c.id === selectedCity);

      return (
        <div className="space-y-8 animate-fadeIn">
          <button
            onClick={handleBackToCities}
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
            <span>{lang === "es" ? "REGRESAR" : "BACK"}</span>
          </button>

          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {cityInfo?.name}
            </h3>
          </div>

          <BranchesCarousel branches={branches} lang={lang} />
        </div>
      );
    }

    return (
      <>
        <div className="mb-16 md:mb-20 space-y-6 animate-fadeIn">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            {t("find_us_near_you")}
          </h2>
          <p className="text-white/90 text-lg md:text-xl lg:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
            {t("choose_city")}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-12 lg:gap-16">
          {cities.map((city, index) => (
            <div
              key={city.id}
              className="animate-slideUp cursor-pointer flex justify-center"
              style={{ animationDelay: `${index * 200}ms` }}
              onClick={() => handleCitySelect(city.id)}
            >
              <StoreCard
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

  return (
    <div
      className="relative py-24 md:py-32 lg:py-40 px-4 transition-all duration-300 bg-cover bg-center"
      style={{ backgroundImage: `url(${svgs.storeMvlBg})` }}
    >
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default Stores;