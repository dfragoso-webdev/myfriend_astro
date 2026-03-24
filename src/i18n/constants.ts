// src/i18n/constants.ts
export const LANGUAGES = ["es", "en"] as const;
export type Language = typeof LANGUAGES[number];
export const DEFAULT_LANG: Language = "es";

export const LANGUAGE_META: Record<Language, { label: string; flag: string }> = {
  es: { label: "Español", flag: "🇲🇽" },
  en: { label: "English", flag: "🇺🇸" },
};

export const NAMESPACES = [
  "common",
  "navbar",
  "about",
  "products",
  "homeService",
  "luxeIsland",
  "stores",
  "premiumSelect",
  "footer",
  "followUs",
  "luxeIslandBand",
  "banner",
] as const;

export type Namespace = typeof NAMESPACES[number];