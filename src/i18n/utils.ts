// src/i18n/utils.ts
import { DEFAULT_LANG, LANGUAGES, type Language, type Namespace } from "./constants";
import { loadTranslations } from "./astro";

export async function getTranslations(
  lang: Language = DEFAULT_LANG,
  namespace: Namespace = "common"
) {
  return await loadTranslations(lang, namespace);
}

export const getLangFromUrl = (url: URL): Language => {
  const lang = url.pathname.split("/")[1] as Language;
  return LANGUAGES.includes(lang) ? lang : DEFAULT_LANG;
};

export const getCurrentLang = (): Language => {
  if (typeof window === "undefined") return DEFAULT_LANG;
  return getLangFromUrl(new URL(window.location.href));
};