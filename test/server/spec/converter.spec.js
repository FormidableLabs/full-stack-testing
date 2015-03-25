var converter = require("../../../server/converter");

describe("spec/server/converter", function () {

  describe("camel", function () {
    var testFn = converter.camel;

    it("should handle base cases", function () {
      expect(testFn()).to.equal("");
      expect(testFn(null)).to.equal("");
      expect(testFn("")).to.equal("");
    });

    it("should convert snake case", function () {
      expect(testFn("hi-there")).to.equal("hiThere");
      expect(testFn("hi--there")).to.equal("hiThere");
      expect(testFn("hi-thereUp")).to.equal("hiThereUp");
      expect(testFn("hi-thereCAPS")).to.equal("hiThereCaps");
      // WORKSHOP: ... should think of more conversion cases here!
    });

    // ------------------------------------------------------------------------
    // WORKSHOP: IMPLEMENT_TESTS
    // ------------------------------------------------------------------------
    it("should not convert inapplicable strings");
    it("should leave unchanged camel case");
    it("should convert dash case");
    it("should convert mixed cases");
  });

  describe("snake", function () {
    // ------------------------------------------------------------------------
    // WORKSHOP: IMPLEMENT_TESTS
    // ------------------------------------------------------------------------
    it("should handle base cases");
    it("should not convert inapplicable strings");
    it("should leave unchanged snake case");
    it("should convert camel case");
    it("should convert dash case");
    it("should convert mixed cases");
  });

  describe("dash", function () {
    // ------------------------------------------------------------------------
    // WORKSHOP: IMPLEMENT_TESTS
    // ------------------------------------------------------------------------
    it("should handle base cases");
    it("should not convert inapplicable strings");
    it("should leave unchanged dash case");
    it("should convert snake case");
    it("should convert camel case");
    it("should convert mixed cases");
  });

});
