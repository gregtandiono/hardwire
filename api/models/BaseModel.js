/**
 * BaseModel.js
 *
 * [MODEL]
 */

var Promise          = require("bluebird")
  , Immutable        = require("immutable")
  , _                = require("underscore")
  , pg               = require("../adapters/db")
  , validator        = require("../helpers/validator");

class BaseModel {
  constructor(attributes, table) {
    this.attributes = attributes;
    this.table = table;
  }

  fetchOne(recordID) {
    var self = this;
    return new Promise((resolve, reject) => {
      pg
        .select("*")
        .from(self.table)
        .where({
          id: recordID,
          deleted_at: null
        })
        .then(rows => { resolve(rows[0]) })
        .catch(err => { reject(`error while fetching one record from ${self.table} table \n ${err}`) })
    })
  }

  fetchAll() {
    var self = this;
    return new Promise((resolve, reject) => {
      pg
        .select("*")
        .from(self.table)
        .where({ deleted_at: null })
        .orderBy("created_at", "desc")
        .then(rows => { resolve(rows) })
        .catch(err => { reject(`error while trying to fetch all records from ${self.table} table \n ${err}`) })
    })
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

  fetchAllRelatedToOperator(operatorID) {
    var self = this;
    return new Promise((resolve, reject) => {
      pg
        .select("*")
        .from(self.table)
        .where({ operator_id: operatorID})
        .orderBy("created_at", "desc")
        .then(rows => { resolve(rows) }) // should return an array of banks
        .catch(error => { reject(error) })
    })
  }

  // @NOTE
  // Do we need server-side pagination?
  fetchChunk() {

  }

  create(data) {
    var self = this;
    return new Promise((resolve, reject) => {
      self._validate(data)
        .then(filteredData => {
          pg
            .returning("id")
            .insert(filteredData)
            .into(self.table)
            .then((recordID) => { resolve(recordID[0]) })
            .catch(err => { reject(err) })
        })
        .catch(validationErr => { reject(validationErr) });
    })
  }

  update(id, data) {
    var self = this;
    var newAttributes = _.pick(self.attributes, Object.keys(data));
    return new Promise((resolve, reject) => {
      self._validate(data, newAttributes)
        .then(filteredData => {
          pg(self.table)
            .where("id", id)
            .update(filteredData)
            .then(() => { resolve() })
            .catch(err => { reject(err) })
        })
        .catch(validationErr => { reject(validationErr) });
    })
  }


  // @NOTE
  // Soft deletes only
  destroy(id) {
    var self = this;
    return new Promise(function(resolve, reject) {
      pg(self.table)
        .where("id", id)
        .update({ deleted_at: new Date() })
        .then(() => { resolve() })
        .catch(err => { reject(err) })
    })
  }

  // @NOTE
  // Private methods below
  _mapper(data, optionalAttributes) { // @NOTE the optionalAttributes param is for update operations because most likely you will only need selective attributes
    var attributes = optionalAttributes ?
                 Immutable.fromJS(optionalAttributes) :
                 Immutable.fromJS(this.attributes);

    Object.keys(data).forEach(function(key) {
      attributes = attributes.updateIn([key, "value"], function(value) {
        return value = data[key];
      })
    })

    var result = attributes.toJSON();
    var finalCopy = {};

    Object.keys(result).forEach(function(field) {
      finalCopy[field] = result[field]
    })

    // returns a final copy of the immutable object as a JSON object
    return finalCopy;
  }

  _validate(data, optionalAttributes = null) { // @NOTE optionalAttributes here is needed because it wraps around the `_mapper` method
    var mappedResults = this._mapper(data, optionalAttributes);
    return validator(mappedResults); // this returns a promise
  }

  // @NOTE
  // this private method is an extent of ACL
  // and it should also be done on the client / operator side

  _permissionChecker(userID) { // should return a promise and resolves user type
    return new Promise((resolve, reject) => {
      pg
        .select("*")
        .from("users")
        .where("id", userID)
        .then(rows => {
          resolve(rows[0].type)
        })
        .catch(error => { reject(error) })
    })
  }
}

module.exports = BaseModel;
