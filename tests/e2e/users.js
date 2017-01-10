/**
 * users.js
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

var app                  = require("../../server")
  , loginOneUser         = require("../helpers/loginOneUser")
  , nonSuperUserFixtures = require("../fixtures/non-super-users")


describe("Users", () => {
  it("should allow an agent to be able to create an operator", done => {
    loginOneUser("agent").should.be.fulfilled
      .then(agentInfo => {
        var agentID = agentInfo.data.user_id;
        var token = agentInfo.data.token;
        chai.request(app)
          .post(`/api/users/signup/${agentID}`)
          .set("Authorization", token)
          .send(nonSuperUserFixtures.validOperatorInput)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          })
      })
  });

  it("should allow an agent to be able to create a manager", done => {
    loginOneUser("agent").should.be.fulfilled
      .then(agentInfo => {
        var agentID = agentInfo.data.user_id;
        var token = agentInfo.data.token;
        chai.request(app)
          .post(`/api/users/signup/${agentID}`)
          .set("Authorization", token)
          .send(nonSuperUserFixtures.validManagerInput)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          })
      })
  });

  it("should not allow operators to create users", done => {
    loginOneUser("operator").should.be.fulfilled
      .then(operatorInfo => {
        var agentID = operatorInfo.data.user_id;
        var token = operatorInfo.data.token;
        chai.request(app)
          .post(`/api/users/signup/${agentID}`)
          .set("Authorization", token)
          .send(nonSuperUserFixtures.validOperatorInput)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.include.keys("error");
            expect(res.body.error).to.equal("user has no privilege to create users");
            done();
          })
      })
  });

})
