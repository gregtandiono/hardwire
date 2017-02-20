/**
 * UserReducers.js
 *
 * [REDUCER]
 */

import * as types from "../constants/UserConstants";

export function loginReducer(state = {
  loading: false,
  error: false,
  response: {}
}, action) {
  switch (action.type) {
    case types.USER_LOGIN:
      return Object.assign({}, state, {
        loading: true,
        error: false
      });

    case types.USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        response: action.response,
        redirectURL: "/"
      });

    case types.USER_LOGIN_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: true,
        response: action.response
      });

    default:
      return state;
  }
}
