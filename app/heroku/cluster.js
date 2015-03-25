/**
 * Clustered server.
 *
 * See: https://github.com/doxout/recluster
 */
var path = require("path");
var recluster = require("recluster");
var cluster = recluster(path.join(__dirname, "server.js"));

// Log worker deaths.
cluster.on("exit", function (worker) {
  console.log("Worker " + worker.id + " died.");
});

// Set up reload.
process.on("SIGUSR2", function () {
  console.log("Got SIGUSR2, reloading cluster...");
  cluster.reload();
});

// Start and warn log (so we can grep on starts).
// Reload with `$ kill -s SIGUSR2 PID` (like the message says).
console.log("Spawned cluster, kill -s SIGUSR2 " + process.pid + " to reload");
cluster.run();
