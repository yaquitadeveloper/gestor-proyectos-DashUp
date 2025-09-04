import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import astroIcon from "astro-icon";
import vercel from "@astrojs/vercel";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [astroIcon()],
  output: "server",
  adapter: vercel(),
});
