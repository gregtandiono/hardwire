import React, { Component } from "react"
import ReactDOM from "react-dom"

import OperatorSpreadSheet from "./components/OperatorSpreadSheet.view"

class App extends Component {
  render() {
    return (
      <div>
        <h1>Operator App</h1>
        <OperatorSpreadSheet />
      </div>
    )
  }
}

const mountNode = document.getElementById("main-react-app")

ReactDOM.render(<App />, mountNode);
