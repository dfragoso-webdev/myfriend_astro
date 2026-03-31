// src/features/stores/config/storeProducts.ts
import { images, svgs } from '@/mediaRoutes';

export interface StoreProduct {
  key: string;
  image: string;
  imageType?: 'icon' | 'photo';
}

// Productos base con íconos SVG
const baseProducts = {
  pharmacy: {
    key: 'pharmacy',
    image: svgs.pharmacyIcon,
    imageType: 'icon' as const,
  },
  beverages: {
    key: 'beverages',
    image: svgs.beveragesIcon,
    imageType: 'icon' as const,
  },
  grocery: {
    key: 'grocery',
    image: svgs.groceryIcon,
    imageType: 'icon' as const,
  },
  clothes: {
    key: 'clothes',
    image: svgs.clothesIcon,
    imageType: 'icon' as const,
  },
  souvenirs: {
    key: 'souvenirs',
    image: svgs.hcraftSouvenirsIcon,
    imageType: 'icon' as const,
  },
  handicrafts: {
    key: 'handicrafts',
    image: svgs.hcraftSouvenirsIcon,
    imageType: 'icon' as const,
  },
  deli: {
    key: 'deli',
    image: svgs.deliIcon,
    imageType: 'icon' as const,
  },
  kids: {
    key: 'kids',
    image: svgs.kidsIcon,
    imageType: 'icon' as const,
  },
  sunscreens: {
    key: 'sunscreens',
    image: svgs.sunscreensIcon,
    imageType: 'icon' as const,
  },
};

// Productos específicos de Royal Hideaway con imágenes reales
const royalHideawayProducts: StoreProduct[] = [
  {
    key: 'pharmacy',
    image: images.rhid1,
    imageType: 'photo',
  },
  {
    key: 'clothes',
    image: images.rhid2,
    imageType: 'photo',
  },
  {
    key: 'beverages',
    image: images.rhid3,
    imageType: 'photo',
  },
  {
    key: 'handicrafts',
    image: images.rhid4,
    imageType: 'photo',
  },
  {
    key: 'grocery',
    image: images.rhid5,
    imageType: 'photo',
  },
  {
    key: 'deli',
    image: images.rhid6,
    imageType: 'photo',
  },
  {
    key: 'kids',
    image: images.rhid7,
    imageType: 'photo',
  },
  {
    key: 'sunscreens',
    image: images.rhid8,
    imageType: 'photo',
  },
];

// Mapeo de productos por tienda
export const storeProductsMap: Record<string, StoreProduct[]> = {
  'marina-del-rey': [
    baseProducts.pharmacy,
    baseProducts.beverages,
    baseProducts.grocery,
    baseProducts.souvenirs,
  ],
  nautilus: [
    baseProducts.pharmacy,
    baseProducts.clothes,
    baseProducts.beverages,
  ],
  caribe: [
    baseProducts.pharmacy,
    baseProducts.beverages,
    baseProducts.grocery,
    baseProducts.sunscreens,
  ],
  'royal-hideaway': royalHideawayProducts,
  yucatan: [
    baseProducts.pharmacy,
    baseProducts.beverages,
    baseProducts.grocery,
    baseProducts.deli,
  ],
  galerias: [
    baseProducts.pharmacy,
    baseProducts.clothes,
    baseProducts.beverages,
    baseProducts.grocery,
  ],
  allegro: [
    baseProducts.pharmacy,
    baseProducts.beverages,
    baseProducts.grocery,
  ],
  riviera: [
    baseProducts.pharmacy,
    baseProducts.beverages,
    baseProducts.grocery,
    baseProducts.sunscreens,
  ],
};

// Helper para obtener productos de una tienda
export const getStoreProducts = (storeId: string): StoreProduct[] => {
  return storeProductsMap[storeId] || storeProductsMap['royal-hideaway'];
};