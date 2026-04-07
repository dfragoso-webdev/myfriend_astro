// src/features/stores/config/storeProducts.ts
import { images, svgs } from '@/mediaRoutes';

export interface StoreProduct {
  key: string;
  image: string;
  imageType?: 'icon' | 'photo';
}

// Productos específicos de Royal Hideaway con imágenes reales
const royalHideawayProducts: StoreProduct[] = [
  {
    key: 'rhid1',
    image: images.rhid1,
    imageType: 'photo',
  },
  {
    key: 'rhid2',
    image: images.rhid2,
    imageType: 'photo',
  },
  {
    key: 'rhid3',
    image: images.rhid3,
    imageType: 'photo',
  },
  {
    key: 'rhid4',
    image: images.rhid4,
    imageType: 'photo',
  },
  {
    key: 'rhid5',
    image: images.rhid5,
    imageType: 'photo',
  },
  {
    key: 'rhid6',
    image: images.rhid6,
    imageType: 'photo',
  },
  {
    key: 'rhid7',
    image: images.rhid7,
    imageType: 'photo',
  },
  {
    key: 'rhid8',
    image: images.rhid8,
    imageType: 'photo',
  },
];

// Mapeo de productos por tienda
// Solo Royal Hideaway tiene productos (fotos), las demás tienen array vacío
export const storeProductsMap: Record<string, StoreProduct[]> = {
  'marina-del-rey': [],
  'nautilus': [],
  'caribe': [],
  'royal-hideaway': royalHideawayProducts,
  'yucatan': [],
  'galerias': [],
  'allegro': [],
  'riviera': [],
};

// Helper para obtener productos de una tienda
export const getStoreProducts = (storeId: string): StoreProduct[] => {
  const products = storeProductsMap[storeId];
  // Si no hay productos o es undefined, retornar array vacío
  return products || [];
};