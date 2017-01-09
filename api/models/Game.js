/**
 * Game.js
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
  balance        : {value: "", type: "number"},
  deposit        : {value: "", type: "number"},
  withdraw       : {value: "", type: "number"},
  bonus          : {value: "", type: "number"},
  cancel_bonus   : {value: "", type: "number"},
  notes          : {value: "", type: "string"},
};

class Game extends BaseModel {
  constructor() {
    super();
    this.attributes = attributes;
    this.table = "games";
  }
}

module.exports = Game;
