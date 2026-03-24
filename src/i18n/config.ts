// src/i18n/config.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANG, NAMESPACES } from "./constants";

// Importar traducciones (incluir followUs)
import enCommon from "./locales/en/common.json";
import esCommon from "./locales/es/common.json";
import enNavbar from "./locales/en/landing/navbar.json";
import esNavbar from "./locales/es/landing/navbar.json";
import enAbout from "./locales/en/landing/about.json";
import esAbout from "./locales/es/landing/about.json";
import enProducts from "./locales/en/landing/products.json";
import esProducts from "./locales/es/landing/products.json";
import enHomeService from "./locales/en/landing/homeService.json";
import esHomeService from "./locales/es/landing/homeService.json";
import enLuxeIsland from "./locales/en/landing/luxeIsland.json";
import esLuxeIsland from "./locales/es/landing/luxeIsland.json";
import enStores from "./locales/en/landing/stores.json";
import esStores from "./locales/es/landing/stores.json";
import enPremiumSelect from "./locales/en/landing/premiumSelect.json";
import esPremiumSelect from "./locales/es/landing/premiumSelect.json";
import enFooter from "./locales/en/footer.json";
import esFooter from "./locales/es/footer.json";
import enFollowUs from "./locales/en/landing/followUs.json";
import esFollowUs from "./locales/es/landing/followUs.json";
import enLuxeIslandBand from "./locales/en/landing/luxeIslandBand.json";
import esLuxeIslandBand from "./locales/es/landing/luxeIslandBand.json";
import esBanner from "./locales/es/landing/banner.json";
import enBanner from "./locales/en/landing/banner.json";

// Declaración de tipos
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      en: {
        common: typeof enCommon;
        navbar: typeof enNavbar;
        about: typeof enAbout;
        products: typeof enProducts;
        homeService: typeof enHomeService;
        luxeIsland: typeof enLuxeIsland;
        stores: typeof enStores;
        premiumSelect: typeof enPremiumSelect;
        footer: typeof enFooter;
        followUs: typeof enFollowUs;
        luxeIslandBand: typeof enLuxeIslandBand;
        banner: typeof enBanner;
      };
      es: {
        common: typeof esCommon;
        navbar: typeof esNavbar;
        about: typeof esAbout;
        products: typeof esProducts;
        homeService: typeof esHomeService;
        luxeIsland: typeof esLuxeIsland;
        stores: typeof esStores;
        premiumSelect: typeof esPremiumSelect;
        footer: typeof esFooter;
        followUs: typeof esFollowUs;
        luxeIslandBand: typeof esLuxeIslandBand;
        banner: typeof esBanner;
      };
    };
  }
}

// Inicializar i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        navbar: enNavbar,
        about: enAbout,
        products: enProducts,
        homeService: enHomeService,
        luxeIsland: enLuxeIsland,
        stores: enStores,
        premiumSelect: enPremiumSelect,
        footer: enFooter,
        followUs: enFollowUs,      
        luxeIslandBand: enLuxeIslandBand,
        banner: enBanner,
      },
      es: {
        common: esCommon,
        navbar: esNavbar,
        about: esAbout,
        products: esProducts,
        homeService: esHomeService,
        luxeIsland: esLuxeIsland,
        stores: esStores,
        premiumSelect: esPremiumSelect,
        footer: esFooter,
        followUs: esFollowUs,      
        luxeIslandBand: esLuxeIslandBand,
        banner: esBanner,
      },
    },
    lng: DEFAULT_LANG,
    fallbackLng: DEFAULT_LANG,
    ns: [...NAMESPACES],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;