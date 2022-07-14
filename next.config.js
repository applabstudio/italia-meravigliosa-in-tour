/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  reactStrictMode: false,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
		buildExcludes: [/middleware-manifest.json$/]
  },
})