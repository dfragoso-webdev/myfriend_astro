// src/utils/slugify.ts
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .replace(/[^a-z0-9]+/g, '-')     // Reemplazar caracteres no válidos con guiones
    .replace(/^-|-$/g, '');          // Eliminar guiones al inicio y final
};

// Para probar: slugify("MARINA DEL REY") -> "marina-del-rey"
// slugify("YUCATÁN") -> "yucatan"
// slugify("ROYAL HIDEAWAY") -> "royal-hideaway"