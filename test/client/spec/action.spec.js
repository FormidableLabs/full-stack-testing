/**
 * Action tests.
 *
 * These tests take the `client/action.js` class and test DOM interactions.
 * To isolate the test, we fake `converter` and `types` objects. We spy/stub
 * (fake) out and verify only the **public** methods on both the objects:
 *
 * - `Converter.prototype.convert(VAL, TYPES)`
 * - `Types.prototype.getTypes()`
 *
 */
var $ = require("jquery");
var Action = require("client/action");

// Have to manually create keydown events.
// See: http://stackoverflow.com/a/832121/741892
/*eslint-disable new-cap*/
var KEYDOWN_ENTER_EVENT = $.Event("keydown");
KEYDOWN_ENTER_EVENT.which = 13; // Enter Key
var LETTER_A_EVENT = $.Event("keydown");
LETTER_A_EVENT.which = "A".charCodeAt(0); // Letter "A" Key
/*eslint-enable new-capw*/

// Fixtures, variables.
// We take care to _declare_ these here, but only _initialize_ in setup.
var $fixture;
var action;

describe("client/action", function () {

  beforeEach(function () {
    // Create a new fixture and instance for each test that matches _real_
    // fixture. Usually you use the template library (e.g. Handlebars) to
    // bring in the real fixture rather than copying the essential parts here.
    $fixture = $(
      "<div>" +
      "  <button type='button' class='js-submit'>Convert</button>" +
      "  <input type='text' class='js-input'>" +
      "</div>"
    );

    // Create action with object fakes with public method spies for other
    // dependencies.
    action = new Action({
      $submit: $fixture.find(".js-submit"),
      $input: $fixture.find(".js-input"),
      converter: { convert: sinon.spy() },          // Spy: no return.
      types: { getTypes: sinon.stub().returns([]) } // Stub: return value.
    });
  });

  it("does not call converter / types methods before actions", function () {
    expect(action.types.getTypes).to.not.be.called;
    expect(action.converter.convert).to.not.be.called;
  });

  it("does not call methods on typing without return / click", function () {
    // We're really checking that typing something _besides_ a return won't
    // trigger an action.
    action.$input.trigger(LETTER_A_EVENT);

    expect(action.types.getTypes).to.not.be.called;
    expect(action.converter.convert).to.not.be.called;
  });

  it("converts with empty form input on click", function () {
    action.$submit.click();

    expect(action.types.getTypes).to.be.calledOnce;
    expect(action.converter.convert)
      .to.be.calledOnce.and
      .to.be.calledWith("", []); // Empty value, stubbed empty types array.
  });

  it("converts with empty form input on enter key", function () {
    action.$input.trigger(KEYDOWN_ENTER_EVENT);

    expect(action.types.getTypes).to.be.calledOnce;
    expect(action.converter.convert)
      .to.be.calledOnce.and
      .to.be.calledWith("", []); // Empty value, stubbed empty types array.
  });

  // --------------------------------------------------------------------------
  // WORKSHOP: IMPLEMENT_TESTS
  //
  // Set a value on the `.js-input` element via jQuery and verify that the
  // conversion stubs are called with the correct values.
  // --------------------------------------------------------------------------
  it("converts with arbitrary form input on click");
  it("converts with different, arbitrary form input on enter key");

});
