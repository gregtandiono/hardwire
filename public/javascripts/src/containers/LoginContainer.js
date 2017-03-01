/**
 * LoginContainer.js
 *
 * [CONTAINER]
 *
 */

import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as UserActions from "../actions/UserActions";
import LoginFormView from "../components/UILoginFormView";
import Cookies from "cookies-js";

class LoginContainer extends Component {
  componentWillReceiveProps(nextProps) {
    // This lifecycle triggers as an action dispatches
    if (nextProps.redirectURL && nextProps.response.data.token && !nextProps.error) {
      Cookies.set("token", nextProps.response.data.token);
      Cookies.set("user_id", nextProps.response.data.user_id);
      Cookies.set("shift_id", nextProps.response.data.shift_id);
      this.context.router.push("/");
    }
  }

  render() {
    let { dispatch } = this.props;
    return <LoginFormView dispatch={dispatch} actions={UserActions} />
  }
}

function mapStateToProps(state) {
  // @TODO: this is just for dev purposes
  // when we get the hang out of redux, we'll surely get rid of this
  let { loginReducer } = state;
  let {
    loading,
    response,
    error,
    redirectURL
  } = loginReducer;

  return {
    loading,
    response,
    error,
    redirectURL
  };
}

LoginContainer.contextTypes = { // this context type is to grant access to the react router object for redirection
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(LoginContainer)
