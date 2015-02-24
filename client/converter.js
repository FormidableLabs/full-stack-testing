/**
 * UI: Converter
 */
var $ = require("jquery");

/**
 * Converter wrapper.
 *
 * @param {Object} opts                 options object
 * @param {Object} opts.$output         output DOM element
 */
var Converter = module.exports = function (opts) {
  // Set options.
  this.$output = opts.$output;
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
Converter.prototype.convert = function (text, types) {
  var self = this;

  // Clear out existing data.
  this.$output.empty();

  // Iterate all conversion types, make AJAX request and update UI.
  $.each(types, function (i, type) {
    $.get("/api/" + type, { from: text }, function (data) {
      self.$output.append(self.template(type, data.to));
    });
  });
};
