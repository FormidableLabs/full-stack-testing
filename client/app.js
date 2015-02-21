/**
 * Client application entry point.
 */
var $ = require("jquery");
require("bootstrap"); // Empty require to enable bootstrap JS

$(function () {
  // TODO[RYAN]: Decompose into UI / functional components / files.

  // Stash selectors.
  var $input = $(".js-input");
  var $convert = $(".js-convert-label");

  // Set default conversion type.
  var convertType = "camel";

  // Update the conversion type and label.
  var _updateType = function ($el) {
    convertType = $el.data("convert");
    $convert.html($el.html());
  };

  // Start off with first conversion option as default.
  _updateType($(".js-convert").first());

  // Listen and update conversion type on clicks.
  $(".js-convert").click(function (ev) {
    ev.preventDefault();
    _updateType($(ev.currentTarget));
  });

  // Perform the actual conversion request and UI update.
  var _convertText = function () {
    var input = $input.val();
    /*eslint-disable no-console */
    console.log("TODO: ACTION", convertType, input);
    /*eslint-enable no-console */
  };

  // Listen and submit action.
  $(".js-action").click(_convertText);
  $input.keydown(function (ev) {
    if (ev.which === 13 /* Enter key */) {
      _convertText();
    }
  });
});
