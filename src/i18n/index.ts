// src/i18n/index.ts
// Configuración (se ejecuta al importar)
import "./config";

// Re-exportar todo desde los módulos
export * from "./constants";
export * from "./hooks";
export * from "./astro";
export * from "./utils";

// Re-exportar default de config si es necesario
export { default } from "./config";