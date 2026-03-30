// src/features/stores/StorePage.tsx
import React, { useEffect, useState } from 'react';
import StoreHero from './components/StoreHero';
import StoreCarousel from './components/StoreCarousel';
import { slugify } from '@/utils/slugify';
import storeDetails from '@/data/storeDetails.json';

interface StorePageProps {
  lang: string;
  city?: string;  // 'cancun' o 'playa'
  store?: string; // slug de la tienda
}

interface StoreData {
  image: string;
  title: string;
  address: string;
  email: string;
  phone: string;
  cityName: string;
  cityNameEn: string;
  citySlug: string;
  slug: string;
}

const getStoreData = (citySlug: string, storeSlug: string): StoreData | null => {
  // Obtener los datos de la ciudad
  const cityKey = citySlug === 'cancun' ? 'cancun' : 'playa';
  const cityData = storeDetails[cityKey];
  
  if (!cityData) {
    console.log('Ciudad no encontrada:', citySlug);
    return null;
  }
  
  // Buscar la tienda por slug
  const storeData = cityData.images.find(store => {
    const generatedSlug = slugify(store.title);
    return generatedSlug === storeSlug;
  });
  
  if (!storeData) {
    console.log('Tienda no encontrada para slug:', storeSlug);
    return null;
  }
  
  console.log('Tienda encontrada:', storeData.title);
  
  return {
    ...storeData,
    cityName: cityKey === 'cancun' ? 'CANCÚN' : 'PLAYA DEL CARMEN',
    cityNameEn: cityKey === 'cancun' ? 'CANCUN' : 'PLAYA DEL CARMEN',
    citySlug: cityKey,
    slug: storeSlug
  };
};

const StorePage: React.FC<StorePageProps> = ({ lang, city, store }) => {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const isSpanish = lang === 'es';

  useEffect(() => {
    console.log('Buscando tienda:', { city, store });
    
    if (city && store) {
      const data = getStoreData(city, store);
      setStoreData(data);
    }
    setLoading(false);
  }, [city, store]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">{isSpanish ? "Cargando..." : "Loading..."}</p>
        </div>
      </div>
    );
  }

  if (!storeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">{isSpanish ? "Tienda no encontrada" : "Store not found"}</p>
          <a href={`/${lang}`} className="mt-4 inline-block text-primary hover:underline">
            {isSpanish ? "Volver al inicio" : "Back to home"}
          </a>
        </div>
      </div>
    );
  }

  return (
    <main>
      <StoreHero 
        store={{
          image: storeData.image,
          title: storeData.title,
          address: storeData.address,
          email: storeData.email,
          phone: storeData.phone,
        }}
        city={isSpanish ? storeData.cityName : storeData.cityNameEn}
        lang={lang}
      />
      <StoreCarousel 
        storeId={storeData.slug} // Pasar el slug directamente
        lang={lang}
        title={isSpanish ? "Galería de imágenes" : "Image gallery"}
        titleEn="Image gallery"
      />
    </main>
  );
};

export default StorePage;