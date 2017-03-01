/**
 * PlayerFormContainer.js
 *
 * [CONTAINER]
 *
 */

import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PlayerFormView from "../components/PlayerFormView";

function mapStateToProps(state) {
  var { createPlayer } = state;
  var { loading, error, postSuccess, players } = createPlayer;
  return { error, postSuccess, loading, players }

}

PlayerFormView.contextTypes = { // this context type is to grant access to the react router object for redirection
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(PlayerFormView)
