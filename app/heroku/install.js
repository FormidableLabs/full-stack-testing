/**
 * Install Heroku.
 */
var fs = require("fs");
var path = require("path");
var root = path.resolve(__dirname, "../..");

// First test that we are "in" a Heroku dyno.
var isHeroku = !!process.env.DYNO;
if (!isHeroku) {
  throw new Error("Should only call in Heroku environment");
}

// Now write out a procfile.
fs.writeFileSync(path.join(root, "Procfile"), "web: node app/heroku/server.js");
