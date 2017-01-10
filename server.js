/**
 * server.js
 * entry point for the hardwire agent server
 */

var express      = require("express")
  , path         = require("path")
  , logger       = require("morgan")
  , cookieParser = require("cookie-parser")
  , bodyParser   = require("body-parser")
  , cors         = require("cors")
  , compression  = require("compression") // optimization
  , app          = express();

var env = "development";

if (process.env.NODE_ENV) {
  env = process.env.NODE_ENV;
  console.log("NODE_ENV: ", env)
}

var config = require("./config/" + env + ".json");
app.config = config;

// LOAD ENDPOINTS
var users = require("./api/endpoints/users");
var players = require("./api/endpoints/players");
var games = require("./api/endpoints/games");
var sites = require("./api/endpoints/sites");
var transactions = require("./api/endpoints/transactions");
var banks = require("./api/endpoints/banks");

// LOAD MIDDLEWARES
var auth = require("./api/middlewares/auth");

// APPLY MIDDLEWARES
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors);
app.use(express.static("public"));

// APPLY ENDPOINTS
app.use("/auth", users);
app.use("/users", users, auth);
app.use("/players", players, auth);
app.use("/games", games, auth);
app.use("/sites", sites, auth);
app.use("/transactions", transactions, auth);
app.use("/banks", banks, auth);

// SETUP STATIC FILE SERVING
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(config.port, () => {
  console.log("hardwire agent server is running on port:", config.port);
});

module.exports = app;
