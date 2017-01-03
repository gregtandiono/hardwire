/**
 * master-socket.js
 *
 * [SOCKET ADAPTER]
 *
 * This is an instance of the socket server,
 * running on a different port
 */

var env = "development";
if (process.env.NODE_ENV) {
  env = process.env.NODE_ENV;
  console.log("socket acknowledges node environment:", env);
}

var config = require("../config/" + env + ".json");
var io = require("socket.io-client")("http://localhost:1339");

io.on("initiation", function(data) {
  // Verify that socket connection has established properly
  // between operator and master
  console.log("connected to client socket server", data);
});

io.on("save:local:init", function(data) {
  // I'm leaving these blank, in
  // case we want to notify master interface
  console.log("message:", data);
})

io.on("save:local:success", function(data) {
  // I'm leaving these blank, in
  // case we want to notify master interface
  console.log("message:", data);
})

io.on("save:remote:init", function(data) {
  console.log("message:", data);
})

io.on("save:remote:success", function(data) {
  // @NOTE
  console.log("message:", data);
})

io.on("save:remote:fail", function(data) {
  // @NOTE
  // ok this is where I'm stuck.
})

module.exports = io;
