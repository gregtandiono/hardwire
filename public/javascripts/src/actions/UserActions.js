/**
 * UserActions.js
 *
 * [ACTION]
 */


import { fetchHelper } from "../async/utils";
import { mapRecord } from "../records/utils";
import UserRecord from "../records/UserRecord";

// import constant types

import * as types from "../constants/UserConstants";

// ====================================
// USER LOGIN ACTION CREATORS
// ====================================

export function userLogin() {
  return {
    type: types.USER_LOGIN,
  }
}

export function successfulLoginHandler(response) {
  return {
    type: types.USER_LOGIN_SUCCESS,
    response
  }
}

export function failedLoginHandler(response) {
  return {
    type: types.USER_LOGIN_FAIL,
    response
  }
}

export function loginUserAsync(data, opts) {
  return (dispatch) => {
    dispatch(userLogin());
    var mappedRecord = mapRecord(UserRecord, data);
    return fetchHelper("post", "/users/auth", data, opts)
      .then(response => dispatch(successfulLoginHandler(response)))
      .catch(reason => dispatch(failedLoginHandler(reason)))
  }
}
