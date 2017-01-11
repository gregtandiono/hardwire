/**
 * players.js
 *
 * [ENDPOINT]
 */

var express          = require("express")
  , _                = require("underscore")
  , Promise          = require("bluebird")
  , Player           = require("../models/Player")
  , Bank             = require("../models/Bank")
  , router           = express.Router()

router.post("/", (req, res) => {
  const player = new Player();
  const bank = new Bank();
  var playerReqBody = _.omit(req.body, "banks");
  var bankReqBody = _.pick(req.body, "banks");
  player
    .create(playerReqBody)
    .then(playerID => {
      // after creating the player
      // the promise should resolve the player_id to be injected to the
      // bank req body
      var filteredBankReqBody = _.extend({}, bankReqBody.banks, {
        player_id: playerID,
        operator_id: req.body.operator_id
      });

      bank
        .create(filteredBankReqBody)
        .then(results => { res.status(200).json({ data: results }) })
        .catch(err => { res.status(400).json({ error: err }) });
    })
    .catch(err => { res.status(400).json({ error: err }) })
});

router.get("/", (req, res) => {
  const player = new Player();
  player.fetchAll()
    .then(results => { res.json({ data: results }) })
    .catch(err => { res.status(400).json({ error: err }) })
});

router.get("/:id", (req, res) => {
  const player = new Player();
  const bank   = new Bank();
  player.fetchOne(req.params.id)
    .then(playerRecord => {
      // @TODO
      // must fetch all related bank accounts to this user?
      res.status(200).json({ data: playerRecord })
    })
    .catch(err => { res.status(400).json({ error: err }) })
});

router.put("/:id", (req, res) => {
  const player = new Player();
  player
    .update(req.params.id, req.body)
    .then((() => { res.status(200).json({ data: "record successfully updated" }) }))
    .catch(err => { res.status(400).json({ error: err }) });
});

router.delete("/:id", (req, res) => {
  const player = new Player();
  player
    .destroy(req.params.id)
    .then(() => res.status(200).json({ data: "record successfully deleted" }))
    .catch(err => res.status(400).json({ error: err }))
})

module.exports = router;
