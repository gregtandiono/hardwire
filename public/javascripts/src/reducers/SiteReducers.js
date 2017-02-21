/**
 * SiteReducers.js
 *
 * [REDUCER]
 */

import * as types from "../constants/SiteConstants"
import store from "../store/index"

export function fetchAllSites(state = {
    sites: [],
    loading: false,
    error: false
}, action) {
    switch(action.type) {
        case types.FETCH_ALL_SITES:
          return Object.assign({}, state, {
            loading: true,
            error: false
          })
        case types.FETCH_ALL_SITES_SUCCESS:
          return Object.assign({}, state, {
            loading: false,
            error: false,
            sites: action.response.data
          })
        case types.FETCH_ALL_SITES_FAIL:
          let { error } = action.response;
          return Object.assign({}, state, {
            loading: false,
            error
          })
        default: return state
    }
}

export function fetchOneSite(state = {
  loading: false,
  error: false,
  data: null
}, action) {
  switch(action.type) {
    case types.FETCH_ONE_SITE:
      return Object.assign({}, state, {
        loading: true,
        error: false 
      })
    case types.FETCH_ONE_SITE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        data: action.response.data
      })
    case types.FETCH_ONE_SITE_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.response.error
      })
    default: return state
  }
}

export function createSite(state = {
  loading: false,
  error: false,
  postSuccess: false
}, action) {
  switch(action.type) {
    case types.CREATE_SITE:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      })
    case types.CREATE_SITE_SUCCESS:
      var sitesFromStore = store.getState().fetchAllSites.sites;
      return Object.assign({}, state, {
        loading: false,
        error: false,
        postSuccess: true,
        sites: [action.clientObj, ...sitesFromStore]
      })
    case types.CREATE_SITE_FAIL:
      return Object.assign({}, state, {
        loading: true,
        error: action.response.error,
        postSuccess: false,
      })
    default: return state
  }
}

export function updateSite(state = {
  loading: false,
  error: false,
  updateSuccess: false
}, action) {
  switch(action.type) {
    case types.UPDATE_SITE:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      })  
    case types.UPDATE_SITE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        updateSuccess: true
      })
    case types.UPDATE_SITE_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.response.error,
        updateSuccess: false
      })
    default: return state
  }
}

export function deleteSite(state = {
  loading: false,
  error: false,
  deleteSuccess: false 
}, action) {
  switch(action.type) {
    case types.DELETE_SITE:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      })  
    case types.DELETE_SITE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        deleteSuccess: true
      })  
    case types.DELETE_SITE_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.response.error,
        deleteSuccess: false
      })  
    default: return state
  }
}
