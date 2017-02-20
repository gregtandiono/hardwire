/**
 * UISelect.js
 *
 * [FORM COMPONENT]
 * Generic purely functional text input
 */

import React, { Component } from "react"

export default class UISelect extends Component {
  render() {
    var {label, type = "text", name = "", placeholder = "", autofocus, defaultValue = ""} = this.props
    return (
      <fieldset className="form-group">
        <label>{label}</label>
        <select ref="low-level-input" defaultValue={defaultValue} className="form-control">
          {this.props.options ? this.props.options.map((option, index) => {
            return <option value={option.value} key={index}>{option.name}</option>
          }) : null}
        </select>
      </fieldset>
    )
  }
}
