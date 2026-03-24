// src/utils/routes.ts
import { LANGUAGES, DEFAULT_LANG } from "@/i18n/constants";

export const VALID_CITIES = ["cancun", "playa"];

export function generateCityPaths() {
  const paths = [];
  for (const lang of LANGUAGES) {
    for (const city of VALID_CITIES) {
      paths.push({
        params: { lang, city }
      });
    }
  }
  return paths;
}

export function validateCityParams(lang: string, city: string) {
  // Validar idioma
  if (!lang || !LANGUAGES.includes(lang as any)) {
    const validCity = city && VALID_CITIES.includes(city as any) ? city : "cancun";
    return {
      isValid: false,
      redirect: `/${DEFAULT_LANG}/sucursales/${validCity}`,
      lang: DEFAULT_LANG, // Añadimos valor por defecto
      city: validCity // Añadimos valor por defecto
    };
  }

  // Validar ciudad
  if (!city || !VALID_CITIES.includes(city as any)) {
    return {
      isValid: false,
      redirect: `/${lang}/sucursales`,
      lang: lang, // Aseguramos que lang está presente
      city: "cancun" // Valor por defecto para city
    };
  }

  return { 
    isValid: true, 
    lang: lang, 
    city: city 
  };
}

export function getCityData(city: string, lang: string) {
  if (city === "cancun") {
    return {
      title: lang === "es" ? "CANCÚN" : "CANCUN"
    };
  }
  if (city === "playa") {
    return {
      title: lang === "es" ? "PLAYA DEL CARMEN" : "PLAYA DEL CARMEN"
    };
  }
  return {
    title: lang === "es" ? "CIUDAD" : "CITY" // Fallback seguro
  };
}