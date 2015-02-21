/**
 * Express web server.
 */
var express = require("express");
var app = express();
var converter = require("./converter");
var PORT = process.env.PORT || 3000;

// Static libraries and application HTML page.
app.use("/app/js-dist", express.static("app/js-dist"));
app.use("/node_modules", express.static("node_modules"));
app.use("/", express.static("app/public"));

// Application REST endpoints.
app.use(require("body-parser").json());
app.get("/api/camel", function (req, res) {
  var from = req.body.from || "";
  res.json({ from: from, to: converter.camel(from) });
});
app.get("/api/snake", function (req, res) {
  var from = req.body.from || "";
  res.json({ from: from, to: converter.snake(from) });
});
app.get("/api/dash", function (req, res) {
  var from = req.body.from || "";
  res.json({ from: from, to: converter.dash(from) });
});

// Start application.
app.listen(PORT);
