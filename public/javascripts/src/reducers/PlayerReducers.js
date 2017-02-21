/**
 * PlayerReducers.js
 *
 * [REDUCER]
 */

import * as types from "../constants/PlayerConstants"
import store from "../store/index"

export function fetchAllPlayers(state = {
    players: [],
    loading: false,
    error: false
}, action) {
    switch(action.type) {
        case types.FETCH_ALL_PLAYERS:
          return Object.assign({}, state, {
            loading: true,
            error: false
          })
        case types.FETCH_ALL_PLAYERS_SUCCESS:
          return Object.assign({}, state, {
            loading: false,
            error: false,
            players: action.response.data
          })
        case types.FETCH_ALL_PLAYERS.FAIL:
          let { error } = action.response;
          return Object.assign({}, state, {
            loading: false,
            error
          })
        default: return state
    }
}

export function fetchOnePlayer(state = {
  loading: false,
  error: false,
  data: null
}, action) {
  switch(action.type) {
    case types.FETCH_ONE_PLAYER:
      return Object.assign({}, state, {
        loading: true,
        error: false 
      })
    case types.FETCH_ONE_PLAYER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        data: action.response.data
      })
    case types.FETCH_ONE_PLAYER_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.response.error
      })
    default: return state
  }
}

export function createPlayer(state = {
  loading: false,
  error: false,
  postSuccess: false
}, action) {
  switch(action.type) {
    case types.CREATE_PLAYER:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      })
    case types.CREATE_PLAYER_SUCCESS:
      var playersFromStore = store.getState().fetchAllPlayers.players;
      return Object.assign({}, state, {
        loading: false,
        error: false,
        postSuccess: true,
        players: [action.clientObj, ...playersFromStore]
      })
    case types.CREATE_PLAYER_FAIL:
      return Object.assign({}, state, {
        loading: true,
        error: action.response.error,
        postSuccess: false,
      })
    default: return state
  }
}

export function updatePlayer(state = {
  loading: false,
  error: false,
  updateSuccess: false
}, action) {
  switch(action.type) {
    case types.UPDATE_PLAYER:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      })  
    case types.UPDATE_PLAYER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        updateSuccess: true
      })
    case types.UPDATE_PLAYER_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.response.error,
        updateSuccess: false
      })
    default: return state
  }
}

export function deletePlayer(state = {
  loading: false,
  error: false,
  deleteSuccess: false 
}, action) {
  switch(action.type) {
    case types.DELETE_PLAYER:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      })  
    case types.DELETE_PLAYER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        deleteSuccess: true
      })  
    case types.DELETE_PLAYER_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.response.error,
        deleteSuccess: false
      })  
    default: return state
  }
}