// src/shared/providers/I18nProvider.tsx
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';
import { useEffect, useState } from 'react';

interface I18nProviderProps {
  children: React.ReactNode;
  lang: string;
}

export const I18nProvider = ({ children, lang }: I18nProviderProps) => {
  const [isInitialized, setIsInitialized] = useState(false);

  // En el servidor y en el cliente, asegurar que i18n tenga el idioma correcto
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window !== 'undefined' && !isInitialized) {
      // Sincronizar i18n con el idioma de la URL
      const pathLang = window.location.pathname.split('/')[1];
      const validLangs = ['es', 'en'];
      const urlLang = validLangs.includes(pathLang) ? pathLang : 'es';
      
      if (i18n.language !== urlLang) {
        i18n.changeLanguage(urlLang);
      }
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Si estamos en el servidor, cambiar el idioma antes de renderizar
  if (typeof window === 'undefined') {
    // En SSR, usar el idioma recibido del layout
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};