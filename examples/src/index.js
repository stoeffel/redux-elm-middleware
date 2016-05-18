import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { compose } from 'ramda'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Layout } from './components/layout'
import { TickTock } from './containers/ticktock'
import { Counter } from './containers/counter'
import createElmMiddleware from 'redux-elm-middleware'
import { reducer as elmReducer } from 'redux-elm-middleware'

const reducer = combineReducers({
  elm: elmReducer
, routing: routerReducer
})


const elmStore = window.Elm.Reducer.worker();

const { run, elmMiddleware } = createElmMiddleware(elmStore)
const store = createStore(reducer, {}, compose(
  applyMiddleware(elmMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
run(store)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Counter}/>
          <Route path="counter" component={Counter}/>
          <Route path="ticktock" component={TickTock}/>
        </Route>
      </Router>
    </Provider>
    , document.getElementById('app'));
