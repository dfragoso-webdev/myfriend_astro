// src/i18n/hooks.ts
import { useTranslation as useI18nextTranslation } from "react-i18next";
import { useCallback } from "react";
import { DEFAULT_LANG, LANGUAGES, type Language, type Namespace } from "./constants";

export function useTranslation(namespace?: Namespace) {
  const ns = namespace || "common";
  const { t, i18n, ready } = useI18nextTranslation(ns as any);

  const changeLanguage = useCallback((lang: Language) => {
    if (lang === i18n.language) return;

    // Cambiar el idioma en i18next
    i18n.changeLanguage(lang);
    
    // Actualizar la URL sin recargar
    if (typeof window !== "undefined") {
      const pathParts = window.location.pathname.split("/");
      const restPath = pathParts.slice(2).join("/");
      const newPath = restPath ? `/${lang}/${restPath}` : `/${lang}`;
      window.history.pushState({}, "", newPath);
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }
  }, [i18n]);

  return {
    t,
    i18n,
    ready,
    currentLang: i18n.language as Language,
    changeLanguage,
  };
}