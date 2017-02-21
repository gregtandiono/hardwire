/**
 * GameReducers.js
 *
 * [REDUCER]
 */

import * as types from "../constants/GameConstants"
import store from "../store/index"

export function fetchAllGames(state = {
    games: [],
    loading: false,
    error: false
}, action) {
    switch(action.type) {
        case types.FETCH_ALL_GAMES:
          return Object.assign({}, state, {
            loading: true,
            error: false
          })
        case types.FETCH_ALL_GAMES_SUCCESS:
          return Object.assign({}, state, {
            loading: false,
            error: false,
            games: action.response.data
          })
        case types.FETCH_ALL_GAMES.FAIL:
          let { error } = action.response;
          return Object.assign({}, state, {
            loading: false,
            error
          })
        default: return state
    }
}

export function fetchOneGame(state = {
  loading: false,
  error: false,
  data: null
}, action) {
  switch(action.type) {
    case types.FETCH_ONE_GAME:
      return Object.assign({}, state, {
        loading: true,
        error: false 
      })
    case types.FETCH_ONE_GAME_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        data: action.response.data
      })
    case types.FETCH_ONE_GAME_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.response.error
      })
    default: return state
  }
}

export function createGame(state = {
  loading: false,
  error: false,
  postSuccess: false
}, action) {
  switch(action.type) {
    case types.CREATE_GAME:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      })
    case types.CREATE_GAME_SUCCESS:
      var gamesFromStore = store.getState().fetchAllGames.games;
      return Object.assign({}, state, {
        loading: false,
        error: false,
        postSuccess: true,
        games: [action.clientObj, ...gamesFromStore]
      })
    case types.CREATE_GAME_FAIL:
      return Object.assign({}, state, {
        loading: true,
        error: action.response.error,
        postSuccess: false,
      })
    default: return state
  }
}

export function updateGame(state = {
  loading: false,
  error: false,
  updateSuccess: false
}, action) {
  switch(action.type) {
    case types.UPDATE_GAME:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      })  
    case types.UPDATE_GAME_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        updateSuccess: true
      })
    case types.UPDATE_GAME_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.response.error,
        updateSuccess: false
      })
    default: return state
  }
}

export function deleteGame(state = {
  loading: false,
  error: false,
  deleteSuccess: false 
}, action) {
  switch(action.type) {
    case types.DELETE_GAME:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      })  
    case types.DELETE_GAME_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        deleteSuccess: true
      })  
    case types.DELETE_GAME_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.response.error,
        deleteSuccess: false
      })  
    default: return state
  }
}

