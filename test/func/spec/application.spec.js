var app = require("../../../server");
var PORT = process.env.FUNC_PORT || 3003;
var server;

describe("func/application", function () {

  // Start up (and later stop) a single instance of the server so that we can
  // interact with the web application via our tests.
  // *Note*: Often you will need to reset data / server state to a known
  // starting point in `beforeEach`/`afterEach` methods.
  before(function (done) {
    server = app.listen(PORT, done);
  });

  after(function (done) {
    if (!server) { done(); }
    server.close(done);
  });

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
