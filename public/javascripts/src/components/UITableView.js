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
                        <th>Name</th>
                        <th>Age</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                    </tr>
                </tbody>
            </table>
        )
    }

    generateHeaders() {

    }

    generateBody() {

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
