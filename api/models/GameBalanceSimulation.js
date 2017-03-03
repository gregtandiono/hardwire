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

  _fetchRecord(gameID) {
    pg
      .select("*")
      .from(self.table)
      .where({
        game_id: gameID,
        deleted_at: null
      })
      .then(rows => { resolve(rows[0]) })
      .catch(err => { reject(`error while fetching one record from ${self.table} table \n ${err}`) })
  }
}

module.exports = GameBalanceSimulation;
