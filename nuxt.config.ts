// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],

    // da bismo mogli da pristupimo JWT_ACCESS_TOKEN i JWT_REFRESH_TOKEN iz .env fajla, potrebno je da ih oovde definisemo:
    runtimeConfig: {
        jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
        jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    }
})
