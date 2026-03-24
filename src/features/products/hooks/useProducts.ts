// src/features/products/hooks/useProducts.ts
import { useMemo } from 'react';
import { useTranslation } from '@/i18n';
import { images } from '@/mediaRoutes';
import type { CategoryProduct } from '@/shared/types';

export const useProducts = (): CategoryProduct[] => {
  const { t } = useTranslation('products');

  return useMemo(() => [
    {
      key: "pharmacy",
      category: "pharmacy",
      name: t('pharmacy'),
      icon: images.pharmacyIcon,
      description: t('pharmacy_description'),
    },
    {
      key: "clothes",
      category: "clothes",
      name: t('clothes'),
      icon: images.clothesIcon,
      description: t('clothes_description'),
    },
    {
      key: "beverages",
      category: "beverages",
      name: t('beverages'),
      icon: images.beveragesIcon,
      description: t('beverages_description'),
    },
    {
      key: "handcraft",
      category: "handcraft",
      name: t('handcraft'),
      icon: images.hcraftSouvenirsIcon,
      description: t('handcraft_description'),
    },
    {
      key: "grocery",
      category: "grocery",
      name: t('grocery'),
      icon: images.groceryIcon,
      description: t('grocery_description'),
    },
    {
      key: "deli",
      category: "deli",
      name: t('deli'),
      icon: images.deliIcon,
      description: t('deli_description'),
    },
    {
      key: "kids",
      category: "kids",
      name: t('kids'),
      icon: images.kidsIcon,
      description: t('kids_description'),
    },
    {
      key: "sunscreens",
      category: "sunscreens",
      name: t('sunscreens'),
      icon: images.sunscreensIcon,
      description: t('sunscreens_description'),
    },
  ], [t]);
};