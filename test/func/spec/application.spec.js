var app = require("../../../server");
var PORT = process.env.FUNC_PORT || 3003;

//
var rowdy = require("rowdy").adapters.mocha;

describe("func/application", function () {
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
  rowdy.before();
  rowdy.beforeEach();
  rowdy.afterEach();
  rowdy.after();

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
    server = app.listen(PORT, done);
  });

  after(function (done) {
    if (!server) { return done(); }
    server.close(done);
  });

  // --------------------------------------------------------------------------
  // Suites
  // --------------------------------------------------------------------------
  describe("all the things", function () {
    // TODO[RYAN]
    it("TODO");
  });

  describe("camel", function () {
    // TODO[RYAN]
  });

  describe("snake", function () {
    // TODO[RYAN]
  });

  describe("dash", function () {
    // TODO[RYAN]
  });

});
