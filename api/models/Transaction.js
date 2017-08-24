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
  player_id         : {value: "", type: "uuid", required: true},
  site_id           : {value: "", type: "uuid", required: true},
  game_id           : {value: "", type: "uuid", required: true},
  bank_id           : {value: "", type: "uuid", required: true},
  shift_id          : {value: "", type: "uuid", required: true},
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

  // create method override

  create(data) {
    var self = this;
    return new Promise((resolve, reject) => {
      self._validate(data)
        .then(filteredData => {
          pg
            .returning("id")
            .insert(filteredData)
            .into(self.table)
            .then((recordID) => { 
              var gameID = filteredData.game_id;
              var bankID = filteredData.bank_id;
              var value = filteredData.withdraw ? filteredData.withdraw : filteredData.deposit;
              var transactionType = filteredData.withdraw ? "withdraw" : "deposit";
              self._updateSimulatedRecord(gameID, bankID, value, transactionType)
                .then(() => {
                  resolve(recordID[0]);
                })
                .catch(updateSimulatedRecordError => {
                  reject(updateSimulatedRecordError);
                })
            })
            .catch(err => { reject(err) })
        })
        .catch(validationErr => { reject(validationErr) });
    })
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
