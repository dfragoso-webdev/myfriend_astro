// src/i18n/hooks.ts
import { useTranslation as useI18nextTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { DEFAULT_LANG, LANGUAGES, type Language, type Namespace } from "./constants";

export function useTranslation(namespace?: Namespace) {
  const ns = namespace || "common";
  const { t, i18n, ready } = useI18nextTranslation(ns as any);
  const [currentLang, setCurrentLang] = useState<Language>(DEFAULT_LANG);

  // Obtener idioma de la URL
  const getLangFromUrl = (): Language => {
    if (typeof window === "undefined") return DEFAULT_LANG;
    const pathLang = window.location.pathname.split("/")[1] as Language;
    return LANGUAGES.includes(pathLang) ? pathLang : DEFAULT_LANG;
  };

  // Inicializar el idioma desde la URL
  useEffect(() => {
    const urlLang = getLangFromUrl();
    setCurrentLang(urlLang);
    if (i18n.language !== urlLang) {
      i18n.changeLanguage(urlLang);
    }
  }, [i18n]);

  // Escuchar cambios en la URL (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const newLang = getLangFromUrl();
      setCurrentLang(newLang);
      if (i18n.language !== newLang) {
        i18n.changeLanguage(newLang);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [i18n]);

  const changeLanguage = (lang: Language) => {
    if (lang === currentLang) return;

    // Cambiar el idioma en i18next
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    
    // Actualizar la URL sin recargar
    if (typeof window !== "undefined") {
      const pathParts = window.location.pathname.split("/");
      const restPath = pathParts.slice(2).join("/");
      const newPath = restPath ? `/${lang}/${restPath}` : `/${lang}`;
      
      // Usar pushState para cambiar la URL sin recargar
      window.history.pushState({}, "", newPath);
      
      // Disparar evento personalizado para notificar el cambio
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }
  };

  return {
    t,
    i18n,
    ready,
    currentLang,
    changeLanguage,
  };
}