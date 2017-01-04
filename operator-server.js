/**
 * operator-server.js
 * [EXPRESS REST SERVER]
 */

const express    = require("express")
    , bodyParser = require("body-parser")
    , fs         = require("fs")
    , cors       = require("cors")
    , request    = require("superagent")
    , morgan     = require("morgan")
    , app        = express()
    , io         = require("./adapters/operator-socket");

var env = "development";
if (process.env.NODE_ENV) {
  env = process.env.NODE_ENV;
  console.log("NODE_ENV: ", env)
}

const config = require(`./config/${env}.json`)

app.use(morgan("combined"));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
// enable cross origin sharing
app.use(compression());
app.use(logger("dev"));
app.use(cors);
app.use(express.static("public"));

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
  io.emit("save:local:init", { message: "operator attempting to save to disk..." });
  promisifiedFS(file, req.body)
    .then(() => {
      io.emit("save:local:success", { message: "operator successfully saved file to disk" })
      res.status(200).json({ message: "file saved to disk" })
    })
    .then(() => {
      io.emit("save:remote:init", { message: "operator attempting to backup data to remote server..." });
      backupToRemoteServer(file)
        .then((backupResponse) => {
          io.emit("save:remote:success", { message: "remote server successfully received packet" });
        })
        .catch((err) => {
          io.emit("save:remote:fail", { message: "remote server failed to save packet" });
          console.log("failed to backup", err)
        })

    })

    .catch((err) => {
      res.status(400).json({ error: err })
    })
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/clients/oprator/index.html");
});

app.listen(config.port, () => {
  console.log("operator server is running on port:", config.port);
});
