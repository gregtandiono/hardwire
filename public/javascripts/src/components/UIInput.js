/**
 * UIInput.js
 *
 * [FORM COMPONENT]
 * Generic purely functional text input
 */

import React, {Component} from "react"

export default class Input extends Component {
  render() {
    var {label, type = "text", name = "", placeholder = "", autofocus, defaultValue = ""} = this.props
    return (
      <fieldset className="form-group">
        <label>{label}</label>
        <input
          type={type}
          name={name}
          autoFocus={autofocus ? autofocus : false}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="form-control"
          ref="low-level-input" />
      </fieldset>
    )
  }
}
