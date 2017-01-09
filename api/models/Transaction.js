/**
 * Transaction.js
 *
 * [MODEL]
 */

var Promise       = require("bluebird")
  , _             = require("underscore")
  , pg            = require("../adapters/db")
  , BaseModel     = require("./BaseModel");

var attributes = {
  id                : {value: "", type: "uuid", required: true},
  name              : {value: "", type: "string", required: true},
  operator_id       : {value: "", type: "string", required: true},
  player_id         : {value: "", type: "string", required: true},
  site_id           : {value: "", type: "string", required: true},
  bank_id           : {value: "", type: "uuid", required: true},
  reff              : {value: "", type: "string"},
  transfer          : {value: "", type: "number"},
  deposit           : {value: "", type: "number"},
  withdraw          : {value: "", type: "number"},
  bonus             : {value: "", type: "number"},
  transaction_notes : {value: "", type: "string"},
  transfer_notes    : {value: "", type: "string"},
  bonus_notes       : {value: "", type: "string"}
};

class Transaction extends BaseModel {
  constructor() {
    super();
    this.attributes = attributes;
    this.table = "transactions";
  }
}

module.exports = Transaction;
