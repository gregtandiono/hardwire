/**
 * SiteFormView.js
 * 
 * [VIEW]
 */

import React, { Component } from "react"
import ReactDOM from "react-dom"
import * as SiteActions from "../actions/SiteActions"
import UIFormController from "./UIFormController"

const inputs = [
    {name: "name", label: "Name"},
    {name: "url", label: "URL"}
];

export default class SiteFormView extends UIFormController {
    componentWillReceiveProps(nextProps) {
        if (!nextProps.error && nextProps.postSuccess && !nextProps.loading) {
            this.props.dispatch(SiteActions.updateSiteListOptimistically(nextProps.sites))
        }
    }

    render() {
        return (
            <div>
                <h2>Create new Site</h2>
                <form onSubmit={this._submitHandler.bind(this, SiteActions.createSiteAsync)}>
                    {this._renderInputs(inputs)}
                    {this._renderButton()}
                </form>
            </div>
        )
    }
}

SiteFormView.contextTypes = {
    router: React.PropTypes.object.isRequired
}



