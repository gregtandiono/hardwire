/**
 * Site.js
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
  url         : {value: "", type: "string", required: true},
  operator_id : {value: "", type: "string", required: true}
};

class Site extends BaseModel {
  constructor() {
    super();
    this.attributes = attributes;
    this.table = "sites";
  }
}

module.exports = Site;
