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
})

// io.on("connection", function(socket) {
//   console.log("a user connected");
//   socket.emit("initiation", {message: "connected to socket server"});
//   socket.on("disconnect", function() {
//     console.log("user disconnected");
//     socket.emit("user disconnected");
//   })
// });

module.exports = io;
