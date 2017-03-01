/**
 * PlayerFormView.js
 * 
 * [VIEW]
 */

import React, { Component } from "react"
import ReactDOM from "react-dom"
import * as PlayerActions from "../actions/PlayerActions"
import UIFormController from "./UIFormController"

const inputs = [
    {name: "name", label: "Name"},
    {name: "cellphone", label: "Cell Phone"},
    {name: "ym", label: "Yahoo Messenger"},
    {name: "email", label: "Email"},
    {name: "notes", label: "Notes"},
]

export default class PlayerFormView extends UIFormController {
    componentWillReceiveProps(nextProps) {
        if (!nextProps.error && nextProps.postSuccess && !nextProps.loading) {
            this.props.dispatch(PlayerActions.updatePlayerListOptimistically(nextProps.players))
        }
    }

    render() {
        return (
            <div>
                <h2>Create new Player</h2>
                <form onSubmit={this._submitHandler.bind(this, PlayerActions.createPlayerAsync)}>
                    {this._renderInputs(inputs)}
                    {this._renderButton()}
                </form>
            </div>
        )
    }
}

PlayerFormView.contextTypes = {
    router: React.PropTypes.object.isRequired
}
