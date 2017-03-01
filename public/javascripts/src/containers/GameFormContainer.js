/**
 * GameFormContainer.js
 *
 * [CONTAINER]
 *
 */

import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import GameFormView from "../components/GameFormView";

function mapStateToProps(state) {
  var { createGame } = state;
  var { loading, error, postSuccess, games } = createGame;
  return { error, postSuccess, loading, games }
}

GameFormView.contextTypes = { // this context type is to grant access to the react router object for redirection
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(GameFormView)

