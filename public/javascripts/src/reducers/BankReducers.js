/**
 * BankReducers.js
 *
 * [REDUCER]
 */

import * as types from "../constants/BankConstants"
import store from "../store/index"

export function fetchAllBanks(state = {
    banks: [],
    loading: false,
    error: false
}, action) {
    switch(action.type) {
        case types.FETCH_ALL_BANKS:
          return Object.assign({}, state, {
            loading: true,
            error: false
          })
        case types.FETCH_ALL_BANKS_SUCCESS:
          return Object.assign({}, state, {
            loading: false,
            error: false,
            banks: action.response.data
          })
        case types.FETCH_ALL_BANKS_FAIL:
          let { error } = action.response;
          return Object.assign({}, state, {
            loading: false,
            error
          })
        default: return state
    }
}

export function fetchOneBank(state = {
  loading: false,
  error: false,
  data: null
}, action) {
  switch(action.type) {
    case types.FETCH_ONE_BANK:
      return Object.assign({}, state, {
        loading: true,
        error: false 
      })
    case types.FETCH_ONE_BANK_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        data: action.response.data
      })
    case types.FETCH_ONE_BANK_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.response.error
      })
    default: return state
  }
}

export function createBank(state = {
  loading: false,
  error: false,
  postSuccess: false
}, action) {
  switch(action.type) {
    case types.CREATE_BANK:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      })
    case types.CREATE_BANK_SUCCESS:
      var banksFromStore = store.getState().fetchAllBanks.banks;
      return Object.assign({}, state, {
        loading: false,
        error: false,
        postSuccess: true,
        banks: [action.clientObj, ...banksFromStore]
      })
    case types.CREATE_BANK_FAIL:
      return Object.assign({}, state, {
        loading: true,
        error: action.response.error,
        postSuccess: false,
      })
    default: return state
  }
}

export function updateBank(state = {
  loading: false,
  error: false,
  updateSuccess: false
}, action) {
  switch(action.type) {
    case types.UPDATE_BANK:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      })  
    case types.UPDATE_BANK_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        updateSuccess: true
      })
    case types.UPDATE_BANK_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.response.error,
        updateSuccess: false
      })
    default: return state
  }
}

export function deleteBank(state = {
  loading: false,
  error: false,
  deleteSuccess: false 
}, action) {
  switch(action.type) {
    case types.DELETE_BANK:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      })  
    case types.DELETE_BANK_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        deleteSuccess: true
      })  
    case types.DELETE_BANK_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.response.error,
        deleteSuccess: false
      })  
    default: return state
  }
}
