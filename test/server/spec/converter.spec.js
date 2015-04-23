var converter = require("../../../server/converter");

describe("spec/server/converter", function () {

  describe("camel", function () {
    var camel = converter.camel;

    it("should handle base cases", function () {
      expect(camel()).to.equal("");
      expect(camel(null)).to.equal("");
      expect(camel("")).to.equal("");
    });

    it("should convert snake case", function () {
      expect(camel("hi_there")).to.equal("hiThere");
      expect(camel("hi__there")).to.equal("hiThere");
      expect(camel("hi_thereUp")).to.equal("hiThereUp");
      expect(camel("hi_thereCAPS")).to.equal("hiThereCaps");
      // WORKSHOP: ... should think of more conversion cases here!
    });

    // ------------------------------------------------------------------------
    // WORKSHOP: IMPLEMENT_TESTS
    // ------------------------------------------------------------------------
    it("should not convert inapplicable strings");
    it("should leave camel case unchanged");
    it("should convert dash case");
    it("should convert mixed cases");
  });

  describe("snake", function () {
    // ------------------------------------------------------------------------
    // WORKSHOP: IMPLEMENT_TESTS
    // ------------------------------------------------------------------------
    it("should handle base cases");
    it("should not convert inapplicable strings");
    it("should leave snake case unchanged");
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
    it("should leave dash case unchanged");
    it("should convert snake case");
    it("should convert camel case");
    it("should convert mixed cases");
  });

});
