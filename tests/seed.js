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

// LOAD FIXTURES
var setUserFixtures = require("./fixtures/users");

// Load models
var User         = require("../api/models/User");
var loginOneUser = require("./helpers/loginOneUser");

var tables = [
  "banks", 
  "players", 
  "users", 
  "games", 
  "sites", 
  "transactions", 
  "shifts", 
  "bank_balance_simulation",
  "game_balance_simulation"
];


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
    setUserFixtures.forEach(user => {
      var newUser = new User()
      bulkCreatePromise.push(
        newUser.superUserSignup(user, "3adc0f1179ef32678f9d22219298c2b1")
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

function seedGames() {
    
}

function seedSites() {

}

function seedBankSimulation() {

}

function seedGameSimulation() {

}


/**
 * @TODO
 * Seeding has to POST to endpoints from now on
 * we won't be using models to enter data anymore, except for users
 * 
 * - [ ] seed game
 * - [ ] seed sites
 * - [ ] seed banks
 */

tearDown()
  .then(() => {
    seedUser().then(() => {
      console.log("Shutting seeding process down");
      process.exit()
    })
  });
