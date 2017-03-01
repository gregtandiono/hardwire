/**
 * main.js
 * 
 * main entry file for the client-side javascript
 */

import React, { Component } from "react"
import ReactDOM from "react-dom"
import {
  createStore,
  applyMiddleware,
  combineReducers
} from "redux"
import thunkMiddleware from "redux-thunk"
import { Provider } from "react-redux"
import {
  Router,
  Route,
  browserHistory
} from "react-router"
import {
  syncHistoryWithStore,
  routerReducer
} from "react-router-redux"

// UTILS
import { fetchToken } from "./async/utils"
import { fetchUserInfoAsync } from "./actions/UserActions"

// STORE
import store from "./store/index"

// CONTAINERS / VIEWS
import UINavigation from "./components/UINavigation"
import LoginContainer from "./containers/LoginContainer"
import PlayerListContainer from "./containers/PlayerListContainer"
import PlayerFormContainer from "./containers/PlayerFormContainer"
// import PlayerListView from "./components/PlayerListView"

class App extends Component {
  componentDidMount() {
    if (!fetchToken().token && !fetchToken().user_id) {
      this.context.router.replace("/login")
    }   
  }
  render() {
    return (
      <div>
        <UINavigation />
        <h1>Operator App</h1>
        {this.props.children}
      </div>
    )
  }
}


// CONTEXT
App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mountNode = document.getElementById("main-react-app")
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
        <Route path="login" component={LoginContainer} />
        <Route path="/" component={App}>
          <Route path="players" component={PlayerListContainer} />
          <Route path="players/new" component={PlayerFormContainer} />
        </Route>
    </Router>
  </Provider>
), mountNode)

