/**
 * banks.js
 *
 * [ENDPOINT]
 */

var express          = require("express")
  , _                = require("underscore")
  , Promise          = require("bluebird")
  , Bank             = require("../models/Bank")
  , router           = express.Router()

router.post("/", (req, res) => {
  const bank = new Bank();
  bank
    .create(req.body)
    .then(results => { res.status(200).json({ data: results }) })
    .catch(error => { res.status(400).json({ error }) })
});

router.get("/", (req, res) => {
  const bank = new Bank();
  bank.fetchAllRelatedToPlayer(req.body.player_id)
    .then(results => { res.status(200).json({ data: results }) })
    .catch(err => { res.status(400).json({ error: err }) })
});

router.get("/:id", (req, res) => {
  const bank   = new Bank();
  bank.fetchOne(req.params.id)
    .then(bankRecord => {
      res.status(200).json({ data: bankRecord})
    })
    .catch(err => { res.status(400).json({ error: err }) })
});

router.put("/:id", (req, res) => {
  const bank = new Bank();
  bank
    .update(req.params.id, req.body)
    .then((() => { res.status(200).json({ data: "record successfully updated" }) }))
    .catch(err => { res.status(400).json({ error: err }) });
});

router.delete("/:id", (req, res) => {
  const bank = new Bank();
  bank
    .destroy(req.params.id)
    .then(() => res.status(200).json({ data: "record successfully deleted" }))
    .catch(err => res.status(400).json({ error: err }))
})

module.exports = router;
