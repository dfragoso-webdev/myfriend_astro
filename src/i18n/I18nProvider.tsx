// src/shared/providers/I18nProvider.tsx
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';
import { useEffect } from 'react';

interface I18nProviderProps {
  children: React.ReactNode;
  lang: string;
}

export const I18nProvider = ({ children, lang }: I18nProviderProps) => {
  // En el servidor: cambiar el idioma de forma síncrona
  if (typeof window === 'undefined' && i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  // En el cliente: mantener sincronizado con la prop (por si cambia)
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};