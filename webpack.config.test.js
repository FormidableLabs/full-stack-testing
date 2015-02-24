/**
 * Webpack frontend test configuration.
 */
var path = require("path");
var _ = require("lodash");
var prodCfg = require("./webpack.config");

module.exports = _.extend({}, _.omit(prodCfg, "plugins"), {
  cache: true,
  context: path.join(__dirname, "test/client"),
  entry: "./main",
  output: {
    path: path.join(__dirname, "app/js-test"),
    filename: "bundle.js"
  },
  devtool: "#source-map",
  module: {
    postLoaders: [
      // Manually instrument client code for code coverage.
      {
        test: /client\/.*\.js$/,
        exclude: /(test|node_modules)\//,
        loader: "istanbul-instrumenter"
      }
    ]
  },
  resolve: _.merge({}, prodCfg.resolve, {
    alias: {
      client: path.join(__dirname, "client")
    }
  }),
  plugins: [
    prodCfg._PLUGIN_MAP.PROVIDE
  ]
});
