/**
 * UI: Action
 */
var $ = require("jquery");

/**
 * Action / input wrapper.
 *
 * Takes input and calls conversions.
 *
 * @param {Object} opts                 options object
 * @param {Object} opts.$submit         submit selector
 * @param {Object} opts.$input          input text field selector
 * @param {Object} opts.converter       converter UI object wrapper
 * @param {Object} opts.types           types UI object wrapper
 */
var Action = module.exports = function (opts) {
  var self = this;

  // Set options.
  this.$submit = opts.$submit;
  this.$input = opts.$input;
  this.converter = opts.converter;
  this.types = opts.types;

  // Bind listeners.
  this.$submit.click(function () {
    self._convert();
  });
  this.$input.keydown(function (ev) {
    if (ev.which !== 13 /* Enter key */) { return; }
    self._convert();
  });
};

// Convert with current form state.
Action.prototype._convert = function () {
  this.converter.convert(this.$input.val(), this.types.getTypes());
};
