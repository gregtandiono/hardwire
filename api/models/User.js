/**
 * User.js
 *
 * [MODEL]
 */

var Promise       = require("bluebird")
  , _             = require("underscore")
  , bcrypt        = require("bcryptjs")
  , jwt           = require("jsonwebtoken")
  , pg            = require("../adapters/db")
  , BaseModel     = require("./BaseModel")
  , secret        = require("../helpers/secret")
  , uuid          = require("node-uuid")
  , hash          = require("../helpers/hash");

/**
 * @NOTE
 * UUID is generated from the client-side
 * because we're going to allow cache or offline mode
 */

var attributes = {
  id       : {value: "", type: "uuid", required: true},
  name     : {value: "", type: "string", required: true},
  username : {value: "", type: "string", required: true},
  password : {value: "", type: "string", required: true},
  type     : {value: "", type: "string", required: true}
};

class User extends BaseModel {
  constructor() {
    super();
    this.attributes = attributes;
    this.table = "users";
  }

  signup(data, userID) {
    var self = this;
    return new Promise((resolve, reject) => {
      self._permissionChecker(userID)
        .then(userType => {
          console.log("USER TYPE", userType);
          if (userType == "admin" || userType == "agent") {
            
            self._validate(data)
              .then(filteredData => {
                filteredData.password = bcrypt.hashSync(filteredData.password, 10);
                self._lookup(filteredData.username)
                  .then(lookupResult => {
                    if (lookupResult.length == 0) {
                      self
                        .create(filteredData)
                        .then(() => { resolve() })
                        .catch(signupErr => { reject(signupErr) });
                    } else {
                      reject("this user already exists");
                    }
                  })
                  .catch(lookupErr => { reject(lookupErr) });
              })
              .catch(validationErr => { reject(validationErr) });

          } else {
            reject("user has no privilege to create users")
          }
        })
        .catch(permissionCheckerError => { reject(permissionCheckerError) })
    })
  }

  superUserSignup(data, secretHash) {
    var self = this;
    return new Promise((resolve, reject) => {
      if (secretHash !== hash) {
        reject("hash is incompatible, system might be compromised");
      }
      self._validate(data)
        .then(filteredData => {
          filteredData.password = bcrypt.hashSync(filteredData.password, 10);
          self._lookup(filteredData.username)
            .then(lookupResult => {
              if (lookupResult.length == 0) {
                self
                  .create(filteredData)
                  .then(() => { resolve() })
                  .catch(signupErr => { reject(signupErr) });
              } else {
                reject("this user already exists");
              }
            })
            .catch(lookupErr => { reject(lookupErr) });
        })
        .catch(validationErr => { reject(validationErr) });
    })
  }

  login(data) {
    var self = this;
    var loginAttributes = _.pick(this.attributes, Object.keys(data));
    return new Promise((resolve, reject) => {
      self._validate(data, loginAttributes)
        .then(filteredData => {
          self._lookup(filteredData.username)
            .then(lookupResult => {
              if (lookupResult.length == 1) {
                var hashFromDB = lookupResult[0].password;
                var userIDFromDB = lookupResult[0].id;

                if (bcrypt.compareSync(filteredData.password, hashFromDB)) {
                  self._registerShift(userIDFromDB)
                    .then(() => {
                      self._generateToken(lookupResult[0])
                        .then(result => { 
                          resolve(result) 
                        })
                        .catch(tokenGeneratorErr => { reject(tokenGeneratorErr) })
                    })
                    .catch(shiftRegistrationError => { reject(shiftRegistrationError) })

                } else {
                  reject("the username and password does not match");
                }

              } else {
                reject("the username and password does not match");
              }
            })
            .catch(lookupErr => { reject(lookupErr) });
        })
        .catch(validationErr => { reject(validationErr) });
    })
  }

  // @NOTE
  // private methods below
  _lookup(username) {
    var self = this;
    return new Promise((resolve, reject) => {
      pg
        .select("*")
        .from(self.table)
        .where({ username: username, deleted_at: null })
        .then(rows => { resolve(rows) })
        .catch(lookupErr => { reject(`Error during user lookup \n ${lookupErr}`) });
    })
  }

  _registerShift(userID) {
    var self = this;
    return new Promise((resolve, reject) => {
      if (!userID) reject("no operator ID found in the argument");
      pg
        .returning("id")
        .insert({ operator_id: userID, id: uuid.v4() })
        .into("shifts")
        .then(() => { resolve() })
        .catch(shiftRegistrationError => { reject(shiftRegistrationError) })
    })
  }

  // _endShift(userID) {
  //   var self = this;
  //   return new Promise((resolve, reject) => {
  //     if (!userID) reject("no operator ID found in the argument");
  //     pg
  //       .returning("id")
  //   })
  // }

  _generateToken(user) {
    var self = this;
    return new Promise((resolve, reject) => {
      if (!user) {
        reject("no user request found")
      }
      var expiresIn = 86400;
      var newToken = jwt.sign(user, secret, { expiresIn: expiresIn });
      var result = { user_id: user.id, token: newToken };
      resolve(result);
    })
  }
}

module.exports = User;
