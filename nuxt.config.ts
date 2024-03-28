// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: "pt-BR",
      },
      title: "Lib Admin",
      meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }],
    },
  },
  css: ["@/assets/styles.css"],
  modules: [
    [
      "@vee-validate/nuxt",
      {
        autoImports: true,
      },
    ],
  ],
});
