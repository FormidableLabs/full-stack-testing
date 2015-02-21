/**
 * Client application entry point.
 */
var $ = require("jquery");
require("bootstrap"); // Empty require to enable bootstrap JS

$(function () {
  // TODO[RYAN]: Decompose into UI / functional components / files.

  // Stash selectors.
  var $input = $(".js-input");
  var $convertLabel = $(".js-convert-label");
  var $convertTypes = $(".js-convert");

  // Set default conversion types.
  var convertTypes = ["camel"];

  // Update the conversion type and label.
  var _updateType = function ($el) {
    convertTypes = $el.data("convert").split(",");
    $convertLabel.html($el.html());
  };

  // Start off with first conversion option as default.
  _updateType($convertTypes.first());

  // Listen and update conversion type on clicks.
  $convertTypes.click(function (ev) {
    ev.preventDefault();
    _updateType($(ev.currentTarget));
  });

  // Perform the actual conversion request and UI update.
  var _convertText = function () {
    var input = $input.val();
    /*eslint-disable no-console */
    console.log("TODO: ACTION", convertTypes, input);
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
