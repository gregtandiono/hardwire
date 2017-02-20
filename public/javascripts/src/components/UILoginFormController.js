/**
 * UILoginFormController.js
 * [CONTROLLER]
 *
 * this component is a wrapper around `UIFormController`
 * because the Login / Signup forms behaves slightly different from
 * other forms in the application
 */

import React, { Component } from "react";
import UIFormController from "./UIFormController";

export default class UILoginFormController extends UIFormController {
  _submitHandler(url, action, e) {
    e.preventDefault();

    var payload = {};

    Object.keys(this.refs).forEach(name => {
      var value = this.refs[name].refs["low-level-input"].value;
      payload[name] = value;
    });

    this.props.dispatch(action(payload))
  }
}
