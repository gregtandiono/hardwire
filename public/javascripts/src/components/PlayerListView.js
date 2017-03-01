import React, { Component } from "react"
import ReactDOM from "react-dom"
import * as PlayerActions from "../actions/PlayerActions"
import UITableView from "./UITableView"

// var fakeData = [
//     { name: "gregory tandiono", age: 27, username: "gregtandiono" },
//     { name: "evelyn thong", age: 34, username: "evethong" },
//     { name: "mini lab", age: 26, username: "miniLovesBini" },
//     { name: "aloenk", age: 40, username: "whatevsBruv" }
// ]

export default class PlayerListView extends Component {
    componentDidMount() {
        this.props.dispatch(PlayerActions.fetchAllPlayersAsync());
    }

    render() {
        return (
            <div>
                <h2>Player List</h2>
                <UITableView
                    headers={["name", "username", "ym"]}
                    body={this.props.players}
                    filters={["shift_id", "id", "created_at", "operator_id", "modified"]} />
            </div>
        )
    }
}