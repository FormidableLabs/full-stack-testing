var converter = require("../../../server/converter");

describe("server/converter", function () {

  describe("camel", function () {
    it("should handle base cases");
    it("should not convert inapplicable strings");
    it("should leave unchanged camel case");
    it("should convert snake case");
    it("should convert dash case");
    it("should convert mixed cases");
  });

  describe("snake", function () {
    it("should handle base cases");
    it("should not convert inapplicable strings");
    it("should leave unchanged snake case");
    it("should convert camel case");
    it("should convert dash case");
    it("should convert mixed cases");
  });

  describe("dash", function () {
    it("should handle base cases");
    it("should not convert inapplicable strings");
    it("should leave unchanged dash case");
    it("should convert snake case");
    it("should convert camel case");
    it("should convert mixed cases");
  });

});
