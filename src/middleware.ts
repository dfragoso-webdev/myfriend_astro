// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import { DEFAULT_LANG } from "./i18n/constants";

// Lista de idiomas válidos
const VALID_LANGS = ["es", "en"];

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const pathParts = url.pathname.split("/").filter(Boolean);
  
  // Si el primer segmento de la ruta es "undefined", redirigir
  if (pathParts[0] === "undefined") {
    console.log(`🔄 Middleware: Redirigiendo ${url.pathname} a /${DEFAULT_LANG}/${pathParts.slice(1).join("/")}`);
    
    // Construir la nueva URL con el idioma por defecto
    const newPath = `/${DEFAULT_LANG}/${pathParts.slice(1).join("/")}`;
    return context.redirect(newPath, 301);
  }
  
  // Si hay un segmento de idioma pero no es válido, redirigir al idioma por defecto
  if (pathParts[0] && !VALID_LANGS.includes(pathParts[0]) && pathParts[0] !== "undefined") {
    console.log(`🔄 Middleware: Idioma inválido ${pathParts[0]}, redirigiendo a /${DEFAULT_LANG}/${pathParts.slice(1).join("/")}`);
    const newPath = `/${DEFAULT_LANG}/${pathParts.slice(1).join("/")}`;
    return context.redirect(newPath, 301);
  }
  
  // Continuar con la petición normalmente
  return next();
});