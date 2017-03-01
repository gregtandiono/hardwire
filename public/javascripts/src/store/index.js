/**
 * store.js
 *
 * [STORE]
 * main application state tree
 */

import { createStore, applyMiddleware, combineReducers } from "redux"
import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"
import { routerReducer } from "react-router-redux"
import { loginReducer, user } from "../reducers/UserReducers"
import { fetchAllPlayers, fetchOnePlayer, createPlayer, updatePlayer, deletePlayer } from "../reducers/PlayerReducers"

const loggerMiddleware = createLogger();

function initialState() {
  return {
    userInfo: {}
  }
}

function configureStore(initialState = {}) {
  return createStore(
    combineReducers({
      loginReducer,
      user,

      fetchAllPlayers,
      fetchOnePlayer,
      createPlayer,
      updatePlayer,
      deletePlayer,

      initialState,
      routing: routerReducer
    }),
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );
}

const store = configureStore(initialState());

export default store;
