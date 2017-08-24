/**
 * game-balance-simulation.js
 *
 * [END-TO-END TEST]
 */

var chai          = require("chai")
 , assert         = chai.assert
 , expect         = chai.expect
 , should         = chai.should()
 , chaiAsPromised = require("chai-as-promised")
 , chaiHttp       = require("chai-http");

chai.use(chaiAsPromised);
chai.use(chaiHttp);

var app            = require("../../server")
  , loginOneUser   = require("../helpers/loginOneUser")

describe("Game Balance Simulation", () => {
    it("should not allow operators to create a game balance simulation");
    it("should allow managers to create a game balance simulation");
    it("should update game balance whenever there is a transaction");
})



