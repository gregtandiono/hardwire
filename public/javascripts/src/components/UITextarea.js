/**
 * UITextarea.js
 *
 * [FORM COMPONENT]
 * Generic purely functional textarea element
 */

import React, {Component} from "react"

export default class Textarea extends Component {
  render() {
    var {
      label = "",
      name = "",
      defaultValue
    } = this.props;
    console.log("DEFAULT VALUE", defaultValue);
    return (
      <fieldset className="form-group form-textarea">
        <label>{label}</label>
        <textarea
          name={name}
          className="form-control"
          defaultValue={this.props.defaultValue}
          rows="5"
          ref="low-level-input">
        </textarea>
      </fieldset>
    )
  }
}
