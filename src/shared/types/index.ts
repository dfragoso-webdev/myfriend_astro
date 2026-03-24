// src/shared/types/index.ts

export interface Translation {
  [key: string]: string;
}

export interface SocialIcon {
  src: string;
  alt: string;
  color: string;
  url: string;
  stats: string;
}

export interface MousePosition {
  x: number;
  y: number;
}

// ABOUT TYPES
export interface AboutStats {
  number: string;
  label: string;
}

export interface AboutTranslations {
  title: string;           // about_us_title en common
  text: string;            // about_us_text en common
  since: string;
  commitment_quote: string;
  happy_customers: string;
  years_experience: string;
}

// PRODUCT TYPES
// Producto para el carrusel PremiumSelect
export interface PremiumProduct {
  name: string;
  image: string;
}

// Producto/Categoría para la sección Products
export interface CategoryProduct {
  key: string;
  category: string;
  name: string;
  icon: string;
  description: string;
}

export interface ProductsTranslations {
  products_title: string;
  products_subtitle: string;
  pharmacy: string;
  clothes: string;
  beverages: string;
  handcraft: string;
  grocery: string;
  deli: string;
  kids: string;
  sunscreens: string;
  pharmacy_description: string;
  clothes_description: string;
  beverages_description: string;
  handcraft_description: string;
  grocery_description: string;
  deli_description: string;
  kids_description: string;
  sunscreens_description: string;
}

// COMMON TYPES
export interface CommonTranslations {
  find_everything_part1: string;
  find_everything_part2: string;
  find_us_near_you: string;
  choose_city: string;
  location_subtitle: string;
  premium_select_title: string;
  meet_our_brands: string;
  need_something: string;
  subtitle: string;
  home_service_title: string;
  follow_us_title: string;
  follow_us_text: string;
  "404": string;
  page_not_found: string;
  page_not_found_text: string;
  go_to_home: string;
  see_more: string;
}

// LUXE ISLAND TYPES
export interface LuxeIslandTranslations {
  // Define según tu archivo luxeIsland.json
  title?: string;
  description?: string;
  [key: string]: any;
}

// NAVBAR TYPES
export interface NavbarTranslations {
  home?: string;
  products?: string;
  stores?: string;
  contact?: string;
  [key: string]: any;
}

//  LandingProps
export interface LandingProps {
  common: CommonTranslations;
  about: AboutTranslations;
  products: ProductsTranslations;
  homeService: HomeServiceTranslations;  
  luxeIsland?: LuxeIslandTranslations;
  lang: string;
}

// src/shared/types/index.ts
export interface HomeServiceTranslations {
  title: string;
  phone: string;
  contact_now: string;
}

export interface StoresTranslations {
  find_us_near_you: string;
  choose_city: string;
  location_subtitle: string;
  back_to_cities?: string;
  view_branches?: string;
}

export interface PremiumSelectTranslations {
  premium_select_title: string;
  towels: string;
  beverages: string;
  hats: string;
  beach_toys: string;
  sunglasses: string;
}