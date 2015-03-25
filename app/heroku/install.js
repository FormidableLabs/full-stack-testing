/**
 * Install Heroku.
 */
// HACKAGE: Before _first require_, we add global modules in path (for `npm`
// programmatic access).
var delim = process.platform.indexOf("win") === 0 ? ";" : ":";
var globalMods = process.execPath + "/../../lib/node_modules";
process.env.NODE_PATH = (process.env.NODE_PATH || "")
  .split(delim)
  .filter(function (x) { return x; })
  .concat([globalMods])
  .join(delim);

// Manually initialize paths.
require("module").Module._initPaths();

// Normal requires
var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var root = path.resolve(__dirname, "../..");

// First test that we are "in" a Heroku dyno.
var isHeroku = !!process.env.DYNO;
if (!isHeroku) {
  throw new Error("Should only call in Heroku environment");
}

// Write out a procfile.
fs.writeFileSync(path.join(root, "Procfile"), "web: node app/heroku/cluster.js");

// NPM install certain dev. dependencies for Heroku usage.
var npm = require("npm");
var pkg = require("../../package.json");
var herokuDeps = _.chain(pkg.devDependencies)
  .pick([
    "chai",
    "chai-jq",
    "jade",
    "marked",
    "mocha",
    "recluster",
    "sinon",
    "sinon-chai"
  ])
  .map(function (v, k) { return [k, v].join("@"); })
  .value();

// Install.
npm.load(function (loadErr) {
  if (loadErr) { throw loadErr; }
  npm.commands.install(herokuDeps, function (installErr) {
    if (installErr) { throw installErr; }
  });
  npm.on("log", function (msg) {
    console.log(msg);
  });
});
