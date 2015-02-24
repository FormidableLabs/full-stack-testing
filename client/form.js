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
  this.convertTypes = null;
  this._updateType(this.$convertTypes.first());

  // Bind listeners.
  this._addListeners();
};

// Add all listeners.
Form.prototype._addListeners = function () {
  var self = this;

  // Conversion types.
  this.$convertTypes.click(function (ev) {
    ev.preventDefault();
    self._updateType($(ev.currentTarget));
  });

  // Actions.
  this.$action.click(function () {
    self.converter.convert(self.getText(), self.getTypes());
  });
  this.$input.keydown(function (ev) {
    if (ev.which === 13 /* Enter key */) {
      self.converter.convert(self.getText(), self.getTypes());
    }
  });
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
