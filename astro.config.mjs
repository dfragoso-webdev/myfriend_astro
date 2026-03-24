import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";

import react from "@astrojs/react";

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },

  integrations: [react()],
});