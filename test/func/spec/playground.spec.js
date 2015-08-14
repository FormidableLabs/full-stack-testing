/**
 * Playground: Functional Tests.
 */
var app = require("../../../server");
var PORT = process.env.FUNC_PORT || 3003;
// var HOST = process.env.TEST_HOST || "http://127.0.0.1:" + PORT;

var rowdy = require("rowdy");
var adapter = new rowdy.adapters.mocha();

describe("YOUR_FUNCTIONAL_TEST_SUITE", function () {
  var client;
  var server;

  // Mocha
  this.timeout(10000);

  // Selenium (WD.js/Rowdy) initialization
  adapter.before();
  adapter.beforeEach();
  adapter.afterEach();
  adapter.after();

  before(function (done) {
    client = adapter.client;
    client
      .setImplicitWaitTimeout(200)
      .nodeify(done);
  });

  // Dev. Server
  before(function (done) {
    app.serveRoot();
    server = app.listen(PORT, done);
  });
  after(function (done) {
    if (!server) { return done(); }
    server.close(done);
  });

  it("YOUR_FUNCTIONAL_TEST", function () {
    // YOUR_CODE
  });

});
