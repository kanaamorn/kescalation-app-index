// https://nuxt.com/docs/api/configuration/nuxt-config
const sw = false;
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "@vueuse/nuxt",
    "nuxt-icon",
    "@nuxt/ui",
    "@pinia/nuxt",
    // "@nuxtjs/supabase",
    "@vite-pwa/nuxt",
  ],
  pwa: {
    strategies: sw ? 'injectManifest' : 'generateSW',
    srcDir: sw ? 'service-worker' : undefined,
    filename: sw ? 'sw.ts' : undefined,
    registerType: "autoUpdate",
    manifest: {
      name: "K-escalation",
      short_name: "K-calculation",
      description: "โปรแกรมคำนวนค่า K ที่ใช้ง่าย และรวดเร็วมาก",
      theme_color: "#2196f3",
      background_color: "#2196f3",
      display: "standalone",
      scope: "/",
      start_url: "/",
      orientation: "portrait-primary",
      screenshots: [
       
        {
          "src": "/images/icons/icon-512x512.png",
           "sizes": "512x512",
           "type": "image/png",
           "form_factor": "narrow",
           "label": "สุดยอด App"
         }
    ],
      icons: [
        {
          src: "/images/icons/icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: "/images/icons/icon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "/images/icons/icon-128x128.png",
          sizes: "128x128",
          type: "image/png",
        },
        {
          src: "/images/icons/icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/images/icons/icon-152x152.png",
          sizes: "152x152",
          type: "image/png",
        },
        {
          src: "/images/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/images/icons/icon-384x384.png",
          sizes: "384x384",
          type: "image/png",
        },
        {
          src: "/images/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/images/icons/icon-1024x1024.png",
          sizes: "1024x1024",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    injectManifest: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: "/",
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },
  // supabase: {
  //   redirect: false,
  // },
});
