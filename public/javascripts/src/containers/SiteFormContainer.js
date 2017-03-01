/**
 * SiteFormContainer.js
 *
 * [CONTAINER]
 *
 */

import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import SiteFormView from "../components/SiteFormView";

function mapStateToProps(state) {
  var { createSite } = state;
  var { loading, error, postSuccess, sites } = createSite;
  return { error, postSuccess, loading, sites }
}

SiteFormView.contextTypes = { // this context type is to grant access to the react router object for redirection
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(SiteFormView)


