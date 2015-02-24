/**
 * Client application entry point.
 */
var $ = require("jquery");
require("bootstrap"); // Empty require to enable bootstrap JS

var Form = require("./form");
var Converter = require("./converter");

$(function () {
  // Bind form and initialize UI state.
  var form = new Form({
    $input: $(".js-input"),
    $convertLabel: $(".js-convert-label"),
    $convertTypes: $(".js-convert")
  });

  // Bind converter and initialize.
  /*eslint-disable no-new*/
  new Converter({
    form: form,
    $output: $(".js-output"),
    $action: $(".js-action")
  });
  /*eslint-enable no-new*/
});
