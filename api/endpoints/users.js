/**
 * users.js
 *
 * [ENDPOINT]
 */

var express          = require("express")
  , _                = require("underscore")
  , Promise          = require("bluebird")
  , User             = require("../models/User")
  , router           = express.Router()

router.post('/signup', (req, res) => {
  const user = new User();
  user.signup(req.body)
    .then(results => { res.json({ data: results }) })
    .catch(err => { res.status(400).json({ error: err }) })
});

router.post('/auth', (req, res) => {
  const user = new User();
  user.login(req.body)
    .then(results => { res.json({ data: results }) })
    .catch(err => { res.status(401).json({ error: err }) })
});

module.exports = router;
