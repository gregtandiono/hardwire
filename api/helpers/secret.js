/**
 * secret.js
 * [HELPER]
 * retrieves secret K/V from config file
 */

var env = "development";

if (process.env.NODE_ENV) {
  env = process.env.NODE_ENV;
  console.log("NODE_ENV: ", env)
}

var secret = require("../../config/" + env + ".json").secret;

module.exports = secret;
