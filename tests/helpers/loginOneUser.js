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
var userFixtures = require("../fixtures/users");

var admin = userFixtures[3];
var agent = userFixtures[0];
var manager = userFixtures[2];
var operator = userFixtures[1];

var loginEndpoint = "/api/login";

function loginOneUser(userType) {
  return new Promise((resolve, reject) => {
    switch (userType) {
      case "admin":
        chai.request(app)
          .post(loginEndpoint)
          .send({
            username: admin.username,
            password: admin.password
          })
          .end((err, res) => {
            // at this point the response from the server should be a user_id and a token
            if (err) {
              console.log("failed to login user from helper");
              reject(err);
            }
            resolve(res.body);
          })
      break;
      case "agent":
        chai.request(app)
          .post(loginEndpoint)
          .send({
            username: agent.username,
            password: agent.password
          })
          .end((err, res) => {
            // at this point the response from the server should be a user_id and a token
            if (err) {
              console.log("failed to login user from helper");
              reject(err);
            }
            resolve(res.body);
          })
      break;
      case "manager":
        chai.request(app)
          .post(loginEndpoint)
          .send({
            username: manager.username,
            password: manager.password
          })
          .end((err, res) => {
            // at this point the response from the server should be a user_id and a token
            if (err) {
              console.log("failed to login user from helper");
              reject(err);
            }
            resolve(res.body);
          })
      break;
      case "operator":
        chai.request(app)
          .post(loginEndpoint)
          .send({
            username: operator.username,
            password: operator.password
          })
          .end((err, res) => {
            // at this point the response from the server should be a user_id and a token
            if (err) {
              console.log("failed to login user from helper");
              reject(err);
            }
            resolve(res.body);
          })
      break;
      default:
      // no op
    }
  })
}
module.exports = loginOneUser
