/**
 * auth.js
 * [MIDDLEWARE]
 *
 * middleware to protect routes and always check the token
 * from the request header
 */

var router           = require("express").Router()
  , jwt              = require("jsonwebtoken")
  , secret           = require("../helpers/secret")

router.use((req, res, next) => {

  var token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).json({error: "invalid token"})
      } else {
        req.user = decoded;
        next();
      }
    })
  } else {
    res.status(400).json({error: "no token found"})
  }
})

module.exports = router;
