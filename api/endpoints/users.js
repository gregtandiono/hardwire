/**
 * users.js
 *
 * [ENDPOINT]
 */

var express          = require("express")
  , _                = require("underscore")
  , Promise          = require("bluebird")
  , User             = require("../models/User")
  , Shift            = require("../models/Shift")
  , router           = express.Router()

router.post('/signup/:user_id', (req, res) => { // this is to create operators / managers
  const user = new User();
  var userID = req.params.user_id
  user.signup(req.body, userID)
    .then(results => { res.status(200).json({ data: results }) })
    .catch(err => { 
      res.status(400).json({ error: err }) 
    })
});

router.post('/auth', (req, res) => {
  console.log("it's in the request body", req.body);
  const user = new User();
  user.login(req.body)
    .then(results => { res.status(200).json({ data: results }) })
    .catch(err => { res.status(401).json({ error: err }) })
});

module.exports = router;
