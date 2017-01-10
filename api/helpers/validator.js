/**
 * validator.js
 * [HELPER]
 */

var validator = require("validator");

function validationResponseTemplate(isValid, message = "") {
  return {
    isValid, message
  }
}

function ruleIterator(key, type, value, required) {

  if (required && validator.isEmpty(value)) {
    return validationResponseTemplate(false, `${key} is a required field`);
  } else {
    switch (type) {
      case "required":
        return !validator.isEmpty(value) ?
        validationResponseTemplate(true) :
        validationResponseTemplate(false, `${key} cannot be empty`);
      case "email":
        return validator.isEmail(value) ?
        validationResponseTemplate(true) :
        validationResponseTemplate(false, `${value} is not a valid email`);
      case "number":
        return validator.isDate(value) ?
        validationResponseTemplate(true) :
        validationResponseTemplate(false, `${value} is not a valid date`);
      case "uuid":
        return validator.isUUID(value) ?
        validationResponseTemplate(true) :
        validationResponseTemplate(false, `${value} is not a valid uuid`);
      case "bool":
        return validator.isBoolean(value) ?
        validationResponseTemplate(true) :
        validationResponseTemplate(false, `${value} is not a valid boolean type`);
      default:
        return validationResponseTemplate(true) // for string
    }
  }
}


function validationHelper(data) { // data is an object
  return new Promise(function(resolve, reject) {
    var validatedObj = {}

    var errors = [];

    Object.keys(data).forEach(function(key) {
      var checker = ruleIterator(key, data[key].type, data[key].value, data[key].required);
      if (checker.isValid) {
        validatedObj[key] = data[key].value;
      } else {
        errors.push(checker.message);
      }
    })

    if (errors.length > 0) {
      reject(errors);
    } else {
      resolve(validatedObj);
    }
  })

}

module.exports = validationHelper;
