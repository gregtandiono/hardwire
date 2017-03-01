/**
 * TransactionFormContainer.js
 *
 * [CONTAINER]
 *
 */

import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import TransactionFormView from "../components/TransactionFormView";

function mapStateToProps(state) {
  var { createTransaction } = state;
  var { loading, error, postSuccess, transactions } = createTransaction;
  return { error, postSuccess, loading, transactions }
}

TransactionFormView.contextTypes = { // this context type is to grant access to the react router object for redirection
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(TransactionFormView)


