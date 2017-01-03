const express    = require("express")
    , bodyParser = require("body-parser")
    , fs         = require("fs")
    , cors       = require("cors")
    , request    = require("superagent")
    , morgan     = require("morgan")
    , app        = express()
    , io         = require("./adapters/operator-socket");

app.use(morgan("combined"));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// enable cross origin sharing
app.use(cors());

function promisifiedFS(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (err) {
        reject(err)
      } else {
        resolve();
      }
    })
  })
}

// @NOTE
// where to inject the socket code?
// this method?

function backupToRemoteServer(filePath) {
  return new Promise((resolve, reject) => {
    request.post("http://localhost:3333/backup")
      .field("file", "backup")
      .attach("backup", filePath)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
  })
}

app.post("/save", (req, res) => {
  var file = "./backup/backup.json";
  promisifiedFS(file, req.body)
    .then(() => {
      res.status(200).json({ message: "file has been saved locally" })
    })
    .then(() => {
      backupToRemoteServer(file)
        .then((backupResponse) => {
          console.log("file has been stored on remote server \n", backupResponse.body);
        })
        .catch((err) => {
          // this is where we do sockets instead of this
          // we can ask the server to retry connection and whatnot
          // definitely abstracted
          console.log("failed to backup", err)
        })
    })
    .catch((err) => {
      res.status(400).json({ error: err })
    })
})

app.listen(2222, () => {
  console.log("operator server is listening on port", 2222);
})
