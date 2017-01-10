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

var app          = requireLocal("server")
  , userFixtures = require("../fixtures/user")
  , loginOneUser = require("../helpers/loginOneUser");

describe("Users", () => {
  it("should be able to signup a new user", done => {
    chai.request(app)
      .post("/api/users/signup")
      .send(userFixtures.validSignupData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      })
  });

  it("should be able to login existing users", done => {
    chai.request(app)
      .post("/api/users/auth")
      .send(userFixtures.validLoginData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include.keys("user_id", "token");
        done();
      })
  });

  it("should not allow signup for existing users measured by username", done => {
    chai.request(app)
      .post("/api/users/signup")
      .send(userFixtures.validSignupData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.include.keys("error");
        done();
      })
  });

  it("should be able to fetch current user info", done => {
    loginOneUser().should.be.fulfilled
      .then(loginResponse => {
        var token = loginResponse.data.token;
        var userID = loginResponse.data.user_id;
        chai.request(app)
          .get(`/api/me/${userID}`)
          .set("Authorization", token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.data).to.include.keys("name", "username");
            expect(res.body.data.name).to.equal("Sam Sepiol");
            expect(res.body.data.username).to.equal("samsepiol");
            done();
          })
      })
  })

})
