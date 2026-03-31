// src/features/landing/hooks/useStores.ts
import { useState, useCallback, useMemo } from 'react';
import storeDetails from '@/data/storeDetails.json';
import { svgs } from '@/mediaRoutes';

interface City {
  id: string;
  name: string;
  image: string;
  className: string;
  stores: number;
  gradient: string;
}

interface Branch {
  image: string;
  title: string;
  address: string;
  email: string;
  phone: string;
}

export const useStores = (lang: string) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);

  const cities: City[] = useMemo(() => [
    {
      id: 'cancun',
      name: lang === 'es' ? 'CANCÚN' : 'CANCUN',
      image: svgs.cun,
      className: 'cun-card',
      stores: 3,
      gradient: 'from-blue-500/20 to-purple-500/20',
    },
    {
      id: 'playa',
      name: 'PLAYA DEL CARMEN',
      image: svgs.playa,
      className: 'playa-card',
      stores: 2,
      gradient: 'from-green-500/20 to-teal-500/20',
    },
  ], [lang]);

  const selectCity = useCallback((cityId: string) => {
    const cityData = cityId === 'cancun' ? storeDetails.cancun : storeDetails.playa;
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
  }, []);

  const resetSelection = useCallback(() => {
    setSelectedCity(null);
    setBranches([]);
  }, []);

  const currentCity = useMemo(() => {
    if (!selectedCity) return null;
    return cities.find(city => city.id === selectedCity);
  }, [selectedCity, cities]);

  return {
    cities,
    selectedCity,
    branches,
    currentCity,
    selectCity,
    resetSelection,
    hasSelection: !!selectedCity,
  };
};