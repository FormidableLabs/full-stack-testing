/**
 * Demo / live web server.
 *
 * This server showcases tests and documentation along with the webapp
 * and is _not_ what we are creating for the workshop.
 */
var express = require("express");
var app = require("../../server");
var PORT = process.env.PORT || 3000;

// Serve the application.
app.use("/app/", express.static("app/public"));
app.use("/public/", express.static("app/doc/public"));

// Serve client-side tests.
app.use("/app/js-test", express.static("app/js-test"));
app.use("/test/client", express.static("test/client"));

// Marked options.
require("marked").setOptions({
  gfm: true,
  tables: true,
  highlight: function (code, lang) {
    if (!lang || lang === "text") { return code; } // No highlight.
    return require("highlight.js").highlightAuto(code).value;
  }
});

// Serve docs as root.
app.set("view engine", "jade");
app.set("views", "app/doc");
app.get("/", function (req, res) {
  res.render("index");
});

// Start server.
app.listen(PORT);
