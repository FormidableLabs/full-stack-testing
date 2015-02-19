/**
 * Webpack production configuration
 */
var path = require("path");
var webpack = require("webpack");

// Stash plugins for reuse in `webpack.config.dev.js`
var PLUGIN_MAP = {
  // Manually do source maps to use alternate host.
  SOURCE_MAPS: new webpack.SourceMapDevToolPlugin(
    "../js-map/bundle.js.map",
    "\n//# sourceMappingURL=http://127.0.0.1:3001/app/js-map/[url]"
  )
};

module.exports = {
  _PLUGIN_MAP: PLUGIN_MAP, // Proxy to dev. config.
  cache: true,
  context: path.join(__dirname, "client"),
  entry: "./app.js",
  output: {
    path: path.join(__dirname, "app/js-dist"),
    filename: "bundle.js"
  },
  plugins: [
    // Optimize
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),

    PLUGIN_MAP.SOURCE_MAPS
  ]
};
