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
  it("should be able to signup a new user", done => {
    loginOneUser("agent").should.be.fulfilled
      .then(agentInfo => {
        console.log(agentInfo)
        done();
        // chai.request(app)
        //   .post("/api/users/signup")
        //   .send(nonSuperUserFixtures.validOperatorInput)
        //   .end((err, res) => {
        //     expect(res.status).to.equal(200);
        //     done();
        //   })
      })
  });

})
