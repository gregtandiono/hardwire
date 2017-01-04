import React, { Component } from "react"
import ReactDOM from "react-dom"

class App extends Component {
  render() {
    return (
      <div>
        <h1>Operator App</h1>
      </div>
    )
  }
}

const mountNode = document.getElementById("main-react-app")

ReactDOM.render(<App />, mountNode);
