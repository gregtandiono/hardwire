/**
 * GameActions.js
 */

import { fetchHelper } from "../async/utils"
import { mapRecord } from "../records/utils"
import GameRecord from "../records/GameRecord"
import * as types from "../constants/GameConstants"
import store from "../store/index"
import { extend } from "underscore"
import generateUUID from "../utils/uuid"
import { fetchToken } from "../async/utils"
import genericActionHandler from "./genericActionHandler"

export function createGameAsync(inputData) {
    var inputDataWithUUID = extend({}, inputData, {
        id: generateUUID(),
        owner_id: fetchToken().user_id
    });
    return (dispatch) => {
        dispatch(genericActionHandler(types.CREATE_GAME))
        var mappedRecord = mapRecord(SiteRecord, inputDataWithUUID);
        return fetchHelper("post", "/games/", mappedRecord)
          .then(response => dispatch(genericActionHandler(types.CREATE_GAME_SUCCESS, response, mappedRecord)))
          .catch(reason => dispatch(genericActionHandler(types.CREATE_GAME_FAIL, reason)))
    }
}

export function fetchAllGamesAsync() {
    /**
     * @TODO
     * make sure to do a Store check before fetching,
     * the last thing we want is to waste requests
     */
    return (dispatch) => {
        dispatch(genericActionHandler(types.FETCH_ALL_GAMES))
        return fetchHelper("get", "/games/")
          .then(response => dispatch(genericActionHandler(types.FETCH_ALL_GAMES_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.FETCH_ALL_GAMES_FAIL, reason)))
    }
}

export function updateGameListOptimistically(updatedGameList) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.UPDATE_GAME_LIST))
        return dispatch(genericActionHandler(types.FETCH_ALL_GAMES_SUCCESS, { data: updatedGameList }))
    }
}

export function fetchOneGameAsync(gameID) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.FETCH_ONE_GAME))
        return fetchHelper("get", `/games/${gameID}`)
          .then(response => dispatch(genericActionHandler(types.FETCH_ONE_GAME_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.FETCH_ONE_GAME_FAIL, reason)))
    }

}

export function updateGameAsync(gameID) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.UPDATE_GAME))
        return fetchHelper("put", `/games/${gameID}`)
          .then(response => dispatch(genericActionHandler(types.UPDATE_GAME_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.UPDATE_GAME_FAIL, reason)))
    }
}

export function deleteGameAsync(gameID) {
    return (dispatch) => {
        dispatch(genericActionHandler(types.DELETE_GAME))
        return fetchHelper("delete", `/games/${gameID}`)
          .then(response => dispatch(genericActionHandler(types.DELETE_GAME_SUCCESS, response)))
          .catch(reason => dispatch(genericActionHandler(types.DELETE_GAME_FAIL, reason)))
    }
}




