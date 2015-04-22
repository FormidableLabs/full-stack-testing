/**
 * Express web server.
 */
var express = require("express");
var app = module.exports = express();
var converter = require("./converter");
var PORT = process.env.PORT || 3000;
var _serveRoot = false;

// Application REST endpoints.
app.get("/api/camel", function (req, res) {
  var from = req.query.from || "";
  res.json({ from: from, to: converter.camel(from) });
});
app.get("/api/snake", function (req, res) {
  var from = req.query.from || "";
  res.json({ from: from, to: converter.snake(from) });
});
app.get("/api/dash", function (req, res) {
  var from = req.query.from || "";
  res.json({ from: from, to: converter.dash(from) });
});

// Static libraries and application HTML page.
app.use("/app/js-dist", express.static("app/js-dist"));
app.use("/node_modules", express.static("node_modules"));

// Custom method: Add public root.
app.serveRoot = function () {
  if (!_serveRoot) {
    // Server static HTML page.
    app.use("/", express.static("app/public"));
    _serveRoot = true;
  }
  return app;
};

// Actually start server if script.
/* istanbul ignore next */
if (require.main === module) {
  // Serve root.
  app.serveRoot();

  // Start application.
  app.listen(PORT);
}
