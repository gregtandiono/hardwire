/**
 * loginOneUser.js
 *
 * [TEST | HELPER]
 */

var chai           = require("chai")
 , assert         = chai.assert
 , expect         = chai.expect
 , should         = chai.should()
 , chaiAsPromised = require("chai-as-promised")
 , chaiHttp       = require("chai-http");

chai.use(chaiAsPromised);
chai.use(chaiHttp);

var app = require("../../server");

function loginOneUser() {
  return new Promise((resolve, reject) => {
    chai.request(app)
      .post("/api/users/auth")
      .send({
        username: "snafu01",
        password: "theLongestPasswordOnFuckingEarth"
      })
      .end((err, res) => {
        // at this point the response from the server should be a user_id and a token
        if (err) {
          console.log("failed to login user from helper");
          reject(err);
        }
        resolve(res.body);
      })
  })
}

module.exports = loginOneUser
