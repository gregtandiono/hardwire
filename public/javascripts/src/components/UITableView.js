import React, { Component } from "react"
import ReactDOM from "react-dom"
import * as _ from "underscore"
import { Table, Column, Cell } from "fixed-data-table"

export default class UITableView extends Component {
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        {this._generateHeaders()}
                    </tr>
                </thead>
                <tbody>
                    {this._generateBody()}
                </tbody>
            </table>
        )
    }

    _generateHeaders() {
        if (this.props.headers && this.props.headers.length > 0) {
            return this.props.headers.map((item, index) => {
                return <th key={`$-${item}-${index}`}>{item}</th>
            })
        }
    }

    _generateBody() {
        if (this.props.body && this.props.body.length > 0) {
            return this.props.body.map((row, index) => {
                console.log("ROW", row);
                var filteredRow = _.omit(row, this.props.filters);
                return (
                    <tr key={`$-${index}`}>
                        {Object.values(filteredRow) && Object.values(row).length > 0 ? 
                            Object.values(filteredRow).map((value, index) => {
                                return <td key={`$-${value}-${index}`}>{value}</td>
                            }) : null}
                    </tr>
                )
            })
        }
    }
}

/*
class CellContent extends Component {
    render() {
        const {rowIndex, field, data, ...props} = this.props;
        return (
            <Cell {...props}>
                {data[rowIndex][field]}
            </Cell>
        )
    }
}*/
