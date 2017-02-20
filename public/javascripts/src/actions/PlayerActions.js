/**
 * PlayerActions.js
 */

import { fetchHelper } from "../async/utils"
import { mapRecord } from "../records/utils"
import PlayerRecord from "../records/PlayerRecord"
import * as types from "../constants/PlayerConstants"
import store from "../store/index"
import { extend } from "underscore"
import generateUUID from "../utils/uuid"
import { fetchToken } from "../async/utils"
import genericActionHandler from "./genericActionHandler"

export function createPlayerAsync(inputData) {
    var inputDataWithUUID = extend({}, inputData, {
        id: generateUUID(),
        owner_id: fetchToken().user_id
    });
    return (dispatch) => {
        dispatch(genericHandler(types.CREATE_SITE))
        var mappedRecord = mapRecord(SiteRecord, inputDataWithUUID);
        return fetchHelper("post", "/sites/", mappedRecord)
          .then(response => dispatch(genericActionHandler(types.CREATE_SITE_SUCCESS, response, mappedRecord)))
          .catch(reason => dispatch(genericActionHandler(types.CREATE_SITE_FAIL, reason)))
    }
}

export function fetchAllPlayersAsync() {
    /**
     * @TODO
     * make sure to do a Store check before fetching,
     * the last thing we want is to waste requests
     */
    return (dispatch) => {
        dispatch(genericActionHandler(types.FETCH_ALL_PLAYERS))
        return fetchHelper("get", "/players/")
          .then(response => dispatch(genericActionHandler(types.FETCH_ALL_PLAYERS_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.FETCH_ALL_PLAYERS_FAIL, reason)))
    }
}

export function updatePlayerListOptimistically(updatedPlayerList) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.UPDATE_PLAYER_LIST))
        return dispatch(genericActionHandler(types.FETCH_ALL_PLAYERS_SUCCESS, { data: updatedPlayerList }))
    }
}

export function fetchOnePlayerAsync(playerID) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.FETCH_ALL_PLAYERS))
        return fetchHelper("get", "/players/")
          .then(response => dispatch(genericActionHandler(types.FETCH_ALL_PLAYERS_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.FETCH_ALL_PLAYERS_FAIL, reason)))
    }

}

export function updatePlayerAsync(playerID) {

}

export function deletePlayerAsync(playerID) {

}
