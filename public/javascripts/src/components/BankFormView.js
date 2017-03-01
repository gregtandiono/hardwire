/**
 * BankFormView.js
 * 
 * [VIEW]
 */

import React, { Component } from "react"
import ReactDOM from "react-dom"
import * as BankActions from "../actions/BankActions"
import UIFormController from "./UIFormController"

const inputs = [
    {name: "name", label: "Name"},
    {name: "other_name", label: "Other Name"},
    {name: "account_holder", label: "Account Holder"},
    {name: "account_number", label: "Account Number"},
    {name: "system_ownership", label: "System Ownership"},
    {name: "username", label: "username"},
    {name: "password", label: "password"}
]

export default class BankFormView extends UIFormController {
    componentWillReceiveProps(nextProps) {
        if (!nextProps.error && nextProps.postSuccess && !nextProps.loading) {
            this.props.dispatch(BankActions.updateBankListOptimistically(nextProps.banks))
        }
    }

    render() {
        return (
            <div>
                <h2>Player Bank Details</h2>
                <form onSubmit={this._submitHandler.bind(this, Bankactions.createBankAsync)}>
                    {this._renderInputs(inputs)}
                    {this._renderButton()}
                </form>
            </div>
        )
    }
}

BankFormView.contextTypes = {
    router: React.PropTypes.object.isRequired
}

