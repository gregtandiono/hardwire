/**
 * UIDashboardView.js
 */

import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as UserActions from "../actions/UserActions";
import PostFeedContainer from "../containers/PostFeedContainer";
import UINavigation from "./UINavigation";

export default class UIDashboardView extends Component {
  render() {
    return (
      <div>
        <header>
          {this.props.loading ? "fetching user data" : `Welcome ${this.props.username}`}
        </header>
        <PostFeedContainer />
      </div>
    )
  }
}
