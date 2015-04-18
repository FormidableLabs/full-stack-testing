var app = require("../../../server");
var PORT = process.env.FUNC_PORT || 3003;
var HOST = "http://127.0.0.1:" + PORT;

// WD helpers.
// https://github.com/admc/wd/blob/master/lib/special-keys.js
var ENTER_KEY = require("wd").SPECIAL_KEYS.Enter;

// Rowdy helpers and adapter.
var rowdy = require("rowdy");
var adapter = rowdy.adapters.mocha;

describe("func/application", function () {
  var client;
  var server;

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
    // The `adapter.before();` call has the side effect of instantiating a
    // Selenium / WD.js client that we can extract here.
    client = adapter.client;

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

    // TODO[RYAN]
    it("should display result for empty input");
  });

  describe("snake", function () {
    // TODO[RYAN]
  });

  describe("dash", function () {
    // TODO[RYAN]
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
        .waitForElementByCss(".js-convert-types[data-convert='camel,snake,dash']")
        .click()

        // Type a complex string.
        .waitForElementByCss(".js-input")
        .type(" all_the things!" + ENTER_KEY)

        // TODO[RYAN]
        // // Verify the conversion
        // .waitForElementByCss(".panel-body")
        // .text()
        // .then(function (text) {
        //   expect(text).to.equal("myNewStringRocks");
        // })

        // ... and we're done!
        .nodeify(done);
    });

    // TODO[RYAN]
  });

});
