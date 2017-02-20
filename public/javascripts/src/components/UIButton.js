/**
 * UIButton.js
 *
 * [UI COMPONENT]
 */

import React, {Component} from "react"

const UIButton = ({
  name = "",
  specClass = "",
  type = "",
  onClickhandler}) => (
    <button
      className={"btn btn-primary " + specClass}
      type={type}
      onClick={onClickhandler}>
      {name}
    </button>
)

export default UIButton
