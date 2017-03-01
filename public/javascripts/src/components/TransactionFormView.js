/**
 * TransactionFormView.js
 * 
 * [VIEW]
 */

import React, { Component } from "react"
import ReactDOM from "react-dom"
import * as TransactionActions from "../actions/TransactionActions"
import UIFormController from "./UIFormController"

const inputs = [
    {name: "name", label: "Name"},
    {name: "site_id", label: "Site"},
    {name: "player_id", label: "Player"},
    {name: "bank_id", label: "Bank"},
    {name: "reff", label: "reff"},
    {name: "transfer", label: "Transfer"},
    {name: "deposit", label: "Deposit"},
    {name: "withdraw", label: "Withdraw"},
    {name: "bonus", label: "Bonus"},
    {name: "transaction_notes", label: "Notes"},
    {name: "transfer_notes", label: "Transfer Notes"},
    {name: "bonus_notes", label: "Bonus Notes"}
];

export default class TransactionFormView extends UIFormController {
    componentWillReceiveProps(nextProps) {
        if (!nextProps.error && nextProps.postSuccess && !nextProps.loading) {
            this.props.dispatch(TransactionActions.updateTransactionListOptimistically(nextProps.transactions))
        }
    }

    render() {
        return (
            <div>
                <h2>Create new Site</h2>
                <form onSubmit={this._submitHandler.bind(this, TransactionActions.createTransactionAsync)}>
                    {this._renderInputs(inputs)}
                    {this._renderButton()}
                </form>
            </div>
        )
    }
}

TransactionFormView.contextTypes = {
    router: React.PropTypes.object.isRequired
}




