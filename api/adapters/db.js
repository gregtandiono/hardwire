/**
 * db.js
 * [ADAPTER]
 * knex db connector wrapper
 * returns an instance of a db made available accross the backend
 */

var env = "development";

if (process.env.NODE_ENV) {
  env = process.env.NODE_ENV;
  console.log("NODE_ENV: ", env)
}

var dbConfig = require("../../config/" + env + ".json");

// @NOTE
// I purposely put the ternary operators as value
// to minimize the stacktrace of errs if any
var knex = require("knex")({
  client: "pg",
  connection: {
    host: dbConfig.host ? dbConfig.host : "127.0.0.1",
    user: dbConfig.user ? dbConfig.user : "",
    password: dbConfig.password ? dbConfig.password : "",
    database: dbConfig.database ? dbConfig.database : ""
  }
});

module.exports = knex;
