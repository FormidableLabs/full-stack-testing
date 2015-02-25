/**
 * Types tests.
 *
 * These tests take the `client/types.js` class and test DOM interactions:
 *
 * - Setting the `.js-conver-label` label to indicate type of conversion.
 * - Listening on clicks on `.js-convert-types` DOM elements.
 * - Storing current select types state in `Types.prototype.getTypes()`
 *
 */
var $ = require("jquery");
var Types = require("client/types");

// Fixtures, variables.
// We take care to _declare_ these here, but only _initialize_ in setup.
var $fixture;
var types;

describe("client/types", function () {

  beforeEach(function () {
    // Create a new fixture and instance for each test that matches _real_
    // fixture. Usually you use the template library (e.g. Handlebars) to
    // bring in the real fixture rather than copying the essential parts here.
    $fixture = $(
      "<div>" +
      "  <span class='js-convert-label'>...</span>" +
      "  <ul class='dropdown-menu dropdown-menu-right' role='menu'>" +
      "    <li><a class='js-convert-types' data-convert='camel' href='#'>camel case</a></li>" +
      "    <li><a class='js-convert-types' data-convert='snake' href='#'>snake case</a></li>" +
      "    <li><a class='js-convert-types' data-convert='dash' href='#'>dasherized</a></li>" +
      "    <li class='divider'></li>" +
      "    <li><a class='js-convert-types' data-convert='camel,snake,dash' " +
      "           href='#'><b>all the things</b></a></li>" +
      "  </ul>" +
      "</div>"
    );

    types = new Types({
      $label: $fixture.find(".js-convert-label"),
      $types: $fixture.find(".js-convert-types")
    });
  });

  it("should start up and choose first type option", function () {
    expect($fixture.find(".js-convert-label")).to.have.$text("camel case");
    expect(types.getTypes()).to.deep.equal(["camel"]);
  });

  it("should return camel types on camel click", function () {
    $fixture.find(".js-convert-types[data-convert='camel']").click();
    expect($fixture.find(".js-convert-label")).to.have.$text("camel case");
    expect(types.getTypes()).to.deep.equal(["camel"]);
  });

  // --------------------------------------------------------------------------
  // WORKSHOP: IMPLEMENT_TESTS
  //
  // Use an appropriate jQuery selector to select the correct
  // `.js-convert-types` element by attribute (hint: look at the HTML), click
  // it and verify the public method `.getTypes()` returns the appropriate
  // array of types (a single element array of `"snake"` or `"dash"`).
  // --------------------------------------------------------------------------
  it("should return snake types on snake click");
  it("should return dash types on dash click");

  it("should return all types on 'all' click", function () {
    $fixture.find(".js-convert-types[data-convert='camel,snake,dash']").click();
    expect($fixture.find(".js-convert-label")).to.have.$text("all the things");
    expect(types.getTypes()).to.deep.equal(["camel", "snake", "dash"]);
  });

});
