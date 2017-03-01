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

const bankInputs = [
    {name: "bank_name", label: "Bank Name"},
    {name: "bank_other_name", label: "Other Bank Name (if none is applicable)"},
    {name: "bank_account_holder", label: "Account Holder"},
    {name: "bank_account_number", label: "Account Number"},
    {name: "bank_username", label: "Username"},
    {name: "bank_password", label: "Password"},
]

export default class PlayerFormView extends UIFormController {
    componentWillReceiveProps(nextProps) {
        if (!nextProps.error && nextProps.postSuccess && !nextProps.loading) {
            this.props.dispatch(PlayerActions.updatePlayerListOptimistically(nextProps.players));
            this.context.router.push("/players");
        }
    }

    render() {
        return (
            <div>
                <h2>Create new Player</h2>
                <form onSubmit={this._submitHandler.bind(this, PlayerActions.createPlayerAsync)}>
                    {this._renderInputs(inputs)}
                    <h3>Bank Details</h3>
                    {this._renderInputs(bankInputs)}
                    {this._renderButton()}
                </form>
            </div>
        )
    }
}

PlayerFormView.contextTypes = {
    router: React.PropTypes.object.isRequired
}
