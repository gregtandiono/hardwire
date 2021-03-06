/**
 * transactions.js
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

describe("Transactions", () => {
  it("should allow a user to create a transaction");
  it("should not allow anyone to delete a transaction");
})

