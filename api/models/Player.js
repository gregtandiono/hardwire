/**
 * Player.js
 *
 * [MODEL]
 */

var Promise       = require("bluebird")
  , _             = require("underscore")
  , pg            = require("../adapters/db")
  , BaseModel     = require("./BaseModel");

var attributes = {
  id          : {value: "", type: "uuid", required: true},
  name        : {value: "", type: "string", required: true},
  shift_id    : {value: "", type: "uuid", required: true},
  cellphone   : {value: "", type: "string"},
  ym          : {value: "", type: "string"},
  email       : {value: "", type: "email"},
  notes       : {value: "", type: "string"},
  operator_id : {value: "", type: "UUID", required: true},
};

class Player extends BaseModel {
  constructor() {
    super();
    this.attributes = attributes;
    this.table = "players";
  }
}

module.exports = Player;
