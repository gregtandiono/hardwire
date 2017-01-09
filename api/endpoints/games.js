/**
 * games.js
 *
 * [ENDPOINT]
 */

var express          = require("express")
  , _                = require("underscore")
  , Promise          = require("bluebird")
  , Game             = require("../models/Game")
  , router           = express.Router();

router.post("/", (req, res) => {
  const game = new Game();
  game  
    .create(req.body)
    .then(results => { res.status(200).json({ data: results }) })
    .catch(error => { res.status(400).json({ error }) })
});

router.get("/", (req, res) => {
  const game = new Game();
  game.fetchAllRelatedToPlayer(req.body.player_id)
    .then(results => { res.status(200).json({ data: results }) })
    .catch(err => { res.status(400).json({ error: err }) })
});

router.get("/:id", (req, res) => {
  const game = new Game();
  game.fetchOne(req.params.id)
    .then(gameRecord => {
      res.status(200).json({ data: gameRecord})
    })
    .catch(err => { res.status(400).json({ error: err }) })
});

router.put("/:id", (req, res) => {
  const game = new Game();
  game
    .update(req.params.id, req.body)
    .then((() => { res.status(200).json({ data: "record successfully updated" }) }))
    .catch(err => { res.status(400).json({ error: err }) });
});

router.delete("/:id", (req, res) => {
  const game = new Game();
  game
    .destroy(req.params.id)
    .then(() => res.status(200).json({ data: "record successfully deleted" }))
    .catch(err => res.status(400).json({ error: err }))
})

module.exports = router;
