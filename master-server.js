const express    = require("express")
    , bodyParser = require("body-parser")
    , fs         = require("fs")
    , cors       = require("cors")
    , request    = require("superagent")
    , morgan     = require("morgan")
    , multer     = require("multer")
    , upload     = multer({ dest: "remote-backup/" })
    , app        = express()
    , io         = require("./adapters/master-socket");

app.use(morgan("combined"));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// enable cross origin sharing
app.use(cors());

app.post("/backup", upload.single("backup"), (req, res) => {
  res.status(200).json({ message: "file successfully uploaded" })
});

app.listen(3333, () => {
  console.log("master server is listening on port", 3333);
});
