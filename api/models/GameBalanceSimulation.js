/**
 * GameBalanceSimulation.js
 *
 * [MODEL]
 */

var Promise       = require("bluebird")
  , _             = require("underscore")
  , pg            = require("../adapters/db")
  , BaseModel     = require("./BaseModel");

var attributes = {
  id                : {value: "", type: "uuid", required: true},
  shift_id          : {value: "", type: "uuid", required: true},
  game_id           : {value: "", type: "uuid", required: true},
  value             : {value: "", type: "number", required: true}
};

class GameBalanceSimulation extends BaseModel {
  constructor() {
    super();
    this.attributes = attributes;
    this.table = "game_balance_simulation";
  }
}

module.exports = GameBalanceSimulation;
