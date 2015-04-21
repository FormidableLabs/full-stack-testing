/**
 * Test setup for server-side tests.
 */
var chai = require("chai");

// Add test lib globals.
global.expect = chai.expect;

// Set test environment
process.env.NODE_ENV = "func";
