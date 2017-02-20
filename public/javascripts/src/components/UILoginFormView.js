/**
 * UILoginFormView.js
 *
 * [VIEW]
 */

import React, { Component } from "react";
import ReactDOM from "react-dom";
import UILoginFormController from "./UILoginFormController";


var inputs = [
  {name: "username", label: "username"},
  {name: "password", label: "password", type: "password"},
]

export default class UILoginFormView extends UILoginFormController {
  render() {
    let { loginUserAsync } = this.props.actions;
    return (
      <main className="pre-app">
        <h1>Micro Medium Login</h1>
        <form onSubmit={this._submitHandler.bind(this, "/api/users/auth", loginUserAsync)}>
          {this._renderInputs(inputs)}
          {this._renderButton()}
        </form>
      </main>
    )
  }
}
