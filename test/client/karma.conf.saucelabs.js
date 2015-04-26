/**
 * Karma Configuration: Base.
 */
var path = require("path");
var baseCfg = require("./karma.conf");

// Sauce labs environments.
//
// These are custom definitions that we can later invoke specifically on the
// command line with `--browsers KEY1,KEY2`, etc.
var SAUCE_ENVS = {
  "sl-chrome-mac": {
    base: "SauceLabs",
    browserName: "chrome",
    platform: "OS X 10.9"
  },
  "sl-safari-mac": {
    base: "SauceLabs",
    browserName: "safari",
    platform: "OS X 10.9"
  },
  // TODO: Appears to fail conversion tests.
  // "sl-ie9-win7": {
  //   base: "SauceLabs",
  //   browserName: "internet explorer",
  //   platform: "Windows 7",
  //   version: "9"
  // },
  "sl-ie10-win7": {
    base: "SauceLabs",
    browserName: "internet explorer",
    platform: "Windows 7",
    version: "10"
  },
  "sl-ie11-win7": {
    base: "SauceLabs",
    browserName: "internet explorer",
    platform: "Windows 7",
    version: "11"
  }
};

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
    browsers: Object.keys(SAUCE_ENVS)
  });
};
