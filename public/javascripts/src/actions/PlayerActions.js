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
        var mappedRecord = mapRecord(PlayerRecord, inputDataWithUUID);
        return fetchHelper("post", "/players/", mappedRecord)
          .then(response => dispatch(genericActionHandler(types.CREATE_PLAYER_SUCCESS, response, mappedRecord)))
          .catch(reason => dispatch(genericActionHandler(types.CREATE_PLAYER_FAIL, reason)))
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
        dispatch(genericActionHandler(types.FETCH_ONE_PLAYER))
        return fetchHelper("get", `/players/${playerID}`)
          .then(response => dispatch(genericActionHandler(types.FETCH_ONE_PLAYER_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.FETCH_ONE_PLAYER_FAIL, reason)))
    }

}

export function updatePlayerAsync(playerID) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.UPDATE_PLAYER))
        return fetchHelper("put", `/players/${playerID}`)
            .then(response => dispatch(genericActionHandler(types.UPDATE_PLAYER_SUCCESS, response)))
            .catch(reason => dispatch(genericActionHandler(types.UPDATE_PLAYER_FAIL, reason)))
    }
}

export function deletePlayerAsync(playerID) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.DELETE_PLAYER))
        return fetchHelper("delete", `players/${playerID}`)
            .then(response => dispatch(genericActionHandler(types.DELETE_PLAYER_SUCCESS, response)))
            .catch(reason => dispatch(genericActionHandler(types.DELETE_PLAYER_FAIL, reason)))
    }
}
