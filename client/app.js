/**
 * Client application entry point.
 */
var $ = require("jquery");
require("bootstrap"); // Empty require to enable bootstrap JS

$(function () {
  $("<code style='font-size: 2em' />")
    .text("TODO: Write an App!")
    .appendTo($("<div style='margin-top: 20px' />").appendTo($(".container")));
});
