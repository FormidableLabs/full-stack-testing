/**
 * UI: Converter Types
 */
var $ = require("jquery");

/**
 * Converter types wrapper.
 *
 * @param {Object} opts                 options object
 * @param {Object} opts.$label   label of current conversion type
 * @param {Object} opts.$types   list of conversion type options
 */
var Types = module.exports = function (opts) {
  var self = this;

  // Set options.
  this.$label = opts.$label;
  this.$types = opts.$types;

  // Start off with first conversion option as default.
  this._types = null;
  this._updateType(this.$types.first());

  // Bind listeners.
  this.$types.click(function (ev) {
    ev.preventDefault();
    self._updateType($(ev.currentTarget));
  });
};

// Update the conversion type and label.
Types.prototype._updateType = function ($el) {
  this._types = $el.data("convert").split(",");
  this.$label.html($el.html());
};

Types.prototype.getTypes = function () {
  return this._types;
};
