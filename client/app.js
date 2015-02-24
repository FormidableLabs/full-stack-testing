/**
 * Client application entry point.
 */
var $ = require("jquery");
require("bootstrap"); // Empty require to enable bootstrap JS

var Form = require("./form");
var Converter = require("./converter");

// Our JS bundle loads after DOM, so don't need jQuery ready wait...
// Bind converter and initialize.
var converter = new Converter({
  $output: $(".js-output")
});

/*eslint-disable no-new*/
// Bind form and initialize UI state.
new Form({
  $action: $(".js-action"),
  $input: $(".js-input"),
  $convertLabel: $(".js-convert-label"),
  $convertTypes: $(".js-convert"),
  converter: converter
});
/*eslint-enable no-new*/
