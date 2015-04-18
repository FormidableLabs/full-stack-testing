var app = require("../../../server");
var PORT = process.env.FUNC_PORT || 3003;
var HOST = "http://127.0.0.1:" + PORT;

// WD helpers.
// https://github.com/admc/wd/blob/master/lib/special-keys.js
var wd = require("wd");
var ENTER_KEY = wd.SPECIAL_KEYS.Enter;

// Rowdy helpers and adapter.
var rowdy = require("rowdy");
var adapter = rowdy.adapters.mocha;
var helpers = rowdy.helpers;

describe("func/application", function () {
  var client;
  var server;

  // --------------------------------------------------------------------------
  // Mocha
  // --------------------------------------------------------------------------
  // Set a Mocha global timeout of 10 seconds to allow for test wonkiness.
  this.timeout(10000);

  // --------------------------------------------------------------------------
  // Selenium (WD.js/Rowdy) initialization
  // --------------------------------------------------------------------------
  // We use WD.js to get a client to Selenium, and Rowdy to help configure our
  // client, start a local selenium server if specified and provide a Mocha
  // adater.
  //
  // For multi-file tests this setup should be extracted to a `base.spec.js`
  // file and executed **once** for the entire test suite.
  adapter.before();
  adapter.beforeEach();
  adapter.afterEach();
  adapter.after();

  before(function (done) {
    // The `adapter.before();` call has the side effect of instantiating a
    // Selenium / WD.js client that we can extract here.
    client = adapter.client;

    // Set a global Selenium timeout that is _before_ our test timeout.
    client
      .setImplicitWaitTimeout(200)
      .nodeify(done);
  });

  // --------------------------------------------------------------------------
  // Dev. Server
  // --------------------------------------------------------------------------
  // Start up (and later stop) a single instance of the server so that we can
  // interact with the web application via our tests.
  //
  // An alternative to this approach is to hit a live running staging or
  // production server for "smoke" tests.
  //
  // For multi-file tests this setup should be extracted to a `base.spec.js`
  // file and executed **once** for the entire test suite.
  before(function (done) {
    // Start the dev. server.
    server = app.listen(PORT, done);
  });

  after(function (done) {
    if (!server) { return done(); }
    server.close(done);
  });

  // --------------------------------------------------------------------------
  // Suites
  // --------------------------------------------------------------------------
  describe("camel", function () {
    it("should convert complex input w/ extra spaces + click", function (done) {
      client
        // Get the web application page.
        .get(HOST)

        // Check we start with empty text.
        // **Note**: _Could_ do this in all tests, but we'll just do it 1x here.
        .waitForElementByCss(".js-input")
        .text()
        .then(function (text) {
          expect(text).to.equal("");
        })

        // Type a complex string.
        .waitForElementByCss(".js-input")
        .type("  my   new-string_rocks")

        // Select the "Convert" button and click it.
        .waitForElementByCss(".js-submit")
        .click()

        // Verify the conversion
        .waitForElementByCss(".panel-body")
        .text()
        .then(function (text) {
          expect(text).to.equal("myNewStringRocks");
        })

        // ... and we're done!
        .nodeify(done);
    });

    // ------------------------------------------------------------------------
    // WORKSHOP: IMPLEMENT_TESTS
    // ------------------------------------------------------------------------
    it("should display result for empty input");
    it("should convert simple input 'hi there' to 'hiThere'");
  });

  describe("snake", function () {
    // ------------------------------------------------------------------------
    // WORKSHOP: IMPLEMENT_TESTS
    // ------------------------------------------------------------------------
    it("should display result for empty input");
    it("should convert simple input 'hi there' to 'hi_there'");
  });

  describe("dash", function () {
    // ------------------------------------------------------------------------
    // WORKSHOP: IMPLEMENT_TESTS
    // ------------------------------------------------------------------------
    it("should display result for empty input");
    it("should convert simple input 'hi there' to 'hi-there'");
  });

  describe("all the things", function () {
    it("should convert complex input w/ enter key", function (done) {
      client
        // Get the web application page.
        .get(HOST)

        // Click the conversion types drowpdown.
        .waitForElementByCss(".js-convert-label")
        .click()

        // Click the "all the things" option.
        .waitForElementByCss(
          ".js-convert-types[data-convert='camel,snake,dash']")
        .click()

        // Type a complex string and the "enter key" to invoke a conversion.
        .waitForElementByCss(".js-input")
        .type(" all_the things!" + ENTER_KEY)

        // Get all of the result panels using JavaScript!
        .safeEval(helpers.js.fn(function () {
          /*global $*/
          // This is a **client-side** JavaScript function, returning values
          // from the web application page.
          //
          // Here, we're going to extract the three values from converting to
          // all the different types.
          return $(".panel-body").map(function () {
            return $(this).text();
          });
        }))
        .then(function (values) {
          // Here's a tricky part -- our conversion results can come back in
          // any order. So, we either have to sort on the array, or check that
          // the array contains values in any position.
          expect(values)
            .to.have.length(3).and
            .to.contain("allTheThings!").and
            .to.contain("all-the-things!").and
            .to.contain("all_the_things!");
        })

        // ... and we're done!
        .nodeify(done);
    });

    // ------------------------------------------------------------------------
    // WORKSHOP: IMPLEMENT_TESTS
    // ------------------------------------------------------------------------
    it("should display three empty results for empty input");
    it("should convert simple input 'hi there' using a click on 'Convert'");
  });

});
