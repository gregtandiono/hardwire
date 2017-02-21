/**
 * TransactionActions.js
 */

import { fetchHelper } from "../async/utils"
import { mapRecord } from "../records/utils"
import TransactionRecord from "../records/TransactionRecord"
import * as types from "../constants/TransactionConstants"
import store from "../store/index"
import { extend } from "underscore"
import generateUUID from "../utils/uuid"
import { fetchToken } from "../async/utils"
import genericActionHandler from "./genericActionHandler"

export function createTransactionAsync(inputData) {
    var inputDataWithUUID = extend({}, inputData, {
        id: generateUUID(),
        owner_id: fetchToken().user_id
    });
    return (dispatch) => {
        dispatch(genericActionHandler(types.CREATE_TRANSACTION))
        var mappedRecord = mapRecord(TransactionRecord, inputDataWithUUID);
        return fetchHelper("post", "/transactions/", mappedRecord)
          .then(response => dispatch(genericActionHandler(types.CREATE_TRANSACTION_SUCCESS, response, mappedRecord)))
          .catch(reason => dispatch(genericActionHandler(types.CREATE_TRANSACTION_FAIL, reason)))
    }
}

export function fetchAllTransactionsAsync() {
    /**
     * @TODO
     * make sure to do a Store check before fetching,
     * the last thing we want is to waste requests
     */
    return (dispatch) => {
        dispatch(genericActionHandler(types.FETCH_ALL_TRANSACTIONS))
        return fetchHelper("get", "/transactions/")
          .then(response => dispatch(genericActionHandler(types.FETCH_ALL_TRANSACTIONS_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.FETCH_ALL_TRANSACTIONS_FAIL, reason)))
    }
}

export function updateTransactionListOptimistically(updatedTransactionList) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.UPDATE_TRANSACTION_LIST))
        return dispatch(genericActionHandler(types.FETCH_ALL_TRANSACTIONS_SUCCESS, { data: updatedTransactionList }))
    }
}

export function fetchOneTransactionAsync(transactionID) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.FETCH_ONE_TRANSACTION))
        return fetchHelper("get", `/transactions/${transactionID}`)
          .then(response => dispatch(genericActionHandler(types.FETCH_ONE_TRANSACTION_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.FETCH_ONE_TRANSACTION_FAIL, reason)))
    }

}

export function updateTransactionAsync(transactionID) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.UPDATE_TRANSACTION))
        return fetchHelper("put", `/transactions/${transactionID}`)
          .then(response => dispatch(genericActionHandler(types.UPDATE_TRANSACTION_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.UPDATE_TRANSACTION_FAIL, reason)))
    }
}

export function deleteTransactionAsync(transactionID) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.DELETE_TRANSACTION))
        return fetchHelper("delete", `/transactions/${transactionID}`)
          .then(response => dispatch(genericActionHandler(types.DELETE_TRANSACTION_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.DELETE_TRANSACTION_FAIL, reason)))
    }
}




