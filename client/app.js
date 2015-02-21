/**
 * Client application entry point.
 */
var $ = require("jquery");
require("bootstrap"); // Empty require to enable bootstrap JS

$(function () {
  var $output = $("<code style='font-size: 2em' />")
  $output.text("TODO: Write an App!")
  $output.appendTo($("<div style='margin-top: 20px' />")
    .appendTo($(".container")));

  $(".js-convert").on("click", function (ev) {
    ev.preventDefault();
    var convertType = $(ev.currentTarget).data("convert");
    console.log("TODO HERE CONVERT TYPE", convertType);
  });
});
