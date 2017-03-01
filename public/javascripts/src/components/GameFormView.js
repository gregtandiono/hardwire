/**
 * GameFormView.js
 * 
 * [VIEW]
 */

import React, { Component } from "react"
import ReactDOM from "react-dom"
import * as GameActions from "../actions/GameActions"
import UIFormController from "./UIFormController"

const inputs = [
    {name: "name", label: "Name"},
    {name: "balance", label: "Balance"},
    {name: "deposit", label: "Deposit"},
    {name: "withdraw", label: "Withdraw"},
    {name: "bonus", label: "Bonus"},
    {name: "cancel_bonus", label: "Cancel Bonus"},
    {name: "notes", label: "Notes"}
]

export default class GameFormView extends UIFormController {
    componentWillReceiveProps(nextProps) {
        if (!nextProps.error && nextProps.postSuccess && !nextProps.loading) {
            this.props.dispatch(GameActions.updateGameListOptimistically(nextProps.games))
        }
    }

    render() {
        return (
            <div>
                <h2>Register new Game</h2>
                <form onSubmit={this._submitHandler.bind(this, GameActions.createGameAsync)}>
                    {this._renderInputs(inputs)}
                    {this._renderButton()}
                </form>
            </div>
        )
    }
}

GameFormView.contextTypes = {
    router: React.PropTypes.object.isRequired
}


