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
 * @param {Object} opts.$action         action selector
 * @param {Object} opts.$input          input text field selector
 * @param {Object} opts.$convertLabel   label of current conversion type
 * @param {Object} opts.$convertTypes   list of conversion type options
 * @param {Object} opts.converter       converter UI object wrapper
 */
var Form = module.exports = function (opts) {
  // Set options.
  this.$action = opts.$action;
  this.$input = opts.$input;
  this.$convertLabel = opts.$convertLabel;
  this.$convertTypes = opts.$convertTypes;
  this.converter = opts.converter;

  // Start off with first conversion option as default.
  this._convertTypes = null;
  this._updateType(this.$convertTypes.first());

  // Bind listeners.
  this._addListeners();
};

// Add all listeners.
Form.prototype._addListeners = function () {
  var self = this;

  // Conversion type selection.
  this.$convertTypes.click(function (ev) {
    ev.preventDefault();
    self._updateType($(ev.currentTarget));
  });

  // Convert actions.
  this.$action.click(function () {
    self._convert();
  });
  this.$input.keydown(function (ev) {
    if (ev.which !== 13 /* Enter key */) { return; }
    self._convert();
  });
};

// Update the conversion type and label.
Form.prototype._updateType = function ($el) {
  this._convertTypes = $el.data("convert").split(",");
  this.$convertLabel.html($el.html());
};

// Convert with current form state.
Form.prototype._convert = function () {
  this.converter.convert(this.$input.val(), this._convertTypes);
};
