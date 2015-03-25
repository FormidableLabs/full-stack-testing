/**
 * Demo / live web server.
 *
 * This server showcases tests and documentation along with the webapp
 * and is _not_ what we are creating for the workshop.
 */
var express = require("express");
var app = require("../../server");
var PORT = process.env.PORT || 3000;
var pkg = require("../../package.json");

var marked = require("marked");
var renderer = new marked.Renderer();

// Serve the application.
app.use("/app/", express.static("app/public"));
app.use("/public/", express.static("app/doc/public"));

// Serve client-side tests.
app.use("/app/js-test", express.static("app/js-test"));
app.use("/test/client", express.static("test/client"));

// Marked options and custom rendering.
// Skip intro heading.
renderer.heading = function (text, level) {
  if (text === "Full. Stack. Testing." && level === 2) { return ""; }
  return marked.Renderer.prototype.heading.apply(this, arguments);
};

// Convert `.md` internal links to full links via a map.
var linkMap = {
  "./INSTALL.md": "#installation"
};
renderer.link = function (href, title, text) {
  href = linkMap[href] || href;
  return marked.Renderer.prototype.link.apply(this, [href, title, text]);
};

marked.setOptions({
  gfm: true,
  tables: true,
  renderer: renderer
});

// Serve docs as root.
app.set("view engine", "jade");
app.set("views", "app/doc");
app.get("/", function (req, res) {
  res.render("index", {
    // Pass in dependencies so we can use same version for CDN references.
    deps: pkg.dependencies
  });
});

// Start server.
app.listen(PORT);
