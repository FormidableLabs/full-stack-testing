/**
 * Webpack development configuration
 */
var _ = require("lodash");
var prodCfg = require("./webpack.config");

// Copy over prod build except skip uglify, dedupe, etc.
module.exports = _.extend({
  plugins: [
    prodCfg._PLUGIN_MAP.SOURCE_MAPS
  ]
}, _.omit(prodCfg, "plugins"));
