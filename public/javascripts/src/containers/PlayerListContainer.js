/**
 * PlayerListContainer.js
 *
 * [CONTAINER]
 *
 */

import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PlayerListView from "../components/PlayerListView";

function mapStateToProps(state) {
  var { fetchAllPlayers } = state;
  var { players } = fetchAllPlayers;
  return {
    players 
  }
}

PlayerListView.contextTypes = { // this context type is to grant access to the react router object for redirection
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(PlayerListView)
