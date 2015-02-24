/**
 * UI: Converter
 */
var $ = require("jquery");

/**
 * Converter wrapper.
 *
 * @param {Object} opts                 options object
 * @param {Object} opts.form            Form UI object wrapper
 * @param {Object} opts.$output         output DOM element
 * @param {Object} opts.$action         action selector
 */
var Converter = module.exports = function (opts) {
  var self = this;

  // Set options.
  this.form = opts.form;
  this.$output = opts.$output;
  this.$action = opts.$action;

  // Listen and submit action.
  this.$action.click(function () { self.convert(); });
  this.form.$input.keydown(function (ev) {
    if (ev.which === 13 /* Enter key */) {
      self.convert();
    }
  });
};

// Create HTML with title and content.
Converter.prototype.template = function (title, content) {
  return $(
    "<div class='panel panel-default'>" +
    "  <div class='panel-heading'>" +
    "    <h3 class='panel-title'>" + title + "</h3>" +
    "  </div>" +
    "  <div class='panel-body'>" + content + "</div>" +
    "</div>"
  );
};

// Retrieve data and update UI.
Converter.prototype.convert = function () {
  var self = this;
  var input = this.form.getText();

  // Clear out existing data.
  this.$output.empty();

  // Iterate all conversion types, make AJAX request and update UI.
  $.each(this.form.getTypes(), function (i, type) {
    $.get("/api/" + type, { from: input }, function (data) {
      self.$output.append(self.template(type, data.to));
    });
  });
};
