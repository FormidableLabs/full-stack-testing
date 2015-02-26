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

// Serve client-side tests.
app.use("/app/js-test", express.static("app/js-test"));
app.use("/test/client", express.static("test/client"));

// Serve docs as root.
// TODO: ADD DOCS w/ JADE.
app.get("/", function (req, res) {
  res.send("TODO: DOCS");
});

// Start server.
app.listen(PORT);
