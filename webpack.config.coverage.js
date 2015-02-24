/**
 * Webpack frontend test configuration with code coverage for Karma.
 */
var path = require("path");
var _ = require("lodash");
var testCfg = require("./webpack.config.test");

module.exports = _.extend({}, _.omit(testCfg, "output"), {
  output: {
    path: path.join(__dirname, "app/js-test"),
    filename: "bundle-coverage.js"
  },
  module: {
    postLoaders: [
      // Manually instrument client code for code coverage.
      {
        test: /client\/.*\.js$/,
        exclude: /(test|node_modules)\//,
        loader: "istanbul-instrumenter"
      }
    ]
  }
});
