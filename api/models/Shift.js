/**
 * Shift.js
 *
 * [MODEL]
 */

var Promise       = require("bluebird")
  , _             = require("underscore")
  , pg            = require("../adapters/db")
  , BaseModel     = require("./BaseModel");

var attributes = {
  id               : {value: "", type: "uuid", required: true},
  operator_id      : {value: "", type: "uuid", required: true}
};

class Shift extends BaseModel {
  constructor() {
    super();
    this.attributes = attributes;
    this.table = "shifts";
  }
}

module.exports = Shift;

