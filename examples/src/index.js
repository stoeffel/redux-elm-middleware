import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import Counter from './containers/counter'
import { default as createElmMiddleware, createElmReducer } from 'redux-elm-middleware'
import Elm from './Reducer'
import {basicCounterReducer, loggerMiddleware} from './others'



const elmReducerInitialState = {count: 12, value: 100}
const reducer = combineReducers({
  elmReducer: createElmReducer(elmReducerInitialState), // set initial state in redux, but not took into account by elm,
  reactReducer: basicCounterReducer // a basic standard reducer, just for the example
})

const {sendActionsToElm, subscribeToElm} = createElmMiddleware(
  Elm.Reducer.worker(elmReducerInitialState) //Reducer is the name of your exported elm module
)
const store = createStore(reducer, compose(
  applyMiddleware(
    sendActionsToElm,
    loggerMiddleware) // basicLogger
))
subscribeToElm(store) // to receive messages from elm module




ReactDOM.render(
  <Provider store={store}>
    <Counter/>
  </Provider>
  , document.getElementById('app'))

