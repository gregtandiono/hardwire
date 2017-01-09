/**
 * seed.js
 *
 * This is a seed script to populate the db with fake data
 * for unit and integration testing
 */

var Promise        = require("bluebird")
  , faker          = require("faker")
  , app            = require("../server")
  , pg             = require("../api/adapters/db")
  , chai           = require("chai")
  , assert         = chai.assert
  , expect         = chai.expect
  , should         = chai.should()
  , chaiAsPromised = require("chai-as-promised")
  , chaiHttp       = require("chai-http");

chai.use(chaiAsPromised);
chai.use(chaiHttp);

// Load models
var User         = require("../api/models/User");
var loginOneUser = require("./helpers/loginOneUser");

var tables = ["banks", "users", "players", "games", "sites", "transactions"];

var users = [
  {name: "kim soejipto", username: "snafu01", type: "agent", password: "theLongestPasswordOnFuckingEarth"},
  {name: "wahyu", username: "glasgow", type: "operator", password: "thisIsALong0Password"},
  {name: "gregory tandiono", username: "gregtandiono", type: "manager", password: "anotherLongPassw0rd"},
  {name: "aloenk", username: "al03nk", type: "admin", password: "thisPasswordShouldBeFuckingP0etry"}
];

var players = [];


// =============================
// TEARDOWN
// =============================

function tearDown() {
  return new Promise((resolve, reject) => {
    var bulkCreatePromise = [];
    tables.forEach(table => {
      console.log(`CLEARING ${table} TABLE`);
      bulkCreatePromise.push(pg(table).del());
    })

    resolve(Promise.all(bulkCreatePromise));
  })
}


// =============================
// SEED (WIP)
// =============================

function seedUser() {
  return new Promise((resolve, reject) => {
    var bulkCreatePromise = [];
    users.forEach(user => {
      var newUser = new User()
      bulkCreatePromise.push(
        newUser.signup(user)
      )
    })
    Promise.all(bulkCreatePromise)
       .then(() => {
         console.log(`Successfully seeded User table`);
         resolve();
       })
       .catch(err => {
         console.log(`Failed to seed User table`);
         reject(err);
       })
  })
}

tearDown()
  .then(() => {
    seedUser().then(() => {
      seedPosts().then(() => {
        console.log("Shutting seeding process down");
        process.exit()
      })
    })
  });
