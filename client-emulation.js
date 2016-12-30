const request = require("superagent");

var mockPacket = {
  name: "gregory",
  username: "gtandiono",
  email: "gregtandiono@gmail.com",
  status: "active"
}

request
  .post("http://localhost:2222/save")
  .send(mockPacket)
  .end((err, res) => {
    if (err) {
      console.log(err);
    }
    // just print the good response
    console.log(res.body)
  })
