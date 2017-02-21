/**
 * TransactionReducers.js
 *
 * [REDUCER]
 */

import * as types from "../constants/TransactionConstants"
import store from "../store/index"

export function fetchAllTransactions(state = {
    transactions: [],
    loading: false,
    error: false
}, action) {
    switch(action.type) {
        case types.FETCH_ALL_TRANSACTIONS:
          return Object.assign({}, state, {
            loading: true,
            error: false
          })
        case types.FETCH_ALL_TRANSACTIONS_SUCCESS:
          return Object.assign({}, state, {
            loading: false,
            error: false,
            transactions: action.response.data
          })
        case types.FETCH_ALL_TRANSACTIONS_FAIL:
          let { error } = action.response;
          return Object.assign({}, state, {
            loading: false,
            error
          })
        default: return state
    }
}

export function fetchOneTransaction(state = {
  loading: false,
  error: false,
  data: null
}, action) {
  switch(action.type) {
    case types.FETCH_ONE_TRANSACTION:
      return Object.assign({}, state, {
        loading: true,
        error: false 
      })
    case types.FETCH_ONE_TRANSACTION_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        data: action.response.data
      })
    case types.FETCH_ONE_TRANSACTION_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.response.error
      })
    default: return state
  }
}

export function createTransaction(state = {
  loading: false,
  error: false,
  postSuccess: false
}, action) {
  switch(action.type) {
    case types.CREATE_TRANSACTION:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      })
    case types.CREATE_TRANSACTION_SUCCESS:
      var transactionsFromStore = store.getState().fetchAllTransactions.transactions;
      return Object.assign({}, state, {
        loading: false,
        error: false,
        postSuccess: true,
        transactions: [action.clientObj, ...transactionsFromStore]
      })
    case types.CREATE_TRANSACTION_FAIL:
      return Object.assign({}, state, {
        loading: true,
        error: action.response.error,
        postSuccess: false,
      })
    default: return state
  }
}

export function updateTransaction(state = {
  loading: false,
  error: false,
  updateSuccess: false
}, action) {
  switch(action.type) {
    case types.UPDATE_TRANSACTION:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      })  
    case types.UPDATE_TRANSACTION_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        updateSuccess: true
      })
    case types.UPDATE_TRANSACTION_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.response.error,
        updateSuccess: false
      })
    default: return state
  }
}

export function deleteTransaction(state = {
  loading: false,
  error: false,
  deleteSuccess: false 
}, action) {
  switch(action.type) {
    case types.DELETE_TRANSACTION:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      })  
    case types.DELETE_TRANSACTION_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        deleteSuccess: true
      })  
    case types.DELETE_TRANSACTION_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.response.error,
        deleteSuccess: false
      })  
    default: return state
  }
}
