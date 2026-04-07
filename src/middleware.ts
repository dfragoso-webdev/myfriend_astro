// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import { DEFAULT_LANG } from "./i18n/constants";

// Lista de idiomas válidos
const VALID_LANGS = ["es", "en"];

// Rutas que no deben ser redirigidas (páginas especiales)
const EXCLUDED_PATHS = ["/404", "/404.html", "/_astro", "/favicon.ico", "/robots.txt", "/sitemap.xml"];

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;
  
  // Verificar si la ruta actual está excluida de redirecciones
  const isExcluded = EXCLUDED_PATHS.some(path => pathname === path || pathname.startsWith(path));
  
  if (isExcluded) {
    // Para rutas excluidas, continuar sin redirigir
    return next();
  }
  
  const pathParts = pathname.split("/").filter(Boolean);
  
  // Si la URL ya es /es/404 o /en/404, dejarla pasar (no redirigir)
  if (pathParts.length === 2 && pathParts[1] === "404" && VALID_LANGS.includes(pathParts[0])) {
    return next();
  }
  
  // Si no hay segmentos, redirigir a la raíz con idioma por defecto
  if (pathParts.length === 0) {
    return context.redirect(`/${DEFAULT_LANG}`, 307);
  }
  
  // Si el primer segmento es "undefined", redirigir
  if (pathParts[0] === "undefined") {
    const newPath = `/${DEFAULT_LANG}/${pathParts.slice(1).join("/")}`;
    return context.redirect(newPath, 307);
  }
  
  // Si no hay idioma en la URL (primer segmento no es es/en)
  if (!VALID_LANGS.includes(pathParts[0])) {
    // Si la ruta actual es "/404", no redirigir
    if (pathname === "/404" || pathname === "/404/") {
      return next();
    }
    
    const newPath = `/${DEFAULT_LANG}/${pathParts.join("/")}`;
    return context.redirect(newPath, 307);
  }
  
  // Para todas las demás rutas, continuar normalmente
  return next();
});