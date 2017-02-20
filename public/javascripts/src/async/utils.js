/**
 * async/utils.js
 * 
 * [ASYNC]
 */


import fetch from "isomorphic-fetch";
import Cookies from "cookies-js";

// @NOTE:
// the test config is for mock purposes
// if mock is enabled from the request parent

import * as testConfig from "../../../../config/test"

export function fetchToken() {

  // @NOTE:
  // I had to do this for the sake of testing
  // because Cookie is browser-specifc and
  // it is not understood by node during tests

  if (typeof Cookies == "function" && typeof Cookies.get == "function") {
    return {
      token: Cookies.get("token") ? Cookies.get("token") : "",
      user_id: Cookies.get("user_id") ? Cookies.get("user_id") : ""
    }
  } else {
    return ""
  }
}

export function fetchHelper(
  method = "get",
  url = "",
  body = {},
  opts
) {

  var requestBody = method !== "get" ? JSON.stringify(body) : {};

  // @NOTE:
  // opts.mock is basically an option to
  // enable to talk to mock servers, because
  // of the Cookie issue, and it's also a good
  // safeguard that no token will be included in
  // the request header if mock is enabled

  var authToken = url !== "/signup" || url !== "/auth" || !opts ? fetchToken().token : "";
  // @TODO:
  // make sure to use a variable for the base api url
  // because it might be versioned
  var requestURL = opts && opts.mock ? `http://127.0.0.1:${testConfig.port}/api${url}` : `/api${url}`;

  if (method == "get") {
    return new Promise((resolve, reject) => {
      fetch(requestURL, {
        method: method,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": authToken
        }
      })
      .then(response => {
        return { status: response.status, data: response.json() }
      })
      .then(response => {
        if (response.status == 200) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      })
      .catch((err) => {
        reject("ERR in fetchHelper " + err.toString())
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      fetch(requestURL, {
        method: method,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": authToken
        },
        body: requestBody
      })
      .then(response => {
        return { status: response.status, data: response.json() }
      })
      .then(response => {
        if (response.status == 200) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      })
      .catch((err) => {
        reject("ERR from fetchHelper \n" + err)
      })
    })
  }
}

