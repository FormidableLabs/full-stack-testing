/**
 * Playground: Server REST Tests.
 */
var app = require("../../../server");
var PORT = process.env.TEST_PORT || 3002;

describe("YOUR_SERVER_REST_TEST_SUITE", function () {
  var server;

  before(function (done) {
    server = app.listen(PORT, done);
  });
  after(function (done) {
    if (!server) { return done(); }
    server.close(done);
  });

  it("YOUR_SERVER_REST_TEST", function () {
    // YOUR_CODE
  });

});
