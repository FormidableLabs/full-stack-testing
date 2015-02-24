/**
 * Converter tests.
 *
 * These tests take the `client/converter.js` class and test that calls to
 * `Converter.convert(TEXT, TYPES)` will:
 *
 * - Call the backend REST API (which we fake respond to with Sinon.JS).
 * - Update the UI output DOM element with results.
 *
 * These tests do _not_ test things like:
 *
 * - Attach DOM fixtures to the actual test page (ours are disconnected).
 * - Actual DOM listeners / bindings / inputs going _to_ the Converter.
 * - Actual REST responses (we have a canned response for everything).
 */
var $ = require("jquery");
var Converter = require("client/converter");

// Fixtures, variables.
// We take care to _declare_ these here, but only _initialize_ in setup.
var server;
var $fixture;
var converter;

describe("client/converter", function () {

  beforeEach(function () {
    // Create a fake server to intercept AJAX.
    server = sinon.fakeServer.create();
    server.respondWith("GET", /\/api\/(camel|snake|dash)/, [
      200,
      { "Content-Type": "application/json" },
      JSON.stringify({ from: "foo", to: "bar" })
    ]);

    // Create a new fixture and instance for each test.
    $fixture = $("<div />");
    converter = new Converter({
      $output: $fixture
    });
  });

  afterEach(function () {
    // Restore fake server.
    server.restore();
  });

  it("should start with no results", function () {
    expect($fixture.find(".panel")).to.have.length(0);
  });

  it("should camel convert", function () {
    // Call conversion, then have fake server respond.
    converter.convert("basic-text", ["camel"]);
    server.respond();

    // Verify the resulting outputs. Normally this would be asynchronous,
    // but the fake server responds synchronously.
    expect($fixture.find(".panel")).to.have.length(1);
    expect($fixture.find(".panel-title")).to.have.$text("camel");
    expect($fixture.find(".panel-body")).to.have.$text("bar");
  });

  // --------------------------------------------------------------------------
  // WORKSHOP: IMPLEMENT_TESTS
  //
  // Call the conversion utility for `snake` and `dash` and use the fake server
  // to inject responses and verify UI updates appropriately.
  // --------------------------------------------------------------------------
  it("should snake convert");
  it("should dash convert");

  it("should convert all types", function () {
    converter.convert("basic-text", ["camel", "snake", "dash"]);

    // Respond (in order) to all pending requests.
    // Usually, the responses could return in any order, but the fake server
    // will respond in real order of request.
    server.respond();

    expect($fixture.find(".panel")).to.have.length(3);

    expect($fixture.find(".panel-title").eq(0)).to.have.$text("camel");
    expect($fixture.find(".panel-body").eq(0)).to.have.$text("bar");

    expect($fixture.find(".panel-title").eq(1)).to.have.$text("snake");
    expect($fixture.find(".panel-body").eq(1)).to.have.$text("bar");

    expect($fixture.find(".panel-title").eq(2)).to.have.$text("dash");
    expect($fixture.find(".panel-body").eq(2)).to.have.$text("bar");
  });

});
