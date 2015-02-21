/**
 * Webpack development configuration
 */
var _ = require("lodash");
var prodCfg = require("./webpack.config");

// Copy over prod build except skip uglify, dedupe, etc.
module.exports = _.extend({
  plugins: [
    prodCfg._PLUGIN_MAP.SOURCE_MAPS,
    prodCfg._PLUGIN_MAP.PROVIDE
  ]
}, _.omit(prodCfg, "plugins"));
