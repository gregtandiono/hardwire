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
    this.table = "banks";
  }


  fetchAllRelatedToPlayer(playerID) {
    var self = this;
    return new Promise((resolve, reject) => {
      pg
        .select("*")
        .from(self.table)
        .where({ player_id: playerID })
        .orderBy("created_at", "desc")
        .then(rows => { resolve(rows) }) // should return an array of banks
        .catch(error => { reject(error) })
    })
  }

}

module.exports = Bank;
