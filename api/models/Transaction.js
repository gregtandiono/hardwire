/**
 * Transaction.js
 *
 * [MODEL]
 */

var Promise               = require("bluebird")
  , _                     = require("underscore")
  , pg                    = require("../adapters/db")
  , BaseModel             = require("./BaseModel")
  , BankBalanceSimulation = require("./BankBalanceSimulation")
  , GameBalanceSimulation = require("./GameBalanceSimulation");

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

  _updateSimulatedRecord(bankID, gameID, value, type) {
    var self = this;
    var bankBalanceSimulation = new BankBalanceSimulation();
    var gameBalanceSimulation = new GameBalanceSimulation();

    return new Promise((resolve, reject) => {
      bankBalanceSimulation._fetchRecord(bankID)
        .catch(bankBalanceSimulationError => {
          reject(bankBalanceSimulationError);
        })
        .then(record => {
          var adjustedValue = null;
          if (type == "withdraw") {
            adjustedValue = record.value - value;
          } else {
            adjustedValue = record.value + value;
          }
          var adjustedRecord = _.extend({}, record, {
            value: adjustedValue
          })
          return bankBalanceSimulation.update(record.id, adjustedRecord)
        })
        .then(() => {
          gameBalanceSimulation._fetchRecord(gameID)
            .then(record => {
              var adjustedValue = null;
              if (type == "withdraw") {
                adjustedValue = record.value + value;
              } else {
                adjustedValue = record.value - value;
              }
              var adjustedRecord = _.extend({}, record, {
                value: adjustedValue
              })
              return gameBalanceSimulation.update(record.id, adjustedRecord)
            })
            .then(() => {
              resolve("game and bank simulation updated");
            })
            .catch(err => {
              reject(err);
            })
        })
        .catch(err => {
          reject(err);
        })
    });

  }
}

module.exports = Transaction;
