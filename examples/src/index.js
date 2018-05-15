import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import Counter from './containers/counter'
import { default as createElmMiddleware, createElmReducer } from 'redux-elm-middleware'
import Elm from './Reducer'

const elmReducerInitialState = {count: 12, value: 100}
const reducer = combineReducers({
  elmReducer: createElmReducer(elmReducerInitialState) // set initial state in redux, but not took into account by elm
})

const {toElmMiddleware, fromElmRegister} = createElmMiddleware(
  Elm.Reducer.worker(elmReducerInitialState) //Reducer is the name of your exported elm module
)

const store = createStore(reducer, compose(
  applyMiddleware(toElmMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

fromElmRegister(store)

ReactDOM.render(
  <Provider store={store}>
    <Counter/>
  </Provider>
  , document.getElementById('app'))

