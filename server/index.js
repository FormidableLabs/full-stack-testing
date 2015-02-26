/**
 * Express web server.
 */
var express = require("express");
var app = express();
var converter = require("./converter");
var PORT = process.env.PORT || 3000;

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
app.use("/", express.static("app/public"));
app.use("/app/js-dist", express.static("app/js-dist"));
app.use("/node_modules", express.static("node_modules"));

// Learning: Also serve the test bundle and tests.
// **Note**: This would _not_ be done in a real production app.
app.use("/app/js-test", express.static("app/js-test"));
app.use("/test/client", express.static("test/client"));

// Start application.
app.listen(PORT);
