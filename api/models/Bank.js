/**
 * Bank.js
 *
 * [MODEL]
 */

var Promise       = require("bluebird")
  , _             = require("underscore")
  , pg            = require("../adapters/db")
  , BaseModel     = require("./BaseModel");

var attributes = {
  id             : {value: "", type: "uuid", required: true},
  name           : {value: "", type: "string", required: true},
  player_id      : {value: "", type: "uuid", required: true},
  operator_id    : {value: "", type: "uuid", required: true},
  other_name     : {value: "", type: "string"},
  account_holder : {value: "", type: "string", required: true},
  account_number : {value: "", type: "string", required: true},
  username       : {value: "", type: "string", required: true},
  password       : {value: "", type: "string", required: true},
};

class Bank extends BaseModel {
  constructor() {
    super();
    this.attributes = attributes;
    this.table = "players";
  }
}

module.exports = Bank;
