/**
 * Client application entry point.
 */
var $ = require("jquery");
require("bootstrap"); // Empty require to enable bootstrap JS

var Converter = require("./converter");
var Types = require("./types");
var Action = require("./action");

// Our JS bundle loads after DOM, so don't need jQuery ready wait...
// Bind converter / types and initialize.
var converter = new Converter({
  $output: $(".js-output")
});
var types = new Types({
  $label: $(".js-convert-label"),
  $types: $(".js-convert-types")
});

/*eslint-disable no-new*/
// Bind action and initialize UI state.
new Action({
  $submit: $(".js-submit"),
  $input: $(".js-input"),
  converter: converter,
  types: types
});
/*eslint-enable no-new*/
