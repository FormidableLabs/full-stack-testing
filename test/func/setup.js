/**
 * Test setup for server-side tests.
 */
var chai = require("chai");

// Add test lib globals.
global.expect = chai.expect;

// Configure Rowdy.
var rowdy = require("rowdy");
// Recommendation is to actually customize your configuration by copying and
// editing the example Rowdy config to `test/func/config.js`.
var config = require("rowdy/examples/mocha/config");
rowdy(config);

// Set test environment
process.env.NODE_ENV = "func";
