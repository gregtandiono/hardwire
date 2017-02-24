import React, { Component } from "react"
import ReactDOM from "react-dom"
import UIFormController from "./UIFormController"

const inputs = [
    {name: "name", label: "Name"},
    {name: "cellphone", label: "Cell Phone"},
    {name: "ym", label: "Yahoo Messenger"},
    {name: "email", label: "Email"},
    {name: "notes", label: "Notes"}
]

export default class PlayerFormView extends UIFormController {
    render() {
        return (
            <div />
        )
    }
}

PlayerFormView.contextTypes = {
    router: React.PropTypes.object.isRequired
}
