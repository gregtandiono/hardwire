/**
 * BankFormContainer.js
 *
 * [CONTAINER]
 *
 */

import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import BankFormView from "../components/BankFormView";

function mapStateToProps(state) {
  var { createBank } = state;
  var { loading, error, postSuccess, banks } = createBank;
  return { error, postSuccess, loading, banks }
}

BankFormView.contextTypes = { // this context type is to grant access to the react router object for redirection
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(BankFormView)


