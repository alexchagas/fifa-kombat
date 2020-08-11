const withPlugins = require("next-compose-plugins");

const withPWA = require("next-pwa");
const optimizedImages = require("next-optimized-images");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPlugins([
  [optimizedImages, {}],
  [
    withPWA,
    {
      pwa: {
        dest: "public",
        runtimeCaching,
      },
    },
  ],
]);
