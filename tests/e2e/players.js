/**
 * players.js
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
  , playerFixtures = require("../fixtures/players")

describe("Players", () => {
  it("should allow operators to create players", done => {
    loginOneUser("operator").should.be.fulfilled
      .then(operatorInfo => {
        var operatorID = operatorInfo.data.user_id;
        var token = operatorInfo.data.token;
        chai.request(app)
          .post(`/api/players/`)
          .set("Authorization", token)
          .send(playerFixtures.validPlayerInput)
          .end((err, res) => {
            if (err) console.log(err)
            expect(res.status).to.equal(200);
            done();
          })
      })
  });
})
