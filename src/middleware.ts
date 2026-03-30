// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import { DEFAULT_LANG } from "./i18n/constants";

// Lista de idiomas válidos
const VALID_LANGS = ["es", "en"];

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const pathParts = url.pathname.split("/").filter(Boolean);
  
  // Si no hay segmentos, redirigir a la raíz con idioma por defecto
  if (pathParts.length === 0) {
    return context.redirect(`/${DEFAULT_LANG}`, 307);
  }
  
  // Si el primer segmento es "undefined", redirigir (esto puede pasar por algún bug)
  if (pathParts[0] === "undefined") {
    const newPath = `/${DEFAULT_LANG}/${pathParts.slice(1).join("/")}`;
    return context.redirect(newPath, 307);
  }
  
  // Si no hay idioma en la URL (primer segmento no es es/en), redirigir
  if (!VALID_LANGS.includes(pathParts[0])) {
    const newPath = `/${DEFAULT_LANG}/${pathParts.join("/")}`;
    return context.redirect(newPath, 307);
  }
  
  // Para todas las demás rutas, continuar normalmente
  return next();
});