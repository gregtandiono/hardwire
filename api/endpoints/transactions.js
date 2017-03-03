/**
 * transactions.js
 *
 * [ENDPOINT]
 */

var express          = require("express")
  , _                = require("underscore")
  , Promise          = require("bluebird")
  , Transaction      = require("../models/Transaction")
  , router           = express.Router();

router.post("/", (req, res) => {
  const transaction = new Transaction();
  transaction
    .create(req.body)
    .then(results => { 
      var { bank_id, game_id } = req.body;
      transaction._updateSimulatedRecord(
        bank_id,
        game_id,
        req.body.withdraw ? req.body.withdraw : req.body.deposit,
        req.body.withdraw ? "withdraw" : "deposit"
      )
      res.status(200).json({ data: results }) 
    })
    .catch(error => { res.status(400).json({ error }) })
});

router.get("/", (req, res) => {
  const transaction = new Transaction();
  transaction.fetchAllRelatedToPlayer(req.body.player_id)
    .then(results => { res.status(200).json({ data: results }) })
    .catch(err => { res.status(400).json({ error: err }) })
});

router.get("/:id", (req, res) => {
  const transaction = new Transaction();
  transaction.fetchOne(req.params.id)
    .then(transactionRecord => {
      res.status(200).json({ data: transactionRecord})
    })
    .catch(err => { res.status(400).json({ error: err }) })
});

router.put("/:id", (req, res) => {
  const transaction = new Transaction();
  transaction
    .update(req.params.id, req.body)
    .then((() => { res.status(200).json({ data: "record successfully updated" }) }))
    .catch(err => { res.status(400).json({ error: err }) });
});

router.delete("/:id", (req, res) => {
  const transaction = new Transaction();
  transaction
    .destroy(req.params.id)
    .then(() => res.status(200).json({ data: "record successfully deleted" }))
    .catch(err => res.status(400).json({ error: err }))
})

module.exports = router;
