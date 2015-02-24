/**
 * UI: Form
 */
var $ = require("jquery");

/**
 * Form wrapper.
 *
 * Takes various DOM selectors and provides form state information:
 *
 * - `getTypes()`: Returns conversion types to do.
 * - `getText()`: Returns input text to convert.
 *
 * @param {Object} opts                 options object
 * @param {Object} opts.$input          input text field selector
 * @param {Object} opts.$convertLabel   label of current conversion type
 * @param {Object} opts.$convertTypes   list of conversion type options
 */
var Form = module.exports = function (opts) {
  var self = this;

  // Set options.
  this.$input = opts.$input;
  this.$convertLabel = opts.$convertLabel;
  this.$convertTypes = opts.$convertTypes;

  // Starting state.
  this.convertTypes = ["camel"];

  // Bind listeners.
  this.$convertTypes.click(function (ev) {
    ev.preventDefault();
    self._updateType($(ev.currentTarget));
  });

  // Start off with first conversion option as default.
  this._updateType(this.$convertTypes.first());
};

// Update the conversion type and label.
Form.prototype._updateType = function ($el) {
  this.convertTypes = $el.data("convert").split(",");
  this.$convertLabel.html($el.html());
};

Form.prototype.getTypes = function () {
  return this.convertTypes;
};

Form.prototype.getText = function () {
  return this.$input.val();
};
