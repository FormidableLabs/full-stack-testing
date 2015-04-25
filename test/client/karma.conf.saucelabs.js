/**
 * Karma Configuration: Base.
 */
var path = require("path");
var baseCfg = require("./karma.conf");

// Sauce labs environments.
var SAUCE_ENVS = {
  "chrome-mac": {
    base: "SauceLabs",
    browserName: "chrome",
    platform: "OS X 10.9"
  },
  "safari-mac": {
    base: "SauceLabs",
    browserName: "safari",
    platform: "OS X 10.9"
  },
  // TODO: Appears to fail conversion tests.
  // "ie9-win7": {
  //   base: "SauceLabs",
  //   browserName: "internet explorer",
  //   platform: "Windows 7",
  //   version: "9"
  // },
  "ie10-win7": {
    base: "SauceLabs",
    browserName: "internet explorer",
    platform: "Windows 7",
    version: "10"
  },
  "ie11-win7": {
    base: "SauceLabs",
    browserName: "internet explorer",
    platform: "Windows 7",
    version: "11"
  }
};

// Optionally filter browsers from environment or "all browsers"
var BROWSERS = (process.env.BROWSERS || "")
  .split(",")
  .filter(function (x) { return x; });
if (!BROWSERS.length) {
  BROWSERS = Object.keys(SAUCE_ENVS);
}

// SauceLabs tag.
var SAUCE_BRANCH = process.env.TRAVIS_BRANCH || "local";
var SAUCE_TAG = process.env.SAUCE_USERNAME + "@" + SAUCE_BRANCH;

module.exports = function(config) {
  baseCfg(config);
  config.set({
    reporters: ["spec", "saucelabs"],
    sauceLabs: {
      testName: "full-stack-testing - Frontend Unit Tests",
      tags: [SAUCE_TAG],
      public: "public"
    },
    // Timeouts: Allow "n" minutes before saying "good enough". See also:
    // https://github.com/angular/angular.js/blob/master/karma-shared.conf.js
    captureTimeout: 0, // Pass through to SL.
    customLaunchers: SAUCE_ENVS,
    browsers: BROWSERS
  });
};
