/**
 * Karma Configuration: Base.
 */
var path = require("path");

module.exports = function(config) {
  config.set({
    frameworks: ["mocha"],
    reporters: ["spec"],
    browsers: ["PhantomJS"],
    basePath: "../..", // repository root.
    files: [
      // Sinon has issues with webpack. Do global include.
      "node_modules/sinon/pkg/sinon.js",

      // Test bundle.
      "app/js-test/bundle.js"
    ],
    port: 9999,
    singleRun: true,
    client: {
      mocha: {
        ui: "bdd"
      }
    }
  });
};
