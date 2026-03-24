// src/config/cities.ts
export const VALID_CITIES = ['cancun', 'playa'] as const;
export type City = typeof VALID_CITIES[number]; // 'cancun' | 'playa'

export const LANG_CODES = ['es', 'en'] as const;
export type Lang = typeof LANG_CODES[number]; // 'es' | 'en'

export const CITY_NAMES: Record<City, Record<Lang, string>> = {
  cancun: {
    es: 'CANCÚN',
    en: 'CANCUN'
  },
  playa: {
    es: 'PLAYA DEL CARMEN',
    en: 'PLAYA DEL CARMEN'
  }
};