// src/i18n/astro.ts
import PremiumSelect from "@/features/products/PremiumSelect";
import { DEFAULT_LANG, type Language, type Namespace } from "./constants";

/**
 * Carga las traducciones de un namespace específico de forma dinámica.
 * Maneja la estructura de carpetas (root para common, /landing para el resto).
 */
export async function loadTranslations(
  lang: Language = DEFAULT_LANG, 
  namespace: Namespace = "common"
) {
  // Definimos la ruta relativa según el namespace
  const path = namespace === "common" 
    ? `./locales/${lang}/${namespace}.json`
    : `./locales/${lang}/landing/${namespace}.json`;
  
  try {
    const translations = await import(path);
    return translations.default || translations;
  } catch (error) {
    try {
      // Intento de fallback al idioma por defecto (es)
      const fallbackPath = namespace === "common"
        ? `./locales/${DEFAULT_LANG}/${namespace}.json`
        : `./locales/${DEFAULT_LANG}/landing/${namespace}.json`;
      const fallback = await import(fallbackPath);
      return fallback.default || fallback;
    } catch (fallbackError) {
      console.error(`❌ Falló la carga crítica de traducción: ${lang}/${namespace}. Revisa la ruta: ${path}`);
      return {};
    }
  }
}

/**
 * Carga todos los namespaces necesarios para la página principal.
 * Resuelve el error de indexación tipando el objeto de traducciones.
 */
export async function loadPageTranslations(lang: Language = DEFAULT_LANG) {
  const [common, navbar, about, products, homeService, luxeIsland, stores, premiumSelect] = await Promise.all([
    loadTranslations(lang, "common"),
    loadTranslations(lang, "navbar"),
    loadTranslations(lang, "about"),
    loadTranslations(lang, "products"),
    loadTranslations(lang, "homeService"),
    loadTranslations(lang, "luxeIsland"),
    loadTranslations(lang, "stores"),
    loadTranslations(lang, "premiumSelect"),
  ]);

  // Tipamos explícitamente el mapa de traducciones para evitar el error ts(2345) / ts(7053)
  const translationsMap: Record<Namespace, any> = {
    common,
    navbar,
    about,
    products,
    homeService,
    luxeIsland,
    stores,
    premiumSelect
  };

  return {
    common,
    navbar,
    about,
    products,
    homeService,
    luxeIsland,
    stores,
    PremiumSelect,
    /**
     * Función helper para traducir en componentes de Astro (Server Side).
     * @param key La llave del JSON
     * @param ns El namespace (por defecto "common")
     */
    t: (key: string, ns: Namespace = "common"): string => {
      return translationsMap[ns]?.[key] || key;
    }
  };
}