/**
 * Test setup for client-side tests.
 */
var chai = require("chai");
var sinonChai = require("sinon-chai");
var chaiJq = require("chai-jq");

// --------------------------------------------------------------------------
// Chai / Sinon / Mocha configuration.
// --------------------------------------------------------------------------
// Exports
window.expect = chai.expect;

// Plugins
chai.use(sinonChai);
chai.use(chaiJq);

// Mocha (part of static include).
window.mocha.setup({
  ui: "bdd",
  bail: false
});

// --------------------------------------------------------------------------
// Bootstrap
// --------------------------------------------------------------------------
// Use webpack to infer and `require` tests automatically.
var testsReq = require.context(".", true, /\.spec.js$/);
testsReq.keys().map(testsReq);

// Only start mocha in browser.
if (!window.__karma__) {
  mocha.run();
}
