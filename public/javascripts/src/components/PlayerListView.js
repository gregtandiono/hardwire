import React, { Component } from "react"
import ReactDOM from "react-dom"
import UITableView from "./UITableView"

var fakeData = [
    { name: "gregory tandiono", age: 27, username: "gregtandiono" },
    { name: "evelyn thong", age: 34, username: "evethong" },
    { name: "mini lab", age: 26, username: "miniLovesBini" },
    { name: "aloenk", age: 40, username: "whatevsBruv" }
]

export default class PlayerListView extends Component {
    render() {
        return (
            <div>
                <h2>Player List</h2>
                <UITableView
                    headers={["name", "age", "username"]}
                    body={fakeData} />
            </div>
        )
    }
}