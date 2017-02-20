/**
 * UINavigation.js
 */

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";

const navigationItems = [
  { url: "/dashboard", name: "Dashboard" },
  { url: "/players", name: "Players" },
  { url: "/transactions", name: "Transactions" }
];

const NavigationItem = ({ url, name }) => (
  <li>
    <Link to={url}>{name}</Link>
  </li>
)

export default class UINavigation extends Component {
  render() {
    return (
      <nav>
        <ul>
          {navigationItems && navigationItems.length > 0 ?
            navigationItems.map(item => (
              <NavigationItem key={item.name} {...item} />
            )) : null}
        </ul>
      </nav>
    )
  }
}
