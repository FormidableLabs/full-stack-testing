/**
 * Client application entry point.
 */
var $ = require("jquery");
require("bootstrap"); // Empty require to enable bootstrap JS

var Form = require("./form");

$(function () {
  // Stash selectors.
  var $input = $(".js-input");
  var $output = $(".js-output");

  // Bind form and initialize UI state.
  var form = new Form({
    $input: $input,
    $convertLabel: $(".js-convert-label"),
    $convertTypes: $(".js-convert")
  });

  // Perform the actual conversion request and UI update.
  var _convertText = function () {
    var input = $input.val();

    // TODO[RYAN]: Switch to real UI.
    // TODO[RYAN]: Decompose better?
    var template = function (title, content) {
      return $(
        "<div class='panel panel-default'>" +
        "  <div class='panel-heading'>" +
        "    <h3 class='panel-title'>" + title + "</h3>" +
        "  </div>" +
        "  <div class='panel-body'>" + content + "</div>" +
        "</div>"
      );
    };

    $output.empty();

    // Iterate all conversion types, make AJAX request and update UI.
    $.each(form.convertTypes, function (i, type) {
      $.get("/api/" + type, { from: input }, function (data) {
        $output.append(template(type, data.to));
      });
    });
  };

  // Listen and submit action.
  $(".js-action").click(_convertText);
  $(".js-input").keydown(function (ev) {
    if (ev.which === 13 /* Enter key */) {
      _convertText();
    }
  });
});
