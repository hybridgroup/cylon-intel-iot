"use strict";

var Cylon = require("cylon");

var Adaptor = lib("adaptor");

describe("Adaptor", function() {
  var adaptor = new Adaptor();

  it("is a Cylon adaptor", function() {
    expect(adaptor).to.be.an.instanceOf(Cylon.Adaptor);
  });

  it("needs tests");
});
