/**
 * sites.js
 *
 * [ENDPOINT]
 */

var express          = require("express")
  , _                = require("underscore")
  , Promise          = require("bluebird")
  , Site             = require("../models/Site")
  , router           = express.Router()

router.post("/", (req, res) => {
  const site = new Site();
  site
    .create(req.body)
    .then(results => { res.status(200).json({ data: results }) })
    .catch(error => { res.status(400).json({ error }) })
});

router.get("/", (req, res) => {
  const site = new Site();
  site.fetchAll()
    .then(results => { res.status(200).json({ data: results }) })
    .catch(err => { res.status(400).json({ error: err }) })
});

router.get("/:id", (req, res) => {
  const site = new Site();
  site.fetchOne(req.params.id)
    .then(siteRecord => {
      res.status(200).json({ data: siteRecord})
    })
    .catch(err => { res.status(400).json({ error: err }) })
});

router.put("/:id", (req, res) => {
  const site = new Site();
  site
    .update(req.params.id, req.body)
    .then((() => { res.status(200).json({ data: "record successfully updated" }) }))
    .catch(err => { res.status(400).json({ error: err }) });
});

router.delete("/:id", (req, res) => {
  const site = new Site();
  site
    .destroy(req.params.id)
    .then(() => res.status(200).json({ data: "record successfully deleted" }))
    .catch(err => res.status(400).json({ error: err }))
})

module.exports = router;
