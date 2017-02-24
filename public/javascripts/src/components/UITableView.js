import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Table, Column, Cell } from "fixed-data-table"

/*export default class UITableView extends Component {
    render() {
        return (
            <Table {...this.props}>
                {this.props.tableData && this.props.tableData.length > 0 ?
                    this.props.tableData.map((item, index) => {
                        return <Column></Column>
                    }) : null}
                <Column 
                    header={<Cell>Name</Cell>}
                    cell={<Cell>Gregory Tandiono</Cell>}
                    width={200}>
                </Column>
            </Table>
        )
    }
}*/


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
                return (
                    <tr key={`$-${index}`}>
                        {Object.values(row) && Object.values(row).length > 0 ? 
                            Object.values(row).map((value, index) => {
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
