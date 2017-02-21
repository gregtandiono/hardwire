/**
 * BankActions.js
 */

import { fetchHelper } from "../async/utils"
import { mapRecord } from "../records/utils"
import BankRecord from "../records/BankRecord"
import * as types from "../constants/BankConstants"
import store from "../store/index"
import { extend } from "underscore"
import generateUUID from "../utils/uuid"
import { fetchToken } from "../async/utils"
import genericActionHandler from "./genericActionHandler"

export function createBankAsync(inputData) {
    var inputDataWithUUID = extend({}, inputData, {
        id: generateUUID(),
        owner_id: fetchToken().user_id
    });
    return (dispatch) => {
        dispatch(genericActionHandler(types.CREATE_BANK))
        var mappedRecord = mapRecord(BankRecord, inputDataWithUUID);
        return fetchHelper("post", "/banks/", mappedRecord)
          .then(response => dispatch(genericActionHandler(types.CREATE_BANK_SUCCESS, response, mappedRecord)))
          .catch(reason => dispatch(genericActionHandler(types.CREATE_BANK_FAIL, reason)))
    }
}

export function fetchAllBanksAsync() {
    /**
     * @TODO
     * make sure to do a Store check before fetching,
     * the last thing we want is to waste requests
     */
    return (dispatch) => {
        dispatch(genericActionHandler(types.FETCH_ALL_BANKS))
        return fetchHelper("get", "/banks/")
          .then(response => dispatch(genericActionHandler(types.FETCH_ALL_BANKS_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.FETCH_ALL_BANKS_FAIL, reason)))
    }
}

export function updateBankOptimistically(updatedBankList) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.UPDATE_BANK_LIST))
        return dispatch(genericActionHandler(types.FETCH_ALL_BANKS_SUCCESS, { data: updatedBankList }))
    }
}

export function fetchOneBankAsync(bankID) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.FETCH_ONE_BANK))
        return fetchHelper("get", `/banks/${bankID}`)
          .then(response => dispatch(genericActionHandler(types.FETCH_ONE_BANK_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.FETCH_ONE_BANK_FAIL, reason)))
    }

}

export function updateBankAsync(bankID) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.UPDATE_BANK))
        return fetchHelper("put", `/banks/${bankID}`)
          .then(response => dispatch(genericActionHandler(types.UPDATE_BANK_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.UPDATE_BANK_FAIL, reason)))
    }
}

export function deleteBankAsync(bankID) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.DELETE_BANK))
        return fetchHelper("delete", `/banks/${bankID}`)
          .then(response => dispatch(genericActionHandler(types.DELETE_BANK_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.DELETE_BANK_FAIL, reason)))
    }
}


